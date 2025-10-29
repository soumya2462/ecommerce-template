import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigations/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'OTPVerification'>;

const { width } = Dimensions.get('window');

const OTPVerificationScreen: React.FC<Props> = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleOtpChange = (value: string, index: number) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 4) inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join('');
    if (otpCode.length === 5) {
      navigation.replace('MainApp');
    } else {
      Alert.alert('Incomplete OTP', 'Please enter all 5 digits');
    }
  };

  const handleResend = () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      Alert.alert('Success', 'A new OTP has been sent to your email');
    }, 1500);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={24} color="#222" />
          </TouchableOpacity>

          {/* Centered Content */}
          <View style={styles.centerContent}>
            {/* Icon Circle */}
            <View style={styles.iconCircle}>
              <Ionicons name="mail-outline" size={48} color="#DB3022" />
            </View>

            {/* Header */}
            <Text style={styles.title}>Verification Code</Text>
            <Text style={styles.subtitle}>
              We've sent a 5-digit code to your email{'\n'}
              Please enter it below to verify
            </Text>

            {/* OTP Inputs */}
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <View key={index} style={styles.otpWrapper}>
                  <TextInput
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    style={[
                      styles.otpInput,
                      digit ? styles.otpInputFilled : undefined,
                    ]}
                    value={digit}
                    onChangeText={(value) => handleOtpChange(value, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    selectTextOnFocus
                    autoFocus={index === 0}
                  />
                  {digit && <View style={styles.otpDot} />}
                </View>
              ))}
            </View>

            {/* Resend Section */}
            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>Didn't receive the code?</Text>
              <TouchableOpacity
                onPress={handleResend}
                disabled={isResending}
                activeOpacity={0.7}
              >
                <Text style={styles.resendLink}>
                  {isResending ? 'Sending...' : 'Resend Code'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Verify Button */}
            <TouchableOpacity
              style={[
                styles.verifyButton,
                otp.join('').length !== 5 && styles.verifyButtonDisabled,
              ]}
              onPress={handleVerify}
              disabled={otp.join('').length !== 5}
              activeOpacity={0.9}
            >
              <Text style={styles.verifyButtonText}>Verify & Continue</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFF" style={styles.buttonIcon} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal:10
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#DB3022',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#222',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#777',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 48,
    paddingHorizontal: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    gap: 12,
  },
  otpWrapper: {
    position: 'relative',
  },
  otpInput: {
    width: 56,
    height: 68,
    borderRadius: 16,
    backgroundColor: '#F9F9F9',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
    borderWidth: 2,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  otpInputFilled: {
    borderColor: '#DB3022',
    backgroundColor: '#FFF',
    transform: [{ scale: 1.02 }],
  },
  otpDot: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DB3022',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 48,
    gap: 6,
  },
  resendText: {
    fontSize: 15,
    color: '#999',
  },
  resendLink: {
    fontSize: 15,
    color: '#DB3022',
    fontWeight: '700',
  },
  verifyButton: {
    backgroundColor: '#DB3022',
    height: 58,
    borderRadius: 29,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 48,
    maxWidth: 400,
    shadowColor: '#DB3022',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  verifyButtonDisabled: {
    backgroundColor: '#E8E8E8',
    shadowOpacity: 0,
    elevation: 0,
  },
  verifyButtonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buttonIcon: {
    marginLeft: 8,
  },
});

export default OTPVerificationScreen;
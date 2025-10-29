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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigations/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'OTPVerification'>;

const OTPVerificationScreen: React.FC<Props> = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleOtpChange = (value: string, index: number) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join('');
    if (otpCode.length === 6) {
      navigation.replace('MainApp');
    } else {
      Alert.alert('Incomplete OTP', 'Please enter all 6 digits');
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
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.backCircle}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
            >
              <Ionicons name="chevron-back" size={22} color="#DB3022" />
            </TouchableOpacity>

            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>OTP Verification</Text>
              <Text style={styles.headerSubtitle}>
                Enter the 6-digit code sent to your email
              </Text>
            </View>
          </View>

          {/* --- OTP Inputs --- */}
          <View style={styles.form}>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
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
              ))}
            </View>

            {/* --- Resend Button --- */}
            <TouchableOpacity
              style={styles.resendButton}
              onPress={handleResend}
              disabled={isResending}
              activeOpacity={0.7}
            >
              <Text style={styles.resendText}>
                Didn’t receive the code?{' '}
                <Text style={styles.resendLink}>
                  {isResending ? 'Sending...' : 'Resend'}
                </Text>
              </Text>
            </TouchableOpacity>

            {/* --- Verify Button --- */}
            <TouchableOpacity
              style={[
                styles.verifyButton,
                otp.join('').length !== 6 && styles.verifyButtonDisabled,
              ]}
              onPress={handleVerify}
              disabled={otp.join('').length !== 6}
              activeOpacity={0.85}
            >
              <Text style={styles.verifyButtonText}>VERIFY CODE</Text>
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
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  backCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: '#DB3022',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#DB3022',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },

  form: {
    flex: 1,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  otpInput: {
    width: 52,
    height: 64,
    borderRadius: 14,
    backgroundColor: '#F9F9F9',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  otpInputFilled: {
    borderColor: '#DB3022',
    backgroundColor: '#FFFFFF',
  },

  resendButton: {
    alignItems: 'center',
    marginBottom: 32,
  },
  resendText: {
    fontSize: 14,
    color: '#777',
  },
  resendLink: {
    color: '#DB3022',
    fontWeight: '700',
  },

  verifyButton: {
    backgroundColor: '#DB3022',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#DB3022',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  verifyButtonDisabled: {
    backgroundColor: '#E8E8E8',
    shadowOpacity: 0,
  },
  verifyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default OTPVerificationScreen;

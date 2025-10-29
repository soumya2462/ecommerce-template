import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigations/RootNavigator';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const { width } = Dimensions.get('window');

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [loginMode, setLoginMode] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnimation = useRef(new Animated.Value(1)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animate mode switch
    Animated.parallel([
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 0.95,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.parallel([
        Animated.timing(fadeAnimation, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnimation, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    });

    // Slide toggle button
    Animated.spring(slideAnimation, {
      toValue: loginMode === 'email' ? 0 : 1,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, [loginMode]);

  const handleLogin = () => {
    // Add your login logic here
    navigation.navigate('OTPVerification');
  };

  const toggleLoginMode = (mode: 'email' | 'phone') => {
    setLoginMode(mode);
    // Reset fields when switching
    setEmail('');
    setPassword('');
    setPhoneNumber('');
  };

  const formatPhoneNumber = (text: string) => {
    // Remove all non-digits
    const cleaned = text.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX for US numbers
    let formatted = cleaned;
    if (cleaned.length <= 3) {
      formatted = cleaned;
    } else if (cleaned.length <= 6) {
      formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else if (cleaned.length <= 10) {
      formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else {
      formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
    
    return formatted;
  };

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ANIMATED HEADER */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={['#FF6B6B', '#DB3022']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.logoGradient}
              >
                <Ionicons name="flame" size={32} color="#fff" />
              </LinearGradient>
            </View>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue your journey</Text>
          </View>

          {/* LOGIN MODE TOGGLE */}
          <View style={styles.toggleContainer}>
            <View style={styles.toggleBackground}>
              <Animated.View
                style={[
                  styles.toggleSlider,
                  {
                    transform: [
                      {
                        translateX: slideAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [2, width / 2 - 22],
                        }),
                      },
                    ],
                  },
                ]}
              />
              <View style={styles.toggleButtons}>
                <TouchableOpacity
                  style={styles.toggleButton}
                  onPress={() => toggleLoginMode('email')}
                  activeOpacity={0.7}
                >
                  <Ionicons 
                    name="mail-outline" 
                    size={20} 
                    color={loginMode === 'email' ? '#fff' : '#888'} 
                  />
                  <Text style={[
                    styles.toggleButtonText,
                    loginMode === 'email' && styles.toggleButtonTextActive
                  ]}>
                    Email
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.toggleButton}
                  onPress={() => toggleLoginMode('phone')}
                  activeOpacity={0.7}
                >
                  <Ionicons 
                    name="call-outline" 
                    size={20} 
                    color={loginMode === 'phone' ? '#fff' : '#888'} 
                  />
                  <Text style={[
                    styles.toggleButtonText,
                    loginMode === 'phone' && styles.toggleButtonTextActive
                  ]}>
                    Phone
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* FORM */}
          <Animated.View 
            style={[
              styles.form,
              {
                opacity: fadeAnimation,
                transform: [{ scale: scaleAnimation }],
              }
            ]}
          >
            {loginMode === 'email' ? (
              <>
                {/* EMAIL INPUT */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>EMAIL ADDRESS</Text>
                  <View style={[
                    styles.inputWrapper,
                    focusedField === 'email' && styles.inputWrapperFocused
                  ]}>
                    <Ionicons 
                      name="mail-outline" 
                      size={20} 
                      color={focusedField === 'email' ? '#DB3022' : '#BDBDBD'} 
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your email"
                      placeholderTextColor="#BDBDBD"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </View>
                </View>

                {/* PASSWORD INPUT */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>PASSWORD</Text>
                  <View style={[
                    styles.inputWrapper,
                    focusedField === 'password' && styles.inputWrapperFocused
                  ]}>
                    <Ionicons 
                      name="lock-closed-outline" 
                      size={20} 
                      color={focusedField === 'password' ? '#DB3022' : '#BDBDBD'} 
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your password"
                      placeholderTextColor="#BDBDBD"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!isPasswordVisible}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                    />
                    <TouchableOpacity
                      onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                      style={styles.eyeIcon}
                    >
                      <Ionicons 
                        name={isPasswordVisible ? "eye-outline" : "eye-off-outline"} 
                        size={20} 
                        color="#BDBDBD" 
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            ) : (
              <>
                {/* PHONE INPUT */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>MOBILE NUMBER</Text>
                  <View style={[
                    styles.phoneInputWrapper,
                    focusedField === 'phone' && styles.inputWrapperFocused
                  ]}>
                    {/* Country Code Selector */}
                    <TouchableOpacity style={styles.countryCodeButton}>
                      <Text style={styles.countryCodeText}>{countryCode}</Text>
                      <Ionicons name="chevron-down" size={16} color="#666" />
                    </TouchableOpacity>
                    
                    <View style={styles.phoneDivider} />
                    
                    <Ionicons 
                      name="call-outline" 
                      size={20} 
                      color={focusedField === 'phone' ? '#DB3022' : '#BDBDBD'} 
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.phoneInput}
                      placeholder="(555) 123-4567"
                      placeholderTextColor="#BDBDBD"
                      value={phoneNumber}
                      onChangeText={handlePhoneChange}
                      keyboardType="phone-pad"
                      maxLength={14}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </View>
                </View>

                {/* OTP INFO */}
                <View style={styles.otpInfo}>
                  <Ionicons name="information-circle-outline" size={16} color="#888" />
                  <Text style={styles.otpInfoText}>
                    We'll send you a verification code via SMS
                  </Text>
                </View>
              </>
            )}

            {/* REMEMBER ME & FORGOT PASSWORD */}
            <View style={styles.optionsRow}>
              <TouchableOpacity style={styles.rememberMe}>
                <View style={styles.checkbox}>
                  <Ionicons name="checkmark" size={14} color="#DB3022" />
                </View>
                <Text style={styles.rememberText}>Remember me</Text>
              </TouchableOpacity>
              
              {loginMode === 'email' && (
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgotPassword')}
                >
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* LOGIN BUTTON */}
            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={handleLogin} 
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={['#FF6B6B', '#DB3022']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Text style={styles.loginButtonText}>
                  {loginMode === 'email' ? 'LOGIN' : 'SEND OTP'}
                </Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>

            {/* BIOMETRIC LOGIN */}
            <View style={styles.biometricContainer}>
              <Text style={styles.biometricText}>Or login with</Text>
              <View style={styles.biometricButtons}>
                <TouchableOpacity style={styles.biometricButton}>
                  <Ionicons name="finger-print" size={28} color="#DB3022" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.biometricButton}>
                  <Ionicons name="scan" size={28} color="#DB3022" />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>

          {/* DIVIDER */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* SOCIAL BUTTONS */}
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
              <Ionicons name="logo-google" size={22} color="#DB4437" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
              <Ionicons name="logo-facebook" size={22} color="#1877F2" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
              <Ionicons name="logo-apple" size={22} color="#000" />
            </TouchableOpacity>
          </View>

          {/* FOOTER */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.signupText}>Sign Up</Text>
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
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoGradient: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#DB3022',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#888',
    letterSpacing: 0.2,
  },
  toggleContainer: {
    marginBottom: 28,
  },
  toggleBackground: {
    backgroundColor: '#F5F5F5',
    borderRadius: 30,
    height: 56,
    position: 'relative',
    overflow: 'hidden',
  },
  toggleSlider: {
    position: 'absolute',
    width: (width - 48) / 2 - 4,
    height: 52,
    backgroundColor: '#DB3022',
    borderRadius: 28,
    top: 2,
    shadowColor: '#DB3022',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  toggleButtons: {
    flexDirection: 'row',
    height: 56,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    zIndex: 1,
  },
  toggleButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#888',
  },
  toggleButtonTextActive: {
    color: '#fff',
  },
  form: {
    marginTop: 8,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 11,
    color: '#A1A1A1',
    marginBottom: 8,
    fontWeight: '700',
    letterSpacing: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  inputWrapperFocused: {
    borderColor: '#DB3022',
    backgroundColor: '#fff',
    shadowColor: '#DB3022',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    paddingLeft: 0,
    paddingRight: 16,
    height: 56,
    borderWidth: 1.5,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  countryCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 4,
    height: '100%',
  },
  countryCodeText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  phoneDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E0E0E0',
    marginRight: 12,
  },
  phoneInput: {
    flex: 1,
    fontSize: 15,
    color: '#222',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#222',
  },
  eyeIcon: {
    padding: 4,
  },
  otpInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    gap: 8,
  },
  otpInfoText: {
    flex: 1,
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#DB3022',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rememberText: {
    fontSize: 14,
    color: '#666',
  },
  forgotText: {
    fontSize: 14,
    color: '#DB3022',
    fontWeight: '600',
  },
  loginButton: {
    marginBottom: 24,
    shadowColor: '#DB3022',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  gradientButton: {
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  biometricContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  biometricText: {
    fontSize: 13,
    color: '#888',
    marginBottom: 12,
  },
  biometricButtons: {
    flexDirection: 'row',
    gap: 20,
  },
  biometricButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFE5E5',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#EAEAEA',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#A1A1A1',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 32,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#EAEAEA',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  footerText: {
    fontSize: 15,
    color: '#888',
  },
  signupText: {
    fontSize: 15,
    color: '#DB3022',
    fontWeight: '700',
  },
});

export default LoginScreen;
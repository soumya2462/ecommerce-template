// /**
//  * HomeScreen.tsx
//  * Copyright (c) 2023 James Ugbanu.
//  * Licensed under the MIT License.
//  */

// import React from 'react';
// import { View, TouchableHighlight } from 'react-native';
// import { Icon, useTheme, Button, Text } from '@rneui/themed';
// import { useTranslation } from "react-i18next";
// import { Formik } from 'formik';
// import * as yup from 'yup';
// import { styles } from './styles';
// import AnimatedTextInput from '../../components/AnimatedInput';
// import Socials from '../../components/Socials';
// import ErrorBoundary from '../../components/HOC/ErrorBoundary';
// import AppContainer from '../../components/HOC/AppContainer';

// const Login = ({ navigation }) => {
//     const { theme } = useTheme();
//     const { t } = useTranslation();

//     const validationSchema = yup.object().shape({
//         email: yup.string().email(t('common:invalidEmail')).required(t('common:textRequired', { text: t('common:email') })),
//         password: yup.string().min(6, t('common:textCharacters', { numbers: 6, text: t('common:password') })).required(t('common:textRequired', { text: t('common:password') })),
//     });

//     return (
//         <AppContainer>
//             <View style={styles.container}>
//                 <View style={styles.heading}>
//                     <Text h1>{t('common:login')}</Text>
//                 </View>
//                 <View style={styles.form}>
//                     <Formik
//                         initialValues={{ email: '', password: '' }}
//                         validationSchema={validationSchema}
//                         onSubmit={values => console.log(values)}
//                     >
//                         {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
//                             <>
//                                 <AnimatedTextInput
//                                     placeholder={t('common:email')}
//                                     value={values.email}
//                                     textInputProps={{
//                                         keyboardType: 'email-address'
//                                     }}
//                                     onChangeText={handleChange('email')}
//                                     onBlur={handleBlur('email')}
//                                     isError={touched.email && errors.email ? true : false}
//                                     errorText={errors.email}
//                                 />
//                                 <AnimatedTextInput
//                                     placeholder={t('common:password')}
//                                     value={values.password}
//                                     textInputProps={{
//                                         keyboardType: 'default',
//                                         secureTextEntry: true
//                                     }}
//                                     onChangeText={handleChange('password')}
//                                     isError={touched.password && errors.password ? true : false}
//                                     onBlur={handleBlur('password')}
//                                     errorText={errors.password}
//                                 />
//                                 <View style={styles.linkContainer}>
//                                     <TouchableHighlight underlayColor="transparent" onPress={() => navigation.navigate('Register')}>
//                                         <Text h3>{t('common:signUp')}</Text>
//                                     </TouchableHighlight>
//                                     <TouchableHighlight underlayColor="transparent" onPress={() => navigation.navigate('ForgotPassword')}>
//                                         <View style={styles.link}>
//                                             <Text h3>{t('common:forgotYourPassword')}</Text>
//                                             <Icon type="material-icons" size={16} name="trending-flat" color={theme.colors.error} />
//                                         </View>
//                                     </TouchableHighlight>
//                                 </View>
//                                 <View style={styles.buttonContainer}>
//                                     <Button
//                                         title={t('common:login')}
//                                         uppercase
//                                         onPress={() => handleSubmit()}
//                                     />
//                                 </View>
//                                 <View style={styles.socialContainer}>
//                                     <Socials spacing={5} loginOrRegisterText={t('common:loginWithSocials')} />
//                                 </View>
//                             </>
//                         )}
//                     </Formik>
//                 </View>
//             </View>
//         </AppContainer>
//     );
// }


// export default ErrorBoundary(Login);

import React, { useState } from 'react';
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
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigations/RootNavigator';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = () => {
    navigation.navigate('OTPVerification');
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* HEADER */}
          <View style={styles.header}>
            <Ionicons name="flame" size={48} color="#DB3022" />
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue your journey</Text>
          </View>

          {/* FORM */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>EMAIL ADDRESS</Text>
              <TextInput
                style={[styles.input, emailFocused && styles.inputFocused]}
                placeholder="Enter your email"
                placeholderTextColor="#BDBDBD"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>PASSWORD</Text>
              <TextInput
                style={[styles.input, passwordFocused && styles.inputFocused]}
                placeholder="Enter your password"
                placeholderTextColor="#BDBDBD"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.forgotButton}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} activeOpacity={0.85}>
              <Text style={styles.loginButtonText}>LOGIN</Text>
            </TouchableOpacity>
          </View>

          {/* DIVIDER */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* SOCIAL BUTTONS */}
          <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
            <Ionicons name="logo-google" size={20} color="#DB3022" />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
            <Ionicons name="logo-facebook" size={20} color="#DB3022" />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>

          {/* FOOTER */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don’t have an account? </Text>
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
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#222',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#888',
    marginTop: 6,
  },
  form: {
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 18,
  },
  label: {
    fontSize: 12,
    color: '#A1A1A1',
    marginBottom: 6,
    fontWeight: '600',
    letterSpacing: 0.6,
  },
  input: {
    height: 54,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#222',
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
  },
  inputFocused: {
    borderColor: '#DB3022',
    backgroundColor: '#fff',
    shadowColor: '#DB3022',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 26,
  },
  forgotText: {
    fontSize: 14,
    color: '#DB3022',
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#DB3022',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#DB3022',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#EAEAEA',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#A1A1A1',
    fontSize: 13,
    fontWeight: '600',
  },
  socialButton: {
    flexDirection: 'row',
    height: 54,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#EAEAEA',
    backgroundColor: '#fff',
    marginBottom: 14,
    gap: 8,
  },
  socialButtonText: {
    color: '#222',
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
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



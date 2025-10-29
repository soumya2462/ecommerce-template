// /**
//  * RegisterScreen.tsx
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

// const Register = ({ navigation }) => {
//     const { theme } = useTheme();
//     const { t } = useTranslation();

//     const validationSchema = yup.object().shape({
//         email: yup.string().email(t('common:invalidEmail')).required(t('common:textRequired', { text: t('common:email') })),
//         password: yup.string().min(6, t('common:textCharacters', { numbers: 6, text: t('common:password') })).required(t('common:textRequired', { text: t('common:password') })),
//         name: yup.string().min(6, t('common:textCharacters', { numbers: 6, text: t('common:name') })).required(t('common:textRequired', { text: t('common:name') })),
//     });

//     return (
//         <AppContainer>
//             <View style={styles.container}>
//                 <View style={styles.heading}>
//                     <Text h1>{t('common:register')}</Text>
//                 </View>
//                 <View style={styles.form}>
//                     <Formik
//                         initialValues={{ name: '', email: '', password: '' }}
//                         validationSchema={validationSchema}
//                         onSubmit={values => console.log(values)}
//                     >
//                         {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
//                             <>
//                                 <AnimatedTextInput
//                                     placeholder={t('common:name')}
//                                     value={values.name}
//                                     onChangeText={handleChange('name')}
//                                     onBlur={handleBlur('name')}
//                                     isError={touched.name && errors.name ? true : false}
//                                     errorText={errors.name}
//                                 />
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
//                                         secureTextEntry: true
//                                     }}
//                                     onChangeText={handleChange('password')}
//                                     isError={touched.password && errors.password ? true : false}
//                                     onBlur={handleBlur('password')}
//                                     errorText={errors.password}
//                                 />
//                                 <View style={styles.linkContainer}>
//                                     <TouchableHighlight underlayColor="transparent" onPress={() => navigation.navigate('Login')}>
//                                         <View>
//                                             <Text h3>{t('common:haveAnAccount')}</Text>
//                                         </View>
//                                     </TouchableHighlight>
//                                     <Icon type="material-icons" size={16} name="trending-flat" color={theme.colors.error} />
//                                 </View>
//                                 <View style={styles.buttonContainer}>
//                                     <Button
//                                         title={t('common:register')}
//                                         uppercase
//                                         onPress={() => handleSubmit()}
//                                     />
//                                 </View>
//                                 <View style={styles.socialContainer}>
//                                     <Socials spacing={5} loginOrRegisterText={t('common:registerWithSocials')} />
//                                 </View>
//                             </>
//                         )}
//                     </Formik>
//                 </View>
//             </View>
//         </AppContainer>
//     );
// }


// export default ErrorBoundary(Register);


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
  Image,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigations/RootNavigator';
import { LinearGradient } from 'react-native-svg';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSignUp = () => {
    navigation.navigate('OTPVerification');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://img.icons8.com/fluency/96/shopping-bag.png' }}
              style={styles.logo}
            />
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join us and start shopping smart</Text>
          </View>

          {/* Input Fields */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>FULL NAME</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedField === 'name' && styles.inputFocused,
                ]}
                placeholder="Enter your full name"
                placeholderTextColor="#A1A1A1"
                value={name}
                onChangeText={setName}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>EMAIL</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedField === 'email' && styles.inputFocused,
                ]}
                placeholder="Enter your email"
                placeholderTextColor="#A1A1A1"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>PASSWORD</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedField === 'password' && styles.inputFocused,
                ]}
                placeholder="Create a password"
                placeholderTextColor="#A1A1A1"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
              />
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={styles.signUpButton}
              onPress={handleSignUp}
              activeOpacity={0.85}
            >
              <View
             
                style={styles.gradientButton}
              >
                <Text style={styles.signUpButtonText}>SIGN UP</Text>
              </View>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Buttons */}
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
              <Image
                source={{ uri: 'https://img.icons8.com/color/48/google-logo.png' }}
                style={styles.socialIcon}
              />
              <Text style={styles.socialButtonText}>Sign up with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
              <Image
                source={{ uri: 'https://img.icons8.com/color/48/facebook-new.png' }}
                style={styles.socialIcon}
              />
              <Text style={styles.socialButtonText}>Sign up with Facebook</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>

          {/* Terms */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>By signing up, you agree to our </Text>
            <TouchableOpacity>
              <Text style={styles.termsLink}>Terms & Conditions</Text>
            </TouchableOpacity>
            <Text style={styles.termsText}> and </Text>
            <TouchableOpacity>
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: 24 },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  logo: { width: 80, height: 80, marginBottom: 12 },
  title: { fontSize: 30, fontWeight: 'bold', color: '#DB3022' },
  subtitle: { fontSize: 15, color: '#777', marginTop: 4 },
  form: { flex: 1 },
  inputContainer: { marginBottom: 18 },
  label: {
    fontSize: 12,
    color: '#9B9B9B',
    marginBottom: 8,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  input: {
    height: 52,
    backgroundColor: '#F9F9F9',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#222',
    borderWidth: 1.5,
    borderColor: '#EAEAEA',
  },
  inputFocused: {
    borderColor: '#DB3022',
    backgroundColor: '#FFF',
  },
  signUpButton: {
    height: 54,
    borderRadius: 30,
    overflow: 'hidden',
    marginTop: 10,
    backgroundColor:"#DB3022"

  },
  gradientButton: {
    height: '100%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 28,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E8E8E8' },
  dividerText: { marginHorizontal: 12, color: '#9B9B9B', fontSize: 13 },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 54,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    marginBottom: 14,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  socialIcon: { width: 22, height: 22, marginRight: 10 },
  socialButtonText: { color: '#222', fontSize: 15, fontWeight: '600' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  footerText: { fontSize: 14, color: '#9B9B9B' },
  loginText: { fontSize: 14, color: '#DB3022', fontWeight: '700' },
  termsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  termsText: { fontSize: 12, color: '#9B9B9B' },
  termsLink: { fontSize: 12, color: '#DB3022', fontWeight: '600' },
});

export default RegisterScreen;

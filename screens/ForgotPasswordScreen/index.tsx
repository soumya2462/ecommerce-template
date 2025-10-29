// /**
//  * ForgotPasswordScreen.tsx
//  * Copyright (c) 2023 James Ugbanu.
//  * Licensed under the MIT License.
//  */

// import React from 'react';
// import { View } from 'react-native';
// import { Button, Text } from '@rneui/themed';
// import { useTranslation } from "react-i18next";
// import { Formik } from 'formik';
// import * as yup from 'yup';
// import AnimatedTextInput from '../../components/AnimatedInput';
// import ErrorBoundary from '../../components/HOC/ErrorBoundary';
// import AppContainer from '../../components/HOC/AppContainer';
// import { styles } from './styles';

// const ForgotPassword = () => {
//     const { t } = useTranslation();

//     const validationSchema = yup.object().shape({
//         email: yup.string().email(t('common:invalidEmail')).required(t('common:textRequired', { text: t('common:email') })),
//     });

//     return (
//         <AppContainer>
//             <View style={styles.container}>
//                 <View style={styles.heading}>
//                     <Text h1>{t('common:forgotPassword')}</Text>
//                 </View>
//                 <View style={styles.form}>
//                 <Formik
//                     initialValues={{ email: '' }}
//                     validationSchema={validationSchema}
//                     onSubmit={values => console.log(values)}
//                 >
//                     {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
//                         <>
//                             <Text h3>Please, enter your email address. You will receive a link to create a new password via email.</Text>
//                             <AnimatedTextInput
//                                 placeholder={t('common:email')}
//                                 value={values.email}
//                                 textInputProps={{
//                                     keyboardType: 'email-address'
//                                 }}
//                                 onChangeText={handleChange('email')}
//                                 onBlur={handleBlur('email')}
//                                 isError={touched.email && errors.email ? true : false}
//                                 errorText={errors.email}
//                                 style={{ marginTop: 10 }}
//                             />
//                             <View style={styles.buttonContainer}>
//                                 <Button
//                                     title={t('common:send')}
//                                     uppercase
//                                     onPress={() => handleSubmit()}
//                                 />
//                             </View>
//                         </>
//                     )}
//                 </Formik>
//                 </View>
//             </View>
//         </AppContainer>
//     );
// }

// export default ErrorBoundary(ForgotPassword);

import React, { useState } from "react";
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigations/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "ForgotPassword">;

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleSend = () => {
    if (email) {
      // Direct navigation to OTP
      navigation.navigate("OTPVerification", { email });
    } else {
      Alert.alert("Error", "Please enter your email");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
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
            <Text style={styles.headerTitle}>Forget Password</Text>
          </View>
        </View>

        <View style={styles.header}>
          <Text style={styles.subtitle}>
            Please, enter your email address. You will receive a link to create
            a new password via email.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>SEND</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  backCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: "#DB3022",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#DB3022",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },

  backButton: {
    marginTop: 50,
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    color: "#222222",
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#222222",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    color: "#222222",
    lineHeight: 20,
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 32,
  },
  label: {
    fontSize: 11,
    color: "#9B9B9B",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  input: {
    height: 64,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    paddingHorizontal: 20,
    fontSize: 14,
    color: "#222222",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  sendButton: {
    backgroundColor: "#DB3022",
    height: 48,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#DB3022",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default ForgotPasswordScreen;

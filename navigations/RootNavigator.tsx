

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TabNavigator from './TabNavigator';
import SplashScreen from '../screens/SplashScreen';
import OTPVerificationScreen from '../screens/OtpVerifyScreen';
import CategoryDetailsScreen from "../screens/CategoryDetailsScreen";

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  Register: undefined;
  OTPVerification: { phone?: string; email?: string };
  MainApp: undefined;
  CategoryDetails:undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
      <Stack.Screen 
        name="MainApp" 
        component={TabNavigator}
        options={{
          animation: 'fade',
        }}
      />
           <Stack.Screen name="CategoryDetails" component={CategoryDetailsScreen}
           
            
            />
    </Stack.Navigator>
  );
};

export default RootNavigator;
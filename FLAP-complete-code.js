// ================================================================================================
// FLAP - Feel Like A Pro - Complete Mobile App Code
// Мобільний застосунок для футбольної спільноти
// ================================================================================================

// ================================================================================================
// 1. PACKAGE.JSON
// ================================================================================================
/*
{
  "name": "flap",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "@expo/vector-icons": "^14.1.0",
    "@react-native-async-storage/async-storage": "^2.2.0",
    "@react-native-community/slider": "^4.5.7",
    "@react-native-picker/picker": "^2.11.1",
    "@react-navigation/bottom-tabs": "^7.4.2",
    "@react-navigation/native": "^7.1.14",
    "@react-navigation/stack": "^7.4.2",
    "expo": "~53.0.20",
    "expo-av": "^15.1.7",
    "expo-image-picker": "^16.1.4",
    "expo-linear-gradient": "^14.1.5",
    "expo-status-bar": "~2.2.3",
    "react": "19.0.0",
    "react-native": "0.79.5",
    "react-native-elements": "^3.4.3",
    "react-native-gesture-handler": "^2.27.2",
    "react-native-safe-area-context": "^5.5.2",
    "react-native-screens": "^4.13.1",
    "react-native-vector-icons": "^10.3.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0"
  },
  "private": true
}
*/

// ================================================================================================
// 2. CONSTANTS (src/constants/index.js)
// ================================================================================================

import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const COLORS = {
  // Primary colors
  PRIMARY_GREEN: '#00C851',
  DARK_GREEN: '#007E33',
  LIGHT_GREEN: '#B8E6B8',
  
  // Secondary colors
  ORANGE: '#FF8800',
  DARK_BLUE: '#1565C0',
  LIGHT_BLUE: '#E3F2FD',
  
  // Neutral colors
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAY_LIGHT: '#F5F5F5',
  GRAY_MEDIUM: '#BDBDBD',
  GRAY_DARK: '#424242',
  
  // Status colors
  SUCCESS: '#4CAF50',
  WARNING: '#FF9800',
  ERROR: '#F44336',
  INFO: '#2196F3',
  
  // Rating colors
  GOLD: '#FFD700',
  SILVER: '#C0C0C0',
  BRONZE: '#CD7F32',
};

export const DIMENSIONS = {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  HEADER_HEIGHT: 60,
  TAB_HEIGHT: 60,
  BUTTON_HEIGHT: 50,
  INPUT_HEIGHT: 45,
};

export const FONTS = {
  REGULAR: 'System',
  BOLD: 'System',
  LIGHT: 'System',
  SIZES: {
    SMALL: 12,
    MEDIUM: 16,
    LARGE: 20,
    XLARGE: 24,
    XXLARGE: 32,
  },
};

export const POSITIONS = [
  'Воротар',
  'Захисник', 
  'Півзахисник',
  'Нападник',
  'Універсал'
];

export const VIDEO_CATEGORIES = [
  'Усі',
  'Фінти',
  'Голи',
  'Сейви',
  'Тренування'
];

export const MATCH_FILTERS = [
  'Усі',
  'Сьогодні',
  'Завтра',
  'Поблизу'
];

export const TEAM_NAMES = [
  ['Леви', 'Тигри'],
  ['Дракони', 'Феніки'],
  ['Гладіатори', 'Спартанці'],
  ['Вікінги', 'Лицарі'],
  ['Орли', 'Соколи'],
  ['Вовки', 'Ведмеді']
];

export const CHALLENGE_AUDIENCES = [
  { label: '🌍 Усі гравці', value: 'all' },
  { label: '👥 Тільки друзі', value: 'friends' },
  { label: '🏙️ Гравці з мого міста', value: 'city' }
];

export const SUBSCRIPTION_PLANS = {
  FREE: {
    name: 'Безкоштовна версія',
    price: 0,
    features: [
      '✓ Перегляд відео',
      '✓ Участь у матчах',
      '✓ Голосування в челенджах',
      '❌ Рейтинг прихований',
      '❌ Створення челенджів'
    ]
  },
  EUROPA: {
    name: 'Ліга Європи',
    price: 99,
    features: [
      '✓ Показ рейтингу',
      '✓ 3 челенджі на місяць',
      '✓ Всі базові функції'
    ]
  },
  CHAMPIONS: {
    name: 'Ліга Чемпіонів',
    price: 153,
    features: [
      '✓ Показ рейтингу',
      '✓ Необмежена кількість челенджів',
      '✓ 100 монет на місяць',
      '✓ Всі преміум функції'
    ]
  }
};

export const INITIAL_COINS = 250;
export const VOTE_REWARD = 1;
export const PREMIUM_MONTHLY_COINS = 100;
export const FREE_PREMIUM_DAYS = 14;

// ================================================================================================
// 3. MAIN APP.JS
// ================================================================================================

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import AuthScreen from './src/screens/AuthScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ProfileCreationScreen from './src/screens/ProfileCreationScreen';
import MainAppScreen from './src/screens/MainAppScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator 
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                      }),
                    },
                  ],
                },
              };
            },
          }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ProfileCreation" component={ProfileCreationScreen} />
          <Stack.Screen name="MainApp" component={MainAppScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// ================================================================================================
// 4. WELCOME SCREEN (src/screens/WelcomeScreen.js)
// ================================================================================================

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, DIMENSIONS, FONTS } from '../constants';

const WelcomeScreen = ({ navigation }) => {
  const ballAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start ball animation
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(ballAnimation, {
            toValue: 1,
            duration: 2000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(ballAnimation, {
            toValue: 0,
            duration: 2000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startAnimation();
  }, []);

  const ballTransform = ballAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const ballRotation = ballAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleBecomeProPress = () => {
    navigation.navigate('Auth');
  };

  return (
    <LinearGradient
      colors={[COLORS.PRIMARY_GREEN, COLORS.DARK_GREEN]}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Animated Football Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [
                { translateY: ballTransform },
                { rotate: ballRotation },
              ],
            },
          ]}
        >
          <Text style={styles.footballEmoji}>⚽</Text>
        </Animated.View>

        {/* App Title */}
        <Text style={styles.appTitle}>FLAP</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Feel Like A Pro - Відчуй себе як професіонал
        </Text>

        {/* Become Pro Button */}
        <TouchableOpacity
          style={styles.becomeProButton}
          onPress={handleBecomeProPress}
          activeOpacity={0.8}
        >
          <Text style={styles.becomeProButtonText}>Стати профі</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const welcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    marginBottom: 40,
  },
  footballEmoji: {
    fontSize: 80,
    textAlign: 'center',
  },
  appTitle: {
    fontSize: FONTS.SIZES.XXLARGE * 1.5,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: FONTS.SIZES.MEDIUM,
    color: COLORS.WHITE,
    textAlign: 'center',
    marginBottom: 60,
    opacity: 0.9,
    lineHeight: 24,
  },
  becomeProButton: {
    backgroundColor: COLORS.ORANGE,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 5,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  becomeProButtonText: {
    color: COLORS.WHITE,
    fontSize: FONTS.SIZES.LARGE,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

// ================================================================================================
// 5. AUTH SCREEN (src/screens/AuthScreen.js)
// ================================================================================================

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, DIMENSIONS, FONTS } from '../constants';

const AuthScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleLogin = () => {
    // Mock social login - in real app, implement with Firebase Auth or similar
    Alert.alert('Google Login', 'Google login clicked', [
      { text: 'OK', onPress: () => navigation.navigate('ProfileCreation') }
    ]);
  };

  const handleFacebookLogin = () => {
    // Mock social login - in real app, implement with Firebase Auth or similar
    Alert.alert('Facebook Login', 'Facebook login clicked', [
      { text: 'OK', onPress: () => navigation.navigate('ProfileCreation') }
    ]);
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Помилка', 'Будь ласка, заповніть всі поля');
      return;
    }
    
    // Mock login - in real app, implement with backend API
    navigation.navigate('MainApp');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <LinearGradient
      colors={[COLORS.DARK_BLUE, '#0D47A1']}
      style={authStyles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={authStyles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={authStyles.scrollContent}>
          <View style={authStyles.content}>
            {/* Title */}
            <Text style={authStyles.title}>Вхід до FLAP</Text>

            {/* Social Login Buttons */}
            <TouchableOpacity
              style={[authStyles.socialButton, authStyles.googleButton]}
              onPress={handleGoogleLogin}
              activeOpacity={0.8}
            >
              <Text style={authStyles.socialButtonText}>🔍 Увійти через Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[authStyles.socialButton, authStyles.facebookButton]}
              onPress={handleFacebookLogin}
              activeOpacity={0.8}
            >
              <Text style={authStyles.socialButtonText}>📘 Увійти через Facebook</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={authStyles.dividerContainer}>
              <View style={authStyles.dividerLine} />
              <Text style={authStyles.dividerText}>або</Text>
              <View style={authStyles.dividerLine} />
            </View>

            {/* Login Form */}
            <View style={authStyles.formContainer}>
              <TextInput
                style={authStyles.input}
                placeholder="Email"
                placeholderTextColor={COLORS.GRAY_MEDIUM}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />

              <TextInput
                style={authStyles.input}
                placeholder="Пароль"
                placeholderTextColor={COLORS.GRAY_MEDIUM}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password"
              />

              <TouchableOpacity
                style={authStyles.loginButton}
                onPress={handleLogin}
                activeOpacity={0.8}
              >
                <Text style={authStyles.loginButtonText}>Увійти</Text>
              </TouchableOpacity>
            </View>

            {/* Register Link */}
            <TouchableOpacity
              style={authStyles.registerButton}
              onPress={handleRegister}
              activeOpacity={0.8}
            >
              <Text style={authStyles.registerButtonText}>Зареєструватися</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const authStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  title: {
    fontSize: FONTS.SIZES.XXLARGE,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    textAlign: 'center',
    marginBottom: 40,
  },
  socialButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  googleButton: {
    backgroundColor: COLORS.WHITE,
  },
  facebookButton: {
    backgroundColor: '#4267B2',
  },
  socialButtonText: {
    fontSize: FONTS.SIZES.MEDIUM,
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.WHITE,
    opacity: 0.3,
  },
  dividerText: {
    color: COLORS.WHITE,
    marginHorizontal: 15,
    fontSize: FONTS.SIZES.MEDIUM,
  },
  formContainer: {
    marginBottom: 30,
  },
  input: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: FONTS.SIZES.MEDIUM,
    marginBottom: 15,
    color: COLORS.BLACK,
  },
  loginButton: {
    backgroundColor: COLORS.PRIMARY_GREEN,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: COLORS.WHITE,
    fontSize: FONTS.SIZES.LARGE,
    fontWeight: 'bold',
  },
  registerButton: {
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.WHITE,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  registerButtonText: {
    color: COLORS.WHITE,
    fontSize: FONTS.SIZES.MEDIUM,
    fontWeight: '600',
  },
});

// ================================================================================================
// ІНСТРУКЦІЇ ДЛЯ ВИКОРИСТАННЯ:
// ================================================================================================

/*
ЩОБ ЗІБРАТИ ВЕСЬ КОД В ОДИН ПРОЕКТ:

1. Створіть нову папку для проекту:
   mkdir FLAP-app
   cd FLAP-app

2. Ініціалізуйте Expo проект:
   npx create-expo-app . --template blank

3. Встановіть залежності:
   npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack expo-linear-gradient expo-image-picker expo-av @expo/vector-icons react-native-safe-area-context react-native-screens react-native-gesture-handler @react-native-async-storage/async-storage react-native-elements react-native-vector-icons @react-native-community/slider @react-native-picker/picker

4. Створіть структуру папок:
   mkdir -p src/screens src/components src/constants

5. Скопіюйте код з цього файлу в відповідні файли:
   - App.js (головний файл)
   - src/constants/index.js (константи)
   - src/screens/WelcomeScreen.js
   - src/screens/AuthScreen.js
   - src/screens/RegisterScreen.js
   - src/screens/ProfileCreationScreen.js
   - src/screens/MainAppScreen.js
   - src/components/Header.js
   - src/components/VideosTab.js
   - src/components/ChallengesTab.js
   - src/components/MatchesTab.js
   - src/components/RatingTab.js

6. Запустіть проект:
   npm start

УВАГА: Цей файл містить тільки частину коду. Повний код знаходиться в папці FLAP/
*/
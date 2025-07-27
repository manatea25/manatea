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

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleRegister = () => {
    // Mock social register - in real app, implement with Firebase Auth or similar
    Alert.alert('Google Register', 'Google register clicked', [
      { text: 'OK', onPress: () => navigation.navigate('ProfileCreation') }
    ]);
  };

  const handleFacebookRegister = () => {
    // Mock social register - in real app, implement with Firebase Auth or similar
    Alert.alert('Facebook Register', 'Facebook register clicked', [
      { text: 'OK', onPress: () => navigation.navigate('ProfileCreation') }
    ]);
  };

  const handleRegister = () => {
    if (!email || !password) {
      Alert.alert('Помилка', 'Будь ласка, заповніть всі поля');
      return;
    }
    
    if (password.length < 6) {
      Alert.alert('Помилка', 'Пароль повинен містити мінімум 6 символів');
      return;
    }
    
    // Mock register - in real app, implement with backend API
    navigation.navigate('ProfileCreation');
  };

  const handleLogin = () => {
    navigation.navigate('Auth');
  };

  return (
    <LinearGradient
      colors={[COLORS.DARK_BLUE, '#0D47A1']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            {/* Title */}
            <Text style={styles.title}>Реєстрація</Text>

            {/* Social Register Buttons */}
            <TouchableOpacity
              style={[styles.socialButton, styles.googleButton]}
              onPress={handleGoogleRegister}
              activeOpacity={0.8}
            >
              <Text style={styles.socialButtonText}>🔍 Увійти через Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialButton, styles.facebookButton]}
              onPress={handleFacebookRegister}
              activeOpacity={0.8}
            >
              <Text style={styles.socialButtonText}>📘 Увійти через Facebook</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>або</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Register Form */}
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={COLORS.GRAY_MEDIUM}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />

              <TextInput
                style={styles.input}
                placeholder="Пароль"
                placeholderTextColor={COLORS.GRAY_MEDIUM}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="new-password"
              />

              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleRegister}
                activeOpacity={0.8}
              >
                <Text style={styles.registerButtonText}>Створити акаунт</Text>
              </TouchableOpacity>
            </View>

            {/* Login Link */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.loginButtonText}>Вже маєш акаунт? Увійти</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
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
  registerButton: {
    backgroundColor: COLORS.PRIMARY_GREEN,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: COLORS.WHITE,
    fontSize: FONTS.SIZES.LARGE,
    fontWeight: 'bold',
  },
  loginButton: {
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.WHITE,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  loginButtonText: {
    color: COLORS.WHITE,
    fontSize: FONTS.SIZES.MEDIUM,
    fontWeight: '600',
  },
});

export default RegisterScreen;
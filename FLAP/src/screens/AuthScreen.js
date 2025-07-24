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
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            {/* Title */}
            <Text style={styles.title}>Вхід до FLAP</Text>

            {/* Social Login Buttons */}
            <TouchableOpacity
              style={[styles.socialButton, styles.googleButton]}
              onPress={handleGoogleLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.socialButtonText}>🔍 Увійти через Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialButton, styles.facebookButton]}
              onPress={handleFacebookLogin}
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

            {/* Login Form */}
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
                autoComplete="password"
              />

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                activeOpacity={0.8}
              >
                <Text style={styles.loginButtonText}>Увійти</Text>
              </TouchableOpacity>
            </View>

            {/* Register Link */}
            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
              activeOpacity={0.8}
            >
              <Text style={styles.registerButtonText}>Зареєструватися</Text>
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

export default AuthScreen;
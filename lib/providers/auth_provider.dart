import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/user_model.dart';

class AuthProvider extends ChangeNotifier {
  UserModel? _user;
  bool _isLoading = false;
  String? _error;

  UserModel? get user => _user;
  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get isAuthenticated => _user != null;

  void setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void setError(String? error) {
    _error = error;
    notifyListeners();
  }

  void clearError() {
    _error = null;
    notifyListeners();
  }

  // Login with email/phone and password
  Future<bool> loginWithEmailPassword(String emailOrPhone, String password) async {
    setLoading(true);
    clearError();

    try {
      // Simulate API call
      await Future.delayed(const Duration(seconds: 2));
      
      // For demo purposes, accept any non-empty credentials
      if (emailOrPhone.isNotEmpty && password.isNotEmpty) {
        _user = UserModel(
          id: '1',
          name: 'Максим Коваленко',
          email: emailOrPhone.contains('@') ? emailOrPhone : 'user@example.com',
          phone: emailOrPhone.contains('@') ? '+380501234567' : emailOrPhone,
          avatarUrl: null,
          city: '',
          position: '',
          rating: 0.0,
        );
        
        await _saveUserToPrefs();
        setLoading(false);
        return true;
      } else {
        setError('Невірні дані для входу');
        setLoading(false);
        return false;
      }
    } catch (e) {
      setError('Помилка входу: ${e.toString()}');
      setLoading(false);
      return false;
    }
  }

  // Register with basic info
  Future<bool> register({
    required String name,
    required String email,
    required String phone,
    required String password,
  }) async {
    setLoading(true);
    clearError();

    try {
      // Simulate API call
      await Future.delayed(const Duration(seconds: 2));
      
      _user = UserModel(
        id: DateTime.now().millisecondsSinceEpoch.toString(),
        name: name,
        email: email,
        phone: phone,
        avatarUrl: null,
        city: '',
        position: '',
        rating: 0.0,
      );
      
      await _saveUserToPrefs();
      setLoading(false);
      return true;
    } catch (e) {
      setError('Помилка реєстрації: ${e.toString()}');
      setLoading(false);
      return false;
    }
  }

  // Login with Google
  Future<bool> loginWithGoogle() async {
    setLoading(true);
    clearError();

    try {
      // Simulate Google Sign-In
      await Future.delayed(const Duration(seconds: 2));
      
      _user = UserModel(
        id: 'google_user',
        name: 'Google User',
        email: 'google.user@gmail.com',
        phone: '+380501234567',
        avatarUrl: 'https://via.placeholder.com/150',
        city: '',
        position: '',
        rating: 0.0,
      );
      
      await _saveUserToPrefs();
      setLoading(false);
      return true;
    } catch (e) {
      setError('Помилка входу через Google: ${e.toString()}');
      setLoading(false);
      return false;
    }
  }

  // Login with Facebook
  Future<bool> loginWithFacebook() async {
    setLoading(true);
    clearError();

    try {
      // Simulate Facebook Sign-In
      await Future.delayed(const Duration(seconds: 2));
      
      _user = UserModel(
        id: 'facebook_user',
        name: 'Facebook User',
        email: 'facebook.user@facebook.com',
        phone: '+380501234567',
        avatarUrl: 'https://via.placeholder.com/150',
        city: '',
        position: '',
        rating: 0.0,
      );
      
      await _saveUserToPrefs();
      setLoading(false);
      return true;
    } catch (e) {
      setError('Помилка входу через Facebook: ${e.toString()}');
      setLoading(false);
      return false;
    }
  }

  // Complete profile creation
  Future<bool> completeProfile({
    required String city,
    required String position,
    String? avatarUrl,
  }) async {
    if (_user == null) return false;

    setLoading(true);
    clearError();

    try {
      // Simulate API call
      await Future.delayed(const Duration(seconds: 1));
      
      _user = _user!.copyWith(
        city: city,
        position: position,
        avatarUrl: avatarUrl,
        rating: 1.0, // Starting rating
      );
      
      await _saveUserToPrefs();
      setLoading(false);
      return true;
    } catch (e) {
      setError('Помилка створення профілю: ${e.toString()}');
      setLoading(false);
      return false;
    }
  }

  // Logout
  Future<void> logout() async {
    _user = null;
    final prefs = await SharedPreferences.getInstance();
    await prefs.clear();
    notifyListeners();
  }

  // Load user from SharedPreferences
  Future<void> loadUserFromPrefs() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final userId = prefs.getString('user_id');
      final userName = prefs.getString('user_name');
      final userEmail = prefs.getString('user_email');
      final userPhone = prefs.getString('user_phone');
      final userCity = prefs.getString('user_city');
      final userPosition = prefs.getString('user_position');
      final userAvatarUrl = prefs.getString('user_avatar_url');
      final userRating = prefs.getDouble('user_rating');

      if (userId != null && userName != null) {
        _user = UserModel(
          id: userId,
          name: userName,
          email: userEmail ?? '',
          phone: userPhone ?? '',
          city: userCity ?? '',
          position: userPosition ?? '',
          avatarUrl: userAvatarUrl,
          rating: userRating ?? 0.0,
        );
        notifyListeners();
      }
    } catch (e) {
      debugPrint('Error loading user from prefs: $e');
    }
  }

  // Save user to SharedPreferences
  Future<void> _saveUserToPrefs() async {
    if (_user == null) return;

    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('user_id', _user!.id);
      await prefs.setString('user_name', _user!.name);
      await prefs.setString('user_email', _user!.email);
      await prefs.setString('user_phone', _user!.phone);
      await prefs.setString('user_city', _user!.city);
      await prefs.setString('user_position', _user!.position);
      if (_user!.avatarUrl != null) {
        await prefs.setString('user_avatar_url', _user!.avatarUrl!);
      }
      await prefs.setDouble('user_rating', _user!.rating);
    } catch (e) {
      debugPrint('Error saving user to prefs: $e');
    }
  }
}
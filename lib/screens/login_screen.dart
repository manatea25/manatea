import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:provider/provider.dart';
import '../utils/app_colors.dart';
import '../widgets/animated_button.dart';
import '../widgets/custom_text_field.dart';
import '../widgets/social_login_button.dart';
import '../widgets/loading_overlay.dart';
import '../providers/auth_provider.dart';
import 'mode_selection_screen.dart';
import 'profile_creation_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _obscurePassword = true;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _showError(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: Colors.red,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
        ),
      ),
    );
  }

  void _navigateAfterLogin() {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    final user = authProvider.user;
    
    if (user != null && (user.city.isEmpty || user.position.isEmpty)) {
      // Navigate to profile creation if profile is incomplete
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (context) => const ProfileCreationScreen()),
      );
    } else {
      // Navigate to mode selection if profile is complete
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (context) => const ModeSelectionScreen()),
      );
    }
  }

  Future<void> _handleLogin() async {
    if (!_formKey.currentState!.validate()) return;

    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    final success = await authProvider.loginWithEmailPassword(
      _emailController.text.trim(),
      _passwordController.text.trim(),
    );

    if (success) {
      _navigateAfterLogin();
    } else {
      _showError(authProvider.error ?? 'Помилка входу');
    }
  }

  Future<void> _handleGoogleLogin() async {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    final success = await authProvider.loginWithGoogle();

    if (success) {
      _navigateAfterLogin();
    } else {
      _showError(authProvider.error ?? 'Помилка входу через Google');
    }
  }

  Future<void> _handleFacebookLogin() async {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    final success = await authProvider.loginWithFacebook();

    if (success) {
      _navigateAfterLogin();
    } else {
      _showError(authProvider.error ?? 'Помилка входу через Facebook');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: AppColors.primaryGradient,
        ),
        child: SafeArea(
          child: Consumer<AuthProvider>(
            builder: (context, authProvider, child) {
              return LoadingOverlay(
                isLoading: authProvider.isLoading,
                child: SingleChildScrollView(
                  padding: const EdgeInsets.all(20),
                  child: SizedBox(
                    height: MediaQuery.of(context).size.height - 
                           MediaQuery.of(context).padding.top - 40,
                    child: Column(
                      children: [
                        // Back button
                        Align(
                          alignment: Alignment.centerLeft,
                          child: AnimatedButton(
                            onPressed: () => Navigator.of(context).pop(),
                            child: Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 12,
                                vertical: 8,
                              ),
                              decoration: BoxDecoration(
                                color: AppColors.transparentWhite,
                                borderRadius: BorderRadius.circular(20),
                              ),
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  const Icon(
                                    Icons.arrow_back,
                                    color: Colors.white,
                                    size: 18,
                                  ),
                                  const SizedBox(width: 8),
                                  Text(
                                    'Назад',
                                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                      color: Colors.white,
                                      fontWeight: FontWeight.w500,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),

                        const Spacer(),

                        // Header
                        Column(
                          children: [
                            Text(
                              'Вхід до FLAP',
                              style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                                fontSize: 24,
                                fontWeight: FontWeight.w700,
                                color: Colors.white,
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              'Увійдіть до своєї футбольної спільноти',
                              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                fontSize: 14,
                                color: AppColors.transparentWhite,
                              ),
                            ),
                          ],
                        ),

                        const SizedBox(height: 30),

                        // Login form
                        Form(
                          key: _formKey,
                          child: Column(
                            children: [
                              // Email/Phone field
                              CustomTextField(
                                controller: _emailController,
                                label: 'Email або телефон',
                                hint: 'Введіть email або номер телефону',
                                keyboardType: TextInputType.emailAddress,
                                validator: (value) {
                                  if (value == null || value.isEmpty) {
                                    return 'Це поле обов\'язкове';
                                  }
                                  return null;
                                },
                              ),

                              const SizedBox(height: 20),

                              // Password field
                              CustomTextField(
                                controller: _passwordController,
                                label: 'Пароль',
                                hint: 'Введіть пароль',
                                obscureText: _obscurePassword,
                                suffixIcon: IconButton(
                                  icon: Icon(
                                    _obscurePassword
                                        ? Icons.visibility_off
                                        : Icons.visibility,
                                    color: AppColors.transparentWhite,
                                  ),
                                  onPressed: () {
                                    setState(() {
                                      _obscurePassword = !_obscurePassword;
                                    });
                                  },
                                ),
                                validator: (value) {
                                  if (value == null || value.isEmpty) {
                                    return 'Це поле обов\'язкове';
                                  }
                                  return null;
                                },
                              ),

                              const SizedBox(height: 30),

                              // Login button
                              SizedBox(
                                width: double.infinity,
                                child: AnimatedButton(
                                  onPressed: _handleLogin,
                                  child: Container(
                                    padding: const EdgeInsets.symmetric(vertical: 15),
                                    decoration: BoxDecoration(
                                      gradient: AppColors.buttonGradient,
                                      borderRadius: BorderRadius.circular(25),
                                      boxShadow: [
                                        BoxShadow(
                                          color: AppColors.lightGreen.withOpacity(0.6),
                                          blurRadius: 8,
                                          offset: const Offset(0, 4),
                                        ),
                                      ],
                                    ),
                                    child: Text(
                                      'Увійти',
                                      textAlign: TextAlign.center,
                                      style: Theme.of(context).textTheme.labelLarge?.copyWith(
                                        fontSize: 16,
                                        fontWeight: FontWeight.w700,
                                        color: Colors.white,
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),

                        const SizedBox(height: 20),

                        // Social login buttons
                        Column(
                          children: [
                            SocialLoginButton(
                              onPressed: _handleGoogleLogin,
                              icon: FontAwesomeIcons.google,
                              text: 'Увійти через Google',
                            ),
                            const SizedBox(height: 10),
                            SocialLoginButton(
                              onPressed: _handleFacebookLogin,
                              icon: FontAwesomeIcons.facebookF,
                              text: 'Увійти через Facebook',
                            ),
                          ],
                        ),

                        const Spacer(),
                      ],
                    ),
                  ),
                ),
              );
            },
          ),
        ),
      ),
    );
  }
}
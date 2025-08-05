import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:provider/provider.dart';
import '../utils/app_colors.dart';
import '../widgets/animated_button.dart';
import '../widgets/custom_text_field.dart';
import '../widgets/social_login_button.dart';
import '../widgets/loading_overlay.dart';
import '../providers/auth_provider.dart';
import 'profile_creation_screen.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _phoneController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _obscurePassword = true;

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
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

  Future<void> _handleRegister() async {
    if (!_formKey.currentState!.validate()) return;

    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    final success = await authProvider.register(
      name: _nameController.text.trim(),
      email: _emailController.text.trim(),
      phone: _phoneController.text.trim(),
      password: _passwordController.text.trim(),
    );

    if (success) {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (context) => const ProfileCreationScreen()),
      );
    } else {
      _showError(authProvider.error ?? 'Помилка реєстрації');
    }
  }

  Future<void> _handleGoogleRegister() async {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    final success = await authProvider.loginWithGoogle();

    if (success) {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (context) => const ProfileCreationScreen()),
      );
    } else {
      _showError(authProvider.error ?? 'Помилка реєстрації через Google');
    }
  }

  Future<void> _handleFacebookRegister() async {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    final success = await authProvider.loginWithFacebook();

    if (success) {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (context) => const ProfileCreationScreen()),
      );
    } else {
      _showError(authProvider.error ?? 'Помилка реєстрації через Facebook');
    }
  }

  String? _validateEmail(String? value) {
    if (value == null || value.isEmpty) {
      return 'Це поле обов\'язкове';
    }
    if (!RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$').hasMatch(value)) {
      return 'Введіть правильний email';
    }
    return null;
  }

  String? _validatePhone(String? value) {
    if (value == null || value.isEmpty) {
      return 'Це поле обов\'язкове';
    }
    if (!RegExp(r'^\+380\d{9}$').hasMatch(value)) {
      return 'Введіть номер у форматі +380XXXXXXXXX';
    }
    return null;
  }

  String? _validatePassword(String? value) {
    if (value == null || value.isEmpty) {
      return 'Це поле обов\'язкове';
    }
    if (value.length < 6) {
      return 'Пароль повинен містити мінімум 6 символів';
    }
    return null;
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

                        const SizedBox(height: 20),

                        // Header
                        Column(
                          children: [
                            Text(
                              'Реєстрація',
                              style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                                fontSize: 24,
                                fontWeight: FontWeight.w700,
                                color: Colors.white,
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              'Приєднуйтесь до футбольної спільноти',
                              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                fontSize: 14,
                                color: AppColors.transparentWhite,
                              ),
                            ),
                          ],
                        ),

                        const SizedBox(height: 30),

                        // Register form
                        Expanded(
                          child: Form(
                            key: _formKey,
                            child: Column(
                              children: [
                                // Name field
                                CustomTextField(
                                  controller: _nameController,
                                  label: 'Ім\'я',
                                  hint: 'Ваше повне ім\'я',
                                  keyboardType: TextInputType.name,
                                  validator: (value) {
                                    if (value == null || value.isEmpty) {
                                      return 'Це поле обов\'язкове';
                                    }
                                    return null;
                                  },
                                ),

                                const SizedBox(height: 20),

                                // Email field
                                CustomTextField(
                                  controller: _emailController,
                                  label: 'Email',
                                  hint: 'your@email.com',
                                  keyboardType: TextInputType.emailAddress,
                                  validator: _validateEmail,
                                ),

                                const SizedBox(height: 20),

                                // Phone field
                                CustomTextField(
                                  controller: _phoneController,
                                  label: 'Телефон',
                                  hint: '+380 XX XXX XX XX',
                                  keyboardType: TextInputType.phone,
                                  validator: _validatePhone,
                                ),

                                const SizedBox(height: 20),

                                // Password field
                                CustomTextField(
                                  controller: _passwordController,
                                  label: 'Пароль',
                                  hint: 'Створіть надійний пароль',
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
                                  validator: _validatePassword,
                                ),

                                const SizedBox(height: 30),

                                // Register button
                                SizedBox(
                                  width: double.infinity,
                                  child: AnimatedButton(
                                    onPressed: _handleRegister,
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
                                        'Зареєструватися',
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

                                const SizedBox(height: 20),

                                // Social register buttons
                                Column(
                                  children: [
                                    SocialLoginButton(
                                      onPressed: _handleGoogleRegister,
                                      icon: FontAwesomeIcons.google,
                                      text: 'Реєстрація через Google',
                                    ),
                                    const SizedBox(height: 10),
                                    SocialLoginButton(
                                      onPressed: _handleFacebookRegister,
                                      icon: FontAwesomeIcons.facebookF,
                                      text: 'Реєстрація через Facebook',
                                    ),
                                  ],
                                ),

                                const Spacer(),
                              ],
                            ),
                          ),
                        ),
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
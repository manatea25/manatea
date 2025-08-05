import 'dart:io';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:provider/provider.dart';
import 'package:image_picker/image_picker.dart';
import '../utils/app_colors.dart';
import '../widgets/animated_button.dart';
import '../widgets/custom_text_field.dart';
import '../widgets/loading_overlay.dart';
import '../providers/auth_provider.dart';
import 'mode_selection_screen.dart';

class ProfileCreationScreen extends StatefulWidget {
  const ProfileCreationScreen({super.key});

  @override
  State<ProfileCreationScreen> createState() => _ProfileCreationScreenState();
}

class _ProfileCreationScreenState extends State<ProfileCreationScreen> {
  final _formKey = GlobalKey<FormState>();
  final _cityController = TextEditingController();
  String _selectedPosition = '';
  File? _avatarImage;
  final ImagePicker _imagePicker = ImagePicker();

  final List<Map<String, String>> _positions = [
    {'value': 'goalkeeper', 'label': 'Воротар'},
    {'value': 'defender', 'label': 'Захисник'},
    {'value': 'midfielder', 'label': 'Півзахисник'},
    {'value': 'forward', 'label': 'Нападник'},
    {'value': 'universal', 'label': 'Універсал'},
  ];

  @override
  void dispose() {
    _cityController.dispose();
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

  Future<void> _pickImage() async {
    try {
      final XFile? image = await _imagePicker.pickImage(
        source: ImageSource.gallery,
        maxWidth: 512,
        maxHeight: 512,
        imageQuality: 80,
      );
      
      if (image != null) {
        setState(() {
          _avatarImage = File(image.path);
        });
      }
    } catch (e) {
      _showError('Помилка завантаження фото: ${e.toString()}');
    }
  }

  Future<void> _handleProfileCreation() async {
    if (!_formKey.currentState!.validate()) return;
    
    if (_selectedPosition.isEmpty) {
      _showError('Оберіть позицію на полі');
      return;
    }

    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    final success = await authProvider.completeProfile(
      city: _cityController.text.trim(),
      position: _selectedPosition,
      avatarUrl: _avatarImage?.path, // In real app, upload to server first
    );

    if (success) {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (context) => const ModeSelectionScreen()),
      );
    } else {
      _showError(authProvider.error ?? 'Помилка створення профілю');
    }
  }

  Widget _buildAvatarSection() {
    return Column(
      children: [
        GestureDetector(
          onTap: _pickImage,
          child: Container(
            width: 100,
            height: 100,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              gradient: _avatarImage == null 
                  ? AppColors.buttonGradient
                  : null,
              border: Border.all(
                color: AppColors.formBorder,
                width: 4,
              ),
              image: _avatarImage != null
                  ? DecorationImage(
                      image: FileImage(_avatarImage!),
                      fit: BoxFit.cover,
                    )
                  : null,
            ),
            child: _avatarImage == null
                ? const Icon(
                    FontAwesomeIcons.camera,
                    color: Colors.white,
                    size: 40,
                  )
                : null,
          ),
        ),
        const SizedBox(height: 15),
        AnimatedButton(
          onPressed: _pickImage,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            decoration: BoxDecoration(
              color: AppColors.formBackground,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(
                color: AppColors.formBorder,
                width: 2,
              ),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(
                  FontAwesomeIcons.upload,
                  color: Colors.white,
                  size: 12,
                ),
                const SizedBox(width: 8),
                Text(
                  'Завантажити фото',
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: Colors.white,
                    fontSize: 12,
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildPositionSelector() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Позиція на полі',
          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
            fontWeight: FontWeight.w600,
            color: AppColors.semiTransparentWhite,
            fontSize: 14,
          ),
        ),
        const SizedBox(height: 8),
        Container(
          width: double.infinity,
          padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 4),
          decoration: BoxDecoration(
            color: AppColors.formBackground,
            borderRadius: BorderRadius.circular(15),
            border: Border.all(
              color: AppColors.formBorder,
              width: 2,
            ),
          ),
          child: DropdownButtonHideUnderline(
            child: DropdownButton<String>(
              value: _selectedPosition.isEmpty ? null : _selectedPosition,
              hint: Text(
                'Оберіть позицію',
                style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  color: AppColors.transparentWhite,
                  fontSize: 16,
                ),
              ),
              dropdownColor: AppColors.secondaryGreen,
              style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                color: Colors.white,
                fontSize: 16,
              ),
              icon: const Icon(
                Icons.keyboard_arrow_down,
                color: Colors.white,
              ),
              items: _positions.map((position) {
                return DropdownMenuItem<String>(
                  value: position['value'],
                  child: Text(position['label']!),
                );
              }).toList(),
              onChanged: (String? value) {
                setState(() {
                  _selectedPosition = value ?? '';
                });
              },
            ),
          ),
        ),
      ],
    );
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
                        const SizedBox(height: 20),

                        // Header
                        Column(
                          children: [
                            Text(
                              'Створення профілю',
                              style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                                fontSize: 24,
                                fontWeight: FontWeight.w700,
                                color: Colors.white,
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              'Розкажіть про себе футбольній спільноті',
                              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                fontSize: 14,
                                color: AppColors.transparentWhite,
                              ),
                            ),
                          ],
                        ),

                        const SizedBox(height: 30),

                        // Avatar section
                        _buildAvatarSection(),

                        const SizedBox(height: 30),

                        // Profile form
                        Expanded(
                          child: Form(
                            key: _formKey,
                            child: Column(
                              children: [
                                // City field
                                CustomTextField(
                                  controller: _cityController,
                                  label: 'Місто',
                                  hint: 'Ваше місто',
                                  keyboardType: TextInputType.text,
                                  validator: (value) {
                                    if (value == null || value.isEmpty) {
                                      return 'Це поле обов\'язкове';
                                    }
                                    return null;
                                  },
                                ),

                                const SizedBox(height: 20),

                                // Position selector
                                _buildPositionSelector(),

                                const SizedBox(height: 40),

                                // Complete profile button
                                SizedBox(
                                  width: double.infinity,
                                  child: AnimatedButton(
                                    onPressed: _handleProfileCreation,
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
                                        'Завершити створення',
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
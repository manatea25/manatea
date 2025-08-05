import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:provider/provider.dart';
import '../utils/app_colors.dart';
import '../providers/auth_provider.dart';
import '../models/user_model.dart';

class ModeSelectionScreen extends StatefulWidget {
  const ModeSelectionScreen({super.key});

  @override
  State<ModeSelectionScreen> createState() => _ModeSelectionScreenState();
}

class _ModeSelectionScreenState extends State<ModeSelectionScreen>
    with TickerProviderStateMixin {
  late AnimationController _headerController;
  late AnimationController _modesController;
  late Animation<double> _headerAnimation;
  late Animation<double> _modesAnimation;

  @override
  void initState() {
    super.initState();
    
    _headerController = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );
    
    _modesController = AnimationController(
      duration: const Duration(milliseconds: 1200),
      vsync: this,
    );

    _headerAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _headerController,
      curve: Curves.easeOutBack,
    ));

    _modesAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _modesController,
      curve: Curves.easeOutExpo,
    ));

    // Start animations
    _headerController.forward();
    Future.delayed(const Duration(milliseconds: 300), () {
      _modesController.forward();
    });
  }

  @override
  void dispose() {
    _headerController.dispose();
    _modesController.dispose();
    super.dispose();
  }

  void _onVideoModeSelected() {
    // Navigate to video mode (placeholder for now)
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('🎥 Відео режим - у розробці!'),
        backgroundColor: AppColors.videoRed,
      ),
    );
  }

  void _onMatchModeSelected() {
    // Navigate to match mode (placeholder for now)
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('⚽ Режим матчів - у розробці!'),
        backgroundColor: AppColors.lightGreen,
      ),
    );
  }

  Widget _buildUserHeader(UserModel user) {
    return AnimatedBuilder(
      animation: _headerAnimation,
      builder: (context, child) {
        return Opacity(
          opacity: _headerAnimation.value,
          child: Transform.translate(
            offset: Offset(0, -30 * (1 - _headerAnimation.value)),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 16),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [
                    AppColors.lightGreen.withOpacity(0.15),
                    AppColors.primaryGreen.withOpacity(0.1),
                  ],
                ),
                border: Border(
                  bottom: BorderSide(
                    color: Colors.white.withOpacity(0.1),
                    width: 1,
                  ),
                ),
              ),
              child: Row(
                children: [
                  // User avatar
                  Container(
                    width: 60,
                    height: 60,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      gradient: AppColors.buttonGradient,
                      border: Border.all(
                        color: Colors.white.withOpacity(0.2),
                        width: 3,
                      ),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.2),
                          blurRadius: 8,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    child: user.avatarUrl != null
                        ? ClipOval(
                            child: Image.network(
                              user.avatarUrl!,
                              fit: BoxFit.cover,
                              errorBuilder: (context, error, stackTrace) {
                                return _buildAvatarFallback(user.name);
                              },
                            ),
                          )
                        : _buildAvatarFallback(user.name),
                  ),
                  
                  const SizedBox(width: 20),
                  
                  // User info
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Привіт, ${user.name.split(' ').first}!',
                          style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                            fontSize: 22,
                            fontWeight: FontWeight.w800,
                            color: Colors.white,
                            shadows: [
                              Shadow(
                                color: Colors.black.withOpacity(0.3),
                                offset: const Offset(0, 2),
                                blurRadius: 8,
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 4),
                        Row(
                          children: [
                            Icon(
                              Icons.star,
                              color: AppColors.gold,
                              size: 16,
                            ),
                            const SizedBox(width: 6),
                            Text(
                              'Рейтинг: ${user.rating.toStringAsFixed(1)}',
                              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                fontSize: 14,
                                color: Colors.white.withOpacity(0.9),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 6),
                        Text(
                          'Оберіть режим гри',
                          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                            fontSize: 16,
                            fontWeight: FontWeight.w600,
                            color: Colors.white.withOpacity(0.8),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildAvatarFallback(String name) {
    return Center(
      child: Text(
        name.isNotEmpty ? name[0].toUpperCase() : 'U',
        style: const TextStyle(
          fontSize: 24,
          fontWeight: FontWeight.w800,
          color: Colors.white,
        ),
      ),
    );
  }

  Widget _buildModeSection({
    required String title,
    required String description,
    required IconData icon,
    required List<Map<String, dynamic>> functions,
    required Gradient gradient,
    required VoidCallback onTap,
    required bool isLeft,
  }) {
    return AnimatedBuilder(
      animation: _modesAnimation,
      builder: (context, child) {
        return Opacity(
          opacity: _modesAnimation.value,
          child: Transform.scale(
            scale: 0.8 + (0.2 * _modesAnimation.value),
            child: GestureDetector(
              onTap: onTap,
              child: Container(
                decoration: BoxDecoration(
                  gradient: gradient,
                ),
                child: Stack(
                  children: [
                    // Background overlay
                    Container(
                      decoration: BoxDecoration(
                        color: Colors.black.withOpacity(0.1),
                      ),
                    ),
                    
                    // Content
                    Padding(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 30,
                        vertical: 40,
                      ),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          // Icon
                          Container(
                            padding: const EdgeInsets.all(20),
                            decoration: BoxDecoration(
                              color: Colors.white.withOpacity(0.2),
                              shape: BoxShape.circle,
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.black.withOpacity(0.4),
                                  blurRadius: 15,
                                  offset: const Offset(0, 6),
                                ),
                              ],
                            ),
                            child: Icon(
                              icon,
                              size: 80,
                              color: Colors.white,
                            ),
                          ),
                          
                          const SizedBox(height: 20),
                          
                          // Title
                          Text(
                            title,
                            style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                              fontSize: 32,
                              fontWeight: FontWeight.w900,
                              color: Colors.white,
                              letterSpacing: 1,
                              shadows: [
                                Shadow(
                                  color: Colors.black.withOpacity(0.4),
                                  offset: const Offset(0, 3),
                                  blurRadius: 15,
                                ),
                              ],
                            ),
                          ),
                          
                          const SizedBox(height: 16),
                          
                          // Description
                          Text(
                            description,
                            textAlign: TextAlign.center,
                            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                              fontSize: 16,
                              color: Colors.white.withOpacity(0.95),
                              height: 1.5,
                            ),
                          ),
                          
                          const SizedBox(height: 20),
                          
                          // Function icons
                          Wrap(
                            spacing: 20,
                            runSpacing: 20,
                            alignment: WrapAlignment.center,
                            children: functions.map((function) {
                              return Column(
                                children: [
                                  Container(
                                    padding: const EdgeInsets.all(8),
                                    decoration: BoxDecoration(
                                      color: Colors.white.withOpacity(0.2),
                                      borderRadius: BorderRadius.circular(10),
                                    ),
                                    child: Icon(
                                      function['icon'] as IconData,
                                      size: 20,
                                      color: Colors.white.withOpacity(0.9),
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  SizedBox(
                                    width: 60,
                                    child: Text(
                                      function['label'] as String,
                                      textAlign: TextAlign.center,
                                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                        fontSize: 11,
                                        color: Colors.white.withOpacity(0.8),
                                        height: 1.2,
                                      ),
                                    ),
                                  ),
                                ],
                              );
                            }).toList(),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              Color(0xFF667eea),
              Color(0xFF764ba2),
            ],
          ),
        ),
        child: SafeArea(
          child: Consumer<AuthProvider>(
            builder: (context, authProvider, child) {
              final user = authProvider.user;
              if (user == null) {
                return const Center(
                  child: CircularProgressIndicator(
                    color: AppColors.lightGreen,
                  ),
                );
              }

              return Column(
                children: [
                  // User header
                  _buildUserHeader(user),
                  
                  // Mode sections
                  Expanded(
                    child: Row(
                      children: [
                        // Video Mode
                        Expanded(
                          child: _buildModeSection(
                            title: 'ВІДЕО',
                            description: 'Завантажуйте відео\nУчаствуйте в челенджах\nГолосуйте за інших',
                            icon: FontAwesomeIcons.video,
                            gradient: AppColors.videoModeGradient,
                            onTap: _onVideoModeSelected,
                            isLeft: true,
                            functions: [
                              {
                                'icon': FontAwesomeIcons.upload,
                                'label': 'Завантажити'
                              },
                              {
                                'icon': FontAwesomeIcons.trophy,
                                'label': 'Челенджі'
                              },
                              {
                                'icon': FontAwesomeIcons.star,
                                'label': 'Голосувати'
                              },
                              {
                                'icon': FontAwesomeIcons.eye,
                                'label': 'Переглядати'
                              },
                            ],
                          ),
                        ),
                        
                        // Match Mode
                        Expanded(
                          child: _buildModeSection(
                            title: 'МАТЧІ',
                            description: 'Створюйте матчі\nШукайте гравців\nГрайте разом',
                            icon: FontAwesomeIcons.futbol,
                            gradient: AppColors.matchModeGradient,
                            onTap: _onMatchModeSelected,
                            isLeft: false,
                            functions: [
                              {
                                'icon': FontAwesomeIcons.plus,
                                'label': 'Створити'
                              },
                              {
                                'icon': FontAwesomeIcons.search,
                                'label': 'Знайти'
                              },
                              {
                                'icon': FontAwesomeIcons.users,
                                'label': 'Команди'
                              },
                              {
                                'icon': FontAwesomeIcons.mapMarkerAlt,
                                'label': 'Локація'
                              },
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              );
            },
          ),
        ),
      ),
    );
  }
}
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../utils/app_colors.dart';
import '../widgets/animated_button.dart';
import 'login_screen.dart';
import 'register_screen.dart';

class WelcomeScreen extends StatefulWidget {
  const WelcomeScreen({super.key});

  @override
  State<WelcomeScreen> createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen>
    with TickerProviderStateMixin {
  late AnimationController _logoController;
  late AnimationController _contentController;
  late Animation<double> _logoAnimation;
  late Animation<double> _contentAnimation;

  @override
  void initState() {
    super.initState();
    
    _logoController = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    );
    
    _contentController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );

    _logoAnimation = Tween<double>(
      begin: 0.8,
      end: 1.05,
    ).animate(CurvedAnimation(
      parent: _logoController,
      curve: Curves.easeInOut,
    ));

    _contentAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _contentController,
      curve: Curves.easeOutBack,
    ));

    // Start animations
    _logoController.repeat(reverse: true);
    _contentController.forward();
  }

  @override
  void dispose() {
    _logoController.dispose();
    _contentController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: AppColors.primaryGradient,
        ),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 40),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Spacer(),
                
                // Logo with animation
                AnimatedBuilder(
                  animation: _logoAnimation,
                  builder: (context, child) {
                    return Transform.scale(
                      scale: _logoAnimation.value,
                      child: Container(
                        width: 120,
                        height: 120,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(30),
                          border: Border.all(color: Colors.white, width: 4),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withOpacity(0.3),
                              blurRadius: 15,
                              offset: const Offset(0, 8),
                            ),
                          ],
                          gradient: const LinearGradient(
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                            colors: [
                              AppColors.lightGreen,
                              AppColors.accentGreen,
                            ],
                          ),
                        ),
                        child: const Icon(
                          FontAwesomeIcons.futbol,
                          size: 60,
                          color: Colors.white,
                        ),
                      ),
                    );
                  },
                ),
                
                const SizedBox(height: 30),
                
                // Title and subtitle with animation
                AnimatedBuilder(
                  animation: _contentAnimation,
                  builder: (context, child) {
                    return Opacity(
                      opacity: _contentAnimation.value,
                      child: Transform.translate(
                        offset: Offset(0, 20 * (1 - _contentAnimation.value)),
                        child: Column(
                          children: [
                            // Title
                            Text(
                              'FLAP',
                              style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                                fontSize: 32,
                                fontWeight: FontWeight.w800,
                                color: AppColors.whiteText,
                                shadows: [
                                  Shadow(
                                    color: Colors.black.withOpacity(0.3),
                                    offset: const Offset(2, 2),
                                    blurRadius: 8,
                                  ),
                                ],
                              ),
                            ),
                            
                            const SizedBox(height: 10),
                            
                            // Subtitle
                            Text(
                              'Feel Like A Pro\nТвоя футбольна соціальна мережа',
                              textAlign: TextAlign.center,
                              style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                                fontSize: 18,
                                color: AppColors.semiTransparentWhite,
                                height: 1.5,
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
                
                const SizedBox(height: 40),
                
                // Auth buttons with animation
                AnimatedBuilder(
                  animation: _contentAnimation,
                  builder: (context, child) {
                    return Opacity(
                      opacity: _contentAnimation.value,
                      child: Transform.translate(
                        offset: Offset(0, 30 * (1 - _contentAnimation.value)),
                        child: Column(
                          children: [
                            // Login button
                            SizedBox(
                              width: double.infinity,
                              child: AnimatedButton(
                                onPressed: () {
                                  Navigator.of(context).push(
                                    PageRouteBuilder(
                                      pageBuilder: (context, animation, secondaryAnimation) =>
                                          const LoginScreen(),
                                      transitionsBuilder: (context, animation, secondaryAnimation, child) {
                                        const begin = Offset(1.0, 0.0);
                                        const end = Offset.zero;
                                        const curve = Curves.easeInOut;
                                        
                                        var tween = Tween(begin: begin, end: end)
                                            .chain(CurveTween(curve: curve));
                                        
                                        return SlideTransition(
                                          position: animation.drive(tween),
                                          child: child,
                                        );
                                      },
                                      transitionDuration: const Duration(milliseconds: 300),
                                    ),
                                  );
                                },
                                child: Container(
                                  padding: const EdgeInsets.symmetric(vertical: 15),
                                  decoration: BoxDecoration(
                                    gradient: AppColors.buttonGradient,
                                    borderRadius: BorderRadius.circular(25),
                                    boxShadow: [
                                      BoxShadow(
                                        color: AppColors.lightGreen.withOpacity(0.4),
                                        blurRadius: 8,
                                        offset: const Offset(0, 4),
                                      ),
                                    ],
                                  ),
                                  child: Text(
                                    'УВІЙТИ',
                                    textAlign: TextAlign.center,
                                    style: Theme.of(context).textTheme.labelLarge?.copyWith(
                                      fontSize: 16,
                                      fontWeight: FontWeight.w700,
                                      color: Colors.white,
                                      letterSpacing: 1,
                                    ),
                                  ),
                                ),
                              ),
                            ),
                            
                            const SizedBox(height: 15),
                            
                            // Register button
                            SizedBox(
                              width: double.infinity,
                              child: AnimatedButton(
                                onPressed: () {
                                  Navigator.of(context).push(
                                    PageRouteBuilder(
                                      pageBuilder: (context, animation, secondaryAnimation) =>
                                          const RegisterScreen(),
                                      transitionsBuilder: (context, animation, secondaryAnimation, child) {
                                        const begin = Offset(1.0, 0.0);
                                        const end = Offset.zero;
                                        const curve = Curves.easeInOut;
                                        
                                        var tween = Tween(begin: begin, end: end)
                                            .chain(CurveTween(curve: curve));
                                        
                                        return SlideTransition(
                                          position: animation.drive(tween),
                                          child: child,
                                        );
                                      },
                                      transitionDuration: const Duration(milliseconds: 300),
                                    ),
                                  );
                                },
                                child: Container(
                                  padding: const EdgeInsets.symmetric(vertical: 15),
                                  decoration: BoxDecoration(
                                    color: AppColors.formBackground,
                                    borderRadius: BorderRadius.circular(25),
                                    border: Border.all(
                                      color: AppColors.formBorder,
                                      width: 2,
                                    ),
                                  ),
                                  child: Text(
                                    'РЕЄСТРАЦІЯ',
                                    textAlign: TextAlign.center,
                                    style: Theme.of(context).textTheme.labelLarge?.copyWith(
                                      fontSize: 16,
                                      fontWeight: FontWeight.w700,
                                      color: Colors.white,
                                      letterSpacing: 1,
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
                
                const Spacer(),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
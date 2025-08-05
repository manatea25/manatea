import 'package:flutter/material.dart';

class AppColors {
  // Primary gradient colors from HTML file
  static const Color primaryGreen = Color(0xFF1e7d32);
  static const Color secondaryGreen = Color(0xFF2e7d32);
  static const Color lightGreen = Color(0xFF4caf50);
  static const Color accentGreen = Color(0xFF66bb6a);
  
  // Accent colors
  static const Color orange = Color(0xFFff6b35);
  static const Color lightOrange = Color(0xFFf7931e);
  static const Color gold = Color(0xFFffd700);
  
  // Video mode colors
  static const Color videoRed = Color(0xFFff6b6b);
  static const Color videoOrange = Color(0xFFee5a24);
  
  // Background gradients
  static const LinearGradient primaryGradient = LinearGradient(
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
    colors: [primaryGreen, secondaryGreen],
  );
  
  static const LinearGradient buttonGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [lightGreen, accentGreen],
  );
  
  static const LinearGradient videoModeGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [videoRed, videoOrange],
  );
  
  static const LinearGradient matchModeGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [lightGreen, primaryGreen],
  );
  
  // Text colors
  static const Color whiteText = Colors.white;
  static const Color lightWhiteText = Color(0xFFFFFFFF);
  static const Color transparentWhite = Color(0x80FFFFFF);
  static const Color semiTransparentWhite = Color(0xCCFFFFFF);
  
  // Form colors
  static const Color formBorder = Color(0x4DFFFFFF);
  static const Color formBackground = Color(0x1AFFFFFF);
  static const Color formFocusedBorder = lightGreen;
  
  // Shadow colors
  static const Color shadowColor = Color(0x4D000000);
  static const Color lightShadow = Color(0x26000000);
}
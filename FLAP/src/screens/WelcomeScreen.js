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

const styles = StyleSheet.create({
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

export default WelcomeScreen;
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, INITIAL_COINS } from '../constants';

const Header = () => {
  // Mock user data - in real app, get from context/state
  const userData = {
    name: 'Олександр Петренко',
    position: 'Півзахисник',
    city: 'Київ',
    rating: 4.2,
    coins: INITIAL_COINS,
    initials: 'ОП',
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
      stars += '⭐';
    }
    if (hasHalfStar) {
      stars += '⭐';
    }
    for (let i = 0; i < emptyStars; i++) {
      stars += '☆';
    }
    return stars;
  };

  const getAvatarColor = (name) => {
    const colors = [
      COLORS.PRIMARY_GREEN,
      COLORS.ORANGE,
      COLORS.DARK_BLUE,
      '#9C27B0',
      '#F44336',
      '#FF5722',
      '#795548',
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={[COLORS.PRIMARY_GREEN, COLORS.DARK_GREEN]}
        style={styles.container}
      >
        {/* Top Bar */}
        <View style={styles.topBar}>
          <Text style={styles.appTitle}>FLAP</Text>
          <View style={styles.coinsContainer}>
            <Text style={styles.coinsText}>💰 {userData.coins}</Text>
          </View>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <View style={[styles.avatar, { backgroundColor: getAvatarColor(userData.name) }]}>
              <Text style={styles.avatarText}>{userData.initials}</Text>
            </View>
            
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{userData.name}</Text>
              <Text style={styles.userLocation}>
                {userData.position} • {userData.city}
              </Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.stars}>{renderStars(userData.rating)}</Text>
                <Text style={styles.ratingNumber}>{userData.rating}</Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.PRIMARY_GREEN,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  appTitle: {
    fontSize: FONTS.SIZES.XLARGE,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    letterSpacing: 2,
  },
  coinsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  coinsText: {
    color: COLORS.WHITE,
    fontSize: FONTS.SIZES.MEDIUM,
    fontWeight: 'bold',
  },
  profileCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 2,
    borderColor: COLORS.WHITE,
  },
  avatarText: {
    fontSize: FONTS.SIZES.LARGE,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: FONTS.SIZES.LARGE,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    marginBottom: 4,
  },
  userLocation: {
    fontSize: FONTS.SIZES.MEDIUM,
    color: COLORS.WHITE,
    opacity: 0.9,
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    fontSize: FONTS.SIZES.MEDIUM,
    marginRight: 8,
  },
  ratingNumber: {
    fontSize: FONTS.SIZES.MEDIUM,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
});

export default Header;
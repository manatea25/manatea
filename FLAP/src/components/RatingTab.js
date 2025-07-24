import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import { COLORS, FONTS } from '../constants';

const RatingTab = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // Mock players data
  const players = [
    {
      id: 1,
      name: 'Олександр Петренко',
      position: 'Півзахисник',
      city: 'Київ',
      rating: 4.8,
      matchesPlayed: 45,
      wins: 32,
      winrate: 71,
      avatar: '⚽',
      rank: 1,
    },
    {
      id: 2,
      name: 'Сергій Коваленко',
      position: 'Нападник',
      city: 'Львів',
      rating: 4.7,
      matchesPlayed: 38,
      wins: 26,
      winrate: 68,
      avatar: '🎯',
      rank: 2,
    },
    {
      id: 3,
      name: 'Марко Іваненко',
      position: 'Захисник',
      city: 'Одеса',
      rating: 4.6,
      matchesPlayed: 52,
      wins: 34,
      winrate: 65,
      avatar: '🛡️',
      rank: 3,
    },
    {
      id: 4,
      name: 'Андрій Мельник',
      position: 'Воротар',
      city: 'Харків',
      rating: 4.5,
      matchesPlayed: 41,
      wins: 28,
      winrate: 68,
      avatar: '🥅',
      rank: 4,
    },
    {
      id: 5,
      name: 'Іван Сидоренко',
      position: 'Півзахисник',
      city: 'Дніпро',
      rating: 4.4,
      matchesPlayed: 33,
      wins: 21,
      winrate: 64,
      avatar: '⚡',
      rank: 5,
    },
    {
      id: 6,
      name: 'Петро Бондаренко',
      position: 'Нападник',
      city: 'Київ',
      rating: 4.3,
      matchesPlayed: 29,
      wins: 18,
      winrate: 62,
      avatar: '🚀',
      rank: 6,
    },
    {
      id: 7,
      name: 'Максим Ткаченко',
      position: 'Захисник',
      city: 'Запоріжжя',
      rating: 4.2,
      matchesPlayed: 36,
      wins: 22,
      winrate: 61,
      avatar: '💪',
      rank: 7,
    },
    {
      id: 8,
      name: 'Артем Волошин',
      position: 'Універсал',
      city: 'Вінниця',
      rating: 4.1,
      matchesPlayed: 27,
      wins: 16,
      winrate: 59,
      avatar: '⭐',
      rank: 8,
    },
  ];

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

  const getRankColor = (rank) => {
    if (rank === 1) return COLORS.GOLD;
    if (rank === 2) return COLORS.SILVER;
    if (rank === 3) return COLORS.BRONZE;
    return COLORS.GRAY_MEDIUM;
  };

  const getRankEmoji = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
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

  const handleAddFriend = (playerId) => {
    // Mock add friend functionality
    Alert.alert('Друзі', 'Запит на дружбу надіслано!');
  };

  const renderPlayer = ({ item }) => (
    <TouchableOpacity
      style={styles.playerCard}
      onPress={() => setSelectedPlayer(item)}
    >
      <View style={styles.rankContainer}>
        <View style={[styles.rankBadge, { backgroundColor: getRankColor(item.rank) }]}>
          <Text style={styles.rankText}>{getRankEmoji(item.rank)}</Text>
        </View>
      </View>

      <View style={[styles.avatar, { backgroundColor: getAvatarColor(item.name) }]}>
        <Text style={styles.avatarEmoji}>{item.avatar}</Text>
      </View>

      <View style={styles.playerInfo}>
        <Text style={styles.playerName}>{item.name}</Text>
        <Text style={styles.playerLocation}>
          {item.position} • {item.city}
        </Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.stars}>{renderStars(item.rating)}</Text>
          <Text style={styles.ratingNumber}>{item.rating}</Text>
        </View>
        <Text style={styles.matchesCount}>
          Матчів зіграно: {item.matchesPlayed}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.addFriendButton}
        onPress={() => handleAddFriend(item.id)}
      >
        <Text style={styles.addFriendText}>➕ Друг</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderPlayerProfile = () => {
    if (!selectedPlayer) return null;

    return (
      <Modal
        visible={!!selectedPlayer}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedPlayer(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.profileModal}>
            <ScrollView>
              {/* Profile Header */}
              <View style={styles.profileHeader}>
                <View style={[styles.profileAvatar, { backgroundColor: getAvatarColor(selectedPlayer.name) }]}>
                  <Text style={styles.profileAvatarEmoji}>{selectedPlayer.avatar}</Text>
                </View>
                <Text style={styles.profileName}>{selectedPlayer.name}</Text>
                <Text style={styles.profileLocation}>
                  {selectedPlayer.position} • {selectedPlayer.city}
                </Text>
                <View style={styles.profileRating}>
                  <Text style={styles.profileStars}>{renderStars(selectedPlayer.rating)}</Text>
                  <Text style={styles.profileRatingNumber}>{selectedPlayer.rating}</Text>
                </View>
              </View>

              {/* Statistics */}
              <View style={styles.statsContainer}>
                <Text style={styles.statsTitle}>Статистика</Text>
                
                <View style={styles.statsGrid}>
                  <View style={styles.statCard}>
                    <Text style={styles.statNumber}>{selectedPlayer.matchesPlayed}</Text>
                    <Text style={styles.statLabel}>Зіграно матчів</Text>
                  </View>
                  
                  <View style={styles.statCard}>
                    <Text style={styles.statNumber}>{selectedPlayer.wins}</Text>
                    <Text style={styles.statLabel}>Перемог</Text>
                  </View>
                  
                  <View style={styles.statCard}>
                    <Text style={styles.statNumber}>{selectedPlayer.winrate}%</Text>
                    <Text style={styles.statLabel}>Винрейт</Text>
                  </View>
                  
                  <View style={styles.statCard}>
                    <Text style={styles.statNumber}>{getRankEmoji(selectedPlayer.rank)}</Text>
                    <Text style={styles.statLabel}>Позиція в рейтингу</Text>
                  </View>
                </View>
              </View>

              {/* Action Button */}
              <TouchableOpacity
                style={styles.addFriendButtonLarge}
                onPress={() => handleAddFriend(selectedPlayer.id)}
              >
                <Text style={styles.addFriendButtonLargeText}>Додати в друзі</Text>
              </TouchableOpacity>
            </ScrollView>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedPlayer(null)}
            >
              <Text style={styles.closeButtonText}>Закрити</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>👑 Рейтинг гравців</Text>
        <Text style={styles.headerSubtitle}>
          Топ футболістів за оцінками спільноти
        </Text>
      </View>

      {/* Players List */}
      <FlatList
        data={players}
        renderItem={renderPlayer}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.playersList}
        showsVerticalScrollIndicator={false}
      />

      {renderPlayerProfile()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GRAY_LIGHT,
  },
  header: {
    backgroundColor: COLORS.WHITE,
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_LIGHT,
  },
  headerTitle: {
    fontSize: FONTS.SIZES.XLARGE,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: FONTS.SIZES.MEDIUM,
    color: COLORS.GRAY_DARK,
    textAlign: 'center',
  },
  playersList: {
    padding: 15,
  },
  playerCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  rankContainer: {
    marginRight: 15,
  },
  rankBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankText: {
    fontSize: FONTS.SIZES.MEDIUM,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 2,
    borderColor: COLORS.WHITE,
  },
  avatarEmoji: {
    fontSize: 24,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: FONTS.SIZES.LARGE,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginBottom: 4,
  },
  playerLocation: {
    fontSize: FONTS.SIZES.MEDIUM,
    color: COLORS.GRAY_DARK,
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  stars: {
    fontSize: FONTS.SIZES.MEDIUM,
    marginRight: 8,
  },
  ratingNumber: {
    fontSize: FONTS.SIZES.MEDIUM,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_GREEN,
  },
  matchesCount: {
    fontSize: FONTS.SIZES.SMALL,
    color: COLORS.GRAY_DARK,
  },
  addFriendButton: {
    backgroundColor: COLORS.PRIMARY_GREEN,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  addFriendText: {
    color: COLORS.WHITE,
    fontSize: FONTS.SIZES.SMALL,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileModal: {
    backgroundColor: COLORS.WHITE,
    margin: 20,
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 3,
    borderColor: COLORS.WHITE,
    elevation: 3,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  profileAvatarEmoji: {
    fontSize: 40,
  },
  profileName: {
    fontSize: FONTS.SIZES.XXLARGE,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginBottom: 8,
    textAlign: 'center',
  },
  profileLocation: {
    fontSize: FONTS.SIZES.LARGE,
    color: COLORS.GRAY_DARK,
    marginBottom: 15,
    textAlign: 'center',
  },
  profileRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileStars: {
    fontSize: FONTS.SIZES.LARGE,
    marginRight: 10,
  },
  profileRatingNumber: {
    fontSize: FONTS.SIZES.XXLARGE,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_GREEN,
  },
  statsContainer: {
    marginBottom: 30,
  },
  statsTitle: {
    fontSize: FONTS.SIZES.XLARGE,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginBottom: 20,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: COLORS.GRAY_LIGHT,
    borderRadius: 10,
    padding: 15,
    width: '48%',
    alignItems: 'center',
    marginBottom: 15,
  },
  statNumber: {
    fontSize: FONTS.SIZES.XXLARGE,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_GREEN,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: FONTS.SIZES.SMALL,
    color: COLORS.GRAY_DARK,
    textAlign: 'center',
  },
  addFriendButtonLarge: {
    backgroundColor: COLORS.PRIMARY_GREEN,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addFriendButtonLargeText: {
    color: COLORS.WHITE,
    fontSize: FONTS.SIZES.LARGE,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: COLORS.GRAY_LIGHT,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: COLORS.GRAY_DARK,
    fontSize: FONTS.SIZES.MEDIUM,
    fontWeight: '600',
  },
});

export default RatingTab;
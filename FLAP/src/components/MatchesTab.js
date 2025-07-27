import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { COLORS, FONTS, MATCH_FILTERS, TEAM_NAMES } from '../constants';

const MatchesTab = () => {
  const [selectedFilter, setSelectedFilter] = useState('Усі');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [matchTitle, setMatchTitle] = useState('');
  const [matchDate, setMatchDate] = useState('');
  const [matchTime, setMatchTime] = useState('');
  const [matchLocation, setMatchLocation] = useState('');
  const [matchPlayers, setMatchPlayers] = useState('8');
  const [matchDuration, setMatchDuration] = useState('90');
  const [showPlayersPicker, setShowPlayersPicker] = useState(false);
  const [showDurationPicker, setShowDurationPicker] = useState(false);

  // Mock matches data
  const [matches, setMatches] = useState([
    {
      id: 1,
      title: 'Вечірній футбол в парку',
      date: 'Сьогодні',
      time: '18:00',
      location: 'Парк Шевченка, поле №1',
      currentPlayers: 6,
      maxPlayers: 8,
      organizer: { name: 'Олексій', rating: 4.5, avatar: '⚽' },
      status: 'waiting', // waiting, forming_teams, active, finished
      applications: [
        { id: 1, name: 'Марко', rating: 4.2, avatar: '🏃‍♂️' },
        { id: 2, name: 'Андрій', rating: 3.8, avatar: '🥅' },
      ],
      teams: null,
    },
    {
      id: 2,
      title: 'Ранковий матч',
      date: 'Завтра',
      time: '09:00',
      location: 'Стадіон "Динамо"',
      currentPlayers: 10,
      maxPlayers: 10,
      organizer: { name: 'Сергій', rating: 4.7, avatar: '🎯' },
      status: 'forming_teams',
      applications: [],
      teams: {
        team1: { name: 'Леви', players: [
          { id: 3, name: 'Сергій', rating: 4.7, avatar: '🎯' },
          { id: 4, name: 'Іван', rating: 4.1, avatar: '⚡' },
          { id: 5, name: 'Петро', rating: 3.9, avatar: '🔥' },
        ]},
        team2: { name: 'Тигри', players: [
          { id: 6, name: 'Максим', rating: 4.3, avatar: '🚀' },
          { id: 7, name: 'Артем', rating: 4.0, avatar: '💪' },
          { id: 8, name: 'Володя', rating: 3.7, avatar: '⭐' },
        ]},
      },
    },
  ]);

  const playerOptions = ['6', '8', '10', '14', '22'];
  const durationOptions = ['60', '90', '120'];

  const filteredMatches = selectedFilter === 'Усі' 
    ? matches 
    : matches.filter(match => match.date === selectedFilter);

  const handleCreateMatch = () => {
    if (!matchTitle || !matchDate || !matchTime || !matchLocation) {
      Alert.alert('Помилка', 'Заповніть всі поля');
      return;
    }

    const newMatch = {
      id: matches.length + 1,
      title: matchTitle,
      date: matchDate,
      time: matchTime,
      location: matchLocation,
      currentPlayers: 1,
      maxPlayers: parseInt(matchPlayers),
      organizer: { name: 'Ви', rating: 4.2, avatar: '👤' },
      status: 'waiting',
      applications: [],
      teams: null,
    };

    setMatches([newMatch, ...matches]);
    setMatchTitle('');
    setMatchDate('');
    setMatchTime('');
    setMatchLocation('');
    setShowCreateModal(false);
    Alert.alert('Успіх', 'Матч створено!');
  };

  const handleApplyToMatch = (matchId) => {
    const updatedMatches = matches.map(match => {
      if (match.id === matchId && match.currentPlayers < match.maxPlayers) {
        return {
          ...match,
          currentPlayers: match.currentPlayers + 1,
          applications: [...match.applications, {
            id: Date.now(),
            name: 'Ви',
            rating: 4.2,
            avatar: '👤'
          }]
        };
      }
      return match;
    });
    setMatches(updatedMatches);
    Alert.alert('Успіх', 'Заявку подано!');
  };

  const handleFormTeams = (matchId) => {
    const match = matches.find(m => m.id === matchId);
    if (!match || match.currentPlayers < 4) {
      Alert.alert('Помилка', 'Недостатньо гравців для формування команд');
      return;
    }

    const teamNames = TEAM_NAMES[Math.floor(Math.random() * TEAM_NAMES.length)];
    const allPlayers = [match.organizer, ...match.applications];
    const shuffledPlayers = [...allPlayers].sort(() => Math.random() - 0.5);
    
    const mid = Math.ceil(shuffledPlayers.length / 2);
    const team1Players = shuffledPlayers.slice(0, mid);
    const team2Players = shuffledPlayers.slice(mid);

    const updatedMatches = matches.map(m => {
      if (m.id === matchId) {
        return {
          ...m,
          status: 'forming_teams',
          teams: {
            team1: { name: teamNames[0], players: team1Players },
            team2: { name: teamNames[1], players: team2Players },
          }
        };
      }
      return m;
    });

    setMatches(updatedMatches);
    Alert.alert('Успіх', 'Команди сформовано!');
  };

  const handleReshuffleTeams = (matchId) => {
    const match = matches.find(m => m.id === matchId);
    if (!match || !match.teams) return;

    const allPlayers = [...match.teams.team1.players, ...match.teams.team2.players];
    const shuffledPlayers = [...allPlayers].sort(() => Math.random() - 0.5);
    
    const mid = Math.ceil(shuffledPlayers.length / 2);
    const team1Players = shuffledPlayers.slice(0, mid);
    const team2Players = shuffledPlayers.slice(mid);

    const updatedMatches = matches.map(m => {
      if (m.id === matchId) {
        return {
          ...m,
          teams: {
            ...m.teams,
            team1: { ...m.teams.team1, players: team1Players },
            team2: { ...m.teams.team2, players: team2Players },
          }
        };
      }
      return m;
    });

    setMatches(updatedMatches);
    Alert.alert('Успіх', 'Команди перешафловано!');
  };

  const handleStartMatch = (matchId) => {
    const updatedMatches = matches.map(m => {
      if (m.id === matchId) {
        return { ...m, status: 'active' };
      }
      return m;
    });
    setMatches(updatedMatches);
    Alert.alert('Матч почався!', 'Гарної гри!');
  };

  const renderPlayerSlots = (current, max) => {
    const slots = [];
    for (let i = 0; i < max; i++) {
      slots.push(
        <View
          key={i}
          style={[
            styles.playerSlot,
            { backgroundColor: i < current ? COLORS.PRIMARY_GREEN : COLORS.GRAY_MEDIUM }
          ]}
        />
      );
    }
    return slots;
  };

  const renderMatch = ({ item }) => (
    <TouchableOpacity
      style={styles.matchCard}
      onPress={() => setSelectedMatch(item)}
    >
      <Text style={styles.matchTitle}>{item.title}</Text>
      <Text style={styles.matchDateTime}>{item.date} • {item.time}</Text>
      <Text style={styles.matchLocation}>{item.location}</Text>
      
      <View style={styles.playersInfo}>
        <Text style={styles.playersText}>
          Гравці: {item.currentPlayers}/{item.maxPlayers}
        </Text>
        <View style={styles.playerSlots}>
          {renderPlayerSlots(item.currentPlayers, item.maxPlayers)}
        </View>
      </View>

      <View style={styles.organizerInfo}>
        <Text style={styles.organizerEmoji}>{item.organizer.avatar}</Text>
        <View style={styles.organizerDetails}>
          <Text style={styles.organizerName}>{item.organizer.name}</Text>
          <Text style={styles.organizerRating}>⭐ {item.organizer.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderMatchDetails = () => {
    if (!selectedMatch) return null;

    return (
      <Modal
        visible={!!selectedMatch}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedMatch(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.matchDetailModal}>
            <ScrollView>
              <Text style={styles.modalTitle}>{selectedMatch.title}</Text>
              <Text style={styles.matchDetailInfo}>
                📅 {selectedMatch.date} • {selectedMatch.time}
              </Text>
              <Text style={styles.matchDetailInfo}>
                📍 {selectedMatch.location}
              </Text>
              <Text style={styles.matchDetailInfo}>
                ⏱️ {matchDuration} хвилин
              </Text>

              {selectedMatch.status === 'waiting' && (
                <View style={styles.waitingStage}>
                  <Text style={styles.stageTitle}>Очікування гравців</Text>
                  
                  {selectedMatch.applications.length > 0 && (
                    <View style={styles.applicationsList}>
                      <Text style={styles.applicationsTitle}>Заявки:</Text>
                      {selectedMatch.applications.map((app) => (
                        <View key={app.id} style={styles.applicationCard}>
                          <Text style={styles.applicantEmoji}>{app.avatar}</Text>
                          <View style={styles.applicantInfo}>
                            <Text style={styles.applicantName}>{app.name}</Text>
                            <Text style={styles.applicantRating}>⭐ {app.rating}</Text>
                          </View>
                          <View style={styles.applicationActions}>
                            <TouchableOpacity style={styles.acceptButton}>
                              <Text style={styles.acceptText}>✓</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.rejectButton}>
                              <Text style={styles.rejectText}>✗</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      ))}
                    </View>
                  )}

                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      selectedMatch.currentPlayers >= 4 ? styles.activeButton : styles.disabledButton
                    ]}
                    onPress={() => handleFormTeams(selectedMatch.id)}
                    disabled={selectedMatch.currentPlayers < 4}
                  >
                    <Text style={styles.actionButtonText}>Сформувати команди</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionButton, styles.applyButton]}
                    onPress={() => handleApplyToMatch(selectedMatch.id)}
                  >
                    <Text style={styles.actionButtonText}>Подати заявку</Text>
                  </TouchableOpacity>
                </View>
              )}

              {selectedMatch.status === 'forming_teams' && selectedMatch.teams && (
                <View style={styles.teamsStage}>
                  <Text style={styles.stageTitle}>Формування команд</Text>
                  
                  <TouchableOpacity
                    style={[styles.actionButton, styles.shuffleButton]}
                    onPress={() => handleReshuffleTeams(selectedMatch.id)}
                  >
                    <Text style={styles.actionButtonText}>🔀 Перешафлити команди</Text>
                  </TouchableOpacity>

                  <View style={styles.teamsContainer}>
                    <View style={styles.teamCard}>
                      <Text style={styles.teamName}>{selectedMatch.teams.team1.name}</Text>
                      {selectedMatch.teams.team1.players.map((player) => (
                        <View key={player.id} style={styles.playerItem}>
                          <Text style={styles.playerEmoji}>{player.avatar}</Text>
                          <Text style={styles.playerName}>{player.name}</Text>
                          <Text style={styles.playerRating}>⭐ {player.rating}</Text>
                        </View>
                      ))}
                    </View>

                    <Text style={styles.vsText}>VS</Text>

                    <View style={styles.teamCard}>
                      <Text style={styles.teamName}>{selectedMatch.teams.team2.name}</Text>
                      {selectedMatch.teams.team2.players.map((player) => (
                        <View key={player.id} style={styles.playerItem}>
                          <Text style={styles.playerEmoji}>{player.avatar}</Text>
                          <Text style={styles.playerName}>{player.name}</Text>
                          <Text style={styles.playerRating}>⭐ {player.rating}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  <TouchableOpacity
                    style={[styles.actionButton, styles.startButton]}
                    onPress={() => handleStartMatch(selectedMatch.id)}
                  >
                    <Text style={styles.actionButtonText}>⚽ Почати матч</Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedMatch(null)}
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
      {/* Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {MATCH_FILTERS.map((filter, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.selectedFilterButton
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[
              styles.filterButtonText,
              selectedFilter === filter && styles.selectedFilterButtonText
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Matches List */}
      <FlatList
        data={filteredMatches}
        renderItem={renderMatch}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.matchesList}
        showsVerticalScrollIndicator={false}
      />

      {/* Create Match Button */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => setShowCreateModal(true)}
      >
        <Text style={styles.createButtonText}>⚽ Створити матч</Text>
      </TouchableOpacity>

      {/* Create Match Modal */}
      <Modal
        visible={showCreateModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={styles.scrollModalContent}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Створити матч</Text>
              
              <TextInput
                style={styles.modalInput}
                placeholder="Назва матчу"
                value={matchTitle}
                onChangeText={setMatchTitle}
              />

              <TextInput
                style={styles.modalInput}
                placeholder="Дата (наприклад: Сьогодні, Завтра, 15.12.2024)"
                value={matchDate}
                onChangeText={setMatchDate}
              />

              <TextInput
                style={styles.modalInput}
                placeholder="Час (наприклад: 18:00)"
                value={matchTime}
                onChangeText={setMatchTime}
              />

              <TextInput
                style={styles.modalInput}
                placeholder="Місце проведення"
                value={matchLocation}
                onChangeText={setMatchLocation}
                multiline
              />

              <TouchableOpacity
                style={styles.picker}
                onPress={() => setShowPlayersPicker(!showPlayersPicker)}
              >
                <Text style={styles.pickerText}>Кількість гравців: {matchPlayers}</Text>
                <Text style={styles.pickerArrow}>▼</Text>
              </TouchableOpacity>

              {showPlayersPicker && (
                <View style={styles.pickerOptions}>
                  {playerOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.pickerOption}
                      onPress={() => {
                        setMatchPlayers(option);
                        setShowPlayersPicker(false);
                      }}
                    >
                      <Text style={styles.pickerOptionText}>{option} гравців</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <TouchableOpacity
                style={styles.picker}
                onPress={() => setShowDurationPicker(!showDurationPicker)}
              >
                <Text style={styles.pickerText}>Тривалість: {matchDuration} хв</Text>
                <Text style={styles.pickerArrow}>▼</Text>
              </TouchableOpacity>

              {showDurationPicker && (
                <View style={styles.pickerOptions}>
                  {durationOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.pickerOption}
                      onPress={() => {
                        setMatchDuration(option);
                        setShowDurationPicker(false);
                      }}
                    >
                      <Text style={styles.pickerOptionText}>{option} хвилин</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setShowCreateModal(false)}
                >
                  <Text style={styles.cancelButtonText}>Скасувати</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.modalButton, styles.createMatchButton]}
                  onPress={handleCreateMatch}
                >
                  <Text style={styles.createMatchButtonText}>Створити</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {renderMatchDetails()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GRAY_LIGHT,
  },
  filtersContainer: {
    backgroundColor: COLORS.WHITE,
    paddingVertical: 15,
  },
  filtersContent: {
    paddingHorizontal: 20,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.GRAY_LIGHT,
    marginRight: 10,
  },
  selectedFilterButton: {
    backgroundColor: COLORS.PRIMARY_GREEN,
  },
  filterButtonText: {
    fontSize: FONTS.SIZES.MEDIUM,
    color: COLORS.GRAY_DARK,
    fontWeight: '600',
  },
  selectedFilterButtonText: {
    color: COLORS.WHITE,
  },
  matchesList: {
    padding: 15,
  },
  matchCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  matchTitle: {
    fontSize: FONTS.SIZES.LARGE,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginBottom: 5,
  },
  matchDateTime: {
    fontSize: FONTS.SIZES.MEDIUM,
    color: COLORS.GRAY_DARK,
    marginBottom: 5,
  },
  matchLocation: {
    fontSize: FONTS.SIZES.MEDIUM,
    color: COLORS.GRAY_DARK,
    marginBottom: 15,
  },
  playersInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  playersText: {
    fontSize: FONTS.SIZES.MEDIUM,
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  playerSlots: {
    flexDirection: 'row',
  },
  playerSlot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 4,
  },
  organizerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  organizerEmoji: {
    fontSize: 30,
    marginRight: 10,
  },
  organizerDetails: {
    flex: 1,
  },
  organizerName: {
    fontSize: FONTS.SIZES.MEDIUM,
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  organizerRating: {
    fontSize: FONTS.SIZES.SMALL,
    color: COLORS.GRAY_DARK,
  },
  createButton: {
    backgroundColor: COLORS.PRIMARY_GREEN,
    margin: 20,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  createButtonText: {
    color: COLORS.WHITE,
    fontSize: FONTS.SIZES.LARGE,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollModalContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.WHITE,
    margin: 20,
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  matchDetailModal: {
    backgroundColor: COLORS.WHITE,
    margin: 20,
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: FONTS.SIZES.XLARGE,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: COLORS.BLACK,
  },
  matchDetailInfo: {
    fontSize: FONTS.SIZES.MEDIUM,
    color: COLORS.GRAY_DARK,
    marginBottom: 10,
    textAlign: 'center',
  },
  stageTitle: {
    fontSize: FONTS.SIZES.LARGE,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginBottom: 20,
    textAlign: 'center',
  },
  waitingStage: {
    marginTop: 20,
  },
  applicationsList: {
    marginBottom: 20,
  },
  applicationsTitle: {
    fontSize: FONTS.SIZES.MEDIUM,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginBottom: 10,
  },
  applicationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.GRAY_LIGHT,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  applicantEmoji: {
    fontSize: 30,
    marginRight: 10,
  },
  applicantInfo: {
    flex: 1,
  },
  applicantName: {
    fontSize: FONTS.SIZES.MEDIUM,
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  applicantRating: {
    fontSize: FONTS.SIZES.SMALL,
    color: COLORS.GRAY_DARK,
  },
  applicationActions: {
    flexDirection: 'row',
  },
  acceptButton: {
    backgroundColor: COLORS.SUCCESS,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  rejectButton: {
    backgroundColor: COLORS.ERROR,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptText: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
  },
  rejectText: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
  },
  actionButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  activeButton: {
    backgroundColor: COLORS.PRIMARY_GREEN,
  },
  disabledButton: {
    backgroundColor: COLORS.GRAY_MEDIUM,
  },
  applyButton: {
    backgroundColor: COLORS.ORANGE,
  },
  shuffleButton: {
    backgroundColor: COLORS.INFO,
  },
  startButton: {
    backgroundColor: COLORS.SUCCESS,
  },
  actionButtonText: {
    color: COLORS.WHITE,
    fontSize: FONTS.SIZES.MEDIUM,
    fontWeight: 'bold',
  },
  teamsStage: {
    marginTop: 20,
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  teamCard: {
    backgroundColor: COLORS.GRAY_LIGHT,
    borderRadius: 10,
    padding: 15,
    flex: 1,
    marginHorizontal: 5,
  },
  teamName: {
    fontSize: FONTS.SIZES.LARGE,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    textAlign: 'center',
    marginBottom: 10,
  },
  playerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  playerEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  playerName: {
    fontSize: FONTS.SIZES.SMALL,
    color: COLORS.BLACK,
    flex: 1,
  },
  playerRating: {
    fontSize: FONTS.SIZES.SMALL,
    color: COLORS.GRAY_DARK,
  },
  vsText: {
    fontSize: FONTS.SIZES.XLARGE,
    fontWeight: 'bold',
    color: COLORS.ORANGE,
    marginHorizontal: 10,
  },
  closeButton: {
    backgroundColor: COLORS.GRAY_LIGHT,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: COLORS.GRAY_DARK,
    fontSize: FONTS.SIZES.MEDIUM,
    fontWeight: '600',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: COLORS.GRAY_MEDIUM,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: FONTS.SIZES.MEDIUM,
    marginBottom: 15,
  },
  picker: {
    borderWidth: 1,
    borderColor: COLORS.GRAY_MEDIUM,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  pickerText: {
    fontSize: FONTS.SIZES.MEDIUM,
    color: COLORS.BLACK,
  },
  pickerArrow: {
    fontSize: FONTS.SIZES.SMALL,
    color: COLORS.GRAY_MEDIUM,
  },
  pickerOptions: {
    borderWidth: 1,
    borderColor: COLORS.GRAY_MEDIUM,
    borderRadius: 10,
    marginBottom: 15,
  },
  pickerOption: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_LIGHT,
  },
  pickerOptionText: {
    fontSize: FONTS.SIZES.MEDIUM,
    color: COLORS.BLACK,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: COLORS.GRAY_LIGHT,
  },
  createMatchButton: {
    backgroundColor: COLORS.PRIMARY_GREEN,
  },
  cancelButtonText: {
    color: COLORS.GRAY_DARK,
    fontSize: FONTS.SIZES.MEDIUM,
    fontWeight: '600',
  },
  createMatchButtonText: {
    color: COLORS.WHITE,
    fontSize: FONTS.SIZES.MEDIUM,
    fontWeight: '600',
  },
});

export default MatchesTab;
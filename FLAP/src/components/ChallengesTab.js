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
import Slider from '@react-native-community/slider';
import { COLORS, FONTS, CHALLENGE_AUDIENCES, VOTE_REWARD } from '../constants';

const ChallengesTab = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [challengeTitle, setChallengeTitle] = useState('');
  const [challengeCategory, setChallengeCategory] = useState('Фінти');
  const [challengeStake, setChallengeStake] = useState('10');
  const [challengeDuration, setChallengeDuration] = useState('7');
  const [challengeAudience, setChallengeAudience] = useState('all');
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showAudiencePicker, setShowAudiencePicker] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [votes, setVotes] = useState({});

  // Mock challenges data
  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: 'Найкращий фінт тижня',
      prizePool: 150,
      participants: [
        { id: 1, name: 'Олексій', avatar: '🏃‍♂️', rating: 0 },
        { id: 2, name: 'Марко', avatar: '⚽', rating: 0 },
        { id: 3, name: 'Андрій', avatar: '🥅', rating: 0 },
      ],
      timeLeft: '2 дні 14 годин',
      category: 'Фінти',
      status: 'active',
    },
    {
      id: 2,
      title: 'Гол з найдальшої відстані',
      prizePool: 200,
      participants: [
        { id: 4, name: 'Сергій', avatar: '🎯', rating: 0 },
        { id: 5, name: 'Віталій', avatar: '🚀', rating: 0 },
      ],
      timeLeft: '5 днів 8 годин',
      category: 'Голи',
      status: 'active',
    },
  ]);

  const categories = ['Фінти', 'Голи', 'Сейви', 'Тренування'];

  const handleCreateChallenge = () => {
    if (!challengeTitle || !challengeStake) {
      Alert.alert('Помилка', 'Заповніть всі поля');
      return;
    }

    const newChallenge = {
      id: challenges.length + 1,
      title: challengeTitle,
      prizePool: parseInt(challengeStake),
      participants: [],
      timeLeft: `${challengeDuration} днів`,
      category: challengeCategory,
      status: 'active',
    };

    setChallenges([newChallenge, ...challenges]);
    setChallengeTitle('');
    setChallengeStake('10');
    setShowCreateModal(false);
    Alert.alert('Успіх', 'Челендж створено!');
  };

  const handleVote = (challengeId) => {
    const challenge = challenges.find(c => c.id === challengeId);
    const challengeVotes = votes[challengeId] || {};
    
    // Check if all participants have been voted for
    const allVoted = challenge.participants.every(p => challengeVotes[p.id] !== undefined);
    
    if (!allVoted) {
      Alert.alert('Помилка', 'Оцініть всіх учасників');
      return;
    }

    Alert.alert('Успіх', `Ви проголосували та отримали ${VOTE_REWARD} монету!`);
    setSelectedChallenge(null);
  };

  const updateVote = (challengeId, participantId, rating) => {
    setVotes(prev => ({
      ...prev,
      [challengeId]: {
        ...prev[challengeId],
        [participantId]: rating,
      },
    }));
  };

  const renderChallenge = ({ item }) => (
    <TouchableOpacity
      style={styles.challengeCard}
      onPress={() => setSelectedChallenge(item)}
    >
      <View style={styles.challengeHeader}>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Активний</Text>
        </View>
        <Text style={styles.prizePool}>💰 {item.prizePool} монет</Text>
      </View>
      
      <Text style={styles.challengeTitle}>{item.title}</Text>
      
      <View style={styles.participantsContainer}>
        {item.participants.slice(0, 3).map((participant, index) => (
          <View key={participant.id} style={styles.participantAvatar}>
            <Text style={styles.participantEmoji}>{participant.avatar}</Text>
          </View>
        ))}
        {item.participants.length > 3 && (
          <View style={styles.moreParticipants}>
            <Text style={styles.moreText}>+{item.participants.length - 3}</Text>
          </View>
        )}
      </View>
      
      <Text style={styles.timeLeft}>Залишилось: {item.timeLeft}</Text>
    </TouchableOpacity>
  );

  const renderVotingModal = () => {
    if (!selectedChallenge) return null;

    const challengeVotes = votes[selectedChallenge.id] || {};

    return (
      <Modal
        visible={!!selectedChallenge}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedChallenge(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.votingModalContent}>
            <Text style={styles.modalTitle}>{selectedChallenge.title}</Text>
            <Text style={styles.prizeInfo}>Призовий фонд: 💰 {selectedChallenge.prizePool} монет</Text>
            <Text style={styles.timeInfo}>⏰ {selectedChallenge.timeLeft}</Text>

            <ScrollView style={styles.participantsList}>
              {selectedChallenge.participants.map((participant) => (
                <View key={participant.id} style={styles.votingCard}>
                  <View style={styles.participantInfo}>
                    <Text style={styles.participantEmoji}>{participant.avatar}</Text>
                    <Text style={styles.participantName}>{participant.name}</Text>
                  </View>
                  
                  <View style={styles.ratingContainer}>
                    <Text style={styles.ratingLabel}>Оцінка:</Text>
                    <View style={styles.sliderContainer}>
                      <Text style={styles.ratingValue}>0.00</Text>
                      <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={5}
                        step={0.01}
                        value={challengeVotes[participant.id] || 0}
                        onValueChange={(value) => updateVote(selectedChallenge.id, participant.id, value)}
                        minimumTrackTintColor={COLORS.PRIMARY_GREEN}
                        maximumTrackTintColor={COLORS.GRAY_MEDIUM}
                        thumbStyle={{ backgroundColor: COLORS.PRIMARY_GREEN }}
                      />
                      <Text style={styles.ratingValue}>5.00</Text>
                    </View>
                    <Text style={styles.currentRating}>
                      {(challengeVotes[participant.id] || 0).toFixed(2)}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>

            <View style={styles.votingButtons}>
              <TouchableOpacity
                style={[styles.votingButton, styles.cancelVotingButton]}
                onPress={() => setSelectedChallenge(null)}
              >
                <Text style={styles.cancelVotingText}>Закрити</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.votingButton, styles.submitVotingButton]}
                onPress={() => handleVote(selectedChallenge.id)}
              >
                <Text style={styles.submitVotingText}>Проголосувати (+{VOTE_REWARD} монета)</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={challenges}
        renderItem={renderChallenge}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.challengesList}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => setShowCreateModal(true)}
      >
        <Text style={styles.createButtonText}>🏆 Створити челендж</Text>
      </TouchableOpacity>

      {/* Create Challenge Modal */}
      <Modal
        visible={showCreateModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={styles.scrollModalContent}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Створити челендж</Text>
              
              <TextInput
                style={styles.modalInput}
                placeholder="Назва челенджу"
                value={challengeTitle}
                onChangeText={setChallengeTitle}
              />

              <TouchableOpacity
                style={styles.picker}
                onPress={() => setShowCategoryPicker(!showCategoryPicker)}
              >
                <Text style={styles.pickerText}>{challengeCategory}</Text>
                <Text style={styles.pickerArrow}>▼</Text>
              </TouchableOpacity>

              {showCategoryPicker && (
                <View style={styles.pickerOptions}>
                  {categories.map((category, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.pickerOption}
                      onPress={() => {
                        setChallengeCategory(category);
                        setShowCategoryPicker(false);
                      }}
                    >
                      <Text style={styles.pickerOptionText}>{category}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <TextInput
                style={styles.modalInput}
                placeholder="Ставка (монети)"
                value={challengeStake}
                onChangeText={setChallengeStake}
                keyboardType="numeric"
              />

              <TextInput
                style={styles.modalInput}
                placeholder="Термін (дні)"
                value={challengeDuration}
                onChangeText={setChallengeDuration}
                keyboardType="numeric"
              />

              <TouchableOpacity
                style={styles.picker}
                onPress={() => setShowAudiencePicker(!showAudiencePicker)}
              >
                <Text style={styles.pickerText}>
                  {CHALLENGE_AUDIENCES.find(a => a.value === challengeAudience)?.label}
                </Text>
                <Text style={styles.pickerArrow}>▼</Text>
              </TouchableOpacity>

              {showAudiencePicker && (
                <View style={styles.pickerOptions}>
                  {CHALLENGE_AUDIENCES.map((audience, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.pickerOption}
                      onPress={() => {
                        setChallengeAudience(audience.value);
                        setShowAudiencePicker(false);
                      }}
                    >
                      <Text style={styles.pickerOptionText}>{audience.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <Text style={styles.prizeDistribution}>
                Розподіл призів: 1 місце (50%), 2 місце (30%), 3 місце (20%)
              </Text>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setShowCreateModal(false)}
                >
                  <Text style={styles.cancelButtonText}>Скасувати</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.modalButton, styles.createChallengeButton]}
                  onPress={handleCreateChallenge}
                >
                  <Text style={styles.createChallengeButtonText}>Створити</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {renderVotingModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GRAY_LIGHT,
  },
  challengesList: {
    padding: 15,
  },
  challengeCard: {
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
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusBadge: {
    backgroundColor: COLORS.SUCCESS,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: COLORS.WHITE,
    fontSize: FONTS.SIZES.SMALL,
    fontWeight: '600',
  },
  prizePool: {
    fontSize: FONTS.SIZES.MEDIUM,
    fontWeight: 'bold',
    color: COLORS.ORANGE,
  },
  challengeTitle: {
    fontSize: FONTS.SIZES.LARGE,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginBottom: 15,
  },
  participantsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  participantAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.GRAY_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 2,
    borderColor: COLORS.WHITE,
  },
  participantEmoji: {
    fontSize: 20,
  },
  moreParticipants: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.GRAY_MEDIUM,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreText: {
    color: COLORS.WHITE,
    fontSize: FONTS.SIZES.SMALL,
    fontWeight: 'bold',
  },
  timeLeft: {
    fontSize: FONTS.SIZES.MEDIUM,
    color: COLORS.GRAY_DARK,
    fontStyle: 'italic',
  },
  createButton: {
    backgroundColor: COLORS.ORANGE,
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
  votingModalContent: {
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
  prizeDistribution: {
    fontSize: FONTS.SIZES.SMALL,
    color: COLORS.GRAY_DARK,
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
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
  createChallengeButton: {
    backgroundColor: COLORS.ORANGE,
  },
  cancelButtonText: {
    color: COLORS.GRAY_DARK,
    fontSize: FONTS.SIZES.MEDIUM,
    fontWeight: '600',
  },
  createChallengeButtonText: {
    color: COLORS.WHITE,
    fontSize: FONTS.SIZES.MEDIUM,
    fontWeight: '600',
  },
  prizeInfo: {
    fontSize: FONTS.SIZES.MEDIUM,
    color: COLORS.ORANGE,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  timeInfo: {
    fontSize: FONTS.SIZES.MEDIUM,
    color: COLORS.GRAY_DARK,
    textAlign: 'center',
    marginBottom: 20,
  },
  participantsList: {
    maxHeight: 300,
  },
  votingCard: {
    backgroundColor: COLORS.GRAY_LIGHT,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  participantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  participantName: {
    fontSize: FONTS.SIZES.LARGE,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginLeft: 10,
  },
  ratingContainer: {
    alignItems: 'center',
  },
  ratingLabel: {
    fontSize: FONTS.SIZES.MEDIUM,
    color: COLORS.BLACK,
    marginBottom: 10,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  ratingValue: {
    fontSize: FONTS.SIZES.SMALL,
    color: COLORS.GRAY_DARK,
    minWidth: 30,
    textAlign: 'center',
  },
  currentRating: {
    fontSize: FONTS.SIZES.XLARGE,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_GREEN,
  },
  votingButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  votingButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelVotingButton: {
    backgroundColor: COLORS.GRAY_LIGHT,
  },
  submitVotingButton: {
    backgroundColor: COLORS.PRIMARY_GREEN,
  },
  cancelVotingText: {
    color: COLORS.GRAY_DARK,
    fontSize: FONTS.SIZES.MEDIUM,
    fontWeight: '600',
  },
  submitVotingText: {
    color: COLORS.WHITE,
    fontSize: FONTS.SIZES.MEDIUM,
    fontWeight: '600',
  },
});

export default ChallengesTab;
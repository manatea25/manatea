import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { COLORS, DIMENSIONS, FONTS, POSITIONS, INITIAL_COINS, FREE_PREMIUM_DAYS } from '../constants';

const ProfileCreationScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState(POSITIONS[0]);
  const [city, setCity] = useState('');
  const [about, setAbout] = useState('');
  const [showPositionPicker, setShowPositionPicker] = useState(false);

  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося завантажити фото');
    }
  };

  const handleCreateProfile = () => {
    if (!name || !phone || !city || !about) {
      Alert.alert('Помилка', 'Будь ласка, заповніть всі обов\'язкові поля');
      return;
    }

    // Mock profile creation - in real app, save to backend
    Alert.alert(
      'Профіль створено!',
      `Вітаємо, ${name}! Ви отримали ${INITIAL_COINS} монет та ${FREE_PREMIUM_DAYS} днів преміуму безкоштовно!`,
      [
        {
          text: 'Продовжити',
          onPress: () => navigation.navigate('MainApp'),
        },
      ]
    );
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
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
    <LinearGradient
      colors={[COLORS.GRAY_LIGHT, COLORS.WHITE]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            {/* Title */}
            <Text style={styles.title}>Створення профілю</Text>

            {/* Profile Image */}
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={handleImagePicker}
              activeOpacity={0.8}
            >
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <View style={[styles.avatarPlaceholder, { backgroundColor: name ? getAvatarColor(name) : COLORS.GRAY_MEDIUM }]}>
                  {name ? (
                    <Text style={styles.avatarText}>{getInitials(name)}</Text>
                  ) : (
                    <Text style={styles.cameraIcon}>📷</Text>
                  )}
                </View>
              )}
            </TouchableOpacity>

            {/* Form */}
            <View style={styles.formContainer}>
              <Text style={styles.label}>Ім'я *</Text>
              <TextInput
                style={styles.input}
                placeholder="Введіть ваше ім'я"
                placeholderTextColor={COLORS.GRAY_MEDIUM}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />

              <Text style={styles.label}>Номер телефону *</Text>
              <TextInput
                style={styles.input}
                placeholder="+380..."
                placeholderTextColor={COLORS.GRAY_MEDIUM}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />

              <Text style={styles.label}>Позиція *</Text>
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => setShowPositionPicker(!showPositionPicker)}
              >
                <Text style={styles.pickerButtonText}>{position}</Text>
                <Text style={styles.pickerArrow}>▼</Text>
              </TouchableOpacity>

              {showPositionPicker && (
                <View style={styles.pickerContainer}>
                  {POSITIONS.map((pos, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.pickerOption}
                      onPress={() => {
                        setPosition(pos);
                        setShowPositionPicker(false);
                      }}
                    >
                      <Text style={styles.pickerOptionText}>{pos}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <Text style={styles.label}>Місто *</Text>
              <TextInput
                style={styles.input}
                placeholder="Введіть ваше місто"
                placeholderTextColor={COLORS.GRAY_MEDIUM}
                value={city}
                onChangeText={setCity}
                autoCapitalize="words"
              />

              <Text style={styles.label}>Про себе *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Розкажіть про себе, свій досвід у футболі..."
                placeholderTextColor={COLORS.GRAY_MEDIUM}
                value={about}
                onChangeText={setAbout}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />

              <TouchableOpacity
                style={styles.createButton}
                onPress={handleCreateProfile}
                activeOpacity={0.8}
              >
                <Text style={styles.createButtonText}>Створити профіль</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  title: {
    fontSize: FONTS.SIZES.XXLARGE,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    textAlign: 'center',
    marginBottom: 30,
  },
  imageContainer: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.WHITE,
    elevation: 3,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  avatarText: {
    fontSize: FONTS.SIZES.XXLARGE,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  cameraIcon: {
    fontSize: 40,
  },
  formContainer: {
    flex: 1,
  },
  label: {
    fontSize: FONTS.SIZES.MEDIUM,
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: FONTS.SIZES.MEDIUM,
    color: COLORS.BLACK,
    borderWidth: 1,
    borderColor: COLORS.GRAY_MEDIUM,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  pickerButton: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.GRAY_MEDIUM,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerButtonText: {
    fontSize: FONTS.SIZES.MEDIUM,
    color: COLORS.BLACK,
  },
  pickerArrow: {
    fontSize: FONTS.SIZES.SMALL,
    color: COLORS.GRAY_MEDIUM,
  },
  pickerContainer: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.GRAY_MEDIUM,
    marginTop: 5,
    elevation: 3,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  createButton: {
    backgroundColor: COLORS.PRIMARY_GREEN,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
    elevation: 3,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  createButtonText: {
    color: COLORS.WHITE,
    fontSize: FONTS.SIZES.LARGE,
    fontWeight: 'bold',
  },
});

export default ProfileCreationScreen;
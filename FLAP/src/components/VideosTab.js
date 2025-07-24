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
import { COLORS, FONTS, VIDEO_CATEGORIES } from '../constants';

const VideosTab = () => {
  const [selectedCategory, setSelectedCategory] = useState('Усі');
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoCategory, setVideoCategory] = useState('Фінти');
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  // Mock video data
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: 'Неймовірний фінт проти захисника',
      category: 'Фінти',
      author: '@alex_football',
      likes: 24,
      comments: 8,
      thumbnail: '🎬',
    },
    {
      id: 2,
      title: 'Гол з 30 метрів',
      category: 'Голи',
      author: '@striker_pro',
      likes: 45,
      comments: 12,
    },
    {
      id: 3,
      title: 'Сейв матчу',
      category: 'Сейви',
      author: '@keeper_master',
      likes: 18,
      comments: 5,
    },
    {
      id: 4,
      title: 'Тренування техніки',
      category: 'Тренування',
      author: '@coach_tips',
      likes: 32,
      comments: 15,
    },
  ]);

  const filteredVideos = selectedCategory === 'Усі' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  const getCategoryColor = (category) => {
    const colors = {
      'Фінти': COLORS.ORANGE,
      'Голи': COLORS.SUCCESS,
      'Сейви': COLORS.INFO,
      'Тренування': COLORS.WARNING,
    };
    return colors[category] || COLORS.GRAY_MEDIUM;
  };

  const handleLike = (videoId) => {
    setVideos(videos.map(video => 
      video.id === videoId 
        ? { ...video, likes: video.likes + 1 }
        : video
    ));
  };

  const handleComment = (videoId) => {
    Alert.alert('Коментарі', 'Функція коментарів буде доступна найближчим часом');
  };

  const handleAddVideo = () => {
    if (!videoTitle) {
      Alert.alert('Помилка', 'Введіть назву відео');
      return;
    }

    const newVideo = {
      id: videos.length + 1,
      title: videoTitle,
      category: videoCategory,
      author: '@you',
      likes: 0,
      comments: 0,
    };

    setVideos([newVideo, ...videos]);
    setVideoTitle('');
    setVideoCategory('Фінти');
    setShowAddVideoModal(false);
    Alert.alert('Успіх', 'Відео додано!');
  };

  const renderVideo = ({ item }) => (
    <View style={styles.videoCard}>
      <View style={styles.videoPreview}>
        <Text style={styles.playButton}>▶️</Text>
        <Text style={styles.videoEmoji}>{item.thumbnail || '🎬'}</Text>
      </View>
      
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle}>{item.title}</Text>
        <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) }]}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <Text style={styles.videoAuthor}>{item.author}</Text>
        
        <View style={styles.videoActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleLike(item.id)}
          >
            <Text style={styles.actionText}>❤️ {item.likes}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleComment(item.id)}
          >
            <Text style={styles.actionText}>💬 {item.comments}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Category Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {VIDEO_CATEGORIES.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryButtonText,
              selectedCategory === category && styles.selectedCategoryButtonText
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Videos List */}
      <FlatList
        data={filteredVideos}
        renderItem={renderVideo}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.videosList}
        showsVerticalScrollIndicator={false}
      />

      {/* Add Video Button */}
      <TouchableOpacity
        style={styles.addVideoButton}
        onPress={() => setShowAddVideoModal(true)}
      >
        <Text style={styles.addVideoButtonText}>➕ Додати відео</Text>
      </TouchableOpacity>

      {/* Add Video Modal */}
      <Modal
        visible={showAddVideoModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddVideoModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Додати відео</Text>
            
            <TextInput
              style={styles.modalInput}
              placeholder="Назва відео"
              value={videoTitle}
              onChangeText={setVideoTitle}
            />

            <TouchableOpacity
              style={styles.categorySelector}
              onPress={() => setShowCategoryPicker(!showCategoryPicker)}
            >
              <Text style={styles.categorySelectorText}>{videoCategory}</Text>
              <Text style={styles.categorySelectorArrow}>▼</Text>
            </TouchableOpacity>

            {showCategoryPicker && (
              <View style={styles.categoryPickerContainer}>
                {VIDEO_CATEGORIES.slice(1).map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.categoryPickerOption}
                    onPress={() => {
                      setVideoCategory(category);
                      setShowCategoryPicker(false);
                    }}
                  >
                    <Text style={styles.categoryPickerOptionText}>{category}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowAddVideoModal(false)}
              >
                <Text style={styles.cancelButtonText}>Скасувати</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.uploadButton]}
                onPress={handleAddVideo}
              >
                <Text style={styles.uploadButtonText}>Завантажити</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GRAY_LIGHT,
  },
  categoriesContainer: {
    backgroundColor: COLORS.WHITE,
    paddingVertical: 15,
  },
  categoriesContent: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.GRAY_LIGHT,
    marginRight: 10,
  },
  selectedCategoryButton: {
    backgroundColor: COLORS.PRIMARY_GREEN,
  },
  categoryButtonText: {
    fontSize: FONTS.SIZES.MEDIUM,
    color: COLORS.GRAY_DARK,
    fontWeight: '600',
  },
  selectedCategoryButtonText: {
    color: COLORS.WHITE,
  },
  videosList: {
    padding: 15,
  },
  videoCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  videoPreview: {
    height: 200,
    backgroundColor: COLORS.GRAY_DARK,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  playButton: {
    fontSize: 40,
    position: 'absolute',
    zIndex: 1,
  },
  videoEmoji: {
    fontSize: 60,
    opacity: 0.5,
  },
  videoInfo: {
    padding: 15,
  },
  videoTitle: {
    fontSize: FONTS.SIZES.LARGE,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginBottom: 8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: FONTS.SIZES.SMALL,
    color: COLORS.WHITE,
    fontWeight: '600',
  },
  videoAuthor: {
    fontSize: FONTS.SIZES.MEDIUM,
    color: COLORS.GRAY_DARK,
    marginBottom: 10,
  },
  videoActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: COLORS.GRAY_LIGHT,
    borderRadius: 20,
  },
  actionText: {
    fontSize: FONTS.SIZES.MEDIUM,
    color: COLORS.GRAY_DARK,
  },
  addVideoButton: {
    backgroundColor: COLORS.PRIMARY_GREEN,
    margin: 20,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addVideoButtonText: {
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
  modalContent: {
    backgroundColor: COLORS.WHITE,
    margin: 20,
    borderRadius: 15,
    padding: 20,
    width: '90%',
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
  categorySelector: {
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
  categorySelectorText: {
    fontSize: FONTS.SIZES.MEDIUM,
    color: COLORS.BLACK,
  },
  categorySelectorArrow: {
    fontSize: FONTS.SIZES.SMALL,
    color: COLORS.GRAY_MEDIUM,
  },
  categoryPickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.GRAY_MEDIUM,
    borderRadius: 10,
    marginBottom: 15,
  },
  categoryPickerOption: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_LIGHT,
  },
  categoryPickerOptionText: {
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
  uploadButton: {
    backgroundColor: COLORS.PRIMARY_GREEN,
  },
  cancelButtonText: {
    color: COLORS.GRAY_DARK,
    fontSize: FONTS.SIZES.MEDIUM,
    fontWeight: '600',
  },
  uploadButtonText: {
    color: COLORS.WHITE,
    fontSize: FONTS.SIZES.MEDIUM,
    fontWeight: '600',
  },
});

export default VideosTab;
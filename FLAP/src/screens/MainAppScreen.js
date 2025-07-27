import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS } from '../constants';

// Import tab screens
import VideosTab from '../components/VideosTab';
import ChallengesTab from '../components/ChallengesTab';
import MatchesTab from '../components/MatchesTab';
import RatingTab from '../components/RatingTab';
import Header from '../components/Header';

const Tab = createBottomTabNavigator();

const MainAppScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            
            if (route.name === 'Videos') {
              iconName = '📺';
            } else if (route.name === 'Challenges') {
              iconName = '🏆';
            } else if (route.name === 'Matches') {
              iconName = '⚽';
            } else if (route.name === 'Rating') {
              iconName = '👑';
            }

            return (
              <Text style={[styles.tabIcon, { opacity: focused ? 1 : 0.6 }]}>
                {iconName}
              </Text>
            );
          },
          tabBarActiveTintColor: COLORS.PRIMARY_GREEN,
          tabBarInactiveTintColor: COLORS.GRAY_MEDIUM,
          tabBarLabelStyle: {
            fontSize: FONTS.SIZES.SMALL,
            fontWeight: '600',
          },
          tabBarStyle: {
            backgroundColor: COLORS.WHITE,
            borderTopWidth: 1,
            borderTopColor: COLORS.GRAY_LIGHT,
            paddingVertical: 5,
            height: 60,
          },
        })}
      >
        <Tab.Screen 
          name="Videos" 
          component={VideosTab}
          options={{ tabBarLabel: 'Відео' }}
        />
        <Tab.Screen 
          name="Challenges" 
          component={ChallengesTab}
          options={{ tabBarLabel: 'Челенджі' }}
        />
        <Tab.Screen 
          name="Matches" 
          component={MatchesTab}
          options={{ tabBarLabel: 'Матчі' }}
        />
        <Tab.Screen 
          name="Rating" 
          component={RatingTab}
          options={{ tabBarLabel: 'Рейтинг' }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  tabIcon: {
    fontSize: 24,
  },
});

export default MainAppScreen;
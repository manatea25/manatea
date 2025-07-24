import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const COLORS = {
  // Primary colors
  PRIMARY_GREEN: '#00C851',
  DARK_GREEN: '#007E33',
  LIGHT_GREEN: '#B8E6B8',
  
  // Secondary colors
  ORANGE: '#FF8800',
  DARK_BLUE: '#1565C0',
  LIGHT_BLUE: '#E3F2FD',
  
  // Neutral colors
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAY_LIGHT: '#F5F5F5',
  GRAY_MEDIUM: '#BDBDBD',
  GRAY_DARK: '#424242',
  
  // Status colors
  SUCCESS: '#4CAF50',
  WARNING: '#FF9800',
  ERROR: '#F44336',
  INFO: '#2196F3',
  
  // Rating colors
  GOLD: '#FFD700',
  SILVER: '#C0C0C0',
  BRONZE: '#CD7F32',
};

export const DIMENSIONS = {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  HEADER_HEIGHT: 60,
  TAB_HEIGHT: 60,
  BUTTON_HEIGHT: 50,
  INPUT_HEIGHT: 45,
};

export const FONTS = {
  REGULAR: 'System',
  BOLD: 'System',
  LIGHT: 'System',
  SIZES: {
    SMALL: 12,
    MEDIUM: 16,
    LARGE: 20,
    XLARGE: 24,
    XXLARGE: 32,
  },
};

export const POSITIONS = [
  'Воротар',
  'Захисник', 
  'Півзахисник',
  'Нападник',
  'Універсал'
];

export const VIDEO_CATEGORIES = [
  'Усі',
  'Фінти',
  'Голи',
  'Сейви',
  'Тренування'
];

export const MATCH_FILTERS = [
  'Усі',
  'Сьогодні',
  'Завтра',
  'Поблизу'
];

export const TEAM_NAMES = [
  ['Леви', 'Тигри'],
  ['Дракони', 'Феніки'],
  ['Гладіатори', 'Спартанці'],
  ['Вікінги', 'Лицарі'],
  ['Орли', 'Соколи'],
  ['Вовки', 'Ведмеді']
];

export const CHALLENGE_AUDIENCES = [
  { label: '🌍 Усі гравці', value: 'all' },
  { label: '👥 Тільки друзі', value: 'friends' },
  { label: '🏙️ Гравці з мого міста', value: 'city' }
];

export const SUBSCRIPTION_PLANS = {
  FREE: {
    name: 'Безкоштовна версія',
    price: 0,
    features: [
      '✓ Перегляд відео',
      '✓ Участь у матчах',
      '✓ Голосування в челенджах',
      '❌ Рейтинг прихований',
      '❌ Створення челенджів'
    ]
  },
  EUROPA: {
    name: 'Ліга Європи',
    price: 99,
    features: [
      '✓ Показ рейтингу',
      '✓ 3 челенджі на місяць',
      '✓ Всі базові функції'
    ]
  },
  CHAMPIONS: {
    name: 'Ліга Чемпіонів',
    price: 153,
    features: [
      '✓ Показ рейтингу',
      '✓ Необмежена кількість челенджів',
      '✓ 100 монет на місяць',
      '✓ Всі преміум функції'
    ]
  }
};

export const INITIAL_COINS = 250;
export const VOTE_REWARD = 1;
export const PREMIUM_MONTHLY_COINS = 100;
export const FREE_PREMIUM_DAYS = 14;
import React, { useState } from 'react';
import { ArrowLeft, Plus, Play, Star, MapPin, Calendar, Clock, Users, Search, Trophy, Video, User, Camera, Check, Phone, MessageCircle, Filter, Upload, FileVideo, Crown, Heart, Share, UserPlus, Shuffle, Settings, Award, ThumbsUp, ThumbsDown, Send, ShoppingBag, Zap, Gift, Medal, Target, TrendingUp, Fire, Coffee, Gamepad2, Sparkles } from 'lucide-react';

const GoalApp = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [user, setUser] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [userVotes, setUserVotes] = useState(new Set());
  const [likedChallenges, setLikedChallenges] = useState(new Set());
  const [favorites, setFavorites] = useState(new Set());
  const [friends, setFriends] = useState(new Set([1, 2])); // друзі користувача
  const [matchCityFilter, setMatchCityFilter] = useState('Всі міста');
  const [playerCityFilter, setPlayerCityFilter] = useState('Всі міста');
  const [videoComments, setVideoComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [videoRatings, setVideoRatings] = useState({});
  const [playerRatings, setPlayerRatings] = useState({});

  const cities = ['Всі міста', 'Львів', 'Київ', 'Харків', 'Одеса', 'Дніпро'];

  const badges = [
    { id: 1, name: '⚽ Майстер м\'яча', price: 50, description: 'За техніку ведення', owned: false },
    { id: 2, name: '🥅 Снайпер', price: 75, description: 'За точність ударів', owned: false },
    { id: 3, name: '🏃‍♂️ Спідстер', price: 60, description: 'За швидкість', owned: true },
    { id: 4, name: '🎯 Асистент', price: 65, description: 'За кращі передачі', owned: false },
    { id: 5, name: '🛡️ Захисник', price: 70, description: 'За надійну гру в обороні', owned: false },
  ];

  const comingSoonItems = [
    { id: 1, name: '🌟 Відгук від селебреті', description: 'Персональний відгук від зірки футболу', icon: '⭐' },
    { id: 2, name: '🏪 Знижка на спорттовари', description: '20% знижка в партнерських магазинах', icon: '🏷️' },
  ];

  const videos = [
    { 
      id: 1, 
      title: 'Техніка ведення м\'яча', 
      author: 'Артем К.', 
      authorId: 1,
      votes: 45, 
      views: 234,
      category: 'Фінти', 
      city: 'Львів', 
      isVideo: true,
      likes: 89,
      dislikes: 12,
      avgRating: 4.2,
      comments: [
        { id: 1, author: 'Максим П.', text: 'Супер техніка! Спробую повторити', time: '2 год тому' },
        { id: 2, author: 'Олег М.', text: 'Дуже корисно, дякую!', time: '1 год тому' }
      ]
    }
  ];

  const challenges = [
    { 
      id: 1, 
      title: 'Супер класний фінт Неймара', 
      author: 'Артем К.', 
      authorId: 1,
      votes: 23, 
      likes: 87,
      rating: 4.5, 
      category: 'Фінти', 
      city: 'Львів', 
      coins: 50,
      prizePool: 450,
      entryFee: 25,
      participants: 18,
      maxParticipants: 50,
      status: "voting",
      description: "Спробуйте повторити цей фінт!",
      isVideo: false,
      submissions: [
        { 
          id: 1, 
          author: "Максим П.", 
          authorId: 2,
          rating: 4.2, 
          city: "Львів",
          avgScore: 4.3,
          totalVotes: 15,
          submittedAt: "1 година тому"
        }
      ]
    }
  ];

  const matches = [
    { 
      id: 1, 
      title: 'Футбол у парку Шевченка', 
      date: '23.07.2025', 
      time: '18:00', 
      location: 'Львів, парк Шевченка', 
      city: 'Львів',
      players: '8/10', 
      isMyMatch: true, 
      applications: 8,
      organizer: 'Олександр Петренко',
      description: 'Товариський матч 5 на 5.',
      participants: [
        { id: 1, name: 'Артем К.', position: 'Нападник', rating: 4.2 },
        { id: 2, name: 'Максим П.', position: 'Захисник', rating: 3.8 },
        { id: 3, name: 'Олег М.', position: 'Воротар', rating: 4.5 },
        { id: 4, name: 'Іван С.', position: 'Півзахисник', rating: 4.0 },
        { id: 5, name: 'Петро Д.', position: 'Нападник', rating: 3.9 },
        { id: 6, name: 'Сергій Л.', position: 'Захисник', rating: 4.1 },
        { id: 7, name: 'Андрій К.', position: 'Воротар', rating: 3.7 },
        { id: 8, name: 'Роман Т.', position: 'Півзахисник', rating: 4.3 }
      ],
      teams: null,
      gameStarted: false,
      gameFinished: false,
      winnerTeam: null
    }
  ];

  const players = [
    { 
      id: 1, 
      name: 'Артем К.', 
      fullName: 'Артем Ковальчук',
      position: 'Нападник', 
      rating: 4.8, 
      city: 'Львів', 
      games: 24, 
      wins: 18, 
      winRate: 75,
      age: 23,
      phone: '+380 67 123 45 67',
      telegram: '@artem_football',
      bio: 'Грую з дитинства. Люблю швидкі атаки.',
      achievements: ['🥇 Чемпіон міста 2024'],
      lastGames: ['W', 'W', 'L', 'W', 'W']
    },
    { 
      id: 2, 
      name: 'Максим П.', 
      fullName: 'Максим Петренко',
      position: 'Захисник', 
      rating: 4.5, 
      city: 'Львів', 
      games: 31, 
      wins: 20, 
      winRate: 65,
      age: 26,
      phone: '+380 67 234 56 78',
      telegram: '@maxim_defense',
      bio: 'Надійний захисник команди.',
      lastGames: ['W', 'L', 'W', 'W', 'L']
    },
    { 
      id: 3, 
      name: 'Олег М.', 
      fullName: 'Олег Мельник',
      position: 'Воротар', 
      rating: 4.3, 
      city: 'Київ', 
      games: 19, 
      wins: 14, 
      winRate: 74,
      age: 28,
      bio: 'Досвідчений воротар.',
      lastGames: ['W', 'W', 'W', 'L', 'W']
    }
  ];

  const subscriptionPlans = [
    {
      id: 'europa',
      name: 'Ліга Європи',
      price: 99,
      color: 'from-blue-400 to-purple-500',
      features: [
        'Рейтинг видимий 999 місяців',
        '1 челендж на місяць',
        'Базова статистика',
        'Участь у всіх матчах'
      ]
    },
    {
      id: 'champions',
      name: 'Ліга Чемпіонів',
      price: 159,
      color: 'from-yellow-400 to-orange-500',
      features: [
        'Постійно видимий рейтинг',
        'Необмежена кількість челенджів',
        'Розширена статистика',
        'Пріоритет у матчах',
        'Ексклюзивні функції',
        'Значок Premium'
      ],
      isPopular: true
    }
  ];

  // Utility functions
  const handleToggleFavorite = (playerId) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(playerId)) {
        newSet.delete(playerId);
      } else {
        newSet.add(playerId);
      }
      return newSet;
    });
  };

  const handleToggleFriend = (playerId) => {
    setFriends(prev => {
      const newSet = new Set(prev);
      if (newSet.has(playerId)) {
        newSet.delete(playerId);
      } else {
        newSet.add(playerId);
      }
      return newSet;
    });
  };

  const shuffleTeams = (participants) => {
    const goalkeepers = participants.filter(p => p.position === 'Воротар');
    const defenders = participants.filter(p => p.position === 'Захисник');
    const midfielders = participants.filter(p => p.position === 'Півзахисник');
    const forwards = participants.filter(p => p.position === 'Нападник');
    
    const team1 = [];
    const team2 = [];
    
    if (goalkeepers.length >= 2) {
      team1.push(goalkeepers[0]);
      team2.push(goalkeepers[1]);
    } else if (goalkeepers.length === 1) {
      team1.push(goalkeepers[0]);
    }
    
    const otherPlayers = [...defenders, ...midfielders, ...forwards];
    const shuffled = otherPlayers.sort(() => Math.random() - 0.5);
    
    shuffled.forEach((player, index) => {
      if (team1.length <= team2.length) {
        team1.push(player);
      } else {
        team2.push(player);
      }
    });
    
    return { team1, team2 };
  };

  const addComment = (videoId, comment) => {
    setVideoComments(prev => ({
      ...prev,
      [videoId]: [...(prev[videoId] || []), {
        id: Date.now(),
        author: user?.nickname || 'Анонім',
        text: comment,
        time: 'щойно'
      }]
    }));
    setNewComment('');
  };

  const rateVideo = (videoId, rating) => {
    setVideoRatings(prev => ({
      ...prev,
      [videoId]: rating
    }));
  };

  const ratePlayer = (playerId, rating) => {
    setPlayerRatings(prev => ({
      ...prev,
      [playerId]: rating
    }));
  };

  // WelcomeScreen
  const WelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-bounce"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-yellow-300 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-orange-300 rounded-full animate-bounce delay-100"></div>
        <div className="absolute bottom-40 right-12 w-14 h-14 bg-pink-300 rounded-full animate-pulse delay-200"></div>
      </div>
      
      <div className="text-center mb-12 z-10">
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white/30">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-3xl animate-pulse">
              ⚽
            </div>
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-spin">
            ⭐
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
          GoalApp
        </h1>
        <p className="text-xl opacity-90 mb-2">Твій футбольний всесвіт</p>
        <p className="text-base opacity-75 mb-6">Челенджі • Матчі • Рейтинги • Друзі</p>
        
        <div className="flex items-center justify-center space-x-6 text-sm opacity-80">
          <div className="flex items-center space-x-1">
            <Trophy className="w-4 h-4" />
            <span>Змагайся</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>Знаходь друзів</span>
          </div>
          <div className="flex items-center space-x-1">
            <Target className="w-4 h-4" />
            <span>Розвивайся</span>
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => setCurrentScreen('auth')}
        className="bg-white text-gray-800 font-bold py-4 px-12 rounded-full text-lg w-full max-w-xs hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-2xl z-10"
      >
        🚀 Почати пригоду
      </button>
      
      <p className="text-xs opacity-60 mt-6 text-center z-10">
        Приєднуйся до спільноти футбольних ентузіастів
      </p>
    </div>
  );

  // AuthScreen - залишається без змін
  const AuthScreen = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      nickname: '',
      fullName: '',
      city: '',
      position: '',
      phone: '',
      telegram: '',
      age: '',
      bio: ''
    });

    const handleAuth = () => {
      const newUser = {
        id: 999,
        email: formData.email,
        nickname: isLogin ? 'Олександр Петренко' : formData.nickname,
        fullName: isLogin ? 'Олександр Петренко' : formData.fullName,
        city: isLogin ? 'Львів' : formData.city,
        position: isLogin ? 'Півзахисник' : formData.position,
        phone: isLogin ? '+380 67 890 12 34' : formData.phone,
        telegram: isLogin ? '@alex_football' : formData.telegram,
        age: isLogin ? 25 : parseInt(formData.age),
        bio: isLogin ? 'Люблю футбол!' : formData.bio,
        rating: 4.2,
        subscription: null,
        coins: 350,
        totalGames: 18,
        wins: 12,
        winRate: 67,
        lastGames: ['W', 'L', 'W', 'W', 'L']
      };
      setUser(newUser);
      setCurrentScreen('home');
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
        <button onClick={() => setCurrentScreen('welcome')} className="mb-6 p-2 hover:bg-white/50 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚽</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {isLogin ? 'З поверненням!' : 'Приєднуйся до нас'}
            </h2>
            <p className="text-gray-600">
              {isLogin ? 'Увійди в свій акаунт' : 'Створи свій профіль футболіста'}
            </p>
          </div>
          
          <div className="space-y-4 mb-6">
            <input
              type="email"
              placeholder="📧 Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-green-500 transition-colors bg-white/80 backdrop-blur-sm"
            />
            <input
              type="password"
              placeholder="🔒 Пароль"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-green-500 transition-colors bg-white/80 backdrop-blur-sm"
            />
            
            {!isLogin && (
              <>
                <input
                  type="text"
                  placeholder="👤 Повне ім'я"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-green-500 transition-colors bg-white/80 backdrop-blur-sm"
                />
                <input
                  type="text"
                  placeholder="🎮 Нікнейм"
                  value={formData.nickname}
                  onChange={(e) => setFormData({...formData, nickname: e.target.value})}
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-green-500 transition-colors bg-white/80 backdrop-blur-sm"
                />
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-green-500 transition-colors bg-white/80 backdrop-blur-sm"
                >
                  <option value="">🏙️ Оберіть місто</option>
                  {cities.slice(1).map(cityName => (
                    <option key={cityName} value={cityName}>{cityName}</option>
                  ))}
                </select>
                <select
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-green-500 transition-colors bg-white/80 backdrop-blur-sm"
                >
                  <option value="">⚽ Оберіть позицію</option>
                  <option value="Воротар">🥅 Воротар</option>
                  <option value="Захисник">🛡️ Захисник</option>
                  <option value="Півзахисник">⚖️ Півзахисник</option>
                  <option value="Нападник">🎯 Нападник</option>
                </select>
              </>
            )}
          </div>
          
          <button
            onClick={handleAuth}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-4 rounded-2xl mb-4 hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {isLogin ? '🚀 Увійти' : '⭐ Створити акаунт'}
          </button>
          
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="w-full text-gray-600 font-medium hover:text-green-600 transition-colors"
          >
            {isLogin ? 'Немає акаунту? 📝 Зареєструватися' : 'Вже є акаунт? 🔑 Увійти'}
          </button>
        </div>
      </div>
    );
  };
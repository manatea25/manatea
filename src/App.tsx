import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Play, 
  Star, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Search, 
  Trophy, 
  Video, 
  User, 
  Camera, 
  Check, 
  Phone, 
  MessageCircle, 
  Filter, 
  FileVideo, 
  Crown, 
  Heart, 
  Share, 
  UserPlus, 
  Shuffle, 
  Send, 
  ShoppingBag,
  X
} from 'lucide-react';

const GoalApp = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [user, setUser] = useState<any>(null);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [videoRatings, setVideoRatings] = useState<{[key: number]: number}>({});
  const [favorites, setFavorites] = useState(new Set([1, 2]));
  const [friends, setFriends] = useState(new Set([1, 2]));
  const [videoComments, setVideoComments] = useState<{[key: number]: any[]}>({
    1: [
      { id: 1, author: 'Максим П.', text: 'Класна техніка!', time: '2 хв тому' },
      { id: 2, author: 'Олег С.', text: 'Треба спробувати', time: '5 хв тому' }
    ]
  });
  const [newComment, setNewComment] = useState('');
  const [badges, setBadges] = useState([
    { id: 1, name: 'Золота зірка', icon: '⭐', description: 'Перший в рейтингу', price: 100, owned: false },
    { id: 2, name: 'Король воріт', icon: '🥅', description: 'За 10 голів', price: 150, owned: false },
    { id: 3, name: 'Асистент', icon: '🎯', description: 'За 15 передач', price: 120, owned: true },
    { id: 4, name: 'Захисник', icon: '🛡️', description: 'За оборону', price: 80, owned: false }
  ]);

  const shopItems = [
    {
      id: 'celebrity_review',
      name: 'Відгук від Андрія Шевченка',
      description: 'Отримай персональний відгук про свою гру',
      price: 500,
      icon: '⭐',
      status: 'coming_soon'
    },
    {
      id: 'sports_discount',
      name: 'Знижка на спорттовари',
      description: '20% знижка в партнерських магазинах',
      price: 50,
      icon: '🛒',
      status: 'available'
    }
  ];

  const videos = [
    { 
      id: 1, 
      title: 'Техніка ведення м\'яча', 
      author: 'Артем К.', 
      votes: 45, 
      views: 234,
      category: 'Фінти', 
      city: 'Львів', 
      isVideo: true,
      avgRating: 4.2,
      totalRatings: 15,
      likes: 87
    },
    { 
      id: 2, 
      title: 'Удар у дев\'ятку', 
      author: 'Максим П.', 
      votes: 32, 
      views: 156,
      category: 'Голи', 
      city: 'Київ', 
      isVideo: true,
      avgRating: 4.5,
      totalRatings: 23,
      likes: 124
    }
  ];

  const challenges = [
    { 
      id: 1, 
      title: 'Супер класний фінт Неймара', 
      author: 'Артем К.', 
      votes: 23, 
      likes: 87,
      rating: 4.5, 
      category: 'Фінти', 
      city: 'Львів', 
      coins: 50,
      isVideo: false
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
      participants: [
        { id: 1, name: 'Артем К.', position: 'Нападник', rating: 4.2 },
        { id: 2, name: 'Максим П.', position: 'Захисник', rating: 3.8 },
        { id: 3, name: 'Олег М.', position: 'Воротар', rating: 4.5 },
        { id: 4, name: 'Іван С.', position: 'Півзахисник', rating: 4.0 }
      ],
      teams: null,
      gameStarted: false,
      gameFinished: false,
      winnerTeam: null
    },
    { 
      id: 2, 
      title: 'Матч на Сихові', 
      date: '24.07.2025', 
      time: '19:00', 
      location: 'Львів, Сихів', 
      city: 'Львів',
      players: '4/8', 
      isMyMatch: false,
      participants: [
        { id: 5, name: 'Петро Д.', position: 'Нападник', rating: 3.9 },
        { id: 6, name: 'Сергій Л.', position: 'Захисник', rating: 4.1 }
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
      bio: 'Граю з дитинства. Люблю швидкі атаки.',
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
      bio: 'Надійний захисник з досвідом.',
      lastGames: ['L', 'W', 'W', 'L', 'W']
    },
    { 
      id: 3, 
      name: 'Олег М.', 
      fullName: 'Олег Мельник',
      position: 'Воротар', 
      rating: 4.3, 
      city: 'Львів', 
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
      features: ['Рейтинг видимий', 'Базова статистика']
    },
    {
      id: 'champions',
      name: 'Ліга Чемпіонів',
      price: 159,
      color: 'from-yellow-400 to-orange-500',
      features: ['Постійно видимий рейтинг', 'Необмежена кількість челенджів'],
      isPopular: true
    }
  ];

  const handleToggleFavorite = (playerId: number) => {
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

  const handleToggleFriend = (playerId: number) => {
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

  const handleVideoRating = (videoId: number, rating: number) => {
    setVideoRatings(prev => ({
      ...prev,
      [videoId]: rating
    }));
  };

  const handleAddComment = (videoId: number) => {
    if (newComment.trim()) {
      setVideoComments(prev => ({
        ...prev,
        [videoId]: [
          ...(prev[videoId] || []),
          {
            id: Date.now(),
            author: user?.nickname || 'Я',
            text: newComment,
            time: 'щойно'
          }
        ]
      }));
      setNewComment('');
    }
  };

  const getFriendsList = () => {
    return players.filter(p => friends.has(p.id));
  };

  const WelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-green-600 flex flex-col items-center justify-center p-6 text-white">
      <div className="text-center mb-12">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 mx-auto">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-2xl">
            ⚽
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">GoalApp</h1>
        <p className="text-lg opacity-90">Привіт! Вітаю на нашому проекті</p>
        <p className="text-base opacity-80 mt-2">Футбольні челенджі та матчі</p>
      </div>
      
      <button 
        onClick={() => setCurrentScreen('auth')}
        className="bg-white text-green-600 font-semibold py-4 px-8 rounded-full text-lg w-full max-w-xs hover:bg-gray-50 transition-colors"
      >
        Почати
      </button>
    </div>
  );

  const AuthScreen = () => {
    const [isLogin, setIsLogin] = useState(true);

    const handleAuth = () => {
      const newUser = {
        id: 999,
        nickname: 'Олександр Петренко',
        city: 'Львів',
        position: 'Півзахисник',
        rating: 4.2,
        subscription: null,
        coins: 350,
        totalGames: 18,
        wins: 12,
        winRate: 67
      };
      setUser(newUser);
      setCurrentScreen('home');
    };

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <button onClick={() => setCurrentScreen('welcome')} className="mb-6">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        
        <div className="max-w-sm mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            {isLogin ? 'Вхід' : 'Реєстрація'}
          </h2>
          
          <div className="space-y-4 mb-6">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
            />
            <input
              type="password"
              placeholder="Пароль"
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
            />
          </div>
          
          <button
            onClick={handleAuth}
            className="w-full bg-green-500 text-white font-semibold py-4 rounded-xl mb-4 hover:bg-green-600 transition-colors"
          >
            {isLogin ? 'Увійти' : 'Зареєструватися'}
          </button>
          
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="w-full text-green-500 font-medium"
          >
            {isLogin ? 'Немає акаунту? Зареєструватися' : 'Вже є акаунт? Увійти'}
          </button>
        </div>
      </div>
    );
  };

  const HomeScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold text-lg">⚽</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">GoalApp</h1>
              <p className="text-xs text-gray-500">Привіт, {user?.nickname}!</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setCurrentScreen('shop')}
              className="relative p-2 bg-yellow-100 rounded-full"
            >
              <ShoppingBag className="w-5 h-5 text-yellow-600" />
            </button>
            <button onClick={() => setCurrentScreen('profile')}>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-6 text-white mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-lg">Твоя статистика</h2>
              <p className="opacity-90 text-sm">Продовжуй грати!</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">💰 {user?.coins}</div>
              <p className="text-xs opacity-75">монет</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold">{user?.totalGames}</div>
              <div className="text-xs opacity-75">матчів</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{user?.wins}</div>
              <div className="text-xs opacity-75">перемог</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{user?.winRate}%</div>
              <div className="text-xs opacity-75">win rate</div>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <button
            onClick={() => setCurrentScreen('challenges')}
            className="w-full bg-white rounded-2xl p-6 shadow-sm text-left border-l-4 border-orange-500"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Video className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Відео та Челенджі</h3>
                <p className="text-sm text-gray-600">Дивись, створюй та заробляй монети</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">+10 за відео</span>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Призи до 500₴</span>
                </div>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => setCurrentScreen('matches')}
            className="w-full bg-white rounded-2xl p-6 shadow-sm text-left border-l-4 border-blue-500"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Матчі та Ігри</h3>
                <p className="text-sm text-gray-600">Знайди команду та грай поруч</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">4 матча сьогодні</span>
                </div>
              </div>
            </div>
          </button>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setCurrentScreen('ratings')}
              className="bg-white rounded-2xl p-4 shadow-sm text-left border-l-4 border-green-500"
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <Trophy className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold">Рейтинг</h3>
              <p className="text-xs text-gray-600">Топ гравці</p>
            </button>
            
            <button
              onClick={() => setCurrentScreen('friends')}
              className="bg-white rounded-2xl p-4 shadow-sm text-left border-l-4 border-purple-500"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <UserPlus className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold">Друзі</h3>
              <p className="text-xs text-gray-600">{getFriendsList().length} друзів</p>
            </button>
          </div>
        </div>

        {!user?.subscription && (
          <div className="bg-gradient-to-r from-purple-400 to-blue-500 p-4 rounded-xl text-white text-center">
            <h4 className="font-semibold mb-1">🆓 Безкоштовна версія</h4>
            <p className="text-xs opacity-90 mb-3">Рейтинг прихований • Обмежена функціональність</p>
            <button 
              onClick={() => setCurrentScreen('subscription')}
              className="bg-white text-purple-600 font-medium py-2 px-4 rounded-lg text-sm"
            >
              Підвищити до Pro
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const ChallengesScreen = () => {
    const [activeTab, setActiveTab] = useState('videos');
    const [categoryFilter, setCategoryFilter] = useState('Всі');
    
    const categories = ['Всі', 'Фінти', 'Голи', 'Передачі', 'Воротарство'];
    
    const filteredVideos = videos.filter(video => 
      categoryFilter === 'Всі' || video.category === categoryFilter
    );

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <button onClick={() => setCurrentScreen('home')}>
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold">Відео та Челенджі</h1>
            </div>
            <button
              onClick={() => setCurrentScreen('create-video')}
              className="bg-green-500 text-white p-2 rounded-full"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="flex border-b mb-4">
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex-1 py-2 text-center text-sm font-medium ${
                activeTab === 'videos'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500'
              }`}
            >
              📹 Відео ({videos.length})
            </button>
            <button
              onClick={() => setActiveTab('challenges')}
              className={`flex-1 py-2 text-center text-sm font-medium ${
                activeTab === 'challenges'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500'
              }`}
            >
              🏆 Челенджі ({challenges.length})
            </button>
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                  categoryFilter === category 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-6">
          {activeTab === 'videos' && (
            <div className="space-y-4">
              {filteredVideos.map(video => (
                <div key={video.id} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{video.title}</h3>
                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                        {video.category}
                      </span>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedVideo(video);
                        setCurrentScreen('video-details');
                      }}
                      className="bg-gray-100 p-2 rounded-full"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="bg-gray-200 h-32 rounded-lg mb-3 flex items-center justify-center relative">
                    <Play className="w-8 h-8 text-gray-500" />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                      {video.views} переглядів
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">від {video.author}</span>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm">{video.avgRating}</span>
                      <span className="text-xs text-gray-500">({video.totalRatings})</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-500">{video.city}</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-red-500">❤️ {video.likes}</span>
                      <span className="text-sm text-gray-500">👁 {video.views}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm">
                      👍 Лайк
                    </button>
                    <button className="flex-1 border border-green-500 text-green-500 py-2 rounded-lg text-sm">
                      💬 Коменти
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'challenges' && (
            <div className="space-y-4">
              {challenges.map(challenge => (
                <div key={challenge.id} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{challenge.title}</h3>
                      <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs">
                        {challenge.category}
                      </span>
                    </div>
                    <button className="bg-gray-100 p-2 rounded-full">
                      <Play className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="bg-gray-200 h-32 rounded-lg mb-3 flex items-center justify-center">
                    <Play className="w-8 h-8 text-gray-500" />
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">від {challenge.author}</span>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm">{challenge.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-500">{challenge.city}</span>
                    <span className="text-sm text-yellow-600">+{challenge.coins} монет</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm">
                      Участь (+10)
                    </button>
                    <button className="flex-1 border border-green-500 text-green-500 py-2 rounded-lg text-sm">
                      Виклик
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const VideoDetailsScreen = () => {
    const video = selectedVideo;
    if (!video) return null;

    const comments = videoComments[video.id] || [];

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white px-6 py-4 shadow-sm flex items-center space-x-3">
          <button onClick={() => setCurrentScreen('challenges')}>
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold">Відео</h1>
          <div className="flex-1"></div>
          <button>
            <Share className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="bg-white rounded-xl shadow-sm mb-6">
            <div className="bg-gray-200 h-64 rounded-t-xl flex items-center justify-center relative">
              <button className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg">
                <Play className="w-8 h-8 text-gray-700 ml-1" />
              </button>
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                {video.views} переглядів
              </div>
            </div>
            
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{video.title}</h2>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <span className="font-semibold">{video.author}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-gray-500">{video.avgRating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-1 bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                    <Heart className="w-4 h-4" />
                    <span>{video.likes}</span>
                  </button>
                  <button className="bg-gray-100 p-2 rounded-full">
                    <Share className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-medium mb-2">Оцініть відео:</div>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map(rating => (
                    <button
                      key={rating}
                      onClick={() => handleVideoRating(video.id, rating)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                        videoRatings[video.id] === rating
                          ? 'bg-yellow-500 border-yellow-500 text-white'
                          : 'border-gray-300 hover:border-yellow-400'
                      }`}
                    >
                      <Star className={`w-5 h-5 ${
                        videoRatings[video.id] === rating ? 'fill-current' : ''
                      }`} />
                    </button>
                  ))}
                </div>
                {videoRatings[video.id] && (
                  <div className="mt-2 text-sm text-green-600">
                    ✓ Дякуємо за оцінку! +2 монети
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 border-b">
              <h3 className="font-bold">Коментарі ({comments.length})</h3>
            </div>
            
            <div className="p-4">
              <div className="flex space-x-3 mb-4">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-500" />
                </div>
                <div className="flex-1 flex space-x-2">
                  <input
                    type="text"
                    placeholder="Додати коментар..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 p-2 border border-gray-200 rounded-lg text-sm"
                  />
                  <button
                    onClick={() => handleAddComment(video.id)}
                    disabled={!newComment.trim()}
                    className="bg-green-500 text-white px-3 py-2 rounded-lg disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                {comments.map(comment => (
                  <div key={comment.id} className="flex space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-sm">{comment.author}</span>
                          <span className="text-xs text-gray-500">{comment.time}</span>
                        </div>
                        <p className="text-sm">{comment.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const MatchesScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 py-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button onClick={() => setCurrentScreen('home')}>
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold">Матчі</h1>
        </div>
        <button
          onClick={() => setCurrentScreen('create-match')}
          className="bg-green-500 text-white p-2 rounded-full"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-6 space-y-4">
        {matches.map(match => (
          <div key={match.id} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">{match.title}</h3>
              <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">
                {match.players}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{match.date}</span>
                <Clock className="w-4 h-4 ml-2" />
                <span>{match.time}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{match.location}</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => {
                  setSelectedMatch(match);
                  setCurrentScreen('match-details');
                }}
                className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm"
              >
                {match.isMyMatch ? 'Управляти' : 'Приєднатися'}
              </button>
              <button className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-lg text-sm">
                Деталі
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const MatchDetailsScreen = () => {
    const match = selectedMatch;
    if (!match) return null;

    const [teamsShuffled, setTeamsShuffled] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);

    const shuffleTeams = () => {
      const shuffledParticipants = [...match.participants].sort(() => Math.random() - 0.5);
      const mid = Math.ceil(shuffledParticipants.length / 2);
      
      const newMatch = {
        ...match,
        teams: {
          team1: shuffledParticipants.slice(0, mid),
          team2: shuffledParticipants.slice(mid)
        }
      };
      
      setSelectedMatch(newMatch);
      setTeamsShuffled(true);
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white px-6 py-4 shadow-sm flex items-center space-x-3">
          <button onClick={() => setCurrentScreen('matches')}>
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold">Деталі матчу</h1>
        </div>
        
        <div className="p-6">
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="text-xl font-bold mb-4">{match.title}</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span>{match.date}</span>
                <Clock className="w-5 h-5 text-gray-500 ml-2" />
                <span>{match.time}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span>{match.location}</span>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Учасники: {match.participants.length}/10</h3>
                {!teamsShuffled && match.isMyMatch && (
                  <button 
                    onClick={shuffleTeams}
                    className="bg-purple-500 text-white px-3 py-1 rounded-lg text-sm flex items-center space-x-1"
                  >
                    <Shuffle className="w-4 h-4" />
                    <span>Шафл</span>
                  </button>
                )}
              </div>
              
              {!teamsShuffled ? (
                <div className="space-y-2">
                  {match.participants.map((participant: any) => (
                    <div key={participant.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-gray-500" />
                        </div>
                        <div>
                          <span className="font-medium">{participant.name}</span>
                          <span className="text-sm text-gray-500 ml-2">{participant.position}</span>
                        </div>
                      </div>
                      <span className="text-sm">⭐{participant.rating}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-blue-600 mb-2 text-center">Команда A</h4>
                    <div className="space-y-1">
                      {match.teams?.team1?.map((player: any) => (
                        <div key={player.id} className="text-sm">
                          <span className="font-medium">{player.name}</span>
                          <span className="text-gray-600 ml-1">({player.position})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-red-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-red-600 mb-2 text-center">Команда B</h4>
                    <div className="space-y-1">
                      {match.teams?.team2?.map((player: any) => (
                        <div key={player.id} className="text-sm">
                          <span className="font-medium">{player.name}</span>
                          <span className="text-gray-600 ml-1">({player.position})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-3">
            {!gameFinished ? (
              <>
                <button className="w-full bg-green-500 text-white py-4 rounded-xl font-semibold">
                  {match.isMyMatch ? 'Управляти матчем' : 'Приєднатися'}
                </button>
                {match.isMyMatch && teamsShuffled && (
                  <button 
                    onClick={() => setGameFinished(true)}
                    className="w-full bg-blue-500 text-white py-4 rounded-xl font-semibold"
                  >
                    Завершити матч
                  </button>
                )}
              </>
            ) : (
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-green-600">🎉 Матч завершено!</h3>
                  <p className="text-sm text-gray-600">Оцініть гравців</p>
                  <p className="text-xs text-green-600 mt-1">+50 монет за участь</p>
                </div>
                <button 
                  onClick={() => {
                    alert('Оцінки відправлені! +50 монет');
                    setUser({...user, coins: user.coins + 50});
                  }}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold"
                >
                  Оцінити гравців
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const RatingsScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 py-4 shadow-sm flex items-center space-x-3">
        <button onClick={() => setCurrentScreen('home')}>
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold">Рейтинг</h1>
      </div>
      
      <div className="p-6 space-y-4">
        {players.map((player, index) => (
          <div key={player.id} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-10 h-10 bg-green-500 text-white font-bold rounded-full">
                {index + 1}
              </div>
              
              <button 
                onClick={() => {
                  setSelectedPlayer(player);
                  setCurrentScreen('player-profile');
                }}
                className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                <User className="w-6 h-6 text-gray-500" />
              </button>
              
              <div className="flex-1">
                <h3 className="font-semibold">{player.name}</h3>
                <p className="text-sm text-gray-600">{player.position} • {player.city}</p>
                
                <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                  <span>{player.games} ігор</span>
                  <span className="text-green-600">{player.wins} перемог</span>
                  <span className={`${player.winRate >= 60 ? 'text-green-600' : player.winRate >= 40 ? 'text-yellow-600' : 'text-red-500'}`}>
                    {player.winRate}% WR
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-semibold">{player.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const PlayerProfileScreen = () => {
    const player = selectedPlayer;
    if (!player) return null;

    const [activeTab, setActiveTab] = useState('stats');

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white px-6 py-4 shadow-sm flex items-center space-x-3">
          <button onClick={() => setCurrentScreen('ratings')}>
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold">Профіль гравця</h1>
          <div className="flex-1"></div>
          <button
            onClick={() => handleToggleFavorite(player.id)}
            className={`p-2 rounded-full ${favorites.has(player.id) ? 'bg-red-100' : 'bg-gray-100'}`}
          >
            <Heart className={`w-5 h-5 ${favorites.has(player.id) ? 'text-red-500 fill-current' : 'text-gray-500'}`} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-gray-500" />
              </div>
              
              <div className="flex-1">
                <h2 className="text-xl font-bold">{player.fullName || player.name}</h2>
                <p className="text-gray-600">{player.position}</p>
                <p className="text-sm text-gray-500">{player.city} • {player.age} років</p>
                
                <div className="flex items-center space-x-1 mt-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-semibold">{player.rating}</span>
                </div>
              </div>
            </div>

            {player.bio && (
              <div className="mb-4">
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                  "{player.bio}"
                </p>
              </div>
            )}

            <div className="flex space-x-2 mb-4">
              <button className="flex-1 bg-green-500 text-white py-2 px-3 rounded-lg text-sm flex items-center justify-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>Подзвонити</span>
              </button>
              <button className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg text-sm flex items-center justify-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>Написати</span>
              </button>
              <button
                onClick={() => handleToggleFriend(player.id)}
                className={`px-3 py-2 rounded-lg text-sm flex items-center justify-center space-x-1 ${
                  friends.has(player.id) 
                    ? 'bg-gray-100 text-gray-600' 
                    : 'bg-purple-500 text-white'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>{friends.has(player.id) ? 'Друг' : 'Додати'}</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('stats')}
                className={`flex-1 py-3 text-center text-sm font-medium ${
                  activeTab === 'stats' 
                    ? 'text-green-600 border-b-2 border-green-600' 
                    : 'text-gray-500'
                }`}
              >
                Статистика
              </button>
              <button
                onClick={() => setActiveTab('games')}
                className={`flex-1 py-3 text-center text-sm font-medium ${
                  activeTab === 'games' 
                    ? 'text-green-600 border-b-2 border-green-600' 
                    : 'text-gray-500'
                }`}
              >
                Останні ігри
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'stats' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{player.games}</div>
                      <div className="text-xs text-gray-500">Ігор</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{player.wins}</div>
                      <div className="text-xs text-gray-500">Перемог</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{player.winRate}%</div>
                      <div className="text-xs text-gray-500">Win Rate</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'games' && (
                <div>
                  <h4 className="font-semibold mb-3">Останні 5 ігор:</h4>
                  <div className="flex space-x-2">
                    {player.lastGames?.map((result: string, index: number) => (
                      <div 
                        key={index}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                          result === 'W' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      >
                        {result}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const FriendsScreen = () => {
    const friendsList = getFriendsList();
    const suggestedFriends = players.filter(p => !friends.has(p.id) && p.id !== user?.id);

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white px-6 py-4 shadow-sm flex items-center space-x-3">
          <button onClick={() => setCurrentScreen('home')}>
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold">Друзі</h1>
        </div>
        
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4">Мої друзі ({friendsList.length})</h2>
            {friendsList.length === 0 ? (
              <div className="text-center py-8">
                <UserPlus className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">У вас поки немає друзів</p>
              </div>
            ) : (
              <div className="space-y-3">
                {friendsList.map(friend => (
                  <div key={friend.id} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{friend.name}</h3>
                        <p className="text-sm text-gray-600">{friend.position} • {friend.city}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs">{friend.rating}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => alert(`Запрошення надіслано ${friend.name}!`)}
                          className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm"
                        >
                          Запросити
                        </button>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm">
                          <MessageCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4">Рекомендовані друзі</h2>
            <div className="space-y-3">
              {suggestedFriends.slice(0, 5).map(player => (
                <div key={player.id} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{player.name}</h3>
                      <p className="text-sm text-gray-600">{player.position} • {player.city}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs">{player.rating}</span>
                        <span className="text-xs text-gray-500">• {player.games} ігор</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        handleToggleFriend(player.id);
                        alert(`${player.name} доданий до друзів!`);
                      }}
                      className="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-1"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Додати</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ShopScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 py-4 shadow-sm flex items-center space-x-3">
        <button onClick={() => setCurrentScreen('home')}>
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold">Магазин</h1>
        <div className="flex-1"></div>
        <div className="flex items-center space-x-2 bg-yellow-100 px-3 py-1 rounded-full">
          <span className="text-lg">💰</span>
          <span className="font-bold text-yellow-700">{user?.coins}</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">🏆 Беджі та досягнення</h2>
          <div className="grid grid-cols-2 gap-4">
            {badges.map(badge => (
              <div key={badge.id} className={`bg-white rounded-xl p-4 shadow-sm border-2 ${
                badge.owned ? 'border-green-500 bg-green-50' : 'border-gray-200'
              }`}>
                <div className="text-center">
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <h3 className="font-semibold text-sm">{badge.name}</h3>
                  <p className="text-xs text-gray-600 mb-3">{badge.description}</p>
                  {badge.owned ? (
                    <div className="bg-green-500 text-white py-2 px-3 rounded-lg text-xs font-medium">
                      ✓ Отримано
                    </div>
                  ) : (
                    <div className="bg-yellow-100 text-yellow-700 py-2 px-3 rounded-lg text-xs font-medium">
                      💰 {badge.price} монет
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4">🛍️ Спеціальні пропозиції</h2>
          <div className="space-y-4">
            {shopItems.map(item => (
              <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{item.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <div className="mt-2">
                      {item.status === 'available' ? (
                        <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">
                          💰 {item.price} монет
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          🔜 Незабаром
                        </span>
                      )}
                    </div>
                  </div>
                  <button 
                    disabled={item.status !== 'available'}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      item.status === 'available' 
                        ? 'bg-green-500 text-white hover:bg-green-600' 
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {item.status === 'available' ? 'Купити' : 'Незабаром'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ProfileScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 py-4 shadow-sm flex items-center space-x-3">
        <button onClick={() => setCurrentScreen('home')}>
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold">Профіль</h1>
      </div>
      
      <div className="p-6">
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-gray-500" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{user?.nickname}</h2>
              <p className="text-gray-600">{user?.position}</p>
              <p className="text-sm text-gray-500">{user?.city}</p>
              <div className="flex items-center space-x-1 mt-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-semibold">{user?.rating}</span>
              </div>
            </div>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm">
              Редагувати
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center mb-6">
            <div>
              <div className="text-2xl font-bold text-green-600">{user?.totalGames}</div>
              <div className="text-xs text-gray-500">Ігор</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{user?.wins}</div>
              <div className="text-xs text-gray-500">Перемог</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{user?.winRate}%</div>
              <div className="text-xs text-gray-500">Win Rate</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">💰</span>
              <div>
                <div className="font-bold text-yellow-700">{user?.coins} монет</div>
                <div className="text-xs text-gray-600">Доступно для витрат</div>
              </div>
            </div>
            <button 
              onClick={() => setCurrentScreen('shop')}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm"
            >
              Витратити
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => setCurrentScreen('subscription')}
            className="w-full bg-white rounded-xl p-4 shadow-sm text-left flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <Crown className="w-6 h-6 text-yellow-500" />
              <div>
                <h3 className="font-semibold">Підписка</h3>
                <p className="text-sm text-gray-600">
                  {user?.subscription ? `Активна: ${user.subscription}` : 'Безкоштовна версія'}
                </p>
              </div>
            </div>
            <div className="text-gray-400">→</div>
          </button>

          <button className="w-full bg-white rounded-xl p-4 shadow-sm text-left flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Trophy className="w-6 h-6 text-green-500" />
              <div>
                <h3 className="font-semibold">Досягнення</h3>
                <p className="text-sm text-gray-600">Переглянути всі беджі</p>
              </div>
            </div>
            <div className="text-gray-400">→</div>
          </button>

          <button className="w-full bg-white rounded-xl p-4 shadow-sm text-left flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-500 text-sm">⚙️</span>
              </div>
              <div>
                <h3 className="font-semibold">Налаштування</h3>
                <p className="text-sm text-gray-600">Конфіденційність та сповіщення</p>
              </div>
            </div>
            <div className="text-gray-400">→</div>
          </button>
        </div>
      </div>
    </div>
  );

  const SubscriptionScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 py-4 shadow-sm flex items-center space-x-3">
        <button onClick={() => setCurrentScreen('profile')}>
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold">Підписка</h1>
      </div>
      
      <div className="p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Оберіть свій план</h2>
          <p className="text-gray-600">Розблокуйте всі можливості GoalApp</p>
        </div>

        <div className="space-y-4 mb-8">
          {subscriptionPlans.map(plan => (
            <div key={plan.id} className={`relative bg-gradient-to-r ${plan.color} rounded-2xl p-6 text-white ${
              plan.isPopular ? 'ring-4 ring-yellow-300' : ''
            }`}>
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-xs font-bold">
                    🔥 ПОПУЛЯРНИЙ
                  </span>
                </div>
              )}
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-sm opacity-75">₴/міс</span>
                  </div>
                </div>
                <div className="text-4xl">🏆</div>
              </div>

              <div className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="w-4 h-4" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => {
                  setUser({...user, subscription: plan.name});
                  alert(`Підписка "${plan.name}" активована!`);
                  setCurrentScreen('home');
                }}
                className="w-full bg-white bg-opacity-20 backdrop-blur-sm text-white font-semibold py-3 rounded-xl hover:bg-opacity-30 transition-colors"
              >
                Обрати план
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">
            Підписку можна скасувати будь-коли
          </p>
          <button 
            onClick={() => setCurrentScreen('home')}
            className="text-gray-500 text-sm underline"
          >
            Продовжити з безкоштовною версією
          </button>
        </div>
      </div>
    </div>
  );

  // Render the current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'auth':
        return <AuthScreen />;
      case 'home':
        return <HomeScreen />;
      case 'challenges':
        return <ChallengesScreen />;
      case 'video-details':
        return <VideoDetailsScreen />;
      case 'matches':
        return <MatchesScreen />;
      case 'match-details':
        return <MatchDetailsScreen />;
      case 'ratings':
        return <RatingsScreen />;
      case 'player-profile':
        return <PlayerProfileScreen />;
      case 'friends':
        return <FriendsScreen />;
      case 'shop':
        return <ShopScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'subscription':
        return <SubscriptionScreen />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {renderScreen()}
    </div>
  );
};

export default GoalApp;
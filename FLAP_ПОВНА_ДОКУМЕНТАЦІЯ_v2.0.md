# 📱 FLAP - ПОВНА ДОКУМЕНТАЦІЯ v2.0
## Feel Like A Pro - Детальна специфікація проекту

---

## 📖 ЗМІСТ

1. [Загальний огляд проекту](#загальний-огляд)
2. [Система рейтингів](#система-рейтингів)
3. [Економічна система (монети)](#економічна-система)
4. [Система підписок](#система-підписок)
5. [Функціональні модулі](#функціональні-модулі)
6. [База даних](#база-даних)
7. [План розробки у FlutterFlow](#план-розробки-flutterflow)
8. [Технічна реалізація](#технічна-реалізація)

---

## 🎯 ЗАГАЛЬНИЙ ОГЛЯД

### Концепція проекту
**FLAP** - це соціальна мережа для футбольних аматорів, що поєднує:
- Пошук гравців та організацію матчів
- Відео-демонстрацію навичок через челенджі
- Справедливу систему рейтингів
- Геймифіковану економіку з монетами
- Преміум підписки для розширених можливостей

### Унікальна цінність
- **Відео-центричний підхід**: не текстові профілі, а живі демонстрації навичок
- **Справедливий баланс**: автоматичний розподіл команд за рейтингами
- **Прогресивна система**: постійний розвиток через челенджі та оцінки
- **Локальне комьюніті**: реальні зустрічі в межах міста

---

## ⭐ СИСТЕМА РЕЙТИНГІВ

### Базова шкала: 0.0 - 5.0
```
🔴 0.0-1.5 = Новачок
🟠 1.6-2.5 = Початківець  
🟡 2.6-3.5 = Середній
🟢 3.6-4.5 = Досвідчений
🔵 4.6-5.0 = Професіонал
```

### Джерела формування рейтингу

#### 1. Після-матчеві оцінки (70% ваги)
**Процес:**
1. Після завершення матчу кожен гравець ОБОВ'ЯЗКОВО оцінює всіх гравців своєї команди
2. Оцінка по шкалі 0.0-5.0 (слайдер з кроком 0.01)
3. Критерії оцінки:
   - Технічні навички (передачі, дриблінг, удари)
   - Фізична підготовка (витривалість, швидкість)
   - Тактичне мислення (позиціонування, рішення)
   - Командна гра (комунікація, взаємодія)
   - Загальний внесок у гру

**Алгоритм розрахунку:**
```javascript
newRating = (currentRating × 0.85) + (averageMatchRating × 0.15)
```

**Обмеження:**
- Максимальна зміна за матч: ±0.3
- Мінімум 3 оцінки для зарахування
- Захист від накрутки (не можна оцінювати одного гравця частіше 1 разу на тиждень)

#### 2. Відео та челенджі (30% ваги)
**Звичайні відео (15% від загальної ваги):**
- Користувачі голосують за відео по шкалі 0.0-5.0
- Мінімум 5 голосів для зарахування
- Вага зменшується з часом (свіжі відео мають більший вплив)

**Челенджі (15% від загальної ваги):**
- Спеціальні завдання з конкретними критеріями
- Голосування комьюніті за виконання
- Бонус за перемогу в челенджі (+0.1 до рейтингу)

**Алгоритм розрахунку:**
```javascript
videoImpact = (videoRating - currentRating) × 0.05
challengeImpact = (challengeRating - currentRating) × 0.08
newRating = currentRating + videoImpact + challengeImpact
```

### Динаміка рейтингу

#### Швидкий старт (перші 5 матчів)
- Подвійна вага оцінок для нових гравців
- Стартовий рейтинг: 2.5
- Максимальна зміна за матч: ±0.5

#### Стабілізація (після 5+ матчів)
- Стандартна вага оцінок
- Максимальна зміна за матч: ±0.3
- Захист від різких стрибків

### Антифрод система
**Детекція підозрілої активності:**
- Різке зростання рейтингу (+1.0 за день)
- Оцінки тільки від одних і тих же гравців
- Матчі з аномально високими оцінками
- Голосування за відео з одного IP

**Покарання:**
1. Попередження + заморозка рейтингу на тиждень
2. Зниження рейтингу на 0.5 + місяць заморозки
3. Скидання до 2.0 + 3 місяці заморозки
4. Бан акаунту

---

## 💰 ЕКОНОМІЧНА СИСТЕМА (МОНЕТИ)

### Заробіток монет

#### Відео контент
```javascript
📹 Завантаження звичайного відео: +5 монет
   └ Обмеження: максимум 3 відео на день
   └ Штраф: -10 монет за видалення через спам

🎯 Прийняття челенджу + відео: +20 монет  
   └ Обмеження: максимум 1 челендж на день
   └ Бонус: +10 монет якщо середня оцінка >4.0

🏆 Перемога в челенджі: +30 монет
   └ Найвище оцінене відео тижня
```

#### Матчі
```javascript
🏃‍♂️ Участь у матчі: +10 монет
   └ Тільки після завершення зі счетом
   └ Штраф: -15 монет за no-show

📊 Оцінка всіх гравців команди: +5 монет
   └ Обов'язково оцінити ВСІХ
```

#### Досягнення (разові)
```javascript
⭐ Рейтинг 4.0: +50 монет
🏆 10 матчів: +30 монет  
📹 20 відео: +40 монет
🎯 3 перемоги в челенджах: +60 монет
```

### Витрачання монет

#### Бейджі
```javascript
🥉 Rookie: 50 монет
⚽ Striker: 75 монет  
🛡️ Defender: 75 монет
🎯 Playmaker: 100 монет
👑 Legend: 150 монет
🏆 Champion: 200 монет
```

#### Функціональні переваги
```javascript
📊 Фільтр відео по рейтингу: 20 монет
🎯 Фільтр челенджів: 15 монет
🏆 Фільтр гравців: 25 монет
📝 Коментар до відео: 2 монети
👍 Лайк відео: 1 монета
📌 Закріпити відео в профілі: 30 монет
🔥 Промо-позиція відео: 40 монет
```

### Покупка монет
```javascript
💎 Малий: 50 монет = 25 UAH (0.5 UAH/монета)
🚀 Середній: 120 монет = 50 UAH (0.42 UAH/монета) 
⭐ Великий: 300 монет = 100 UAH (0.33 UAH/монета)
👑 Мега: 700 монет = 200 UAH (0.29 UAH/монета)
```

### Економічний баланс
**Активний гравець (щодня 1 година):**
- Заробіток: ~1000 монет/місяць
- Потреба: ~760 монет/місяць (базові потреби)
- Дефіцит для преміум функцій: 200-500 монет

---

## 💎 СИСТЕМА ПІДПИСОК

### Ліга Європи (49 UAH/місяць)
```javascript
✅ Видимий рейтинг всіх гравців
✅ 5 челенджів на місяць  
✅ +30 монет щомісяця
✅ Можливість коментувати відео
✅ Додаткові фільтри (рейтинг, місто)
✅ Синя позначка біля імені
```

### Ліга Чемпіонів (89 UAH/місяць)
```javascript
✅ Все з Ліги Європи +
✅ Необмежені челенджі
✅ +60 монет щомісяця  
✅ Знижка 20% на покупку монет
✅ Пріоритет у пошуку матчів
✅ Створення приватних матчів
✅ Детальна статистика прогресу
✅ Золота позначка біля імені
```

### Безкоштовна версія (обмежена)
```javascript
✅ Базовий функціонал
✅ 1 челендж на місяць
❌ Рейтинги інших приховані
❌ Немає фільтрів пошуку
❌ Немає коментарів
❌ Немає статистики
```

---

## 🔧 ФУНКЦІОНАЛЬНІ МОДУЛІ

### 1. Авторизація та профіль
**Реєстрація:**
- Google Sign-In
- Facebook Login
- Номер телефону + SMS код

**Профіль:**
- Аватар (завантаження фото або емодзі)
- Основна інформація (ім'я, позиція, місто)
- Контакти (телефон, Telegram, Instagram)
- Статистика (матчі, голи, асисти)
- Рейтинг та позиція в лідерборді
- Колекція бейджів

### 2. Відео система
**Завантаження:**
- Вибір з галереї або зйомка
- Автоматичне стиснення
- Завантаження в Firebase Storage
- Модерація контенту

**Перегляд:**
- Відео плеєр з контролами
- Система голосування (слайдер 0.0-5.0)
- Коментарі (для преміум)
- Лайки та поділитися

### 3. Система челенджів
**Типи челенджів:**
- Точність ударів
- Дриблінг
- Передачі на дистанцію
- Жонглювання
- Фінти та трюки

**Процес:**
1. Користувач обирає челендж
2. Записує відео виконання
3. Завантажує з описом
4. Комьюніті голосує
5. Визначається переможець

### 4. Система матчів
**Створення матчу:**
- Дата, час, місце
- Кількість гравців
- Рівень складності
- Опис та правила

**Управління:**
- Список заявок (прийняті/в очікуванні/відхилені)
- Автобаланс команд за рейтингом
- Генерація назв команд
- Введення фінального рахунку

**Після матчу:**
- Обов'язкове оцінювання всіх гравців своєї команди
- Нарахування монет
- Оновлення рейтингів
- Збереження статистики

### 5. Пошук та фільтри
**Базовий пошук:**
- Пошук гравців за іменем
- Фільтр за містом
- Сортування за рейтингом

**Преміум фільтри:**
- Фільтр за рейтингом (тільки 4.0+)
- Фільтр за позицією
- Фільтр за активністю
- Розширений пошук

### 6. Магазин
**Розділи:**
- Підписки (Ліга Європи/Чемпіонів)
- Монети (різні пакети)
- Бейджі (за монети)
- Експерт огляд (Coming Soon)
- Спортивні товари (Coming Soon)

---

## 🗄️ БАЗА ДАНИХ

### Firestore колекції

#### Users
```javascript
{
  id: "user123",
  email: "user@example.com",
  name: "Максим Коваль",
  avatar: "avatar_url" | "emoji",
  position: "midfielder",
  city: "Київ",
  phone: "+380501234567",
  telegram: "@maksym_koval",
  instagram: "@maksym_football",
  
  // Рейтинг та статистика
  rating: 4.2,
  matches_played: 23,
  goals: 12,
  assists: 8,
  
  // Економіка
  coins: 150,
  subscription: "europa" | "champions" | null,
  subscription_expires: timestamp,
  badges: ["rookie", "striker"],
  
  // Налаштування
  created_at: timestamp,
  last_active: timestamp,
  is_banned: false
}
```

#### Videos
```javascript
{
  id: "video123",
  user_id: "user123",
  title: "Мій дриблінг",
  description: "Обведення 5 конусів",
  video_url: "storage_url",
  thumbnail_url: "thumbnail_url",
  
  // Челендж (якщо є)
  challenge_id: "challenge456" | null,
  challenge_name: "Точність ударів",
  
  // Рейтинг
  votes: [
    {user_id: "user789", rating: 4.5, timestamp: timestamp}
  ],
  average_rating: 4.2,
  total_votes: 15,
  
  created_at: timestamp,
  is_approved: true
}
```

#### Matches
```javascript
{
  id: "match123",
  creator_id: "user123",
  title: "Футбол у парку",
  description: "Дружній матч",
  
  // Деталі
  date: timestamp,
  location: "Парк Шевченка, Київ",
  max_players: 12,
  difficulty_level: "intermediate",
  
  // Учасники
  players: {
    accepted: ["user123", "user456"],
    pending: ["user789"],
    rejected: ["user101"]
  },
  
  // Команди (після автобалансу)
  teams: {
    team1: {
      name: "Барселона",
      players: ["user123", "user456"],
      average_rating: 4.1
    },
    team2: {
      name: "Реал Мадрид", 
      players: ["user789", "user101"],
      average_rating: 4.0
    }
  },
  
  // Результат
  final_score: {team1: 3, team2: 2},
  is_finished: true,
  
  created_at: timestamp
}
```

#### Match_Ratings
```javascript
{
  id: "rating123",
  match_id: "match123",
  rater_id: "user123",
  rated_user_id: "user456",
  rating: 4.5,
  timestamp: timestamp
}
```

#### Challenges
```javascript
{
  id: "challenge123",
  name: "Точність ударів",
  description: "Влучити в ворота з 20 метрів 3 рази поспіль",
  icon: "🎯",
  difficulty: "intermediate",
  reward_coins: 20,
  is_active: true,
  created_at: timestamp
}
```

#### Transactions
```javascript
{
  id: "transaction123",
  user_id: "user123",
  type: "earn" | "spend" | "purchase",
  amount: 50,
  description: "Завантаження відео",
  item_id: "badge_striker" | null,
  timestamp: timestamp
}
```

---

## 🚀 ПЛАН РОЗРОБКИ У FLUTTERFLOW

### Етап 1: Основа (Тижні 1-2)

#### Створення проекту
1. **Новий проект FlutterFlow**
   - Назва: "FLAP"
   - Тип: Mobile App
   - Backend: Firebase

2. **Налаштування Firebase**
   - Authentication (Google, Facebook, Phone)
   - Firestore Database
   - Storage для відео
   - Cloud Functions

3. **Базова навігація**
   - Bottom Navigation Bar (5 вкладок)
   - App Bar з логотипом та монетами
   - Drawer menu (бургер меню)

#### Екрани та компоненти
**Welcome Screen:**
- Logo та слоган
- Кнопки "Увійти" та "Реєстрація"
- Фонове відео або анімація

**Authentication:**
- Google Sign-In button
- Facebook Login button
- Phone number input + SMS verification
- Terms & Privacy links

**Profile Creation:**
- Avatar picker (camera/gallery/emoji)
- Name, position, city inputs
- Contact info (phone, telegram, instagram)
- Save button

### Етап 2: Основний функціонал (Тижні 3-4)

#### Home Screen
**Компоненти:**
- Header з монетами та кнопкою магазину
- Секція "Рекомендовані відео"
- Секція "Активні челенджі"
- Секція "Найближчі матчі"
- FAB кнопка для швидких дій

**Custom Actions потрібні:**
```dart
// Завантаження контенту для головної
Future<Map<String, dynamic>> loadHomeContent() async {
  var videos = await getRecommendedVideos();
  var challenges = await getActiveChallenges();
  var matches = await getNearbyMatches();
  
  return {
    'videos': videos,
    'challenges': challenges,
    'matches': matches
  };
}
```

#### Videos Screen
**Компоненти:**
- Фільтри (All, Challenges, My Videos)
- ListView з відео картками
- Video Player widget
- Rating slider (0.0-5.0)
- Comments section (premium only)

**Custom Actions:**
```dart
// Голосування за відео
Future<void> voteForVideo(String videoId, double rating) async {
  // Перевірка чи вже голосував
  var existingVote = await checkExistingVote(videoId, currentUserId);
  if (existingVote != null) return;
  
  // Збереження голосу
  await saveVideoVote(videoId, currentUserId, rating);
  
  // Оновлення середнього рейтингу
  await updateVideoRating(videoId);
  
  // Оновлення рейтингу автора відео
  await updateUserRatingFromVideo(videoId);
}

// Завантаження відео
Future<String> uploadVideo(String filePath, String title, String description) async {
  // Завантаження в Firebase Storage
  var downloadUrl = await uploadToStorage(filePath);
  
  // Створення запису в Firestore
  await createVideoRecord({
    'title': title,
    'description': description,
    'video_url': downloadUrl,
    'user_id': currentUserId,
    'created_at': FieldValue.serverTimestamp()
  });
  
  // Нарахування монет
  await earnCoins(currentUserId, 'upload_video');
  
  return downloadUrl;
}
```

#### Challenges Screen
**Компоненти:**
- ListView з активними челенджами
- Challenge card з описом та іконкою
- "Accept Challenge" button
- Video upload для виконання
- Leaderboard для кожного челенджу

**Custom Actions:**
```dart
// Прийняття челенджу
Future<void> acceptChallenge(String challengeId) async {
  // Перевірка ліміту челенджів
  var userSubscription = await getUserSubscription(currentUserId);
  var challengesThisMonth = await getUserChallengesThisMonth(currentUserId);
  
  if (userSubscription == null && challengesThisMonth >= 1) {
    throw Exception('Потрібна підписка для більше челенджів');
  }
  
  if (userSubscription == 'europa' && challengesThisMonth >= 5) {
    throw Exception('Ліміт челенджів для Ліги Європи');
  }
  
  // Створення запису
  await createChallengeParticipation(challengeId, currentUserId);
}

// Завантаження відео для челенджу
Future<void> submitChallengeVideo(String challengeId, String videoPath) async {
  // Завантаження відео
  var videoUrl = await uploadVideo(videoPath, "Challenge video", "");
  
  // Оновлення запису челенджу
  await updateChallengeSubmission(challengeId, currentUserId, videoUrl);
  
  // Нарахування монет
  await earnCoins(currentUserId, 'accept_challenge');
}
```

### Етап 3: Матчі та рейтинги (Тижні 5-6)

#### Matches Screen
**Компоненти:**
- Фільтри (All, My Matches, Nearby)
- ListView з матчами
- Match detail modal
- "Join Match" button
- Create match FAB

**Custom Actions:**
```dart
// Створення матчу
Future<String> createMatch(Map<String, dynamic> matchData) async {
  var matchId = await FirebaseFirestore.instance
    .collection('matches')
    .add({
      'creator_id': currentUserId,
      'title': matchData['title'],
      'description': matchData['description'],
      'date': matchData['date'],
      'location': matchData['location'],
      'max_players': matchData['max_players'],
      'players': {
        'accepted': [currentUserId],
        'pending': [],
        'rejected': []
      },
      'created_at': FieldValue.serverTimestamp()
    });
    
  return matchId.id;
}

// Приєднання до матчу
Future<void> joinMatch(String matchId) async {
  await FirebaseFirestore.instance
    .collection('matches')
    .doc(matchId)
    .update({
      'players.pending': FieldValue.arrayUnion([currentUserId])
    });
}

// Автобаланс команд
Future<Map<String, dynamic>> autoBalanceTeams(List<String> playerIds) async {
  // Отримання рейтингів гравців
  var players = await getPlayersWithRatings(playerIds);
  
  // Сортування за рейтингом
  players.sort((a, b) => b['rating'].compareTo(a['rating']));
  
  // Розподіл по командах (алгоритм змійки)
  List<Map<String, dynamic>> team1 = [];
  List<Map<String, dynamic>> team2 = [];
  
  for (int i = 0; i < players.length; i++) {
    if (i % 4 < 2) {
      team1.add(players[i]);
    } else {
      team2.add(players[i]);
    }
  }
  
  // Генерація назв команд
  var teamNames = generateTeamNames();
  
  return {
    'team1': {
      'name': teamNames[0],
      'players': team1,
      'average_rating': calculateAverageRating(team1)
    },
    'team2': {
      'name': teamNames[1], 
      'players': team2,
      'average_rating': calculateAverageRating(team2)
    }
  };
}
```

#### Rating System
**Custom Actions:**
```dart
// Оцінка гравців після матчу
Future<void> ratePlayersAfterMatch(String matchId, Map<String, double> ratings) async {
  var batch = FirebaseFirestore.instance.batch();
  
  // Збереження всіх оцінок
  for (var entry in ratings.entries) {
    var ratingRef = FirebaseFirestore.instance
      .collection('match_ratings')
      .doc();
      
    batch.set(ratingRef, {
      'match_id': matchId,
      'rater_id': currentUserId,
      'rated_user_id': entry.key,
      'rating': entry.value,
      'timestamp': FieldValue.serverTimestamp()
    });
  }
  
  await batch.commit();
  
  // Оновлення рейтингів користувачів
  for (var userId in ratings.keys) {
    await updateUserRatingAfterMatch(userId);
  }
  
  // Нарахування монет за оцінку
  await earnCoins(currentUserId, 'rate_players');
}

// Розрахунок нового рейтингу користувача
Future<void> updateUserRatingAfterMatch(String userId) async {
  // Отримання всіх оцінок користувача
  var matchRatings = await getRecentMatchRatings(userId, limit: 10);
  var videoRatings = await getRecentVideoRatings(userId, limit: 20);
  
  if (matchRatings.isEmpty && videoRatings.isEmpty) return;
  
  // Розрахунок зваженого рейтингу
  double matchAverage = calculateAverage(matchRatings);
  double videoAverage = calculateAverage(videoRatings);
  
  double newRating = (matchAverage * 0.7) + (videoAverage * 0.3);
  
  // Обмеження зміни
  var currentRating = await getCurrentUserRating(userId);
  var maxChange = 0.3;
  
  if ((newRating - currentRating).abs() > maxChange) {
    newRating = currentRating + (maxChange * (newRating > currentRating ? 1 : -1));
  }
  
  // Оновлення в базі
  await FirebaseFirestore.instance
    .collection('users')
    .doc(userId)
    .update({'rating': newRating});
}
```

### Етап 4: Економіка та магазин (Тижні 7-8)

#### Coins System
**Custom Actions:**
```dart
// Нарахування монет
Future<void> earnCoins(String userId, String action) async {
  int coinsToAdd = 0;
  
  switch (action) {
    case 'upload_video':
      // Перевірка денного ліміту
      var videosToday = await getUserVideosToday(userId);
      if (videosToday >= 3) return;
      coinsToAdd = 5;
      break;
      
    case 'accept_challenge':
      coinsToAdd = 20;
      break;
      
    case 'win_challenge':
      coinsToAdd = 30;
      break;
      
    case 'complete_match':
      coinsToAdd = 10;
      break;
      
    case 'rate_players':
      coinsToAdd = 5;
      break;
  }
  
  if (coinsToAdd > 0) {
    // Оновлення балансу
    await FirebaseFirestore.instance
      .collection('users')
      .doc(userId)
      .update({
        'coins': FieldValue.increment(coinsToAdd)
      });
    
    // Запис транзакції
    await recordTransaction(userId, 'earn', coinsToAdd, action);
  }
}

// Витрачання монет
Future<bool> spendCoins(String userId, int amount, String item) async {
  var userDoc = await FirebaseFirestore.instance
    .collection('users')
    .doc(userId)
    .get();
    
  var currentCoins = userDoc.data()?['coins'] ?? 0;
  
  if (currentCoins < amount) {
    return false; // Недостатньо монет
  }
  
  // Списання монет
  await FirebaseFirestore.instance
    .collection('users')
    .doc(userId)
    .update({
      'coins': FieldValue.increment(-amount)
    });
  
  // Надання предмету/послуги
  await giveReward(userId, item);
  
  // Запис транзакції
  await recordTransaction(userId, 'spend', amount, item);
  
  return true;
}

// Покупка бейджу
Future<void> buyBadge(String badgeType, int cost) async {
  var success = await spendCoins(currentUserId, cost, badgeType);
  
  if (success) {
    // Додавання бейджу до колекції
    await FirebaseFirestore.instance
      .collection('users')
      .doc(currentUserId)
      .update({
        'badges': FieldValue.arrayUnion([badgeType])
      });
      
    // Показ успішного повідомлення
    showSuccessToast("Бейдж '$badgeType' придбано!");
  } else {
    showErrorToast("Недостатньо монет!");
  }
}
```

#### Store Screen
**Компоненти:**
- Tabs (Підписки, Монети, Бейджі)
- Subscription cards з Revenue Cat
- Coins packages з in-app purchases
- Badges grid з ціною в монетах

**Revenue Cat Integration:**
```dart
// Налаштування підписок
Future<void> initializeRevenueCat() async {
  await Purchases.setDebugLogsEnabled(true);
  await Purchases.configure(PurchasesConfiguration("your_api_key"));
}

// Покупка підписки
Future<void> purchaseSubscription(String packageId) async {
  try {
    var offerings = await Purchases.getOfferings();
    var package = offerings.current?.getPackage(packageId);
    
    if (package != null) {
      var purchaserInfo = await Purchases.purchasePackage(package);
      
      // Оновлення статусу підписки в Firestore
      await updateUserSubscription(currentUserId, packageId);
      
      showSuccessToast("Підписка активована!");
    }
  } catch (e) {
    showErrorToast("Помилка покупки: $e");
  }
}
```

### Етап 5: Фінальне налаштування (Тиждень 9)

#### Push Notifications
```dart
// Налаштування FCM
Future<void> initializeNotifications() async {
  FirebaseMessaging messaging = FirebaseMessaging.instance;
  
  // Запит дозволу
  await messaging.requestPermission();
  
  // Отримання токену
  String? token = await messaging.getToken();
  
  // Збереження токену в Firestore
  await saveUserFCMToken(currentUserId, token);
  
  // Обробка повідомлень
  FirebaseMessaging.onMessage.listen((RemoteMessage message) {
    showLocalNotification(message);
  });
}

// Відправка повідомлення
Future<void> sendNotification(String userId, String title, String body) async {
  var userToken = await getUserFCMToken(userId);
  
  if (userToken != null) {
    await sendFCMMessage(userToken, title, body);
  }
}
```

#### Performance Optimization
```dart
// Кешування даних
Future<void> cacheUserData() async {
  var userData = await getCurrentUserData();
  await SharedPreferences.getInstance()
    .then((prefs) => prefs.setString('user_data', jsonEncode(userData)));
}

// Lazy loading для списків
Widget buildVideosList() {
  return LazyLoadScrollView(
    onEndOfPage: () => loadMoreVideos(),
    child: ListView.builder(
      itemCount: videos.length,
      itemBuilder: (context, index) => VideoCard(videos[index]),
    ),
  );
}
```

---

## 🔧 ТЕХНІЧНА РЕАЛІЗАЦІЯ

### Firebase Setup
1. **Authentication:**
   - Google Provider
   - Facebook Provider  
   - Phone Provider
   - Anonymous (для гостей)

2. **Firestore Rules:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Користувачі можуть читати/писати тільки свої дані
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Відео можуть читати всі, писати тільки автори
    match /videos/{videoId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        (resource == null || resource.data.user_id == request.auth.uid);
    }
    
    // Матчі можуть читати всі, писати тільки учасники
    match /matches/{matchId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        (resource == null || 
         resource.data.creator_id == request.auth.uid ||
         request.auth.uid in resource.data.players.accepted);
    }
  }
}
```

3. **Storage Rules:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /videos/{userId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /avatars/{userId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Cloud Functions
```javascript
// Оновлення рейтингу після нової оцінки
exports.updateRatingOnNewVote = functions.firestore
  .document('video_votes/{voteId}')
  .onCreate(async (snap, context) => {
    const vote = snap.data();
    
    // Оновлення середнього рейтингу відео
    await updateVideoAverageRating(vote.video_id);
    
    // Оновлення рейтингу автора відео
    await updateUserRating(vote.video_author_id);
  });

// Нарахування монет за активність
exports.earnCoinsOnActivity = functions.firestore
  .document('videos/{videoId}')
  .onCreate(async (snap, context) => {
    const video = snap.data();
    
    // Перевірка денного ліміту
    const videosToday = await getUserVideosToday(video.user_id);
    
    if (videosToday <= 3) {
      await earnCoins(video.user_id, 5, 'upload_video');
    }
  });

// Автоматичне завершення матчів
exports.autoFinishMatches = functions.pubsub
  .schedule('every 1 hours')
  .onRun(async (context) => {
    const overdueMatches = await getOverdueMatches();
    
    for (const match of overdueMatches) {
      await finishMatch(match.id, 'auto');
    }
  });
```

### Performance Considerations
1. **Pagination:** Використання `limit()` та `startAfter()` для великих списків
2. **Caching:** SharedPreferences для користувацьких даних
3. **Image Optimization:** Автоматичне стиснення зображень
4. **Lazy Loading:** Завантаження контенту по мірі потреби
5. **Offline Support:** Firestore offline persistence

### Security Measures
1. **Input Validation:** Перевірка всіх введених даних
2. **Rate Limiting:** Обмеження частоти запитів
3. **Content Moderation:** Перевірка завантажуваного контенту
4. **Fraud Detection:** Аналіз підозрілої активності
5. **Data Encryption:** Шифрування чутливих даних

---

## 🎯 ВИСНОВОК

Цей документ містить повну специфікацію проекту FLAP з детальним планом реалізації у FlutterFlow. Всі системи спроектовані для максимальної ефективності та користувацького досвіду, з урахуванням особливостей українського ринку.

**Ключові переваги архітектури:**
- Масштабованість (Firebase backend)
- Безпека (правила доступу та валідація)
- Продуктивність (кешування та оптимізація)
- Монетизація (підписки + in-app purchases)
- Соціальна взаємодія (рейтинги та челенджі)

**Очікувані результати:**
- Активна користувацька база 10,000+ користувачів
- Конверсія в підписки 5-10%
- Середній дохід на користувача 50-100 UAH/місяць
- Високий retention rate завдяки геймифікації

---

*Документ створено: 2024*  
*Версія: 2.0*  
*Автор: AI Assistant для проекту FLAP*
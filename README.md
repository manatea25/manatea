# FLAP - Feel Like A Pro 🏆⚽

**Українська футбольна соціальна мережа** - мобільний застосунок на Flutter

## 📱 Опис

FLAP - це перша в Україні мобільна платформа, що об'єднує відео-челенджі, матчмейкінг та справедливу систему рейтингів для футболістів-аматорів.

### ✨ Поточні функції (MVP)

- **🔐 Система авторизації**
  - Вхід через email/телефон + пароль
  - Соціальний вхід (Google, Facebook) 
  - Реєстрація з валідацією

- **👤 Створення профілю**
  - Завантаження аватара
  - Вибір міста та позиції на полі
  - Збереження даних локально

- **🎮 Вибір режимів гри**
  - **ВІДЕО режим** - для відео-челенджів та контенту
  - **МАТЧІ режим** - для організації футбольних матчів
  - Анімований інтерфейс з градієнтами

### 🎨 Дизайн

Повністю відповідає оригінальному HTML дизайну з файлу `first.html`:
- Зелені градієнти в футбольній тематиці
- Плавні анімації та переходи
- Responsive дизайн для всіх екранів
- Material Design 3 компоненти

## 🚀 Швидкий старт

### Вимоги

- Flutter SDK 3.0.0+
- Dart SDK 3.0.0+
- Android Studio / VS Code
- Android SDK / iOS SDK

### Встановлення

1. **Клонуйте репозиторій**
```bash
git clone https://github.com/your-username/flap-app.git
cd flap-app
```

2. **Встановіть залежності**
```bash
flutter pub get
```

3. **Запустіть застосунок**
```bash
flutter run
```

### Налаштування для різних платформ

#### Android
```bash
flutter run -d android
```

#### iOS (тільки на macOS)
```bash
flutter run -d ios
```

#### Web
```bash
flutter run -d chrome
```

## 📁 Структура проекту

```
lib/
├── main.dart                 # Точка входу
├── models/
│   └── user_model.dart      # Модель користувача
├── providers/
│   └── auth_provider.dart   # Провайдер авторизації
├── screens/
│   ├── welcome_screen.dart      # Вітальний екран
│   ├── login_screen.dart        # Екран входу
│   ├── register_screen.dart     # Екран реєстрації
│   ├── profile_creation_screen.dart  # Створення профілю
│   └── mode_selection_screen.dart    # Вибір режимів
├── widgets/
│   ├── animated_button.dart     # Анімована кнопка
│   ├── custom_text_field.dart   # Кастомне поле вводу
│   ├── social_login_button.dart # Кнопка соц. входу
│   └── loading_overlay.dart     # Overlay завантаження
└── utils/
    └── app_colors.dart         # Кольори застосунку
```

## 🎯 Функціональність

### ✅ Реалізовано

- [x] Система авторизації (email/телефон + пароль)
- [x] Соціальний вхід (Google, Facebook) - симуляція
- [x] Валідація форм з українською локалізацією
- [x] Створення профілю з завантаженням аватара
- [x] Вибір позиції на футбольному полі
- [x] Збереження даних в SharedPreferences
- [x] Анімований інтерфейс з градієнтами
- [x] Responsive дизайн для всіх екранів
- [x] Система стану з Provider

### 🔄 В розробці

- [ ] Відео режим (завантаження, перегляд, голосування)
- [ ] Режим матчів (створення, пошук, участь)
- [ ] Система рейтингів та монет
- [ ] Челенджі та змагання
- [ ] Профілі інших користувачів
- [ ] Чат та повідомлення

## 🛠 Технології

### Frontend
- **Flutter 3.16+** - UI фреймворк
- **Provider** - State management
- **Google Fonts** - Шрифт Poppins
- **Font Awesome** - Іконки
- **Image Picker** - Завантаження фото
- **Shared Preferences** - Локальне збереження

### Планується
- **Firebase** - Backend as a Service
- **Cloud Firestore** - База даних
- **Firebase Auth** - Автентифікація
- **Firebase Storage** - Зберігання файлів

## 📱 Скріншоти

| Вітальний екран | Вхід | Реєстрація | Створення профілю |
|----------------|------|------------|------------------|
| ![Welcome](screenshots/welcome.png) | ![Login](screenshots/login.png) | ![Register](screenshots/register.png) | ![Profile](screenshots/profile.png) |

| Вибір режимів |
|---------------|
| ![Modes](screenshots/modes.png) |

## 🎨 Дизайн система

### Кольори
```dart
// Основні кольори
static const Color primaryGreen = Color(0xFF1e7d32);
static const Color secondaryGreen = Color(0xFF2e7d32);
static const Color lightGreen = Color(0xFF4caf50);
static const Color accentGreen = Color(0xFF66bb6a);

// Акцентні кольори
static const Color orange = Color(0xFFff6b35);
static const Color gold = Color(0xFFffd700);
static const Color videoRed = Color(0xFFff6b6b);
```

### Градієнти
- **Основний**: `primaryGreen` → `secondaryGreen`
- **Кнопки**: `lightGreen` → `accentGreen`
- **Відео режим**: `videoRed` → `videoOrange`
- **Матч режим**: `lightGreen` → `primaryGreen`

## 🤝 Внесок у проект

1. Fork репозиторій
2. Створіть feature branch (`git checkout -b feature/amazing-feature`)
3. Commit зміни (`git commit -m 'Add amazing feature'`)
4. Push в branch (`git push origin feature/amazing-feature`)
5. Відкрийте Pull Request

## 📄 Ліцензія

Цей проект ліцензований під MIT License - дивіться [LICENSE](LICENSE) файл для деталей.

## 👨‍💻 Автор

**FLAP Team** - Українська футбольна соціальна мережа

- 📧 Email: support@flap.ua
- 🌐 Website: https://flap.ua
- 📱 Telegram: @flap_support

## 🙏 Подяки

- Дизайн базується на оригінальному HTML прототипі
- Іконки від Font Awesome
- Шрифти від Google Fonts
- Вдячність Flutter спільноті за чудовий фреймворк

---

**FLAP - Feel Like A Pro! ⚽🏆**

*Твоя футбольна соціальна мережа*
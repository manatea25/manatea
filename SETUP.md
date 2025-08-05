# Налаштування проекту FLAP

## Покрокова інструкція

### 1. Встановлення Flutter

#### Windows
1. Завантажте Flutter SDK з [flutter.dev](https://flutter.dev/docs/get-started/install/windows)
2. Розпакуйте архів у `C:\flutter`
3. Додайте `C:\flutter\bin` до змінної середовища PATH
4. Запустіть `flutter doctor` для перевірки

#### macOS
```bash
# Використовуючи Homebrew
brew install flutter

# Або завантажте вручну з flutter.dev
```

#### Linux
```bash
# Завантажте та розпакуйте Flutter SDK
wget https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_3.16.0-stable.tar.xz
tar xf flutter_linux_3.16.0-stable.tar.xz

# Додайте до PATH
export PATH="$PATH:`pwd`/flutter/bin"
```

### 2. Налаштування IDE

#### Android Studio
1. Встановіть Android Studio
2. Встановіть плагін Flutter
3. Створіть Android Virtual Device (AVD)

#### VS Code
1. Встановіть VS Code
2. Встановіть розширення Flutter
3. Встановіть розширення Dart

### 3. Клонування та налаштування проекту

```bash
# Клонуйте репозиторій
git clone https://github.com/your-username/flap-app.git
cd flap-app

# Встановіть залежності
flutter pub get

# Перевірте налаштування
flutter doctor

# Запустіть застосунок
flutter run
```

### 4. Структура папок

Переконайтеся, що у вас є наступні папки:

```
flap-app/
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── lib/
│   ├── models/
│   ├── providers/
│   ├── screens/
│   ├── widgets/
│   └── utils/
├── android/
├── ios/
└── web/
```

### 5. Додавання шрифтів (опціонально)

Якщо хочете використовувати локальні шрифти Poppins:

1. Завантажте шрифти Poppins з [Google Fonts](https://fonts.google.com/specimen/Poppins)
2. Створіть папку `assets/fonts/`
3. Додайте файли шрифтів:
   - `Poppins-Regular.ttf`
   - `Poppins-Medium.ttf`
   - `Poppins-SemiBold.ttf`
   - `Poppins-Bold.ttf`
   - `Poppins-ExtraBold.ttf`

### 6. Запуск на різних платформах

#### Android
```bash
# Запуск на емуляторі
flutter run

# Запуск на конкретному пристрою
flutter devices
flutter run -d <device_id>

# Збірка APK
flutter build apk
```

#### iOS (тільки macOS)
```bash
# Запуск на симуляторі
flutter run

# Збірка для iOS
flutter build ios
```

#### Web
```bash
# Запуск у браузері
flutter run -d chrome

# Збірка для web
flutter build web
```

### 7. Налаштування для розробки

#### Гарячий перезапуск
- `r` - гарячий перезапуск
- `R` - повний перезапуск
- `q` - вихід

#### Дебагінг
```bash
# Запуск у режимі дебагу
flutter run --debug

# Запуск у режимі профілювання
flutter run --profile

# Запуск у режимі релізу
flutter run --release
```

### 8. Корисні команди

```bash
# Оновлення залежностей
flutter pub upgrade

# Очищення проекту
flutter clean

# Аналіз коду
flutter analyze

# Форматування коду
dart format lib/

# Запуск тестів
flutter test
```

### 9. Налаштування для Firebase (майбутнє)

Коли будете готові додати Firebase:

1. Створіть проект у [Firebase Console](https://console.firebase.google.com/)
2. Додайте Android/iOS застосунки
3. Завантажте конфігураційні файли:
   - `android/app/google-services.json`
   - `ios/Runner/GoogleService-Info.plist`
4. Оновіть `pubspec.yaml` з Firebase залежностями

### 10. Поширені проблеми

#### Проблема з ліцензіями Android
```bash
flutter doctor --android-licenses
```

#### Проблема з Gradle
```bash
cd android
./gradlew clean
cd ..
flutter clean
flutter pub get
```

#### Проблема з iOS (macOS)
```bash
cd ios
pod install
cd ..
```

### 11. Рекомендації

1. **Використовуйте віртуальний пристрій** для тестування
2. **Увімкніть USB debugging** на фізичному пристрої
3. **Регулярно робіть `flutter clean`** при проблемах
4. **Використовуйте `flutter doctor`** для діагностики
5. **Тримайте Flutter SDK оновленим**

### 12. Корисні ресурси

- [Flutter Documentation](https://flutter.dev/docs)
- [Dart Language Tour](https://dart.dev/guides/language/language-tour)
- [Flutter Widget Catalog](https://flutter.dev/docs/development/ui/widgets)
- [Flutter Community](https://flutter.dev/community)

---

Якщо у вас виникли проблеми, створіть issue у репозиторії або зверніться до документації Flutter.
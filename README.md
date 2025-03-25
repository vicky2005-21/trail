
# BrewConnect App

A social connection app built with React Native and Expo.

## Project Structure

```
app/
├── (auth)/               # Authentication related screens
├── (tabs)/               # Main tab navigation screens
├── chat/                 # Chat functionality
├── group-chats/          # Group chat features
├── notifications/        # Notification system
├── search/               # Search functionality
├── settings/             # User settings
├── stores/               # State management
├── assets/               # Static assets
├── constants/            # App constants and data
├── mocks/                # Mock data for development
└── (other root files)    # Configuration files
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio/Xcode (for emulator) or a physical device with Expo Go

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/brewconnect.git
   cd brewconnect
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on your device**
   - Scan the QR code with the Expo Go app (Android/iOS)
   - Or press `i` for iOS simulator / `a` for Android emulator

## Development Workflow

### Running on different environments
```bash
# Android
expo start --android

# iOS
expo start --ios

# Web
expo start --web
```

### Building the app
```bash
# Build for production
expo build:android
expo build:ios

# Create standalone binaries
expo run:android
expo run:ios
```

## Configuration

1. **Environment Variables**
   Create a `.env` file in the root directory:
   ```
   API_URL=your_api_url_here
   GOOGLE_MAPS_API_KEY=your_key_here
   ```

2. **Using Environment Variables**
   Access variables in your app with:
   ```javascript
   import Constants from 'expo-constants';
   const API_URL = Constants.expoConfig.extra.API_URL;
   ```

## Troubleshooting

Common issues and solutions:

1. **"Unable to resolve module" errors**
   ```bash
   npm install
   expo start -c
   ```

2. **iOS simulator not working**
   ```bash
   sudo gem install cocoapods
   cd ios && pod install
   ```

3. **Android build failures**
   - Make sure Java JDK 11 is installed
   - Set correct Android SDK paths

## Contributing

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```

2. Commit your changes:
   ```bash
   git commit -m "Add your commit message"
   ```

3. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```

4. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

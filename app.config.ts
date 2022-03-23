import 'dotenv/config';

export default {
  "expo": {
    "name": "pfartists",
    "slug": "pfartists",
    "owner": "nextexpo12",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "icon": "./assets/images/PfA.png"
    },
    "android": {
      "icon": "./assets/images/PfA.png",
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/PfA.png",
        "backgroundColor": "#ffd068"
      },
      "package": "com.nextexpo12.pfartists"
    },
    "web": {
      "favicon": "./assets/images/favicon.png"
    },
    "extra": {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID
    }
  }
}

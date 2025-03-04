# 📱 MobilApp - Expo (React Native) + Django + Firebase

[![Expo](https://img.shields.io/badge/Expo-49.0.0-blue.svg)](https://expo.dev/)  
[![React Native](https://img.shields.io/badge/React%20Native-0.73.0-blue.svg)](https://reactnative.dev/)  
[![Django](https://img.shields.io/badge/Django-4.2-green.svg)](https://www.djangoproject.com/)  
[![Firebase](https://img.shields.io/badge/Firebase-9-orange.svg)](https://firebase.google.com/)  

Bu proje **Expo (React Native) + Django REST Framework + Firebase** kullanılarak geliştirilen bir mobil uygulamadır.

---

## 📌 Gereksinimler (Dependencies & Installations)

Aşağıdaki araçların **kurulu olduğundan emin olun**:

### 🔥 Genel Gereksinimler

| Gereksinim | Açıklama | Kurulum |
|------------|-------------|---------|
| **Node.js** | JavaScript runtime (React Native için gerekli) | [Node.js İndir](https://nodejs.org/) |
| **npm veya yarn** | Paket yöneticisi (React bağımlılıkları için) | `npm install -g yarn` |
| **Expo CLI** | Expo projelerini yönetmek için gerekli CLI | `npm install -g expo-cli` |
| **Python 3.9+** | Django çalıştırmak için gerekli | [Python İndir](https://www.python.org/downloads/) |
| **Django** | Backend için gerekli framework | `pip install django` |
| **Django REST Framework (DRF)** | Django API için gerekli | `pip install djangorestframework` |
| **Firebase SDK** | Firebase Auth & Firestore kullanımı için | `npm install firebase` |
| **Android Studio** | Android emulator çalıştırmak için | [Android Studio İndir](https://developer.android.com/studio) |

---

## 🚀 Kurulum ve Çalıştırma

### 🛠️ **1️⃣ React Native (Expo) Projesinin Kurulumu**

Expo ve bağımlılıkları yükleyin:
```sh
npm install
npx expo start
```

**Projeyi Android veya iOS cihazında çalıştırmak için:**
```sh
# Android için
npx expo start --android

# iOS için (Sadece Mac'te çalışır)
npx expo start --ios
```

---

### 🔥 **2️⃣ Django Backend Kurulumu**

venv ve paketlerin yüklenmesi
```sh
  cd zbackend
  python -m venv env
  env\Scripts\activate
  pip install -r requirements.txt
```

Django projesi başlatın:
```sh
  python manage.py makemigrations
  python manage.py runserver
```

---

### 🔥 **3️⃣ Firebase Kurulumu**

Firebase SDK yükleyin:
```sh
  npm install -g firebase-tools
  firebase login
  firebase init
```

### 🔥 ** Geliştirici Ekip**

Esma / Takım Lideri

Burak

Mehmet

İnan

Beyza / Mentör:

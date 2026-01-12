# Realtime Speech Translator

A realtime speech-to-speech translation demo built to showcase handling **asynchronous workflows**, **WebSockets**, and **Web APIs** in a modern web application.

The app allows one user to speak in a source language (for this mvp English) while another user sees the **live transcription** and **near-realtime translation** in a target language (for this mvp Tamil).

---

## ✨ Features

- 🎙️ **Realtime Speech Recognition**
  - Uses the Web Speech API (`SpeechRecognition`) to convert speech to text as the user speaks.
- 🌍 **Realtime Translation**
  - Translates the transcribed text using the Web Translator API.
- 🔌 **WebSocket Communication**
  - Establishes a persistent connection between the *Speaker* and *Translator* pages.
  - Streams transcription updates in near realtime.
- ⚡ **Async-First Architecture**
  - Demonstrates handling async events from speech recognition, translation, and socket messaging simultaneously.
- 🧭 **Two-Page Flow**
  - **Speaker Page**: Speak and see live transcription in the selected language.
  - **Translator Page**: Receive and view live translated text in the target language.

---

## 🧱 Tech Stack

- **Framework**: SvelteKit  
- **Language**: TypeScript  
- **Styling**: Tailwind CSS  
- **Realtime Communication**: WebSockets  
- **Web APIs**:
  - `SpeechRecognition` (Speech-to-Text)
  - `Translator` (Text Translation)

---

## 🧠 How It Works

1. The **Speaker** selects a source language and starts speaking.
2. Speech is transcribed in realtime using `SpeechRecognition`.
3. Transcription updates are sent over a WebSocket connection.
4. The **Translator** page receives the text.
5. The text is translated into the target language using the `Translator` API.
6. Both transcription and translation update continuously as the speaker talks.

This architecture simulates a live translation experience with minimal latency.

---

## 📄 Pages

### Speaker Page
- Select source language
- Start/stop microphone input
- View live transcription

### Translator Page
- Select target language
- View incoming translated text in near realtime

---

## 🚀 Purpose of the Project

This project was built as a **learning and demonstration tool** to explore:

- Managing **concurrent async processes**
- WebSocket-based realtime data streaming
- Integrating browser-native speech and translation APIs
- Building responsive realtime UI updates with SvelteKit

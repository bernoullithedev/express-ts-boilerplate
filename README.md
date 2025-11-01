
***

# Project: OutDoze

A social discovery and planning app for Ghana, helping users discover the best local spots and seamlessly decide where to go with friends.

---

## Core Problem

People in Ghana discover great restaurants and activities (like arcades, mini-golf, etc.) through social media (like TikTok and Instagram) but face two major problems:

1.  **Forgetting:** Bookmarks are lost in a sea of saved videos across different apps.
2.  **Indecision:** It's a constant struggle to decide "Where should we go?" with friends or a partner.

## The Solution

A central, fun, and interactive mobile app that combines local discovery, smart social media importing, and asynchronous group decision-making.

---

## Key Features

### 1. 🎞️ Full-Screen Discovery Feed
A "TikTok-style" full-screen, vertical swipe feed that provides an immersive discovery experience.

* **Header Toggle:** Users can instantly switch between two discovery modes:
    * **[ For You ]:** A curated feed of the best content.
    * **[ Near Me ]:** A proximity-based feed showing great spots nearby.
* **Smart Feed Content:** The feed renders different types of full-screen cards:
    * **Places:** A swipeable carousel of high-resolution images for a `Place`.
    * **Inspiration:** An embedded, auto-playing TikTok video showcasing a place's vibe, with a link to the verified `Place` profile.
    * **Featured Collections:** Public, follow-able collections from influencers and the community (e.g., "Best Kelewele Spots").

### 2. 📥 Smart Social Import (from TikTok/Socials)
This feature allows users to save places from other apps without losing their bookmarks.

* **User Flow:**
    1.  User taps "Share" on a TikTok video.
    2.  They select our app.
    3.  A small popover confirms "Added to Inbox!" The user *never leaves TikTok*.
* **Backend Magic (Asynchronous):**
    1.  The video URL is sent to a **Job Queue** (BullMQ).
    2.  A backend **Worker** scrapes the video metadata (via Apify).
    3.  The caption is analyzed by the **Gemini API** to extract the place name.
    4.  The name is verified against the **Google Places API** to get an exact location, address, and rating.
* **Import Inbox:** If the match is ambiguous (e.g., "best spot in Osu"), the item lands in the user's "Import Inbox" for one-tap confirmation.

### 3. 🗳️ Asynchronous Group Voting
A robust, flexible group decision feature designed for mobile. This **replaces real-time lobbies and WebSockets**.

* **Trigger:** Any collaborator inside a "Collection" can tap the "🚀 Decide Now!" button.
* **Setup:** The user simply sets a **voting deadline** (e.g., "Tonight at 9 PM," "In 1 hour").
* **Vote Anytime:** Push notifications are sent. Collaborators can open the app and vote (Tinder-style swipe) on their own time, on their own network connection.
* **Results:** When the deadline expires, a backend job (Cron) tallies the votes, finds the winner, and sends a final push notification to the group with the result. Tie-breakers are handled automatically.

### 4. 🗂️ Collaborative & Public Collections
The core "saving" feature, evolved from simple folders into a powerful social tool.

* **My Collections (Private):**
    * Users organize their saved places into "Collections" (e.g., "Date Night," "Friday Eats").
    * Collections can be shared **privately with collaborators** who can add/remove places.
    * This is the space where **Group Voting** happens.
* **Following (Public):**
    * Users can discover and **"Follow"** public collections from influencers or the app.
    * Tapping a public collection opens a full-screen modal to browse its places.
    * Tapping the creator's name opens a bottom-sheet profile showing their other public collections.

### 5. 🗺️ Interactive Collection Map
Inside every collection, a "Map" tab provides a rich, media-first geographical view.

* **Smart Markers:** Places are shown as **emojis based on their category** (e.g., 🍔 for food, 🏖️ for beaches) instead of boring pins.
* **Clustering:** `react-native-map-clustering` cleans the UI by grouping nearby markers.
* **Bottom Preview Card:** Tapping a marker slides up a "Google Maps-style" preview card. This card contains a **media carousel** showing the place's TikTok video (the "inspiration") first, followed by its static photos.

---

## Technology & Architecture

### Frontend
* **Framework:** React Native (Expo)
* **Navigation:** Expo Router
* **UI Components:** `react-native-maps`, `react-native-webview`, `react-native-pager-view`, `@gorhom/bottom-sheet`

### Backend
* **Framework:** Node.js (Express) or Supabase
* **Database:** PostgreSQL
* **Job Queue:** BullMQ (powered by Redis) for handling asynchronous imports.
* **Scheduled Jobs:** Supabase Cron Jobs (or `node-cron`) for tallying votes.

### Third-Party APIs
* **Scraping:** Apify API (to get metadata from TikTok URLs).
* **AI Analysis:** Google Gemini API (to parse place names from unstructured text).
* **Place Verification:** Google Places API (to get structured data, ratings, and coordinates).
* **Authentication:** Supabase Auth (or similar).
* **Push Notifications:** Expo Push Notifications.
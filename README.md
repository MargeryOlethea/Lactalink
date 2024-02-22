# Lactalink: Connecting Mothers for Breastmilk Sharing

Are you facing breastfeeding challenges? Lactalink is here to assist you (and your little one's tummy)! Our mobile application, developed using React Native (TypeScript) as the final project of my Hacktiv8 journey, serves as a bridge between mothers with surplus breastmilk (donors) and those in need (receivers). We aim to establish a safe and trustworthy platform for milk donation, empowering mothers and nurturing babies everywhere!

## Key Features:
* **Detailed User Profiles:** Tailored profiles for both donors and receivers, providing comprehensive information on diet, lifestyle, milk composition, and baby requirements.
* **Advanced Matching System:** Our algorithm matches donors and receivers based on compatibility factors such as blood type, diet, and allergies.
* **Secure Chat Functionality:** Communicate confidently with potential donors or receivers through our secure messaging feature.
* **Supportive Community Forum:** Connect, share experiences, and learn alongside fellow mothers in our vibrant community forum.
* **Easy Registration:**  Upload your ID for seamless registration.

## Tech Stack:
* **Front-End:** React Native (TypeScript)
* **Back-End:** Express.js
* **Database:** MongoDB with Mongoose ODM
* **Real-Time Chat:** Firebase Realtime Database
* **Image Recognition:** Google Vision AI

## Getting Started with Lactalink:
### Server:
1. Navigate to the `server` directory: `cd server`
2. Install dependencies: `npm install`
3. Configure environment variables:
    * Duplicate `env-template.txt` to `.env` and update the settings with your details.
4. Start the server: `nodemon bin/www`

### Client:
1. Navigate to the `client` directory: `cd client`
2. Install dependencies: `npm install`
3. Configure environment variables:
    * Duplicate `env-template.txt` to `.env` and update the settings with your details.
4. Start the client: `npx expo start`

## Team:
This project was made possible by the collaborative effort of a dedicated team:
* [Margery Olethea](https://github.com/MargeryOlethea/)
* [Reinardus Kinadaman](https://github.com/reinardusk)
* [Ridzki Permadi](https://github.com/rizzdKy)

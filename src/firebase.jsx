import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyC4jkR1vDuP8t1uW9rdcpS6Up15Lkj21NE',
	authDomain: 'requesttotheserverhw.firebaseapp.com',
	projectId: 'requesttotheserverhw',
	storageBucket: 'requesttotheserverhw.firebasestorage.app',
	messagingSenderId: '99568215643',
	appId: '1:99568215643:web:22e4d52dc51be3e945817e',
	databaseURL:
		'https://requesttotheserverhw-default-rtdb.europe-west1.firebasedatabase.app',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";
import { app } from "./firebase";

const App = app;
const db = getDatabase(App);

export const auth = getAuth(App);

export const signUp = async (email, password, username) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await set(ref(db, `users/${user.uid}`), {
            uid: user.uid,
            email: user.email,
            username: username,
            profileImage: null,
            bio: 'No bio yet...',
            joined: Date.now()
        });
        window.localStorage.setItem('notAToken', JSON.stringify(user.accessToken));
        window.localStorage.setItem('user', JSON.stringify(user));
        return user;
    } catch (error) {
        console.error(error);
    }
}

export const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        window.localStorage.setItem('notAToken', JSON.stringify(user.accessToken));
        window.localStorage.setItem('user', JSON.stringify(user));
        // console.log('fireauth 35: ', user);
        return user;
    } catch (error) {
        console.error(error);
    }
};

export const signOut = async () => {
    try {
        await auth.signOut();
        window.localStorage.removeItem('notAToken');
        window.localStorage.removeItem('user');
        return null;
    } catch (error) {
        console.error(error);
    }
}
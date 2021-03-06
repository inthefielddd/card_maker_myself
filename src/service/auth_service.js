import firebase from './firebase';

class AuthService {
    login(providerName) {
        const provider = new firebase.auth[`${providerName}AuthProvider`]();
        return firebase.auth().signInWithPopup(provider);
    }
}

export default AuthService;

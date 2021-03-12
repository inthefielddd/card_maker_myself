import { firebaseAuth, githubProvider, googleProvider } from './firebase';

class AuthService {
    login(providerName) {
        const authProvider = this.getProvider(providerName);
        return firebaseAuth.signInWithPopup(authProvider);
    }
    //onAuthChange콜백함수를 받는다 콜백함수를 등록
    //firebase에 내장된 auth()가 상태를 감지하여 onAuthStateChanged가 일어난다
    //유저가 바뀔때 onUserChanged가 콜백함수로 작동
    //유저가 있으면 login이 유지되는 거 알 수 있다.
    onAuthChange(onUserChanged) {
        firebaseAuth.onAuthStateChanged((user) => {
            onUserChanged(user);
        });
    }

    //logout
    logout() {
        firebaseAuth.signOut();
    }

    getProvider(providerName) {
        switch (providerName) {
            case 'Google':
                return googleProvider;
            case 'Github':
                return githubProvider;
            default:
                throw new Error(`not supported provider: ${providerName} `);
        }
    }
}

export default AuthService;

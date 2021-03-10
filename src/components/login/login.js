import React, { useEffect } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import styles from './login.module.css';
import { useHistory } from 'react-router';

const Login = ({ authService }) => {
    const history = useHistory();

    //로그인에 성공하면 goToMaker를 통해서
    //onLogin에서 받은 유저 id인 uid를 가지고
    //"/maker로 넘어간다"
    const goToMaker = (userId) => {
        history.push({
            pathname: '/maker',
            state: { id: userId },
        });
    };

    //로그인함수
    const onLogin = (event) => {
        authService //
            .login(event.currentTarget.textContent)
            .then((data) => goToMaker(data.user.uid));
    };

    useEffect(() => {
        authService.onAuthChange((user) => {
            user && goToMaker(user.uid);
        });
    });

    return (
        <section className={styles.login}>
            <Header />
            <section>
                <h1>Login</h1>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <button className={styles.button} onClick={onLogin}>
                            Google
                        </button>
                    </li>
                    <li className={styles.item}>
                        <button className={styles.button} onClick={onLogin}>
                            Github
                        </button>
                    </li>
                </ul>
            </section>
            <Footer />
        </section>
    );
};

export default Login;

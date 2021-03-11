import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({ authService }) => {
    const [cards, setCards] = useState([
        {
            id: 1,
            name: 'Hyeon Ji',
            company: 'Ola',
            theme: 'dark',
            title: 'software Engineer',
            email: 'inthefield1027@gmail.com',
            message: 'go for it',
            fileName: 'hj',
            fileURL: null,
        },

        {
            id: 2,
            name: 'DAN BI',
            company: 'ICIS',
            theme: 'light',
            title: 'Manager',
            email: 'chl12005@gmail.com',
            message: 'I can do it',
            fileName: 'hj',
            fileURL: 'hj.png',
        },
        {
            id: 3,
            name: 'Min Su',
            company: 'Ola',
            theme: 'colorful',
            title: 'Engineer',
            email: '12345@gmail.com',
            message: 'code your dream',
            fileName: 'hj',
            fileURL: null,
        },
    ]);

    const history = useHistory();
    const onLogout = () => {
        authService.logout();
    };

    useEffect(() => {
        authService.onAuthChange((user) => {
            if (!user) {
                history.push('/');
            }
        });
    });

    const addCard = (card) => {
        const updated = [...cards, card];
        setCards(updated);
    };
    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout} className={styles.header} />
            <div className={styles.container}>
                <Editor cards={cards} addCard={addCard} />
                <Preview cards={cards} />
            </div>
            <Footer className={styles.footer} />
        </section>
    );
};

export default Maker;

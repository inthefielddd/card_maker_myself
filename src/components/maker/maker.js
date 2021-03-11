import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({ authService }) => {
    const [cards, setCards] = useState({
        1: {
            id: '1',
            name: 'Hyeon Ji',
            company: 'Ola',
            theme: 'dark',
            title: 'software Engineer',
            email: 'inthefield1027@gmail.com',
            message: 'go for it',
            fileName: 'hj',
            fileURL: null,
        },
        2: {
            id: '2',
            name: 'DAN BI',
            company: 'ICIS',
            theme: 'light',
            title: 'Manager',
            email: 'chl12005@gmail.com',
            message: 'I can do it',
            fileName: 'hj',
            fileURL: 'hj.png',
        },
        3: {
            id: '3',
            name: 'Min Su',
            company: 'Ola',
            theme: 'colorful',
            title: 'Engineer',
            email: '12345@gmail.com',
            message: 'code your dream',
            fileName: 'hj',
            fileURL: null,
        },
    });

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

    const createOrUpdateCard = (card) => {
        //setCards를 부를 상태에서 전에 cards를 복사
        setCards((cards) => {
            const updated = { ...cards };
            updated[card.id] = card;
            return updated;
        });
    };

    const deleteCard = (card) => {
        setCards((cards) => {
            const updated = { ...cards };
            //card에 할당하는 것이 아니라 delete
            delete updated[card.id];
            return updated;
        });
    };

    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout} className={styles.header} />
            <div className={styles.container}>
                <Editor cards={cards} addCard={createOrUpdateCard} updateCard={createOrUpdateCard} deleteCard={deleteCard} />
                <Preview cards={cards} />
            </div>
            <Footer className={styles.footer} />
        </section>
    );
};

export default Maker;

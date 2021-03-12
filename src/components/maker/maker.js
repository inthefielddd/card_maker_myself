import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({ FileInput, authService, cardRepository }) => {
    const history = useHistory();
    const historyState = history?.location?.state;
    const [cards, setCards] = useState({});
    const [userId, setUserId] = useState(historyState && historyState.id);
    const onLogout = () => {
        authService.logout();
    };

    //userId와 cardRepository 변경이될때마다
    //deps에 넣어주기
    useEffect(() => {
        if (!userId) {
            return;
        }
        //있다면
        const stopSync = cardRepository.syncCards(userId, (cards) => {
            setCards(cards);
        });
        //ummount
        return () => stopSync();
    }, [userId, cardRepository]);

    //로그인과 관련된 useEffect
    //authService, userId, history deps로 넣어서
    //변경이 될때에만 마운트하게 해준다
    useEffect(() => {
        authService.onAuthChange((user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                history.push('/');
            }
        });
    }, [authService, userId, history]);

    const createOrUpdateCard = (card) => {
        //setCards를 부를 상태에서 전에 cards를 복사
        setCards((cards) => {
            const updated = { ...cards };
            updated[card.id] = card;
            return updated;
        });
        cardRepository.saveCard(userId, card);
    };

    const deleteCard = (card) => {
        setCards((cards) => {
            const updated = { ...cards };
            //card에 할당하는 것이 아니라 delete
            delete updated[card.id];
            return updated;
        });
        cardRepository.deleteCard(userId, card);
    };

    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout} className={styles.header} />
            <div className={styles.container}>
                <Editor
                    FileInput={FileInput}
                    cards={cards}
                    addCard={createOrUpdateCard}
                    updateCard={createOrUpdateCard}
                    deleteCard={deleteCard}
                />
                <Preview cards={cards} />
            </div>
            <Footer className={styles.footer} />
        </section>
    );
};

export default Maker;

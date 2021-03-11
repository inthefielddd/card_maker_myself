import firebaseApp from './firebase';

class CardRepository {
    syncCards(userId, onUpdate) {
        //firebase에 해당경로에 업데이트가 될때마다
        const ref = firebaseApp.database().ref(`${userId}/cards`);
        ref.on('value', (snapshot) => {
            const value = snapshot.val();
            value && onUpdate(value);
        });
        return () => ref.off();
        //업데이트가 있으면 onUpdate를 호출해주고
        //업데이트가 없다면 ref.off() 함수가 실행될 것이다
    }
    saveCard(userId, card) {
        firebaseApp.database().ref(`${userId}/cards/${card.id}`).set(card);
    }
    deleteCard(userId, card) {
        firebaseApp.database().ref(`${userId}/cards/${card.id}`).remove();
    }
}

export default CardRepository;

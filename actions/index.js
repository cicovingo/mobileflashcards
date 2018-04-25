import { AsyncStorage } from 'react-native';
export function addCard(name, card) {
    return { type: 'ADD_CARD', name, card };
}
export function addDeck(name) {
    return { type: 'ADD_DECK', deck: { [name]: { title: name, questions: [] }}};
}
export function addCardToDeck(title, card) {
    return AsyncStorage.getItem('mobile-flascards:decks').then(data => {
            const decks = JSON.parse(data);
            decks[title].questions.push(card);
            return AsyncStorage.setItem('mobile-flascards:decks', JSON.stringify(decks));
        });
}
export function getAllDecks(decks) {
    return { type: 'GET_DECKS', decks };
}
export  function getDecks() {
    return AsyncStorage.getItem('mobile-flascards:decks').then(results => {
            if (!results) return {};
            return JSON.parse(results);
        }).catch(error => console.log(error));
}
export function saveDeckTitle(key, title) {
    return AsyncStorage.mergeItem( 'mobile-flascards:decks', JSON.stringify({ [key]: { title, questions: [] }}));
}
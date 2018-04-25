function decks(state={}, action) {
    switch(action.type) {
        case 'ADD_CARD':
            const deck = { title: action.name, questions: [...state[action.name].questions] };
            deck.questions.push(action.card);
            return { ...state, ...{[action.name]: deck}};       
		case 'ADD_DECK':
            return { ...state, ...action.deck };
		case 'GET_DECKS':
            return { ...state, ...action.decks };           
        default:
            return state;
    }
}
export default decks;
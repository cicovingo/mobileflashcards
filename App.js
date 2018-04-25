import React from 'react';
import { AsyncStorage, View, StyleSheet } from 'react-native';
import { Constants, Notifications, Permissions } from 'expo';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import AddingCard from './components/Card/AddingCard';
import AddingDeck from './components/Deck/AddingDeck';
import Deck from './components/Deck/Deck';
import QuizView from './components/QuizView';
import Root from './components/Root';
import reducer from './reducers';
const styles = StyleSheet.create({ container: { flex: 2, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }, withBorder: { borderColor: 'red', borderWidth: 2 }});
const s = StackNavigator({
	Root: {
		screen: Root,
		navigationOptions: { tabBarLabel: 'ALL DECKS' }        
	},
	AddingDeck: { screen: AddingDeck, navigationOptions: { tabBarLabel: 'ADD DECK' }        
	}}, 
	{ navigationOptions: { header: null }}
);
const MainNavigator = DrawerNavigator({
    Home: {
        screen: s
    },
    AddingCard: {
        screen: AddingCard,
        navigationOptions: { headerTintColor: 'black', title: 'Adding Card', headerStyle: { backgroundColor: 'green' }}        
    },
	Deck: { 
		screen: Deck,
        navigationOptions: { headerTintColor: 'black', headerStyle: { backgroundColor: 'green' }}        
    },   
    QuizView: {
        screen: QuizView,
        navigationOptions: { headerTintColor: 'black', title: 'QuizView', headerStyle: { backgroundColor: 'green' }}        
    }    
});
export default class App extends React.Component {
    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{flex: 2}}>
                    <View style={[{height: Constants.statusBarHeight}]}/>
                    <MainNavigator/>
                </View>
            </Provider>
        );
    }
}
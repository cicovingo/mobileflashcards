import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getAllDecks, getDecks  } from '../actions';
const styles = StyleSheet.create({ card: { paddingBottom: 5, paddingTop: 5 }, header: { fontSize: 20, textAlign: 'center' }});
class Root extends Component {
   async componentDidMount() {
        const decks = await getDecks();
         this.props.dispatch(getAllDecks(decks));    
    }
    rootItem = (item) => {
        const deck = item.item;
        const { index } = item;
        return (
            <TouchableOpacity style={[styles.card, {backgroundColor:'white'}]} onPress={() => this.props.navigation.navigate('Deck', {deckName: deck.title})}>
                <Text style={styles.header}>{deck.title}</Text>
                <Text style={styles.header}>{deck.questions.length}</Text>
            </TouchableOpacity>
        );
    }
    key = (item, index) => index;
    render() {
        const { decks } = this.props;
        return (
            <FlatList data={decks} renderItem={this.rootItem} keyExtractor={this.key}/>
        )
    }
}
function mapStateToProps(decks) {
    if (!decks) return {decks: []};
	return {decks : Object.values(decks)}
}
export default connect(mapStateToProps)(Root);
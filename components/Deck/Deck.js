import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Text, View, FlatList,  StyleSheet, TouchableOpacity, Platform, ToastAndroid } from 'react-native';
const styles = StyleSheet.create({ buttonSubmit: { alignItems: 'center', alignSelf: 'center', backgroundColor: 'green', borderRadius: 3, height: 25, justifyContent: 'center', margin: 5, padding: 5, paddingLeft: 15, paddingRight: 15, width: 100}, buttonSubmitText: { color: 'white', fontSize: 10, textAlign: 'center' }, center: {  alignItems: 'center', flex: 2, justifyContent: 'center', marginLeft: 15, marginRight: 15 }, container: { backgroundColor: 'white', flex: 2, justifyContent: 'space-between' }, header: { fontSize: 15, textAlign: 'center'}, row: { flex: 2 }, subHeader: { fontSize: 7, textAlign: 'center' }, withBorder: { borderColor: 'black', borderWidth: 0 }});
class Deck extends Component {
    static navigationOptions = ({ navigation }) => {
        const { name } = navigation.state.params;
        return { title: name };
    };    
    cardCountText = cardCount => {
		if(cardCount === 0)
			return 'No Card';
		else
			return `${cardCount} Cards`;
    };
    enterQuiz = () => {
        if (this.props.deck.questions.length !== 0) {
            this.props.navigation.navigate('Quiz', {deck: this.props.deck});    
        }
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.row, styles.withBorder]}/>
                <View style={[styles.row, {justifyContent: 'flex-start'}]}>
                    <Text style={styles.header}>{this.props.deck.title}</Text>
                    <Text style={styles.subHeader}>{this.cardCountText(this.props.deck.questions.length)}</Text>
                </View>
                <View style={[styles.row, {justifyContent: 'flex-end'}, styles.withBorder]}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AddingCard', {deck: this.props.deck})} style={styles.buttonSubmit}>
                        <Text style={styles.buttonSubmitText}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.enterQuiz} style={styles.buttonSubmit}>
                        <Text style={styles.buttonSubmitText}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
function mapStateToProps(decks, ownProps) {
    return { deck : Object.values(decks).find(item => item.title === ownProps.navigation.state.params.name) }
}
export default connect(mapStateToProps)(Deck);
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Text, KeyboardAvoidingView, View, TextInput,  StyleSheet, TouchableOpacity } from 'react-native';
import { addDeck, saveDeckTitle } from '../../actions';
const styles = StyleSheet.create({ buttonSubmit: { backgroundColor: 'green', marginTop: 10, padding: 5, paddingLeft: 15, paddingRight: 15, height: 25, borderRadius: 3, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }, buttonSubmitText: { color: 'white', fontSize: 10, textAlign: 'center' }, inputText: { margin: 5, marginTop: 10, height: 25, borderColor: 'black', borderWidth: 1, borderRadius: 2, padding: 2, fontSize: 10 },label: { margin: 10, fontSize: 20, textAlign: 'center' }});
class AddingDeck extends Component {
    submitForAdd = () => {
        const { nameOfDeck } = this.state; 
        this.deckTitle.setNativeProps({text: ''});
        saveDeckTitle(nameOfDeck, nameOfDeck);
        this.props.dispatch(addDeck(nameOfDeck));
        this.props.navigation.navigate('Deck', {nameOfDeck: nameOfDeck});
    };
    render() {
        return (
            <KeyboardAvoidingView behavior="position" >
                <Text style={styles.label}>
                    What is the title of your new deck?
                </Text>
                <TextInput style={styles.inputText} placeholder="Deck Title" onChangeText={text => this.setState({nameOfDeck: text})} ref={input => this.deckTitle = input}/>
                <TouchableOpacity onPress={this.submitForAdd} style={styles.buttonSubmit}>
                    <Text style={styles.buttonSubmitText}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}
export default connect()(AddingDeck);
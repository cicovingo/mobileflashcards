import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { addCard, addCardToDeck } from '../../actions';
const styles = StyleSheet.create({ buttonSubmit: { backgroundColor: 'green', marginTop: 10, padding: 5, paddingLeft: 15, paddingRight: 15, height: 25, borderRadius: 3, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }, buttonSubmitText: { color: 'white', fontSize: 10, textAlign: 'center' }, inputText: { margin: 5, marginTop: 10, height: 25, borderColor: 'black', borderWidth: 1, borderRadius: 2, padding: 2, fontSize: 10 },label: { margin: 10, fontSize: 20, textAlign: 'center' }});
class AddCard extends Component {
    submitForAdd = () => {
        const { deck } = this.props;
        const { question, answer } = this.state;
        if (question && answer) {     
            this.question.setNativeProps({text: ''});
            this.answer.setNativeProps({text: ''});
            addCardToDeck(deck.title, {question, answer});
            this.props.dispatch(addCard(deck.title, {question, answer}));            
        }
    }
    render() {
        return (
            <View>
                <TextInput style={styles.inputText} placeholder="Question" onChangeText={text => this.setState({question: text})} ref={input => this.question = input}/>
                <TextInput style={styles.inputText} placeholder="Answer" onChangeText={text => this.setState({answer: text})} ref={input => this.answer = input}/>
                <TouchableOpacity onPress={this.submitForAdd} style={styles.buttonSubmit}>
                    <Text style={styles.buttonSubmitText}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
function mapStateToProps(decks, props) {
    const { deck } = props.navigation.state.params;
    return { deck }
}
export default connect(mapStateToProps)(AddCard);
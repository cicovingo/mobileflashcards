import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Text, View, FlatList,  StyleSheet, TouchableOpacity, Animated } from 'react-native';
const styles = StyleSheet.create({ border: { flex: 1 }, borderText: { flex: 2 }, buttonSubmit: { backgroundColor: 'black', padding: 5, paddingLeft: 15, paddingRight: 15, margin: 5, height: 20, width: 100, borderRadius: 3, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }, buttonSubmitText: { color: 'white', fontSize: 10, textAlign: 'center' }, container: { flex: 1, backgroundColor: 'white', justifyContent: 'space-between' }, scoreText: { textAlign: 'center', fontSize: 15, fontWeight: 'bold' }, turnCard: { flex: 1, alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'green', backfaceVisibility: 'hidden' }, turnCardBack: { flex: 1, backgroundColor: "blue", position: "absolute", top: 0, bottom: 0, right: 0, left: 0 }, turnCardLink: { marginBottom: 15, fontSize: 10, color: 'white', fontWeight: 'bold' }, turnCardText: { marginTop: 5, fontSize: 25, color: 'black', fontWeight: 'bold' }, tracker: { fontSize: 15 }, withBorder: { borderColor: 'black', borderWidth: 0 }});
export default class QuizView extends Component {
	constructor(props) {
		super(props);
		this.score = 0;
		this.questionSets = this.deck.questions.length;
		this.isQuestion = true; 
		this.state = { numberOfQuestion: 1, isFinish: false };
		this.deck = this.props.navigation.state.params.deck;			 
	}
	componentWillMount() {
	    this.turningAnimation = new Animated.Value(0);
		this.front = this.turningAnimation.interpolate({ inputRange: [0, 180], outputRange: ['0', '180'] });
	    this.back = this.turningAnimation.interpolate({ inputRange: [0, 180], outputRange: ['180', '360'] });
		this.backOpacity = this.turningAnimation.interpolate({ inputRange: [89, 90], outputRange: [0, 1] });
	    this.frontOpacity = this.turningAnimation.interpolate({ inputRange: [89, 90], outputRange: [1, 0] }); 
	    this.value = 0;
	    this.turningAnimation.addListener(({ value }) => {
	    	this.value = value;
	    });
	       
	}
	again = () => {
		this.score = 0; 
		if (this.isQuestion===false) 
			this.turnCard(() => this.setState({numberOfQuestion: 1, isFinish: false}));		
		else 			
 			this.setState({numberOfQuestion: 1, isFinish: false});		
 	};
 	backToDeck = () => {
 		this.props.navigation.goBack();
 	};
 	fetchScore = () => {
 		const { isFinish } = this.state;
 		const { score } = this;
 		if (isFinish) 
 			return <View><Text style={styles.scoreText}> Score {score}</Text></View>;
 		else
			return null;
 	};
	turnCard = (situation) => {
		if(this.isQuestion === false)
			this.isQuestion = true;
		else
			this.isQuestion = false;
		if (this.value >= 50) {
			Animated.timing(this.turningAnimation,{ toValue: 0, duration: 500 }).start(situation);
		} else {
		  	Animated.timing(this.turningAnimation,{ toValue: 90, duration: 500 }).start(situation);
		}
	}
 	otherCard = () => {
 		let { numberOfQuestion } = this.state;
 		if (numberOfQuestion !== this.questionSets) {
			numberOfQuestion++;
 			this.isQuestion? this.setState({numberOfQuestion}) : this.turnCard(() => this.setState({numberOfQuestion}));
 		}
 		else {
 			this.setState({isFinish: true});
	 	} 		
 	}	
	render() {
		const { numberOfQuestion, isFinish } = this.state;
		const { deck, questionSets, score } = this;
	    const frontAnimatedStyle = { opacity: this.frontOpacity, transform: [{ rotateY: this.front}]};
	    const backAnimatedStyle = { opacity: this.backOpacity, transform: [{ rotateY: this.back }]};		
		return (
			<View style={[styles.container, styles.withBorder]}>
				<View style={[styles.border, styles.withBorder]}>
					<Text style={styles.tracker}>{numberOfQuestion} / {questionSets}</Text>
					{this.fetchScore()}
				</View>
				<View style={[styles.borderText, styles.withBorder]}>
			        	<Animated.View style={[styles.turnCard, frontAnimatedStyle]}>
				            <Text style={styles.turnCardText}>{deck.questions[numberOfQuestion - 1].question}</Text>
					        <TouchableOpacity onPress={() => this.turnCard()}>
					          	<Text style={styles.turnCardLink}>Answer</Text>
					        </TouchableOpacity>				            
			          	</Animated.View>
			          	<Animated.View style={[backAnimatedStyle, styles.turnCard, styles.turnCardBack]}>
			            	<Text style={styles.turnCardText}>{deck.questions[numberOfQuestion - 1].answer}</Text>
					        <TouchableOpacity onPress={() => this.turnCard()}>
					          	<Text style={styles.turnCardLink}>Question</Text>
					        </TouchableOpacity>			            	
			          	</Animated.View>
				</View>
	            <View style={[styles.border, {justifyContent: 'flex-end'}, styles.withBorder]}>{
						isFinish? 
							<View><TouchableOpacity onPress={this.again} style={styles.buttonSubmit}> <Text style={styles.buttonSubmitText}>Again</Text></TouchableOpacity>
				                <TouchableOpacity onPress={this.backToDeck} style={styles.buttonSubmit}><Text style={styles.buttonSubmitText}>Back to Deck</Text></TouchableOpacity>							
							</View>
						:
							<View><TouchableOpacity onPress={() => {this.score++; this.otherCard()}} style={styles.buttonSubmit}><Text style={styles.buttonSubmitText}>Correct</Text></TouchableOpacity>                		
				                <TouchableOpacity onPress={this.otherCard} style={[styles.buttonSubmit, {backgroundColor: 'white'}]}><Text style={styles.buttonSubmitText}>Incorrect</Text></TouchableOpacity>
				            </View>
				    }
	            </View>
			</View>
		);
	}
}
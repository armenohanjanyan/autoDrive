import React from 'react';
import axios from 'axios';
import firebase from 'firebase';
import ReactTwitchEmbedVideo from "react-twitch-embed-video"

import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  WebView,
  Keyboard
} from 'react-native';

export default class App extends React.Component {
 
  componentWillMount() {
    var config = {
      apiKey: "AIzaSyDjQ7blBmHP7xRpoxMhwPcZni1W5UP8nOk",
      authDomain: "native-ad1f1.firebaseapp.com",
      databaseURL: "https://native-ad1f1.firebaseio.com",
      projectId: "native-ad1f1",
      storageBucket: "native-ad1f1.appspot.com",
      messagingSenderId: "470821651171"
    };
      firebase.initializeApp(config);
      
      firebase.database().ref('comments').once('value', (data) => {
        let arr = Object.values(data.toJSON());
        this.setState({comments: arr})
        console.log('arr', arr);
      });
      
      
      
  }

  state = {
    comments: [],
    comment: '',
    user: false,
    userName: ''
  }

  addCommentText = (e) => {
    this.setState({
      comment: e.target.value
    })
  }

  addComment = () => {
    const { comments } = this.state;
    const { comment } = this.state;

    this.setState({
      comments: comments.concat(comment),
      comment: ''
    })
    firebase.database().ref('comments/').set({
     ...comments,
    });
    Keyboard.dismiss()
    
  }

  render() {
    const { comments } = this.state;
    const { comment } = this.state;
    
    let date = <Text style={{ textAlign: 'right', width: '100%', fontSize: 12, marginRight: 2 }}>{new Date().getHours() + ':' + new Date().getMinutes()}</Text>
    return (
      <View style={styles.container} behavior="padding" enabled>
         <View style={{ height: 80, width: '100%', backgroundColor: 'black', marginBottom: 12 }}>

         </View>
        <View style={{ height: 300, width: '100%', marginBottom: 12 }}>
          <WebView
            source={{ uri: "https://www.youtube.com/embed/WNeLUngb-Xg" }}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
        <ScrollView style={{ height: '100%', backgroundColor: '#DCDCDC', }}>
          <View style={{ width: '100%', height: '100%' }}>
            {comments.map((el, i) => i % 2 === 0 ? (
              <View style={{ backgroundColor: '#808080', borderRadius: 15, padding: 5, width: '50%', marginTop: 6, marginLeft: 10 }} key={i}>
                <Text style={{ fontSize: 15 }}>{el}</Text>
              </View>
            ) : (
                <View style={{ backgroundColor: '#778899', borderRadius: 15, padding: 5, width: '50%', marginTop: 10, marginLeft: 25 }}>
                  <Text style={{fontSize: 15 }}>{el}</Text>
                </View>
              ))}
          </View >
        </ScrollView>
        <View style={styles.inputContainer} >
          <TextInput
            onChangeText={(comment) => this.setState({ comment })}
            style={styles.input}
            value={comment}
            placeholder={this.state.user ? "leave your comment here..." : "write your nickname to join comments"}
          />
          {this.state.user == true ? <View style={{ width: '20%', backgroundColor: '#B4A8A8', height: 50, padding: 5 }}>
                                <Button
                                  title="Send"
                                  color="#696969"
                                  onPress={() => this.addComment()}
                                />
                              </View> 
                              : <View style={{ width: '20%', backgroundColor: '#B4A8A8', height: 50, padding: 5 }}>
                                <Button
                                  title="Send"
                                  color="#696969"
                                  onPress={() => this.setState({user: true})}
                                />
                              </View>}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgb(49,50,54)',
    padding: 20
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    bottom: 0
  },
  input: {
    width: '80%',
    borderWidth: 1,
    height: 50,
    backgroundColor: '#ffffff',
    borderColor: '#B4A8A8',
    paddingLeft: 15,
    paddingRight: 15,
  }
});

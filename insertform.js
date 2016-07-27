import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableNativeFeedback ,
  View
} from 'react-native';
import Button from 'sp-react-native-iconbutton';

export default class InsertForm extends Component {
  
  constructor(){
    super();
    this.state  = { name:'' }
  }
  handleSubmit(){
    console.log(this.state.name);
    this.props.onInsert(this.state.name);
  }
  handleChange(e){
    console.log(e);
    this.setState({
      name:e
    });
  }
  render() {
    const txt = this.state.name;
    return (
        <View>
        <Text>Report </Text>
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText ={(e)=>this.handleChange(e)}
        value={this.state.name}
      />
       <Button
                style={{backgroundColor: '#C3FEC2', height:60, width:250, borderRadius: 4, borderWidth: 1, borderColor: 'rgba(0,0,0,0.2)'}}
                textStyle={{color: 'white', textAlign: 'center'}}
                onPress={ ()=>{this.handleSubmit()}}>
              Send
            </Button>
        </View>
       );
  }
  
}

const styles = StyleSheet.create({
  buttonText:{
    fontSize:15
  },
  button:{
    borderWidth:1,
    borderColor:'#ffeeee'
  }
});



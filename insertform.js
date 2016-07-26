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
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText ={(e)=>this.handleChange(e)}
        value={this.state.name}
      />
       <TouchableHighlight
        style={styles.button}
        onPress={ ()=>{this.handleSubmit()}}>
        <View>
          <Text style={styles.buttonText}>Button!</Text>
        </View>
      </TouchableHighlight>    
      
            <Text>This is : {txt}</Text>
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



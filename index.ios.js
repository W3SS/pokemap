/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { MapView ,Dimensions, Modal,TouchableHighlight} from 'react-native';
import ActionButton from 'react-native-action-button';
import  InsertForm  from './insertform';


import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class pokeMap extends Component {
  
  constructor(){
    super();
      var watchID = null;
      this.state = {
        modalVisible: false,
        initialPosition:'',
      lastPosition:'',
    annotations:[]   };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  
  showModal(){
    this.setModalVisible(true);  
  }
  
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  }
  
  _onRegionChange(region){
    this.setState({
      region:region
    });
  }
  
  handleInsert(name){
    console.log('Insert');
    let annot ={ title:name, 
                 latitude:this.state.region.latitude, 
                 longitude:this.state.region.longitude 
                };
    var new_annotations = this.state.annotations.concat(annot);
    
    console.log(new_annotations);
    
    this.setState({annotations:new_annotations});
    this.setModalVisible(false);  
  }
  
  render() {
    return (
      <View>
        <MapView
        style={styles.mapview}
        showsUserLocation={true}
        followUserLocation={true}
        onRegionChange={(region)=>this._onRegionChange(region)}
        annotations={this.state.annotations}
        />
        
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{marginTop: 22}}>
          <View>
            <Text>Hello World!</Text>

            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>
            
             <InsertForm onInsert={(name)=> this.handleInsert(name)}/>
              <View>
        <Text>
          <Text style={styles.title}>Initial position: </Text>
          {this.state.initialPosition}
        </Text>
        <Text>
          <Text style={styles.title}>Current position: </Text>
          {this.state.lastPosition}
        </Text>
      </View>
          </View>
         </View>
        </Modal>

        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => this.showModal()}
        />
        
              
      </View>
       );
  }
}

const styles = StyleSheet.create({
  mapview: { 
    height:Dimensions.get('window').height ,
    width:Dimensions.get('window').width
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('pokeMap', () => pokeMap);

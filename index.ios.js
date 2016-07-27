/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { MapView ,Dimensions, Modal,TouchableHighlight} from 'react-native';
import ActionButton from 'react-native-action-button';
import  InsertForm  from './insertform';
import Axios from 'axios';
import Button from 'sp-react-native-iconbutton';


import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
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
    Axios.get('https://pokemap-andbet391.c9users.io/markers.json').then( (response) =>{
       this.setState({
         annotations:response.data
       });
    })
    .catch(function (error) {
      alert(error);
   });
    
    
  }
  
handleInsert(name){
    console.log('Insert');
    let annot ={ title:name, 
                 latitude:this.state.region.latitude, 
                 longitude:this.state.region.longitude,
                 report_date:new Date()
                };
    Axios.post('https://pokemap-andbet391.c9users.io/markers',annot).then((response)=>{
       alert('Post done');
    })
    .catch(function (error) {
      alert(error);
   });
    
    
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
         <View style={styles.modalcontent}>
           
              <InsertForm onInsert={(name)=> this.handleInsert(name)}/>

            <Button
                style={styles.btnCancel}
                textStyle={{color: 'white', textAlign: 'center'}}
                onPress={()=>this.setModalVisible(!this.state.modalVisible)}>
              Cancel
            </Button>
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
   modalcontent:{
        justifyContent: 'center',
        flex:1,
        alignItems:'center'     
    },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  btnCancel:{backgroundColor: '#FC5B5D', height:60, width:250,borderRadius: 4, borderWidth: 1, borderColor: 'rgba(0,0,0,0.2)'},
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('pokeMap', () => pokeMap);

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {MapView, Dimensions, Modal, TouchableHighlight} from 'react-native';
import ActionButton from 'react-native-action-button';
import InsertForm  from './insertform';
import Axios from 'axios';
import Button from 'sp-react-native-iconbutton';
import {debounce} from 'throttle-debounce';
import Icon from 'react-native-vector-icons/Ionicons';
import pokelist from './pokelist';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
Image
} from 'react-native';

class pokeMap extends Component {

    constructor() {
        super();
        var watchID = null;
        this.state = {
            modalVisible: false,
            initialPosition: null,
            lastPosition: null,
            annotations: [],
            follow:false
        };
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    showModal() {
        this.setModalVisible(true);
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {

                this.setState({initialPosition:position});
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );

        this.watchID = navigator.geolocation.watchPosition((position) => {
            this.setState({lastPosition:position});
        });

        this.getMarkers = debounce(1000,(region)=>this._getMarkers(region));

     }

    getMarkers(region){
        this._getMarkers(region);
    }
    _getMarkers(region) {
        this.setState({
            region: region
        });

        const reg = region;
        Axios.get('https://pokemap-andbet391.c9users.io/mark/region.json?latitude='+reg.latitude+'&longitude='+reg.longitude+'&deltalat='+reg.latitudeDelta+'&deltalng='+reg.longitudeDelta)
            .then((response) => {

            let martkers=[];
                response.data.forEach((m)=>{
                    m.view = this._getAnnotationView(m.title);
                    martkers.push(m);
                });
                this.setState({
                    annotations: martkers
                });
            })
            .catch(function (error) {
            });
    }

    _onRegionChange(region) {
        this.getMarkers(region);
    }

    _getAnnotationView(pokename){

        let view=null;

        pokelist.forEach((l)=>{
            if(l.name == pokename){
                view =  <View style={{ alignItems: 'center'}}>
                    <Image style={{width: 40, height: 60, resizeMode: 'contain'}} source={l.image}/>
                </View>
            }
        });

        return view;

    }



    handleInsert(data) {

        let annot = {
            title: data.pokemon,
            trainer:data.name,
            latitude: this.state.lastPosition.coords.latitude,
            longitude: this.state.lastPosition.coords.longitude,
            report_date: new Date()
        };

        Axios.post('https://pokemap-andbet391.c9users.io/markers', annot)
            .then((response)=> {
                annot.view = this._getAnnotationView(annot.title)
                var new_annotations = this.state.annotations.concat(annot);
                this.setState({annotations: new_annotations});
            })
            .catch(function (error) {
                alert(error);
                this.setModalVisible(false);
            });

        this.setModalVisible(false);
    }

    centerMap(){
       let follow =this.state.follow?false:true;
        this.setState({
            follow:follow
        })
    }

    render() {


        let color ='rgba(0,23,230,1)'
        if( this.state.follow){
            color ='rgba(250,23,60,1)'
        }
        return (
            <View>

                <MapView
                    style={styles.mapview}
                    showsUserLocation={true}
                    followUserLocation={this.state.follow}
                    onRegionChangeComplete={(region)=>this._onRegionChange(region)}
                    annotations={this.state.annotations}
                />

                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                >
                    <View style={styles.modalcontent}>

                        <InsertForm onInsert={(data)=> this.handleInsert(data)}/>

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
                <ActionButton
                    position="left"
                    buttonColor={color}
                    onPress={() => this.centerMap()}
                ></ActionButton>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    mapview: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    modalcontent: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'stretch',
        padding:10
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    btnCancel: {
        backgroundColor: '#FC5B5D',
        marginTop:70,
        height: 50,
        width: 150,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignSelf:'center'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('pokeMap', () => pokeMap);

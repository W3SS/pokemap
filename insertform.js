import React, {Component} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableNativeFeedback,
    View,
    Picker,
    Image
} from 'react-native';


export default class InsertForm extends Component {

    constructor() {
        super();
        this.state = {name: '',pokemon:pokelist[0].name}
    }

    handleSubmit() {
        console.log(this.state.name);

        let name =this.state.name?this.state.name:'Anonymous';
        const data = {
            name: name,
            pokemon: this.state.pokemon
        };

        this.props.onInsert(data);
    }

    handleChange(e) {
        console.log(e);
        this.setState({
            name: e
        });
    }

    render() {


        const txt = this.state.name;
        let imgSrc =pokelist[0].image;
        const pokename = this.state.pokemon;


        let items = pokelist.map((p)=>{
            return  <Picker.Item key={p.id} label={p.name} value={p.name} />
        });

        pokelist.forEach((pokemon)=>{
           if (pokemon.name == pokename){
               imgSrc =pokemon.image;
           }
        });


        return (
            <View >
                <Image
                    style={styles.pickimage}
                    source={ imgSrc }
                />
                <View style={styles.flowRight}>
                    <Picker
                        style={styles.picker}
                        selectedValue={this.state.pokemon}
                        onValueChange={(pokemon) => this.setState({pokemon: pokemon})}>

                        {items}
                    </Picker>
                </View>
                <View style={styles.flowRight}>


                    <TextInput
                        style={styles.searchInput}
                        placeholder='Trainer name'/>
                    <TouchableHighlight onPress={()=>this.handleSubmit()}style={styles.button}
                                        underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Send</Text>
                    </TouchableHighlight>
                </View>
            </View>

        );
    }

}

const styles = StyleSheet.create({
    title:{
      fontSize:30,
        alignSelf:'center',
        marginBottom:20
    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    picker: {
        width:350,
        alignSelf: 'center'
    },
    button: {
        height: 36,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC'
    },
    pickimage:{
        height:150,
        width:150,
        resizeMode:'contain',
        alignSelf:'center'
    }
});



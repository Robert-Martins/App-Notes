import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {


  const[state, setState] = useState('leitura');
  const[note, setNote] = useState('');

  useEffect(()=>
  {
    //Quando inicializar o app queremos que leia a key note
    (async()=>{
      try{
        const noteRead = await AsyncStorage.getItem('note');
        setNote(noteRead);
      }catch(error){

      }
    })();
    

  },[])



  setData = async() =>
  {
    try{
      await AsyncStorage.setItem('note', note);
    }catch(error){
      alert('Erro ao salvar');
    }

    alert('Sua anotação foi salva!');

  }


  function atualizarTexto()
  {
    setState('leitura');
    setData();
  }


  if(state == 'leitura')
  {

    return (
      <View style = {{flex:1}}>
        <StatusBar hidden/>

        <View style = {styles.header}><Text style = {styles.title}>App Notes</Text></View>
        {
          (note != '')?
          <View style = {{padding:20}}><Text>{note}</Text></View>
          :
          <View style = {{padding:20}}><Text style = {{opacity:0.5}}>Nenhuma anotação encontrada</Text></View>
        }
        {
          (note == '')?
          <TouchableOpacity onPress = {()=> setState('atualizando')} style = {styles.btnAdd}><Text style = {styles.btnAddText}>+</Text></TouchableOpacity>
          :
          <TouchableOpacity onPress = {()=> setState('atualizando')} style = {styles.btnSave}><Text style = {styles.btnSaveText}>Editar</Text></TouchableOpacity>
        }
       


      </View>
    );
  }

  else if(state == 'atualizando')
  {
    return (
      <View style = {{flex:1}}>
        <StatusBar style = "light"/>

        <View style = {styles.header}><Text style = {styles.title}>App Notes</Text></View>

        <View style = {{padding:20}}><TextInput autoFocus = {true} onChangeText = {(text)=> setNote(text)} multiline = {true} numberOfLines = {5} value = {note} style = {styles.textinput} ></TextInput></View>

        <TouchableOpacity onPress = {()=> atualizarTexto()} style = {styles.btnSave}><Text style = {styles.btnSaveText}>Salvar</Text></TouchableOpacity>


      </View>
    );
  }
}

  


const styles = StyleSheet.create({

  header:{
    width: '100%',
    padding: 30,
    backgroundColor: '#4872c7'
  },
  
  title:{
    textAlign: 'center',
    color: 'white',
    fontSize: 18
  },

  note:{
    
  },

  btnAdd:
  {
    position:'absolute',
    right:20,
    bottom:20,
    width:50,
    height:50,
    borderRadius:25,
    backgroundColor: '#4872c7'
  },

  btnAddText:
  {
    color: 'white',
    position: 'relative',
    textAlign: 'center',
    top: 3,
    fontSize: 30
  },

  btnSave:
  {
    position:'absolute',
    right:20,
    bottom:20,
    width:100,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#4872c7'
  },

  btnSaveText:
  {
    color:'white',
    textAlign: 'center',
    fontSize: 20
  },

  textinput:
  {
    height:300,
    textAlignVertical:'top'
  }

});




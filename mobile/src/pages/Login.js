import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({ navigation }) {
    //para pegar os estados, define o valor nos inputs e no onchangetext
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    /* Para verificar se o user está logado*/
    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('List');/*se encontrar navega auto
                para a pagina de login*/
            }
        });
    }, []);

    //chama esta função no OnPress
    async function handleSubmit() {
        //emails e techs
        const response = await api.post('/sessions', {
            email,
            techs
        });

        const { _id } = response.data;

        //para salvar no local store do celular
        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);

        /*Para navegar para a proxima tela a List, 
        que está cadastrada em rotas*/
        navigation.navigate('List');
    }
    //retorno de componentes
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Image source={logo} />

            <View style={styles.form}>
                <Text style={styles.label}>SEU E-MAIL:*</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Seu e-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false} 
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>TECNOLOGIAS:*</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Tecnologias de interesse"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Encontrar Spots</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

//Objeto de estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    label: {
        fontWeight: 'bold',
        color: '#615f5f',
        marginBottom: 8,
    },
    
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#615f5f',
        height: 44,
        marginBottom: 20,
        borderRadius: 5,
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
})
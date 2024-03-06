import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Icon from "react-native-feather";
import { themeColors } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // console.log({ username, password })
    try {
      const response = await axios.post('https://fiscaliaycontraloria.com/api/rest-auth/login/', { username, password });
      if (response.data.is_vendor){
        showToast('No tienes permiso para iniciar sesión como proveedor');
      } else {
        await AsyncStorage.setItem('jwtToken', response.data.token);
        navigation.navigate('Home');
      }
      // console.log(response.data);
    } catch (error) {
        showToast('Credenciales no válidas');
      console.log(error)
    }
  };

  const showToast = (message) => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: message
    });
  }

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const jwtToken = await AsyncStorage.getItem('jwtToken');
        if (jwtToken !== null) {
            // console.log(jwtToken)
            navigation.navigate('Home')
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };

    fetchToken();
  }, []);


  return (
    <View className="flex-1 bg-white" style={{backgroundColor: themeColors.bgColor(1)}}>
      <SafeAreaView  className="flex ">
        <View className="flex-row justify-start">
          <TouchableOpacity onPress={()=> navigation.goBack()} 
          className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <Icon.ArrowLeft strokeWidth={3} color="black" />
          </TouchableOpacity>
        </View>
        <View  className="flex-row justify-center">
          <Image source={require('../../assets/auth/login.png')} 
          style={{width: 200, height: 200}} />
        </View>
      </SafeAreaView>

      <View 
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}} 
        className="flex-1 bg-white px-8 pt-8"
      >
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">username</Text>  
          <TextInput 
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Username"
            onChangeText={setUsername}
          />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput 
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            secureTextEntry
            onChangeText={setPassword}
            placeholder="password"
          />
          <TouchableOpacity className="flex items-end">
            <Text className="text-gray-700 mb-5">Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={handleLogin}
            // onPress={()=> navigation.navigate('Home')}
            className="py-3 bg-yellow-400 rounded-xl">
              <Text 
                  className="text-xl font-bold text-center text-gray-700"
              >
                      Login
              </Text>
            </TouchableOpacity>
          
        </View>
        <Text className="text-xl text-gray-700 font-bold text-center py-5">Or</Text>
        <View className="flex-row justify-center space-x-12">
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require('../../assets/icons/google.png')} className="w-10 h-10" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require('../../assets/icons/apple.png')} className="w-10 h-10" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require('../../assets/icons/facebook.png')} className="w-10 h-10" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-7">
            <Text className="text-gray-500 font-semibold">
                Don't have an account?
            </Text>
            <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
                <Text className="font-semibold text-yellow-500"> Sign Up</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
    
  )
}
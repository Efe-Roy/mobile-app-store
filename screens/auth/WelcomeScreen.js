import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WelcomeScreen() {
    const navigation = useNavigation();

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
    <SafeAreaView className="flex-1" style={{backgroundColor: themeColors.bgColor(1)}}>
        <View className="flex-1 flex justify-around my-4">
            <Text 
                className="text-white font-bold text-4xl text-center">
                Let's Get Started!
            </Text>
            <View className="flex-row justify-center">
                <Image source={require("../../assets/auth/send.png")}
                    style={{width: 350, height: 350}} />
            </View>
            <View className="space-y-4">
                <TouchableOpacity
                    onPress={()=> navigation.navigate('SignUp')}
                    className="py-3 bg-yellow-400 mx-7 rounded-xl">
                        <Text 
                            className="text-xl font-bold text-center text-gray-700"
                        >
                            Sign Up
                        </Text>
                </TouchableOpacity>
                <View className="flex-row justify-center">
                    <Text className="text-white font-semibold">Already have an account?</Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                        <Text className="font-semibold text-yellow-400"> Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}
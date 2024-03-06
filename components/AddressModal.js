import React, { useState, useEffect } from 'react';
import { TextInput, Text, View, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import * as Icon from "react-native-feather";
import { getLocation } from '../redux/features/basketSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function AddressModal() {
    const dispatch = useDispatch();

    const getPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log("Please grant location permissions");
            return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
        // console.log(currentLocation);
        dispatch(getLocation(currentLocation));
    }; 

    const Cart = useSelector(state => state.basket)

  return (
    <View className='flex-1'>
        <Text className='font-extrabold ml-8 mt-3 text-2xl'>
            My Addresses
        </Text>
        
        {/* search bar */}
        <View className="flex-row items-center space-x-2 px-4 py-2 ">
            <View className="flex-row flex-1 items-center p-3 px-5 rounded-xl border bg-gray-100 border-gray-200">
                <TextInput placeholder='Seach new address' className="ml-2 flex-1 text-black" keyboardType='default' />
                <Icon.Search height="25" width="25" stroke="gray" />
            </View>
        </View>

        <TouchableOpacity onPress={getPermissions} className="ml-5 my-5 flex-row items-center">
            <Icon.Navigation height={15} width={15} stroke="black" />
            <Text className='font-medium ml-5 text-base'>
                Current Location
            </Text>
        </TouchableOpacity>

        {Cart.location && 
            <>
                {/* <Text>{JSON.stringify(Cart.location)}</Text> */}
                <MapView
                initialRegion={{
                    latitude: Cart.location.coords.latitude,
                    longitude: Cart.location.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }} 
                className="flex-1"
                mapType="standard"
                >
                    <Marker 
                        coordinate={{
                            latitude: Cart.location.coords.latitude,
                            longitude: Cart.location.coords.longitude
                        }} 
                        // title="Papa Johns Ro"
                        // description="Hot and spicy pizzas"
                        pinColor="red"
                    />
                </MapView>
            </>
        }
    </View>
  );
}



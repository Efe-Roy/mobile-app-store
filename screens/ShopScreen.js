import { View, Text, StatusBar, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import ItemRow from '../components/ItemRow';
import axios from 'axios';
import BasketIcon from '../components/BasketIcon';

export default function ShopScreen() {
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([]);

    const {params} = useRoute();
    const navigation = useNavigation();
    let itemData = params;

    useLayoutEffect(()=>{
        navigation.setOptions({headerShown: false})
    },[])


    useEffect(() => {
        const fetchData = async () => {
            console.log(itemData?.id);
            try {
                setLoading(true);
                const url = `https://fiscaliaycontraloria.com/api/products/?shop_id=${itemData?.id}`
                const response = await axios.get(url)

                // console.log("xxss", response.data);
                setDataSource(response.data);
                setLoading(false);

            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);

  return (
    <>
        <BasketIcon />
        <ScrollView  >
            <View className="relative">
                <Image className="w-full h-72" source={{uri:itemData.image}} />
                <TouchableOpacity 
                    onPress={()=>navigation.goBack()} 
                    className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow">
                    <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
                </TouchableOpacity>
            </View>
            <View 
                style={{borderTopLeftRadius: 40, borderTopRightRadius: 40}} 
                className="bg-white -mt-12 pt-6">
                <View className="px-5">
                    <Text className="text-3xl font-bold">{itemData.name}</Text>
                    {/* copy this code from restaurant card */}
                    <View className="flex-row space-x-2 my-1">
                        <View className="flex-row items-center space-x-1">
                            <Image 
                                source={require('../assets/images/fullStar.png')} 
                                className="h-4 w-4" />
                            <Text className="text-xs">
                                <Text className="text-green-700">{itemData.rating}</Text>
                                <Text className="text-gray-700"> (4.6k review)</Text> · <Text className="font-semibold text-gray-700">{itemData?.type}</Text>
                            </Text>
                        </View>
                        {/* <View className="flex-row items-center space-x-1">
                            <Icon.MapPin color="gray" width={15} height={15} />
                            <Text className="text-gray-800 text-xs"> Nearby · {itemData?.address}</Text>
                        </View> */}
                    </View>
                    <Text className="text-gray-500 mt-2">{itemData.description}</Text>
                    
                    
                </View>
                
            </View>
            <View className="pb-36 bg-white">
                <Text className="px-4 py-4 text-2xl font-bold">Menu</Text>
                {/* items */}
                {
                    dataSource?.map((dish, i)=>{
                        return (
                            <ItemRow 
                                key={i}
                                id={dish.id}
                                name={dish.name}
                                description={dish.description}
                                price={dish.price}
                                image={dish.image}
                            />
                        )
                    })
                }
            </View>
      
        </ScrollView>
    </>
    
  )
}
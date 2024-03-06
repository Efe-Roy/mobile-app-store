import { useRoute } from '@react-navigation/native';
import React from 'react'
import { Text, View, TouchableOpacity, Image, Alert, ScrollView } from 'react-native'
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import { useDispatch } from 'react-redux';
import { handleAddToCart } from '../redux/features/basketSlice';

export default ItemDetailScreen = ({navigation}) => {
  const {params} = useRoute();
  const dispatch = useDispatch();
  let itemData = params;

  return (
    <View className='bg-white shadow'>
      <ScrollView>
        <View className="relative">
            <Image
              style={{borderBottomRightRadius: 50, borderBottomLeftRadius: 50, }}  
              className="w-full h-96" 
              source={{uri:itemData?.image}} 
            />
            <TouchableOpacity 
                onPress={()=>navigation.goBack()} 
                className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow">
                <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
            </TouchableOpacity>
            <TouchableOpacity 
                className="absolute top-14 right-4 bg-gray-50 p-2 rounded-full shadow">
                <Icon.Heart strokeWidth={5} className='text-red-500' />
            </TouchableOpacity>
        </View>
        <View className="p-5">
          <Text className="text-3xl text-center font-bold">{itemData?.name}</Text>
          <View className="flex-row item-center justify-center space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                  <Image 
                      source={require('../assets/images/fullStar.png')} 
                      className="h-4 w-4" />
                  <Text className="text-xs">
                      <Text className="text-green-700">{itemData?.rating}</Text>
                      <Text className="text-gray-700"> (4.6k review)</Text> · <Text className="font-semibold text-gray-700">{itemData?.type}</Text>
                  </Text>
              </View>
              <View className="flex-row items-center space-x-1">
                  <Icon.MapPin color="gray" width={15} height={15} />
                  <Text className="text-gray-800 text-xs"> Nearby · {itemData?.address}</Text>
              </View>
          </View>
          <Text className="text-green-500 text-center text-xl font-bold mt-2">$ {itemData?.price}</Text>
          <Text className="text-gray-500 mt-2">{itemData?.description}</Text>
        </View>

        <View className='mx-10 flex-row items-center justify-center'>
          <Image
            className='w-[40px] h-[40px]'
            source={{ uri: 'https://img.icons8.com/color/40/000000/star.png' }}
          />
          <Image
            className='w-[40px] h-[40px]'
            source={{ uri: 'https://img.icons8.com/color/40/000000/star.png' }}
          />
          <Image
            className='w-[40px] h-[40px]'
            source={{ uri: 'https://img.icons8.com/color/40/000000/star.png' }}
          />
          <Image
            className='w-[40px] h-[40px]'
            source={{ uri: 'https://img.icons8.com/color/40/000000/star.png' }}
          />
          <Image
            className='w-[40px] h-[40px]'
            source={{ uri: 'https://img.icons8.com/color/40/000000/star.png' }}
          />
        </View>
        
        <View className='mx-10'>
          <TouchableOpacity 
            className='h-[45px] mt-5 flex-row items-center justify-center rounded-3xl' 
            onPress={() => dispatch(handleAddToCart(itemData.id))}
            style={{backgroundColor: themeColors.bgColor(1)}}
          >
            <Text className='text-white text-xl'>Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

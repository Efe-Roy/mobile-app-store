import { View, Text, ScrollView, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native';
import * as Icon from "react-native-feather";
import axios from 'axios';

export default function ShopRow() {
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = 'https://fiscaliaycontraloria.com/api/shops/'
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
    <View className='mt-9'>
      <View className="flex-row justify-between items-center px-4">
        <View>
          <Text className="font-bold text-lg">Available Shops</Text>
          <Text className="text-gray-500 text-xs">
            All quality services
          </Text>
        </View>
        
        <TouchableOpacity>
          <Text style={{color: themeColors.text}} className="font-semibold">See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
            paddingHorizontal:15,
        }}
        className="overflow-visible py-5"
       >
        {
          dataSource.map((data, index)=>{
            return (
              <TouchableWithoutFeedback 
                key={index}
                onPress={()=>{
                  navigation.navigate('Shop', data)
                }}
              >
                <View style={{shadowColor: themeColors.bgColor(0.2), shadowRadius: 7}} className="mr-6 bg-white rounded-3xl shadow-lg">
                    {/* <Text>{JSON.stringify(data)}</Text> */}
                    <Image  className="h-36 w-64 rounded-t-3xl" source={{uri:data?.image}} />
                  
                  <View className="px-3 pb-4 space-y-2">
                  
                    <Text className="text-lg font-bold pt-2">{data?.name}</Text>
                    <View className="flex-row items-center space-x-1">
                        <Image source={require('../assets/images/fullStar.png')} className="h-4 w-4" />
                        <Text className="text-xs">
                            <Text className="text-green-700">{data?.rating}</Text>
                            <Text className="text-gray-700"> ({data?.reviews} review)</Text> · <Text className="font-semibold text-gray-700">{data?.type}</Text>
                        </Text>
                    </View>
                    {/* <View className="flex-row items-center space-x-1">
                        <Icon.MapPin color="gray" width={15} height={15} />
                        <Text className="text-gray-700 text-xs"> Nearby · {data?.address}</Text>
                    </View> */}
                  </View>
                </View>
                
              </TouchableWithoutFeedback>    
            )
          })
        }           
      </ScrollView>
    
    </View>
  )
}
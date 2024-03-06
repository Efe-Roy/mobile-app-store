import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native'

export default ProductList = () => {
    const navigation = useNavigation();
    const [products, setProducts] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
    try {
        const url = `https://fiscaliaycontraloria.com/api/products/?page=1&PageSize=4`
        const response = await axios.get(url)

        // console.log("xxss", response.data);
        setProducts(response.data.results);

    } catch (error) {
        console.log(error)
    }
    };

    fetchData();
}, []);

  addProductToCart = () => {
    Alert.alert('Success', 'The product has been added to your cart')
  }

  return (
    <View className="flex-1 my-4">
      <View style={{
        paddingHorizontal: 5,
        backgroundColor: '#E6E6E6',
      }}>
        <View className="flex-row justify-center mt-5 items-center px-4">
          <View>
            <Text className="font-bold text-lg">Latest Products</Text>
            <Text className="text-gray-500 text-xs">
              All quality services
            </Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={{
          alignItems: 'center',
        }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {products?.map((item) => {
              const { name, description, id, price, image } = item;
              return(
                <View key={item.id} className='basis-2/4'>
                  <View className="shadow-xl mx-1 my-2 bg-white rounded-xl">

                    <Image className='flex-1 h-[150px] rounded-t-xl' source={ {uri:item.image} } />
                    <Text numberOfLines={1} ellipsizeMode="tail" className='text-lg text-center'>{item.name}</Text>

                    <TouchableOpacity
                        className='flex p-3 flex-row justify-center items-center'
                      // onPress={addProductToCart}
                        onPress={()=>{
                          navigation.navigate('Detail', {name, description, id, price, image})
                        }}
                      >
                      <Image
                        className='w-[25px] h-[25px]'
                        source={{
                          uri: 'https://img.icons8.com/nolan/96/3498db/add-shopping-cart.png',
                        }}
                      />
                      <Text>Buy Now</Text>
                      
                    </TouchableOpacity>
                      
                  </View>
                </View>
              )
            })}
          </View>
        </ScrollView>
        <View className='mt-5'></View>
      </View>


    </View>
  )
}
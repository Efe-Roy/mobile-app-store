import { View, Text, SafeAreaView, StatusBar, TextInput, ScrollView, TouchableOpacity, Modal, Button } from 'react-native'
import React, { useState } from 'react'
import * as Icon from "react-native-feather";
import { themeColors } from '../theme'
import Categories from '../components/Categories';
import ProductList from '../components/ProductList';
import ShopRow from '../components/ShopRow';
import Slider from '../components/Slider';
import AddressModal from '../components/AddressModal';

export default function HomeScreen({navigation}) {
    const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <SafeAreaView className="bg-white" >
        <StatusBar
            // barStyle="dark-content" 
        />

        {/* Modal */}
        <Modal
            visible={isModalVisible}
            onRequestClose={()=>setIsModalVisible(false)}
            animationType='fade'
        >
            <View className=''>
                <TouchableOpacity 
                    onPress={()=>setIsModalVisible(false)} 
                    className=" bg-gray-200 p-2 w-10 h-10 ml-5 mt-5 rounded-full shadow">
                    <Icon.ArrowLeft strokeWidth={3} stroke="black" />
                </TouchableOpacity>
            </View>
            <AddressModal />
        </Modal>

        {/* Header */}
        <View className="flex-row items-center space-x-2 px-4 py-2 ">
            <TouchableOpacity onPress={()=>navigation.toggleDrawer()} className="p-3 mr-8">
              <Icon.UserCheck height={20} width={20} strokeWidth="2.5" stroke="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>setIsModalVisible(true)} className="flex-1 flex-row items-center">
                <Icon.MapPin height={15} width={15} stroke="red" />
                <Text className='font-bold mx-2'>
                    Current Location
                </Text>
                <Icon.ChevronDown height={15} width={15} strokeWidth="4.5" stroke="black" />
            </TouchableOpacity>
        </View>

        {/* search bar */}
        <View className="flex-row items-center space-x-2 px-4 py-2 ">
            <View className="flex-row flex-1 items-center p-3 px-5 rounded-xl border border-gray-200">
                <TextInput placeholder='What do you want to order today?' className="ml-2 flex-1" keyboardType='default' />
                <Icon.Search height="25" width="25" stroke="gray" />
            </View>
        </View>

        {/* main */}
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: 50
            }}
        >
            <Slider />
            <Categories />
            <ShopRow />
            {/* <ProductList /> */}
        </ScrollView>
    </SafeAreaView>
  )
}
import { DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { HomeStack, OtherStack } from './stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Linking } from 'react-native';
import * as Icon from "react-native-feather";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export const MyDrawer = () => {
  const bool = true;
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('jwtToken');
    navigation.navigate('Login');
  };
  return (
    <Drawer.Navigator 
      screenOptions={{headerShown: false}}
      drawerContent={(props) => {
        return (
          <SafeAreaView>
            <View className='p-5'>
              <Text className='text-2xl'>Hi</Text>
              <Text className='text-3xl mt-2 font-bold'>Efe</Text>
            </View>
            <DrawerItemList {...props} />
            <DrawerItem 
              label='Log Out'
              onPress={()=> handleLogout()}
              icon={()=> (
                  <Icon.Power height={20} width={20} strokeWidth="2.5" stroke="black" />
              )}
            />
          </SafeAreaView>
        )
      }}
    >
      <Drawer.Screen name="HomeStack" component={HomeStack} options={{
        title: 'Home',
        drawerIcon: ()=> <Icon.Home height={20} width={20} strokeWidth="2.5" stroke="black" />
      }} />

      {bool &&
        <Drawer.Screen name="OtherStack" component={OtherStack} options={{
          title: 'Other',
          drawerIcon: ()=> <Icon.User height={20} width={20} strokeWidth="2.5" stroke="black" />
        }} /> 
      }
    </Drawer.Navigator>
  );
}
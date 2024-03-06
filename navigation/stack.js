import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import ShopScreen from '../screens/ShopScreen';
import CartScreen from '../screens/CartScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';
import PreparingOrderScreen from '../screens/PreparingOrderScreen';
import DeliveryScreen from '../screens/DeliveryScreen';
import CouponScreen from '../screens/CouponScreen';

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator 
      initialRouteName='Welcome' 
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />

      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Shop" component={ShopScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Detail" component={ItemDetailScreen} />
      <Stack.Screen name="PreparingOrder" component={PreparingOrderScreen} />
      <Stack.Screen name="Delivery" component={DeliveryScreen} />
    </Stack.Navigator>
  );
}

export const OtherStack = () => {
  return (
    <Stack.Navigator 
      initialRouteName='Coupon' 
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="Coupon" component={CouponScreen} />
    </Stack.Navigator>
  );
}
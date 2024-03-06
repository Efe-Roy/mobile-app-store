import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { MyDrawer } from './navigation/drawer';

export default function Navigation() {
    return (
      <NavigationContainer>
        <MyDrawer />
        <Toast />
      </NavigationContainer>
    );
  }
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { MyFriends } from './components/MyFriends';
import { AddFriend } from './components/AddFriend';
import Header from './components/Header';

import { Home } from './components/Home';
import { UserProvider } from './context/userContext';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <View>
          <Header />
        </View>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="My friends" component={MyFriends} />
          <Drawer.Screen name="Add friend" component={AddFriend} />
        </Drawer.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}



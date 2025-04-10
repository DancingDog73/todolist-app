import { React, useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreen from '../Screen/HomeScreen'
import SignInScreen from '../Screen/SignInScreen'
import SignOutScreen from '../Screen/SignOutScreen'
import SignUpScreen from '../Screen/SignUpScreen'
import { TokenContext } from '../Context/Context'
import NavigationTodo from './NavigationTodo'
import homeIcon from '../assets/home.png'
import todoListsIcon from '../assets/to-do-list.png'
import accountIcon from '../assets/user.png'
import signInIcon from '../assets/log-in.png'
import signUpIcon from '../assets/add-user.png'
import { Image } from 'react-native'


const Tab = createBottomTabNavigator()


export default function Navigation () {

  const [token, setToken] = useContext(TokenContext)

  return (
    <NavigationContainer>
      {token == null ? (
        <Tab.Navigator screenOptions={{headerTitleAlign: 'center', tabBarShowLabel: false}}>
          <Tab.Screen
            name='SignIn'
            component={SignInScreen}
            options={{
              tabBarIcon: ({ size, focused }) => (<Image source={signInIcon} style={{ width: size, height: size, tintColor: focused ? '#0077b6' : null }} />),
              title: "Connexion"
            }} 
          />
          <Tab.Screen
            name='SignUp'
            component={SignUpScreen}
            options={{
              tabBarIcon: ({ size, focused }) => (<Image source={signUpIcon} style={{ width: size, height: size, tintColor: focused ? '#0077b6' : null }} />),
              title: "Création de compte"
            }} 
          />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator screenOptions={{headerTitleAlign: 'center', tabBarShowLabel: false}}>
          <Tab.Screen
            name='Home'
            component={HomeScreen}
            options={{
              tabBarIcon: ({ size, focused }) => (<Image source={homeIcon} style={{ width: size, height: size, tintColor: focused ? '#0077b6' : null }} />),
              title: "Accueil"
            }} 
          />
          <Tab.Screen 
            name='TodoLists'
            component={NavigationTodo}
            options={{
              tabBarIcon: ({ size, focused }) => (<Image source={todoListsIcon} style={{ width: size, height: size, tintColor: focused ? '#0077b6' : null }} />),
              title: "Mes TodoLists",
              headerShown: false
            }} 
          />
          <Tab.Screen
            name='SignOut'
            component={SignOutScreen}
            options={{
              tabBarIcon: ({ size, focused }) => (<Image source={accountIcon} style={{ width: size, height: size, tintColor: focused ? '#0077b6' : null }} />),
              title: "Mon Compte"
            }} 
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  )
}
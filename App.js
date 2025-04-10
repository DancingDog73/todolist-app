import {useState} from "react";
import { StatusBar } from 'expo-status-bar';

import Navigation from './Navigation/Navigation';
import { TokenContext, UsernameContext } from './Context/Context'
import { View } from "react-native-web";
import { StyleSheet } from "react-native";


export default function App () {
  const [token, setToken] = useState(null)
  const [username, setUsername] = useState(null)

  console.log('token', token)
  return (
    <UsernameContext.Provider value={[username, setUsername]}>
      <TokenContext.Provider value={[token, setToken]}>
        <View style={styles.container}>
          <View style={styles.navigationWrapper}>
            <Navigation />
          </View>
        </View>
      </TokenContext.Provider>
    </UsernameContext.Provider>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  navigationWrapper: {
    width: '95%',
    height: '85%',
    maxWidth: 700,
    maxHeight: 800, 
    backgroundColor: '#fff',
    borderRadius: 30, 
    overflow: 'hidden',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10, 
  },
});
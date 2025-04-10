import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TodoListsScreen from "../Screen/TodoListsScreen"
import TodoListDetailsScreen from "../Screen/TodoListDetailsScreen"


const Stack = createNativeStackNavigator()


export default function NavigationTodo () {
    return (
        <Stack.Navigator initialRouteName='List' screenOptions={{headerTitleAlign: 'center'}} >
            <Stack.Screen name='List' component={TodoListsScreen} screenOptions={{ headerShown: false }} options={{title: 'Mes TodoLists'}}/>
            <Stack.Screen name='Details' component={TodoListDetailsScreen} screenOptions={{ headerShown: true }} options={{title: 'Ma TodoList'}} />
        </Stack.Navigator>
    )
}
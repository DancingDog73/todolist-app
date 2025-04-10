import React, {useState} from "react";
import { View, StyleSheet } from 'react-native';
import {Switch, Text, Image, TouchableOpacity, Button} from 'react-native-web';

export default function TodoItem(props){
    const [done, setDone] = useState(props.item.done);
    const changeValue = () => {setDone(done => !done); props.modifyCount(done?-1:1)};
    
    
    const onPress = () => props.deleteTodo(props.item.id);
    return (
        <View style={styles.content}>
            <Text  style={done ? {textDecorationLine: 'line-through'} : {}}>{props.item.content}</Text>
            <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={done ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={changeValue}
                value={props.item.done}
            />

            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Image source={require('../assets/trash-can-outline.png')} style={{height:23, width:23}}/>
            </TouchableOpacity>
            {/*<Button title='Press me' onPress={props.onPressed} />*/}
        </View>
        
    )
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        margin:10,
        padding: 10,gap:10,
        
    },
    text_item: {
        marginLeft: 10,
        width: 150
    }
})
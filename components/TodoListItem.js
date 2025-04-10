import Item from "./UI/Item"
import { Pressable, Text } from "react-native"


export default function TodoListItem (props) {

    const listDetails = () => {
        props.navigation.setOptions({title: props.item.title})
        props.navigation.navigate('Details', {id: props.item.id})
    } 


    return (
        <Pressable onPress={() => props.navigation.navigate('Details', {id: props.item.id, title: props.item.title})}>
            <Item
                id={props.item.id}
                title={props.item.title}
                delete={() => props.delete(props.item.id)}
            />
        </Pressable>
    )
}
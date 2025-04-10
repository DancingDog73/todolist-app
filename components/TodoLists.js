import { FlatList, View } from "react-native-web"
import { useContext } from "react"

import { TokenContext } from "../Context/Context"
import TodoListItem from "./TodoListItem"
import { deleteTodoList } from "../API/todoList"
import { StyleSheet } from "react-native"
import EmptyList from "./UI/EmptyList"


export default function TodoLists (props) {

    const [token, setToken] = useContext(TokenContext)

    const deleteList = (id) => {deleteTodoList(id, token)}

    return (
        <>
            {props.data.length === 0 ? (
                <EmptyList
                    message="Aucune liste"
                    image={require("../assets/empty-folder.png")}
                />
            ) : (
                <FlatList
                    style={styles.container}
                    data={props.data}
                    renderItem={({ item }) => <TodoListItem item={item} delete={() => deleteList(item.id)} navigation={props.navigation} />}
                />
            )}
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        paddingHorizontal: 20
    }
});
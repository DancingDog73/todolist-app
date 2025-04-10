import { Text } from "react-native-web"

import TodoListDetails from "../components/TodoListDetails"


export default function TodoListDetailsScreen (props) {

    return (
        <TodoListDetails navigation={props.navigation} route={props.route} />
    )

}
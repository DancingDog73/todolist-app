import { TokenContext, UsernameContext } from "../Context/Context";
import React, {useContext, useEffect, useState} from "react";
import { FlatList, View, Text, Image, Pressable, TextInput, } from "react-native-web";

import {getTodoLists, deleteTodoList, createTodoList} from '../API/todoList'
import TodoLists from "../components/TodoLists";
import NavigationTodo from "../Navigation/NavigationTodo";
import Input from "../components/UI/Input";
import { StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import ProgressBar from "../components/UI/ProgressBar";
import { getTodos } from "../API/todo";
import LoadingIndicator from "../components/UI/LoadingIndicator";


export default function TodoListsScreen(props) {

  const [username, setUsername] = useContext(UsernameContext)
  const [token, setToken] = useContext(TokenContext)

  const [todoLists, setTodoLists] = useState([])
  const [overallProgression, setOverallProgression] = useState(0);

  const [showForm, setShowForm] = useState(false);

  const [isLoading, setIsLoading] = useState(true);


  useEffect(
    () => {
      getTodoLists(username, token)
        .then(lists => {
          setTodoLists(lists);
          calculateOverallProgression(lists);
          setTimeout(() => {
            setIsLoading(false);
          }, 175);
        })
        .catch(error => console.log('error', error.message))
    },
    [todoLists]
  )

  const calculateOverallProgression = async (lists) => {
    const listsTodosPromises = lists.map((list) => getTodos(list.id, token));

    try {
      const listsTodosResults = await Promise.all(listsTodosPromises);
      const listsTodos = listsTodosResults.flat();

      let totalTodos = listsTodos.length;
      let completedTodos = listsTodos.filter(todo => todo.done).length;

      setOverallProgression(totalTodos === 0 ? 0 : completedTodos / totalTodos);
    } catch (error) {
      console.log(error.message);
    }
  }

  const addTodoList = (listTitle) => {
    if (listTitle !== "") {
      createTodoList(username, listTitle, token)
        .then((res) => {console.log; setShowForm(false)})
        .catch(error => console.log('error', error.message))
    }
  }
  
  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <View style={styles.container}>
          <TodoLists data={todoLists} navigation={props.navigation} />
    
          {showForm && (
            <View style={styles.overlay}>
              <View style={styles.formContainer}>
                <Input
                  placeholder="Entrez le titre de votre nouvelle liste"
                  action={addTodoList}
                  cancel={() => setShowForm(false)}
                />
              </View>
            </View>
          )}
    
          <View style={styles.footer}>
            <Text style={styles.listCount}>{todoLists.length} liste(s)</Text>
    
            <View style={styles.progressBarContainer}>
              <ProgressBar
                progress={overallProgression}
              />
            </View>
    
            <Pressable style={styles.floatingButton} onPress={() => setShowForm(true)}>
              <Text style={styles.floatingButtonText}>+</Text>
            </Pressable>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#f4f6f9",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: 1,
  },
  formContainer: {
    width: "70%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 100,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 10,
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  listCount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  progressBarContainer: {
    flex: 1,
    marginHorizontal: 20,
    alignItems: "center",
  },
  floatingButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#0077b6",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
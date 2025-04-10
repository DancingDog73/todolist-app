import { useEffect, useState, useContext } from "react"
import { FlatList, Image, Pressable, Text, TextInput, View } from "react-native-web"

import { TokenContext } from "../Context/Context"
import { createTodo, deleteTodo, getTodos, updateTodo } from "../API/todo"
import TodoItem from "./TodoItem"
import Input from "./UI/Input"
import ProgressBar from "./UI/ProgressBar"
import { StyleSheet, ImageBackground } from "react-native"
import EmptyList from "./UI/EmptyList"
import { updateTodoList } from "../API/todoList"
import LoadingIndicator from "./UI/LoadingIndicator"


export default function TodoListDetails ({ navigation, route }) {

    const [token, setToken] = useContext(TokenContext)

    const [todos, setTodos] = useState([])
    const [filter, setFilter] = useState("all")
    const [todosCount, setTodosCount] = useState(0)
    const [doneTodosCount, setDoneTodosCount] = useState(0)
    const [showForm, setShowForm] = useState(false);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [editedTitle, setEditedTitle] = useState(route.params.title);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {displayTodos()}, [filter, todos])

    const displayTodos = () => {
        getTodos(route.params.id, token)
        .then(allTodos => {
            //console.log(t);
            setCounts(allTodos)
            setTodos(allTodos.filter(todo => hasToBeDisplayed(todo)))
            setTimeout(() => {
                setIsLoading(false);
            }, 150);
        })
        .catch(error => console.log(error.message))
    }

    const hasToBeDisplayed = (todo) => {
        if (filter === "done") { return todo.done }
        if (filter === "undone") { return !todo.done }
        return true
    }

    const setCounts = (allTodos) => {
        setTodosCount(allTodos.length)
        setDoneTodosCount(allTodos.filter(todo => todo.done).length)
    } 


    const addTodo = (todoContent) => {
        if (todoContent !== "") {
            console.log(todoContent)
            createTodo(todoContent, route.params.id, token)
            .then(res => {console.log(todoContent, "a été ajouté"); setShowForm(false)})
            .catch(error => console.log(error.message))
        }
    }

    const deleteItem = (todo) => {
        deleteTodo(todo.id, token)
        .then(console.log(todo.content, "a été supprimé"))
        .catch(error => console.log(error.message))
    }

    const doItem = (todo) => {
        updateTodo(todo.id, !todo.done, token)
        .then(todo => console.log(todo.content, "a été", todo.done ? "checked" : "unchekcked"))
        .catch(error => console.log(error.message))
    }


    const showAll = () => {
        setFilter("all")
    }

    const showUndone = () => {
        setFilter("undone")
    }

    const showDone = () => {
        setFilter("done")
    }


    const checkAll = () => {
        todos.forEach(todo => updateTodo(todo.id, true, token).then(console.log).catch(err => console.log(err.message)))
    }

    const checkNone = () => {
        todos.forEach(todo => updateTodo(todo.id, false, token).then(console.log).catch(err => console.log(err.message)))
    }

    const handleTextChange = (text) => {
        setEditedTitle(text);
        if (error) setError("");
    };
    const handleEditTitle = () => {
        if (editedTitle.trim() !== "") {
          console.log("Nouveau titre :", editedTitle);
          updateTodoList(route.params.id, editedTitle.trim(), token).then(res => {route.params.title = editedTitle; setIsEditingTitle(false);}).catch(err => console.log(err.message))
        } else {
            setError("Votre titre ne peut pas être vide")
        }
    };
    
    return (
        <>
            {isLoading ? (
                <LoadingIndicator/>
            ) : (

                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        {isEditingTitle ? (
                            <>
                                <View style={styles.editRow}>
                                    <TextInput
                                        value={editedTitle}
                                        onChangeText={handleTextChange}
                                        style={[styles.titleInput, error && styles.inputError]}
                                        //onBlur={() => {setIsEditingTitle(false)}}
                                    />
                                    <Pressable style={styles.validateButton} onPress={handleEditTitle}>
                                        <Text style={styles.validateText}>Valider</Text>
                                    </Pressable>
                                </View>
                                {error !== "" ? <Text style={styles.errorText}>{error}</Text> : null}
                            </>
                        ) : (
                            <View style={styles.titleRow}>
                                <Text style={styles.title}>{route.params.title}</Text>
                                <Pressable onPress={() => {setEditedTitle(route.params.title); setIsEditingTitle(true)}}>
                                    <Image
                                        source={require("../assets/pencil.png")}
                                        style={styles.editIcon}
                                    />
                                </Pressable>
                            </View>
                        )}
                    </View>

                    <View style={styles.progressBar}>
                        <ProgressBar progress={todosCount ? doneTodosCount / todosCount : 0} />
                    </View>

                    <View style={styles.filterContainer}>
                        <Pressable
                            style={[styles.filterButton, filter === "all" && styles.activeFilter]}
                            onPress={showAll}
                        >
                            <Text style={styles.filterText}>Tous</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.filterButton, filter === "undone" && styles.activeFilter]}
                            onPress={showUndone}
                        >
                            <Text style={styles.filterText}>En cours</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.filterButton, filter === "done" && styles.activeFilter]}
                            onPress={showDone}
                        >
                            <Text style={styles.filterText}>Terminés</Text>
                        </Pressable>
                    </View>

                    {todos.length === 0 ? (
                        <EmptyList
                            message="Aucune tâche"
                            image={require("../assets/empty-folder.png")}
                        />
                    ) : (
                        <FlatList
                            data={todos}
                            renderItem={({ item }) => (
                                <TodoItem
                                    item={item}
                                    deleteItem={() => deleteItem(item)}
                                    doItem={() => doItem(item)}
                                    style={styles.todoItem}
                                />
                            )}
                        />
                    )}

                    <View style={styles.actionContainer}>
                        <Text style={styles.taskCount}>
                            {doneTodosCount}/{todosCount}
                        </Text>
                        <View style={styles.actions}>
                            <Pressable onPress={checkAll}>
                                <Text style={styles.actionButton}>Tout cocher</Text>
                            </Pressable>
                            <Pressable onPress={checkNone}>
                                <Text style={styles.actionButton}>Tout décocher</Text>
                            </Pressable>
                        </View>
                        <Pressable
                            style={styles.floatingButton}
                            onPress={() => setShowForm(true)}
                        >
                            <Text style={styles.floatingButtonText}>+</Text>
                        </Pressable>
                    </View>

                    {showForm && (
                        <ImageBackground
                            source={{ uri: "transparent" }}
                            style={styles.overlay}
                            blurRadius={10}
                        >
                            <View style={styles.formContainer}>
                                <Input
                                    placeholder="Nouvelle tâche"
                                    action={(todoContent) => {
                                    if (todoContent !== "") addTodo(todoContent);
                                    }}
                                    cancel={() => setShowForm(false)}
                                />
                            </View>
                        </ImageBackground>
                    )}
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f4f6f9",
      },
      titleContainer: {
        alignItems: "center",
        marginBottom: 20,
      },
      titleRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "80%",
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        flex: 1,
      },
      editRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "80%",
      },
      titleInput: {
        flex: 1,
        fontSize: 20,
        borderBottomWidth: 1,
        borderColor: "#0077b6",
        padding: 3,
      },
      editIcon: {
        width: 24,
        height: 24,
        marginLeft: 10,
      },
      validateButton: {
        backgroundColor: "#0077b6",
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginLeft: 10,
      },
      validateText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
      },
    progressBar: {
        width: "80%",
        alignSelf: "center",
        marginVertical: 10,
    },
    filterContainer: { flexDirection: "row", justifyContent: "center", marginBottom: 20 },
    filterButton: { padding: 10, marginHorizontal: 5, borderBottomWidth: 2, borderBottomColor: "transparent" },
    activeFilter: { borderBottomColor: "#0077b6" },
    filterText: { color: "#0077b6" },
    actionContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5,
    },
    taskCount: {
        fontSize: 18,
        fontWeight: "bold",
    },
    actions: {
        flexDirection: "row",
    },
    actionButton: {
        marginHorizontal: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: "#0077b6",
        color: "#fff",
        fontWeight: "bold",
    },
    floatingButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#0077b6",
        justifyContent: "center",
        alignItems: "center",
    },
    floatingButtonText: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
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
    inputError: {
        borderColor: "red",
      },
      errorText: {
        color: "red",
        marginTop: 5,
        fontSize: 14,
    }

})
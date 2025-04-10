import {React, useContext, useState, useEffect} from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import TodoList from '../components/TodoList';
import { TokenContext, UsernameContext } from '../Contexte/Context';
import Navigation  from '../Navigation/Navigation';
import Input from '../components/UI/Input';

import {getTodos, deleteTodo, updateTodo, createTodo} from '../API/todo';
import TodoItem from '../components/TodoItem';
import todoData from '../Helpers/todoData';


export default function TodoListScreen(props) {


    const [username, setUsername] = useContext(UsernameContext);
    const [token,setToken] = useContext(TokenContext);
    const [todos, setTodos] = useState([]);
    const [todoNext, setNewTodoNext] = useState('');

    const initialiseTodos = () => {
        getTodos(props.todoListId, token)
        .then(d => {
            setTodos(d)
        })
        .catch(err => {
            setError(err.message)
        })
    }

    useEffect(() => {initialiseTodos();}, []);

    const [count, setCount] = useState(todoData.filter((item) => item.done).length);
    const [filteredTodos, setFilteredTodos] = useState(todos);

    const deleteOneTodo = (id) => {
        deleteTodo(id, token)
        .then(() => {
            const newTodos = todos.filter(item => item.id != id)
            setTodos(newTodos)
            setFilteredTodos(newTodos);
            setCount(newTodos.filter(item => item.done).length)
        })
        .catch(err => console.error("Erreur lors de la suppression du Todo :", err));
        
    }
    
    const addNewTodo = (newTodoNext) => {
        if (!newTodo.trim()) return;
        createTodo(newTodoNext, props.todoListId, token)
        .then((createdTodo) => {
            setTodos([...todos, { id: createdTodo.id, content: newTodoNext, done: false }]);
            setFilteredTodos([...todos, { id: createdTodo.id, content: newTodoNext, done: false }])
            setNewTodoNext('');
        })
        .catch(err => console.error("Erreur lors de la création du Todo :", err));
        
    };

    const updateOneTodo = (todoId, done) => {
        updateTodo(todoId, done, token)
        .then(() => {

        })
        .catch(err => console.error("Erreur lors de la mise à jour du Todo :", err));
    }

    const modifyCount = (increment) => { setCount(count + increment)};

    const alldone = () => {
        setFilteredTodos(todos.filter((item) => item.done))
         
    }

    const undone = () => {
        setFilteredTodos(todos.filter((item) => !item.done))
         
    }

    const alltodos = () => {
        setFilteredTodos([...todos])
         
    }

    const checkAllTodos = () => {
        const newTodos = todos.map(item => ({...item, done: true}))
        setTodos(newTodos)
        setCount(newTodos.filter(item => item.done).length)
        setFilteredTodos(newTodos);
        
    }

    const uncheckAllTodos = () => {
        const newTodos = todos.map(item => ({...item, done: false}))
        setTodos(newTodos)
        setCount(newTodos.filter(item => item.done).length)
        setFilteredTodos(newTodos);
    }


    return (
        <><Text>On a au total {count} tâches réalisées !</Text>
            <Button title='Terminés' onPress={alldone}/>
            <Button title='Non résolus' onPress={undone}/>
            <Button title='Tout afficher' onPress={alltodos} />
            <Button title='Tout cocher' onPress={checkAllTodos} />
            <Button title='Tout décocher' onPress={uncheckAllTodos} />
    
            <FlatList
                style={{ paddingLeft: 10 }}
                data={todos}
                renderItem={({ item }) => <TodoItem item={item} modifyCount={modifyCount} deleteTodo={deleteTodo} />} />
            <View style={{ borderWidth: 1 }}>
                <Input
                    placeholder="Nouveau Todo"
                    buttonTitle="Ajouter"
                    onSubmit={addNewTodo}
                />
                <Button title="Ajouter" onPress={() => addNewTodo(todoNext)} />
            </View>


        </>

    )
}


    


   
            
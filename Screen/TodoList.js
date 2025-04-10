import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text, FlatList, Switch } from 'react-native';

import TodoItem from './TodoItem';
import todoData from '../Helpers/todoData';


export default function TodoList() {

    const [count, setCount] = useState(todoData.filter((item) => item.done).length);
    const [todos, setTodos] = useState(todoData);
    const [filteredTodos, SetFilteredTodos] = useState(todoData);

    const deleteTodo = (id) => {
        const newTodos = todos.filter(item => item.id != id)
        setTodos(newTodos)
        setCount(newTodos.filter(item => item.done).length)
        SetFilteredTodos(newTodos);
    }

    


    const modifyCount = (increment) => { setCount(count + increment) };

    const [todoNext, setNewTodoNext] = useState('');
    
    const addNewTodo = (newTodoNext) => {
        const monId = Math.max(...todos.map(item => item.id)) + 1;
        setTodos([...todos, { id: monId, content: newTodoNext, done: false }]);
        SetFilteredTodos([...todos, { id: monId, content: newTodoNext, done: false }])
        setNewTodoNext('');
    };
    const [alls,setAll] = useState([...todos]);

    const alldone = () => {
        SetFilteredTodos(todos.filter((item) => item.done))
         
    }

    const undone = () => {
        SetFilteredTodos(todos.filter((item) => !item.done))
         
    }

    const alltodos = () => {
        SetFilteredTodos([...todos])
         
    }

    const checkAllTodos = () => {
        const newTodos = todos.map(item => ({...item, done: true}))
        setTodos(newTodos)
        setCount(newTodos.filter(item => item.done).length)
        SetFilteredTodos(newTodos);
        
    }

    const uncheckAllTodos = () => {
        const newTodos = todos.map(item => ({...item, done: false}))
        setTodos(newTodos)
        setCount(newTodos.filter(item => item.done).length)
        SetFilteredTodos(newTodos);
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
                data={filteredTodos}
                renderItem={({ item }) => <TodoItem item={item} modifyCount={modifyCount} deleteTodo={deleteTodo} />} />
            <View style={{ borderWidth: 1 }}>
                <TextInput
                    onChangeText={todoNext => setNewTodoNext(todoNext)}
                    placeholder='saisir ici un nouvel item'
                    onSubmitEditing={() => addNewTodo(todoNext)}
                    value={todoNext}
                />
                <Button title="Ajouter" onPress={() => addNewTodo(todoNext)} />
            </View>


        </>

    )
}


    


   
            
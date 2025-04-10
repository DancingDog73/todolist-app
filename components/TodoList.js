import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text, FlatList, Switch, Pressable } from 'react-native';

import todoData from '../Helpers/todoData';
import TodoItem from './TodoItem';

export default function TodoList(){

    const [items, setItems] = useState(todoData);
    const [itemsCount, setItemsCount] = useState(items.length);
    const [doneItemsCount, setDoneItemsCount] = useState(items.filter((item) => item.done).length);
    const [newItemText, setNewItemText] = useState("");

    const [allItems, setAllItems] = useState(items);

    const updateView = (newItems) => {
        setItems(newItems)
        setItemsCount(newItems.length)
        setDoneItemsCount(newItems.filter(item => item.done).length)
    }

    const doItem = (item) => {
        item.done = !item.done
        updateView(items)
    }
    const addItem = () => {
        if (newItemText.trim() !== "") {
            let newId = Math.max(...items.map(item => item.id)) + 1;
            const newItems = [...items, {id: newId, content: newItemText, done: false}];
            updateView(newItems)
            setAllItems(newItems)
        }
        setNewItemText("")
    }
    
    const deleteItem = (id) => {
        const newItems = items.filter(item => item.id != id)
        updateView(newItems)
        setAllItems(newItems)
    }


    const showAll = () => {
        updateView(allItems)
    }
    const showDone = () => {
        updateView(allItems.filter(item => item.done))
    }
    const showUndone = () => {
        updateView(allItems.filter(item => !item.done))
    }

    const checkAll = () => {
        const newItems = items.map(item => {return {id: item.id, content: item.content, done: true}})
        const otherItems = allItems.filter((item) => !items.includes(item))
        updateView(newItems)
        setAllItems([...newItems, ...otherItems])
    }    
    const uncheckAll = () => {
        const newItems = items.map(item => {return {id: item.id, content: item.content, done: false}})
        const otherItems = allItems.filter((item) => !items.includes(item))
        updateView(newItems)
        setAllItems([...newItems, ...otherItems])
    }

    return (
        <View style={styles.main}>

            <View style={styles.checkers}>
                <Pressable onPress={() => checkAll()}>
                    <Text>Tout cocher</Text>
                </Pressable>
                <Pressable onPress={() => uncheckAll()}>
                    <Text>Tout décocher</Text>
                </Pressable>
            </View>

            <View style={styles.filters}>
                <Pressable onPress={() => showAll()} style={styles.filter}>
                    <Text>Tous</Text>
                </Pressable>
                <Pressable onPress={() => showUndone()} style={styles.filter}>
                    <Text>En cours</Text>
                </Pressable>
                <Pressable onPress={() => showDone()} style={styles.filter}>
                    <Text>Terminés</Text>
                </Pressable>
            </View>

            <View style={styles.info}>
                <Text>{doneItemsCount} tâches réalisées sur {itemsCount}</Text>
            </View>
            
            <FlatList
                style={styles.list}
                data={items}
                renderItem={({item}) => <TodoItem item={item} deleteItem={deleteItem} doItem={doItem} />}
            />

            <View style={styles.adder}>
                <TextInput
                    onChangeText={setNewItemText}
                    placeholder='saisir ici un nouvel item'
                    onSubmitEditing={addItem}
                    value={newItemText}
                    style={styles.addInput}
                />
                <Pressable onPress={() => addItem()}>
                    <Text>Ajouter</Text>
                </Pressable>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({

    main: {
        width: 300
    },

    list: {
        padding: 20
    },

    filters: {
        margin: 10,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    filter: {
        borderWidth: 1,
        padding: 5,
        flex: 1,
        alignItems: "center"
    },

    checkers: {
        margin: 10,
        flexDirection: "row",
        justifyContent: "space-around",
    },

    adder: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    addInput: {
        borderWidth: 1
    },

    info: {
        alignItems: "center"
    }

})
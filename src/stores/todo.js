import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'

export const useTodoStore = defineStore('counter', () => {
  const todos = ref([])
  const completedTodos = computed(() =>
    todos.value.filter((todo) => todo.isCompleted === true)
  )
  const incompleteTodos = computed(() =>
    todos.value.filter((todo) => todo.isCompleted !== true)
  )

  const lsKey = '_v_todos'

  const initFromLocalStorage = () => {
    const lstodos = localStorage.getItem(lsKey)

    if (lstodos === null) {
      todos.value = []
    } else {
      try {
        todos.value = JSON.parse(lstodos)
      } catch (e) {
        todos.value = []
      }
    }

    updateLocalStorage()
  }

  const updateLocalStorage = () => {
    localStorage.setItem(lsKey, JSON.stringify(todos.value))
  }

  const addTodo = (text) => {
    todos.value = [
      ...todos.value,
      {
        id: nanoid(),
        isCompleted: false,
        text,
      },
    ]
    updateLocalStorage()
  }

  const removeTodo = (id) => {
    todos.value = todos.value.filter((todo) => todo.id !== id)
    updateLocalStorage()
  }

  const toggleTodo = (id) => {
    todos.value.forEach((todo) => {
      if (todo.id === id) todo.isCompleted = !todo.isCompleted
    })
    updateLocalStorage()
  }

  const clearCompletedTodos = () => {
    todos.value = todos.value.filter((todo) => todo.isCompleted === false)
  }

  return {
    todos,
    completedTodos,
    incompleteTodos,
    addTodo,
    removeTodo,
    toggleTodo,
    initFromLocalStorage,
    updateLocalStorage,
    clearCompletedTodos,
  }
})

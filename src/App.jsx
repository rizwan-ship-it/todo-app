import React, { createContext, useState } from 'react'
import TodoCardContainer from './components/TodoCardContainer'
import TodoForm from './components/TodoForm'

export const todoContaxt = createContext(null)

function App () {
  const todoForminitialize = {
    title: '',
    description: ''
  }
  const [todoFormDetails, setTodoFormDetails] = useState(todoForminitialize)
  const [todoList, setTodoList] = useState([])
  const [todoEditId, setTodoEditId] = useState(null)

  return (
    <todoContaxt.Provider
      value={{
        todoList,
        setTodoList,

        todoFormDetails,
        setTodoFormDetails,
        todoForminitialize,

        todoEditId,
        setTodoEditId


      }}
    >
      <div className=' grid grid-cols-[2fr_1fr] gap-4 p-10 '>
        <div>
          <TodoCardContainer />
        </div>
        <div>
          <TodoForm />
        </div>
      </div>
    </todoContaxt.Provider>
  )
}

export default App

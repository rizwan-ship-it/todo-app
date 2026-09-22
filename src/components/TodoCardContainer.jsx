import React, { useContext } from 'react'
import TodoCard from './TodoCard'
import { todoContaxt } from '../App'

function TodoCardContainer () {
  const { todoList } = useContext(todoContaxt)
  console.log('todoList', todoList)

  return (
    <div
      className='bg-gray-200 text-white inset-shadow-sm inset-shadow-indigo-500 
    rounded  '
    >
      <div className='grid grid-cols-1 gap-4 content-start px-2 py-4 overflow-y-auto h-screen scrollbar-thin scroll-smooth xl:w-full xl:grid-cols-3 md:w-full md:grid-cols-2'>
        {todoList.length <= 0 ? (
          <h1 className='font-bold text-5xl text-gray-700  '>
            Todo list is empty
          </h1>
        ) : (
          todoList.map(todo => {
            return <TodoCard key={todo.id} todoDetails={todo} />
          })
        )}
      </div>
    </div>
  )
}

export default TodoCardContainer

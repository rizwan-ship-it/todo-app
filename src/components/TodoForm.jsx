import { FilePlusCorner } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { todoContaxt } from '../App'

function TodoForm () {
  const {
    todoList,
    setTodoList,
    todoFormDetails,
    setTodoFormDetails,
    todoForminitialize,
    todoEditId
  } = useContext(todoContaxt)

  const handleFormImput = e => {
    const name = e.target.name
    const value = e.target.value
    setTodoFormDetails(prevState => ({ ...prevState, [name]: value }))
  }
  const todoPayload = {
    id: crypto.randomUUID(),
    ...todoFormDetails
  }

  const handleTodoFormSubmit = e => {
    e.preventDefault()
    setTodoList(prevState => [...prevState, todoPayload])
    setTodoFormDetails(todoForminitialize)
  }

  const handleUpdateTodoId = e => {
    e.preventDefault()

    const updatedTodoList = todoList.map(todo => {
      if (todo.id == todoEditId) {
        return { todo, ...todoFormDetails }
      } else {
        return todo
      }
    })
    setTodoList(updatedTodoList)
    setTodoFormDetails(todoForminitialize)
  }

  return (
    <div className='bg-slate-100 rounded inset-shadow-sm inset-shadow-indigo-500 '>
      <form
        action=''
        className='px-4 py-5 flex flex-col gap-3 '
        onSubmit={todoEditId ? handleUpdateTodoId : handleTodoFormSubmit}
      >
        <h2 className='text-3xl font-bold text-center'>Todo Form</h2>

        {/* =======================Title Input===============================  */}
        <div className='flex flex-col gap-2 '>
          <label htmlFor='title' className='text-2xl font-medium'>
            Title
          </label>
          <input
            type='text'
            name='title'
            value={todoFormDetails.title}
            onChange={handleFormImput}
            className='border-2 rounded border-slate-400 px-2 py-1'
            placeholder='Enter your Todo Task'
            required
          />
        </div>

        {/* ===========================Text area Description======================== */}
        <div className='flex flex-col gap-2'>
          <label htmlFor='description' className='text-2xl font-medium'>
            Description
          </label>
          <textarea
            id='description'
            name='description'
            placeholder='Enter your Todo description'
            className=' border-2 border-slate-400 rounded h-30 p-2'
            value={todoFormDetails.description}
            onChange={handleFormImput}
            required
          ></textarea>
        </div>
        <div>
          {todoEditId ? (
            <button
              type='submit'
              className='bg-green-600 px-2 py-1.5 rounded text-white font-bold cursor-pointer flex active:scale-97'
            >
              <FilePlusCorner />
              Add Todo
            </button>
          ) : (
            <button
              type='submit'
              className='bg-[#379bed] px-2 py-1.5 rounded text-white font-bold cursor-pointer flex active:scale-97'
            >
              <FilePlusCorner />
              Add Todo
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default TodoForm

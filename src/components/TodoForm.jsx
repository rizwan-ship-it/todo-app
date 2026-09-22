import { FilePlusCorner } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { todoContaxt } from '../App'

function TodoForm () {
  const [titleError, setTitleError] = useState(null)
  const [descriptionError, setDescriptionError] = useState(null)

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
    e.preventDefault();

    console.log(todoFormDetails)

    let isValidForm = true
    // title validation
    if (todoFormDetails.title.trim().length <= 0) {
      setTitleError('Title is required')
      isValidForm = false
    } else if (
      todoFormDetails.title.trim().length <= 4 ||
      todoFormDetails.title.trim().length >= 30
    ) {
      setTitleError('title must be b/w 4 to 30 char')
      isValidForm = false
    } else {
      setTitleError(null)
    }
    // description validation
    if (todoFormDetails.description.trim().length <= 0) {
      setDescriptionError('description is required')
      isValidForm = false
    } else if (
      todoFormDetails.description.trim().length <= 8 ||
      todoFormDetails.description.trim().length >= 100
    ) {
      setDescriptionError('description must be b/w 8 to 100 char')
      isValidForm = false
    } else {
      setDescriptionError(null)
    }

    if (isValidForm) {
      setTodoList(prevState => [...prevState, todoPayload])
      setTodoFormDetails(todoForminitialize)
    }
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
          />
          {titleError && (
            <p className='text-red-600 -mt-3 capitalize'> {titleError} </p>
          )}
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
          ></textarea>
          {descriptionError && (
            <p className='text-red-600 -mt-3 capitalize'>
              {' '}
              {descriptionError}{' '}
            </p>
          )}
        </div>
        <div>
          {todoEditId ? (
            <button
              type='submit'
              className='bg-green-600 px-2 py-1.5 rounded text-white font-bold cursor-pointer flex active:scale-97'
            >
              <FilePlusCorner />
              Update Todo
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

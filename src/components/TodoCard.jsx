import { SquarePen, Trash2 } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { todoContaxt } from '../App'

function TodoCard ({ todoDetails }) {
  const { id, title, description, isCompleted } = todoDetails

  const { todoList, setTodoFormDetails, setTodoEditId, setTodoList } =
    useContext(todoContaxt)

  //========================= handle delete todo button function===============================
  const handleDeleteBtn = todoId => {
    const filteredTodo = todoList.filter(todo => todo.id !== todoId)
    console.log('todo id', id)
    setTodoList(filteredTodo)
  }

  // ===========================handle edit todo button function=============================
  const handleEditTodo = todoId => {
    const todoDetails = todoList.filter(todo => todo.id == todoId)[0]
    console.log('id', todoId)
    setTodoEditId(todoId)

    setTodoFormDetails({
      title: todoDetails.title,
      description: todoDetails.description
    })
  }

  const handleMarkCheck = todoId => {
    const todoMarkCompleted = todoList.map(todo =>
      todo.id == todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
    )
    setTodoList(todoMarkCompleted)
  }

  // ============= Mark Checked======================

  return (
    <div className=' flex flex-col gap-2 max-h-45  bg-gray-100 p-5 inset-shadow-sm inset-shadow-indigo-500/50 rounded pt-2.5'>
      {/* Title Section */}
      <div className={`${isCompleted && 'line-through opacity-40'}`}>
        <h1 className='text-black font-bold text-2xl'>{title}</h1>

        {/* Description Section  */}
        <p className=' text-gray-800 text-xl grow'>{description}</p>
      </div>
      {/* ==========================control Buttons============================== */}
      <div className='flex justify-between'>
        <div className='flex gap-1 items-center'>
          <input
            type='checkbox'
            id={`mark_${id}`}
            className=' cursor-pointer w-4 h-4'
            checked={isCompleted}
            onClick={() => handleMarkCheck(id)}
          />
          <label htmlFor={`mark_${id}`} className='text-gray-700'>
            Mark As Completed
          </label>
        </div>
        <div className='flex gap-5 '>
          {/* ===========Edit Button===================== */}
          {!isCompleted && (
            <button
              onClick={() => handleEditTodo(id)}
              className='bg-green-400 p-1 rounded text-gray-600 cursor-pointer active:scale-97'
            >
              <SquarePen />
            </button>
          )}

          {/* ======================delete Button======================= */}
          <button
            onClick={() => handleDeleteBtn(id)}
            className='bg-red-400 p-1 rounded text-gray-600 cursor-pointer active:scale-97'
          >
            <Trash2 />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TodoCard

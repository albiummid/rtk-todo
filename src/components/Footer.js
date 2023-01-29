import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetTodosQuery } from '../features/api/apiSlice'
import { setStatus, UpdateColor } from '../features/slices/filterSlice'

const numberOfTodos = (no_of_todos) => {
  switch (no_of_todos) {
    case 0:
      return 'No task'
    case 1:
      return '1 task'
    default:
      return `${no_of_todos} tasks`
  }
}

export default function Footer() {
  const { status, colors } = useSelector((state) => state.filter)
  console.log(colors)
  const {
    data: todos = [],
    isError,
    isLoading,
  } = useGetTodosQuery({ status, colors })

  const dispatch = useDispatch()
  const todosRemaining = todos.filter((todo) => !todo.completed).length

  const handleStatusChange = (status) => {
    dispatch(setStatus(status))
  }

  const handleColorChange = (color) => {
    dispatch(UpdateColor(color))
  }

  return (
    <div className='mt-4 flex justify-between text-xs text-gray-500'>
      <div className=' space-y-2'>
        <p>{numberOfTodos(todosRemaining)} left</p>
        <ul className='flex space-x-1 items-center text-xs'>
          <li
            className={`cursor-pointer ${status === '' && 'font-bold'}`}
            onClick={() => handleStatusChange('')}
          >
            All
          </li>
          <li>|</li>
          <li
            className={`cursor-pointer ${status === 'Incomplete' && 'font-bold'}`}
            onClick={() => handleStatusChange('incomplete')}
          >
            Incomplete
          </li>
          <li>|</li>
          <li
            className={`cursor-pointer ${status === 'complete' && 'font-bold'}`}
            onClick={() => handleStatusChange('complete')}
          >
            Complete
          </li>
        </ul>
      </div>
      <ul className=''>
        <div className="flex items-center gap-2">

          <li
            className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${colors?.includes('green') && 'bg-green-500'
              }`}
            onClick={() => handleColorChange('green')}
          ></li>
          <span>
            Normal
          </span>
        </div>
        <div className="flex items-center gap-2">

          <li
            className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${colors?.includes('red') && 'bg-red-500'
              }`}
            onClick={() => handleColorChange('red')}
          ></li>
          <span>
            Medium
          </span>
        </div>
        <div className="flex items-center gap-2">

          <li
            className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${colors?.includes('yellow') && 'bg-yellow-500'
              }`}
            onClick={() => handleColorChange('yellow')}
          ></li>
          <span>
            Hight
          </span>
        </div>


      </ul>
    </div>
  )
}

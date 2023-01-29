import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetTodosQuery } from '../features/api/apiSlice'
import LoadingSpinner from './LoadingSpinner'
import Todo from './Todo'

export default function TodoList({ isCompleted }) {
  const { status, colors } = useSelector((state) => state.filter)
  const {
    data = [],
    isError,
    isLoading,
  } = useGetTodosQuery(
    { status, colors },
    {
      refetchOnMountOrArgChange: true,
    }
  )

  let todos = [...data].reverse()

  return (
    <div className='mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto'>
      <LoadingSpinner loading={isLoading} />
      {todos?.length > 0 && (
        <>
          {todos
            ?.filter((item) => {
              if (isCompleted) {
                return item.completed === true
              } else {
                return true
              }
            })
            .map((todo) => (
              <Todo todo={todo} key={todo.id} />
            ))}
        </>
      )}
    </div>
  )
}

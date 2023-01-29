import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import tickImage from '../assets/images/double-tick.png'
import noteImage from '../assets/images/notes.png'
import plusImage from '../assets/images/plus.png'
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
  useGetTodosQuery,
} from '../features/api/apiSlice'

export default function Header() {
  const [
    addTodo,
    { data: todo, isSuccess: addTodoSuccess, isError: addTodoError },
  ] = useAddTodoMutation()
  const { data: todos = [], isLoading, isError } = useGetTodosQuery({})
  const [editTodo, { isError: isEditError, isLoading: isEditLoading }] =
    useEditTodoMutation()

  const [deleteTodo, { isError: isDeleteError, isSuccess: isDeleteSuccess }] =
    useDeleteTodoMutation()

  const [text, setText] = useState('')

  const handleInput = (e) => {
    setText(e.target.value)
  }

  useEffect(() => {
    if (addTodoSuccess) {
      toast.success('Todo successfully Added !')
      setText('')
    }
  }, [addTodoSuccess])

  const submitHandler = (e) => {
    e.preventDefault()
    addTodo({ text: text, completed: false, color: '' })
  }

  let updateAll = async (array, isComplete) => {
    let ld = toast.loading('Updating todos...')
    for (let i = 0; i < array.length; i++) {
      let item = array[i]
      await editTodo({
        id: item.id,
        data: {
          completed: isComplete,
        },
      })
    }
    toast.remove(ld)
    toast.success('Successfully updated all task to completed !')
  }
  let clearAll = async (array) => {
    let ld = toast.loading('Clearing completed todos...')
    for (let i = 0; i < array.length; i++) {
      let item = array[i]
      await deleteTodo(item.id)
    }
    toast.remove(ld)
    toast.success('Successfully cleared all completed tasks')
  }

  const handleCompleted = async () => {
    let allIncomplete = todos?.filter((item) => item.completed === false)
    if (allIncomplete?.length) {
      await updateAll(allIncomplete, true)
    }
    // dispatch(allCompleted())
  }

  const clearHandler = () => {
    let allCompleted = todos?.filter((item) => item.completed === true)
    if (allCompleted?.length) {
      clearAll(allCompleted)
    }
  }

  return (
    <div>
      <form
        className='flex items-center bg-gray-100 px-4 py-4 rounded-md'
        onSubmit={submitHandler}
      >
        <img src={noteImage} className='w-6 h-6' alt='Add todo' />
        <input
          type='text'
          placeholder='Type your todo'
          className='w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500'
          value={text}
          onChange={handleInput}
        />
        <button
          type='submit'
          className={`appearance-none w-8 h-8 bg-[url('${plusImage}')] bg-no-repeat bg-contain`}
        ></button>
      </form>

      <ul className='flex justify-between my-4 text-xs text-gray-500'>
        <li className='flex space-x-1 cursor-pointer' onClick={handleCompleted}>
          <img className='w-4 h-4' src={tickImage} alt='Complete' />
          <span>Complete All Tasks</span>
        </li>

        <li className='cursor-pointer' onClick={clearHandler}>
          Clear completed
        </li>
      </ul>
    </div>
  )
}

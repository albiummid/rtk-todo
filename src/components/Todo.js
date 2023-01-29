import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import cancelImage from '../assets/images/cancel.png'
import {
  useDeleteTodoMutation,
  useEditTodoMutation,
} from '../features/api/apiSlice'

export default function Todo({ todo }) {
  const [deleteTodo, { isSuccess: isDeleteSuccess, isError: isDeleteError }] =
    useDeleteTodoMutation()
  const [updateTodo, { isSuccess: isUpdateSuccess, isError: isUpdateError }] =
    useEditTodoMutation()
  const [isEditing, setIsEditing] = useState(false)
  const { text, id, completed, color } = todo
  const [newText, setNewText] = useState(text)

  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success('Deleted !')
    }
    if (isUpdateSuccess) {
      toast.success('Successfully updated !')
    }
    if (isDeleteError) {
      toast.error('Failed to delete !')
    }
    if (isUpdateError) {
      toast.error('Failed to update !')
    }
  }, [isDeleteError, isDeleteSuccess, isUpdateError, isUpdateSuccess])

  const handleStatusChange = (todoId) => {
    updateTodo({
      id: todoId,
      data: {
        completed: !completed,
      },
    })
  }

  const handleColorChange = (todoId, NewColor) => {
    updateTodo({
      id: todoId,
      data: {
        color: color === NewColor ? '' : NewColor,
      },
    })
  }

  const handleDelete = (todoId) => {
    deleteTodo(todoId)
  }

  const handleUpdateTodo = (todoId, text) => {
    updateTodo({
      id: todoId,
      data: {
        text: newText,
      },
    })
  }

  return (
    <div className=" border rounded-md mb-5 text-xs md:text-base divide-y">
      <div className='flex items-center justify-between w-full p-2'>
        <div className="flex items-center gap-2">
          <div
            className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-green-500 border-green-500 ${color === 'green' && 'bg-green-500'
              }`}
            onClick={() => handleColorChange(id, 'green')}
          />

          <div
            className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-yellow-500 border-yellow-500 ${color === 'yellow' && 'bg-yellow-500'
              }`}
            onClick={() => handleColorChange(id, 'yellow')}
          />

          <div
            className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-red-500 border-red-500 ${color === 'red' && 'bg-red-500'
              }`}
            onClick={() => handleColorChange(id, 'red')}
          />
        </div>
        <section className='flex items-center gap-2'>
          {!completed && (
            <div className={`flex-shrink-0 h-5 w-5 rounded-full border-2 ml-auto cursor-pointer`}>
              <EditIcon
                onClick={() => {
                  setIsEditing((prv) => !prv)
                }}
              />
            </div>
          )}
          <div className={`flex shrink-0 h-5 w-5 rounded-full border-2 ml-auto cursor-pointer`} >
            <img
              src={cancelImage}
              className=''
              alt='Delete'
              onClick={() => handleDelete(id)}
            />
          </div>
        </section>
      </div>
      <div className='flex items-center p-2'>
        <div
          className={`relative rounded-full bg-white border-2 border-gray-400 w-5 h-5  flex flex-shrink-0 justify-center items-center mr-2 cursor-pointer ${completed && 'border-green-500 focus-within:border-green-500'
            }`}
        >
          <input
            type='checkbox'
            checked={completed}
            onChange={() => handleStatusChange(id)}
            className='opacity-0 absolute rounded-full cursor-pointer'
          />
          {completed && (
            <svg
              className='fill-current w-3 h-3 text-green-500 pointer-events-none cursor-pointer'
              viewBox='0 0 20 20'
            >
              <path d='M0 11l2-2 5 5L18 3l2 2L7 18z' />
            </svg>
          )}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleUpdateTodo(id, text)
            setIsEditing(false)
          }}
          className={`select-none flex-1 ${completed && 'line-through'} relative`}
        >
          <input
            autoFocus
            className={`bg-white  group-hover:bg-gray-100 outline-none border  px-2 py-1 w-full ${isEditing ? 'border-red-400' : 'border-transparent '
              }  ${completed && !isEditing && 'line-through'} duration-300`}
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            type='text'
            disabled={!isEditing}
          />
          {isEditing && (
            <img
              src={cancelImage}
              className='flex-shrink-0 w-4 h-4 ml-2 cursor-pointer absolute top-2 right-2 '
              alt='Cancel'
              onClick={() => {
                setNewText(text)
                setIsEditing((prv) => !prv)
              }}
            />
          )}
        </form>
      </div>
    </div>
  )
}

const EditIcon = ({ onClick }) => (
  <svg
    onClick={onClick}
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className='w-4 h-4 border border-black rounded cursor-pointer'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
    />
  </svg>
)

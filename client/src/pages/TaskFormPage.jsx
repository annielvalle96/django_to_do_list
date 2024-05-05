import { useForm } from 'react-hook-form'
import { createTasks, deleteTasks, getTask, updateTasks } from '../api/Tasks.api.js'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

export function TaskFormPage () {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const navigate = useNavigate()
  const params = useParams()

  const onSubmit = handleSubmit(async data => {
    if (params.id) {
      await updateTasks(params.id, data)
      toast.success('Task updated!', { position: 'bottom-right', style: { background: '#101010', color: '#FFF' } })
    } else {
      await createTasks(data)
      toast.success('Task created!', { position: 'bottom-right', style: { background: '#101010', color: '#FFF' } })
    }
    navigate('/tasks')
  })

  const handleDelete = async () => {
    const accepted = window.confirm('Are you sure?')
    if (accepted) {
      await deleteTasks(params.id)
      toast.success('Task deleted!', { position: 'bottom-right', style: { background: '#101010', color: '#FFF' } })
    }
    navigate('/tasks')
  }

  const loadTaskToUpdate = async () => {
    if (params.id) {
      const task = await getTask(params.id)
      setValue('title', task.data.title)
      setValue('description', task.data.description)
    }
  }

  useEffect(() => {
    loadTaskToUpdate()
  }, [])

  return (
    <div className='max-w-xl mx-auto'>
      <form onSubmit={onSubmit}>
        <input type='text' placeholder='Title' {...register('title', { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
        {errors.title && <span>Title is required!</span>}
        <textarea rows='3' placeholder='Description' {...register('description', { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' />
        {errors.description && <span>Description is required!</span>}
        <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'>{params.id ? 'Update' : 'Save'}</button>
      </form>
      {params.id && <button className='bg-red-500 p-3 rounded-lg block w-full mt-3' onClick={handleDelete}>Delete</button>}
    </div>
  )
}

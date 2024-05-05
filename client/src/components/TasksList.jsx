import { useEffect, useState } from 'react'
import { getAllTasks } from '../api/Tasks.api.js'
import { TaskCard } from './TaskCard.jsx'

export function TasksList () {
  const [tasks, setTasks] = useState([])

  const loadTasks = async () => {
    const res = await getAllTasks()
    setTasks(res.data)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <div className='grid grid-cols-3 gap-3'>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  )
}

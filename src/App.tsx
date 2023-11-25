import { FormEvent, useEffect, useState } from 'react'
import TodoList from './TodoList';

export type ITodo = {
  id: number,
  name: string,
  completed: boolean,
}

function App() {

  const [todo, setTodo] = useState<ITodo[]>(()=> {
    if(localStorage.getItem('todos') != null){
      return JSON.parse(localStorage.getItem('todos')!)
    }else{
      return []
    }
  });
  const [name, setName] = useState('')

  function handleSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault()

    if(name == '') return 

    setTodo((prevTodos) =>{
      return [...prevTodos, {id: Date.now(), name: name, completed: false}]
    })
    setName('')
  }
  function toggleTodo(e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number){
    const target = e.target as HTMLDivElement
    if(target.classList.contains('toggle')){
      setTodo((prev)=>{
        return prev.map(todo => {
          return todo.id === id ? {...todo, completed: !todo.completed} : todo
        })
      })
    }else if(target.classList.contains('delete')){
      setTodo((prev)=>{
        return prev.filter(todo =>{
          return todo.id != id
        })
      })
    }
  }

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todo))
  },[todo])

  return (
    <>
      <div className="flex justify-center items-center min-h-screen ">
        <div className="todo-form p-4 rounded w-[380px] lg:w-1/3 border min-h-[500px] shadow-md">
          
          <div className="mb-2">
            <h3 className="text-2xl text-indigo-700 mb-2">Todos</h3>
            <TodoList todo={todo} toggleTodo={toggleTodo} />
          </div>
          <form onSubmit={handleSubmit} className='flex'>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className='focus:outline-none border-2 border-indigo-500 py-1 px-2 w-full' autoFocus />
            <button type="submit" className='py-1 px-3 bg-indigo-500 border-2 border-indigo-500 text-white hover:bg-indigo-700 flex'>Add <i className="bi bi-plus"></i></button>
          </form>

        </div>
      </div>
    </>
  )
}

export default App

import { ITodo } from "./App";

const TodoList = ({todo, toggleTodo}: {todo: ITodo[], toggleTodo: (e: React.MouseEvent<HTMLDivElement, MouseEvent>,  id: number)=>void}) => {
    return ( 
        <>
            {todo.map((item) => (
              <div key={item.id} className={` py-1 px-3 border rounded-none my-1  ${!item.completed ? 'bg-indigo-50 text-indigo-700 border-indigo-400 hover:bg-indigo-400 hover:text-white hover:border-indigo-400' : 'bg-slate-100 text-slate-500 border-slate-100'}  `} onClick={(e)=> toggleTodo(e, item.id)}>
                <span className='flex justify-between toggle'>{item.name} <button type="button" ><i className="bi bi-trash3 delete"></i></button></span>
              </div>
            ))}
        </>
     );
}
 
export default TodoList;
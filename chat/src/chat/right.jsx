import React from 'react'
import { useState } from 'react'

function Right() {
    const [msg, setmsg] = useState("")
    const [todos, settodos] = useState([])
    const chnge=(e)=>{
        setmsg(e.target.value)

    }
    const send=()=>{
        settodos([...todos, { new2: msg, iscompleted: false, id: todos.length }])
        setmsg("")
    }
   
    return (
        <div>
            <div className='flex flex-col justify-between border-green-700 border-4 border-solid w-3/4 h-[672px]  float-right'>
                <button className='border-black border-4 border-solid w-[1006px] h-[60px]'>
                    <div className='mr-14'>user1</div>

                </button> 
                <div>
                {todos.map(todo=>{
                    return <div className='text-red-500 relative '>
                        {todo.new2}

                    </div>
                })}
                <div><input type="text" onChange={chnge} placeholder='Enter Your Message' className='w-[1006px] h-14 border-black border-4 'value={msg}/>
                <button className='relative left-[800px] bottom-12'  onClick={send}>send</button>
                </div>
                </div>
                


            </div>




        </div>
    )
}

export default Right

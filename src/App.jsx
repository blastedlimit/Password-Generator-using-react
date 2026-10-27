import { useState,useCallback, useEffect, useRef } from 'react'
import './index.css'
import './App.css'
import { RotateCcw } from "lucide-react";
function App() {
  const [color, setColor] = useState("teal");
  const[password,setPassword]=useState("");
  const[length,setLength]=useState(6);
  const[special,setSpecial]=useState(false);
  const[numeric,setNumeric]=useState(false);

  const passwordgenerator=useCallback(()=>{
    let pass=""
    let str="QWERTYUIOPASDFGHJKLZXCVBNMqwertyuioplkjhgfdsazxcvbnm"
    if(special==true) str+=",/.;:][{}-_=+)(*&^%$#@!|\<>"
    if(numeric==true) str+="1230456789"
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
  },[length,special,numeric,setPassword])

  useEffect(()=>{
    passwordgenerator()
  },[length,special,numeric,setPassword])

  const passwordref=useRef(null)
 const copytoclip=useCallback(()=>{
  passwordref.current?.select()
  window.navigator.clipboard.writeText(password)
 },[password])
  return (
    <>

      <div className='w-full h-screen duration-200' style={{backgroundColor:color}}>
        <h className="mb-4 text-4xl font-bold flex items-center justify-center text-black">Password Generator</h>
        <div className='mx-auto mt-20 w-full max-w-xl rounded-2xl left-0 h-[120px] w-full bg-green-100' >
          <div className='flex items-center justify-center gap-5'><input
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            ref={passwordref}
            className=" mb-3  block w-3/4 rounded-xl border border-gray-700 px-4 py-3 p-3 mt-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 hover:bg-pink-200 transition"
          /><button className="border border-black-100 px-2 py-2 rounded-xl text-olive-900 bg-olive-300 hover:bg-olive-700 hover:text-white transition"
          onClick={copytoclip}>Copy</button>
          </div>
          
          <div className='flex items-center justify-center p-3 gap-2  '>
          <input type="range"
          value={length}
          min={6}
          max={100}
          className='w-20 cursor-pointer accent-sky-400'
          onChange={(e)=>{
            setLength(e.target.value)
          }}/>{length} &nbsp;&nbsp;
          <input type="checkbox" className="h-4 w-4 shrink-0 accent-red-600"
          onChange={()=>{
            setSpecial(prev=>!prev)
          }}
            />Special Characters
          <input type="checkbox" className="h-4 w-4 shrink-0 accent-red-600"
          onChange={()=>{
            setNumeric(prev=>!prev)
          }}
            />Numeric
          
          

          </div>
          

        </div>
        <div className='fixed bottom-0 left-0 h-[40px] w-full bg-white'>
          <div className="flex items-center justify-center gap-4">
            <button className="border border-black-100 px-2 py-2 rounded-xl text-indigo-900 bg-blue-300 hover:bg-blue-500 hover:text-white transition"
            onClick={()=>{
              setColor("violet")
            }}>Blue
          </button>
              <button className="border border-black-100 px-2 py-2 rounded-xl text-olive-900 bg-olive-300 hover:bg-olive-700 hover:text-white transition"
            onClick={()=>{
              setColor("olive")
            }}>Olive</button>
            <button className='border border-black-100 px-2 py-2 rounded-xl text-yellow-900 bg-yellow-300 hover:bg-yellow-200 hover:text-black transition'
            onClick={()=>{
              setColor("yellow")
            }}>Yellow</button>
            <button className='border border-black-100 px-2 py-2 rounded-xl text-grey-900 bg-gray-200 hover:bg-gray-400 hover:text-black transition'
            onClick={()=>{
              setColor("gray")
            }}>Grey</button>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default App

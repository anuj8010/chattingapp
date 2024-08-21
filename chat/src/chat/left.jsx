import { set } from 'mongoose';
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const Left = () => {
  const ref1 = useRef();
  const ws = useRef(null);
  const [users, setUsers] = useState([]);
  const [userchnge, setuserchnge] = useState("");
  const [msg, setMsg] = useState("");
  const [todos, setTodos] = useState([]);
  const [recdata, setrecdata] = useState()
  const [value, setvalue] = useState("helllloo")
  const socket = useRef(null)
  const colorRefs = useRef()
  const name1 = useRef()
 const ref2=useRef()
 const messagesContainerRef = useRef(null);
  useEffect(() => {
    // Establish the socket connection
    socket.current = io('http://localhost:3000');
    
    // Handle receiving messages
    socket.current.on('chat message', (message) => {      
  
      setTodos((prevTodos) => [...prevTodos, { new2: message, iscompleted: false, id: prevTodos.length, fromServer: true }]);
      
      window.scrollTo(0, document.body.scrollHeight);

     name1.current.innerHtml=userchange
    });
   

    // Fetch initial data
    fetchData();

    // Clean up on component unmount
    return () => {
      socket.current.disconnect();
    };
  }, []);
 
  useEffect(() => {
    // Scroll to the bottom when todos change
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [todos])




  const fetchData = async () => {
     const res1 = await fetch('http://localhost:3000/signup', { method: 'get' });
     const data1 = await res1.json();
    const signname=data1.names

    const response = await fetch("http://localhost:3000/login", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    let loginname=result.name

    // let flatArray = data1.flat();

    let resultArray = signname.filter(element => !loginname.includes(element));
     console.log(resultArray);
     setUsers(resultArray);
  };

  const userchange = (user) => {
    setuserchnge(user);
    
    console.log(value)
    console.log(userchnge)
   if (userchnge=="deep"){
    setTodos([...todos, { new2:value , iscompleted: false, id: todos.length }]);
   }
  
  };

  const chnge = (e) => {
    setMsg(e.target.value);
  };

  const send = () => {
     // Set background color
    

   setTodos([...todos, { new2: msg, iscompleted: false, id: todos.length }]);
   

  const msgData={
    send:msg,
    change1:userchnge

  }
    socket.current.emit("chat message",msgData);
    setMsg("");

  };
  const condis=()=>{
    if (socket.current.connected) {
      ref2.current.innerText = 'connect';
      socket.current.disconnect()
    } else {
      ref2.current.innerText = 'disconnect';
      socket.current.connect();
    }
  }
  return (
    <div>
      {/* left */}
      <div className="flex flex-col lg:flex-row h-auto lg:h-[669px]">
  <div className="border-red-700 border-4 border-solid w-full lg:w-1/4 p-4 lg:p-0">
    <ul>
      {users.map((user, index) => (
        <li key={index}>
          <button
            ref={ref1}
            className="border-2 border-black w-full lg:w-[330px] h-12 lg:h-[50px] mb-2 lg:mb-0"
            onClick={() => userchange(user)}
          >
            {user}
          </button>
        </li>
      ))}
    </ul>
  </div>

  {/* Right Section */}
  <div className="flex flex-col justify-between border-green-700 border-4 border-solid w-full lg:w-3/4 p-4 lg:p-0">
    <button className="border-black border-4 border-solid h-14 lg:h-[60px] w-full">
      <div ref={name1} className="mr-4 lg:mr-14">{userchnge}</div>
    </button>

    <div className="flex-grow">
      {todos.map((todo, index) => {
        const messageStyle = todo.fromServer
          ? { color: "blue", marginBottom: "10px" }
          : { marginBottom: "10px" };
        return (
          <div
            key={index}
            style={messageStyle}
            className="text-red-500 relative left-0 lg:left-[800px] w-full lg:w-max"
          >
            {todo.new2}
          </div>
        );
      })}
    </div>

    <div className="flex flex-col-reverse w-full lg:w-max">
      <input
        type="text"
        onChange={chnge}
        placeholder="Enter Your Message"
        className="w-full lg:w-[1010px] h-14 border-black border-4"
        value={msg}
      />
      <button
        className="relative left-0 lg:left-[900px] top-2 lg:top-9 w-full lg:w-max"
        onClick={send}
      >
        send
      </button>
      {/* <button className="relative left-0 lg:left-[800px] bottom-12" onClick={condis}>disconnect</button> */}
    </div>
  </div>
</div>
 
</div>
  );
};

export default Left;

import React,{useState,useEffect} from 'react';
import './App.css';
import Form from "./components/Form";
import Todolist from "./components/Todolist";

function App() {
//State stuff
  const [inputText , setInputText]= useState("");
  const [ todos, setTodos] = useState([]);
  const [status ,setStatus]= useState('all');
  const [filteredTodos,setFilteredTodos] = useState([]);

  console.log("hello");
  
  //Once
  useEffect(()=>{
    getLocaltodos();
  }, [] );


//useEffect
  useEffect(()=>{
    filterHandler();
    saveLocaltodos();
  }, [todos,status]);

  //Functions
  const filterHandler = () => {
    switch(status){
      case 'completed' :
        setFilteredTodos(todos.filter(todo => todo.completed === true ));
        break;
        case 'uncompleted' :
          setFilteredTodos(todos.filter(todo => todo.completed === false ));
        break;
        default :
        setFilteredTodos(todos);
        break;
    }
  }

  //Save to local

  const saveLocaltodos =() =>{
      localStorage.setItem("todos",JSON.stringify(todos));
  };

  const getLocaltodos = () => {

    if(localStorage.getItem("todos")===null){
      localStorage.setItem("todos",JSON.stringify([]));
    }
    else{
      let todolocal=JSON.parse(localStorage.getItem("todos"));
      setTodos(todolocal);
    }
  }


  return (
    <div className="App">
      <header>
      <h1>TODO LIST</h1>
      </header>
      <Form 
        inputText = {inputText} 
        todos={todos} 
        setTodos={setTodos} 
        setInputText={setInputText}
        setStatus={setStatus} />
      <Todolist 
      filteredTodos={filteredTodos} 
      setTodos={setTodos} 
      todos={todos} />
    </div>
  );
}

export default App;

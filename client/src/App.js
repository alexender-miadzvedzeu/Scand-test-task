import './App.css';
import Board from "./Board/Board";
import TaskForm from "./TaskForm/TaskForm";
import FieldForm from "./FieldForm/FieldForm";


function App() {
  return (
    <div className="App">
      <TaskForm />
      <FieldForm />
      <Board />
    </div>
  );
}

export default App;

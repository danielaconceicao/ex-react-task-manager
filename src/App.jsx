import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListTasks from './pages/ListTask'
import AddTask from './pages/AddTask'
import './App.css'
import TasksProvider from './context/TasksProvider';

function App() {

  return (
    <>
      <TasksProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ListTasks />} />
            <Route path='addtask' element={<AddTask />} />
          </Routes>
        </BrowserRouter>
      </TasksProvider>
    </>
  )
}

export default App

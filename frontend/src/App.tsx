import { BrowserRouter, Routes, Route} from 'react-router-dom';
import SignIn from './components/user/SignIn';
import Home from './components/image/Home';

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App

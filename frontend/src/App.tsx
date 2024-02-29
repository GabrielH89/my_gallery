import { BrowserRouter, Routes, Route} from 'react-router-dom';
import SignIn from './components/user/SignIn';
import Home from './components/image/Home';
import UpdateImage from './components/image/UpdateImage';
import PersonalProfile from './components/user/PersonalProfile';

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/updateImage/:id_image' element={<UpdateImage/>}></Route>
        <Route path='/personalProfile' element={<PersonalProfile/>}></Route>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App

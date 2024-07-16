import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/user/SignIn';
import Home from './components/image/Home';
import UpdateImage from './components/image/UpdateImage';
import PersonalProfile from './components/user/PersonalProfile';
import SignUp from './components/user/SignUp';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn/>}></Route>
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/updateImage/:id_image" element={<PrivateRoute element={<UpdateImage />} />} />
        <Route path="/personalProfile" element={<PrivateRoute element={<PersonalProfile />} />} />
        <Route path='/signUp' element={<SignUp/>}></Route>
      </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;

import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';

import User from './components/authentication/User';
import Visitor from './components/authentication/Visitor';

import Home from './screens/UserScreens/Home';
import Login from './screens/VisitorScreens/Login';
import Register from './screens/VisitorScreens/Register';
import ForgotPassword from './screens/VisitorScreens/ForgotPassword';
import ActivationMail from './screens/ActivationMail';
import NewPassword from './screens/VisitorScreens/NewPassword';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<User />}>
          <Route index path='/' element={<Home />} />
        </Route>

        <Route path='/' element={<Visitor />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/user/new-password/:token' element={<NewPassword />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Route>
        <Route path='/user/verify-email/:id' element={<ActivationMail />} />
      </Routes>
    </div>
  );
}

// /user/new-password/

export default App;

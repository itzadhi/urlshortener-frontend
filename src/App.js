import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';

import User from './components/authentication/User';
import Home from './screens/UserScreens/Home';
import Shortener from './screens/UserScreens/Shortener';
import UrlHistory from './screens/UserScreens/UrlHistory';

import Visitor from './components/authentication/Visitor';
import Login from './screens/VisitorScreens/Login';
import Register from './screens/VisitorScreens/Register';
import ForgotPassword from './screens/VisitorScreens/ForgotPassword';
import ActivationMail from './screens/ActivationMail';
import NewPassword from './screens/VisitorScreens/NewPassword';

function App() {
  return (
    <div>
      <Routes>
        <Route element={<User />}>
          <Route index path='/' element={<Home />} />
          <Route path='/shortener' element={<Shortener />} />
          <Route path='/history' element={<UrlHistory />} />
        </Route>

        <Route element={<Visitor />}>
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

export default App;

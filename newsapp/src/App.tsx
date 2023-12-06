import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.css';
import DetailPage from './components/pages/DetailPage/DetailPage';
import HomeComponent from './components/pages/HomePage/Home';
import Login from './components/pages/Login/Login';

import NotFound from './components/pages/NotFound/notfound';
import Signup from './components/pages/SignUp/Signup';
import FavNews from './components/pages/fav/FavNews';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { DarkModeProvider } from './components/organisms/context/DarkModeContext';
import ForgetPassword from './components/pages/Login/ForgetPassword';
import OTPVerification from './components/pages/Login/OTPVerification';
import NewPassword from './components/pages/Login/NewPassoword';

function App() {
  const notify = () => toast.success('Hello, world!');
  return (
    <>
      {/* <HomeComponent /> */}
      <DarkModeProvider>
      <Router>
      {/* <div>
      
      <button onClick={notify}>Show Toast</button>
      <ToastContainer />
    </div> */}
        <Routes>
          <Route path='/' element={<HomeComponent />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/fav' element={<FavNews />} />
          <Route path='/forget-password' element={<ForgetPassword />} />
          <Route path='/otp-verification' element={<OTPVerification />} />
          <Route path='/new-password' element={<NewPassword />} />
          <Route path='/detail/:category' element={<DetailPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
      </DarkModeProvider>
    </>
  );
}

export default App;

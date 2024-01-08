import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import DetailPage from "./components/pages/DetailPage/DetailPage";
import HomeComponent from "./components/pages/HomePage/Home";
import Login from "./components/pages/Login/Login";
import NotFound from "./components/pages/NotFound/notfound";
import Signup from "./components/pages/SignUp/Signup";
import FavNews from "./components/pages/fav/FavNews";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  DarkModeProvider,
  useDarkMode,
} from "./components/organisms/context/DarkModeContext";
import ForgetPassword from "./components/pages/Login/ForgetPassword";
import OTPVerification from "./components/pages/Login/OTPVerification";
import NewPassword from "./components/pages/Login/NewPassoword";
import HistoryLists from "./components/pages/fav/HistoryLists";
import HeaderNavigationMenu from "./components/organisms/Navigation/HeaderNavigationMenu";

function App() {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  );
}

function AppContent() {
  const { isDarkMode } = useDarkMode();
  // const isAuthenticated: boolean = checkIfUserIsAuthenticated();

  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
      <Router>
        <HeaderNavigationMenu title={"React News App"} />
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/fav" element={<FavNews />} />
          <Route path="/history" element={<HistoryLists />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="/detail/:category" element={<DetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;


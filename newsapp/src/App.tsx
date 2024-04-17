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
import EditProfile from "./components/pages/Edit-Profile/EditProfile"

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
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/detail/:category" element={<DetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;

/**
 * Documentation for the App Component and AppContent Component
 *
 * Overview:
 * The `App` component serves as the root component for the React News App. It wraps the entire application
 * within the `DarkModeProvider` context to manage dark mode settings across the application. The `AppContent`
 * component then utilizes the `useDarkMode` hook to determine the current theme (dark or light) and sets up
 * routing for the application using React Router. This setup enables navigation between different pages of the
 * application, such as the home page, login/signup pages, favorite news, browsing history, and more.
 *
 * Components and Routes:
 * - `HomeComponent`: The landing page of the application.
 * - `Login`: A page where users can log in.
 * - `Signup`: A page for new users to sign up.
 * - `FavNews`: Displays the user's favorited news articles.
 * - `HistoryLists`: Shows a list of recently viewed news articles.
 * - `ForgetPassword`, `OTPVerification`, `NewPassword`: Components related to the password reset flow.
 * - `DetailPage`: A detailed view for a specific news category.
 * - `NotFound`: A fallback component displayed when a route does not match any defined paths.
 *
 * Dark Mode:
 * The application supports dark mode, which is managed via the `DarkModeProvider` context. This context provides
 * the `isDarkMode` flag and a mechanism to toggle the theme. The `AppContent` component uses the `isDarkMode` flag
 * to apply appropriate CSS classes for dark or light mode.
 *
 * Routing:
 * The application uses `react-router-dom` for routing. Routes are defined within the `AppContent` component to
 * map URLs to their respective components. This setup facilitates navigation and ensures that users can access
 * different parts of the application through unique URLs.
 *
 * Usage:
 * To run the application, ensure you have the necessary components and context providers set up as shown in the
 * provided code. The application should be wrapped in a `<Router>` component at the root level to enable routing.
 *
 * ```jsx
 * function App() {
 *   return (
 *     <DarkModeProvider>
 *       <AppContent />
 *     </DarkModeProvider>
 *   );
 * }
 * ```
 *
 * Note:
 * The application requires the `react-toastify` library for displaying toast notifications and `react-router-dom`
 * for routing. Ensure these dependencies are installed and properly configured in your project.
 *
 * Enhancements:
 * - Implement authentication state management to conditionally render routes based on the user's login status.
 * - Extend the dark mode functionality to allow users to toggle the theme from a UI control.
 * - Consider using lazy loading for components associated with routes to improve load times and performance.
 */

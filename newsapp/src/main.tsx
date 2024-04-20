import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { NewsAppProvider } from './components/organisms/context/NewsAppProvider.tsx';
import { Provider } from 'react-redux';
import { store } from "./app/store";
import './index.css';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <NewsAppProvider>
        {/* <Router>
          <HeaderNavigationMenu title={'React News App'} />
        </Router> */}
        <App />
      </NewsAppProvider>
    </Provider>
  </React.StrictMode>
);

/**
 * Entry Point of the React Application
 *
 * Overview:
 * This file serves as the entry point for the React application, where the root component (`App`) is rendered
 * into the DOM. It wraps the `App` component with both Redux `Provider` and custom `NewsAppProvider` context
 * to ensure that state management and context are available throughout the application. This setup provides a
 * scalable structure for managing global state and context (such as theming, user authentication, etc.) across
 * the app.
 *
 * Libraries and Contexts Used:
 * - `react-redux`: Utilized for state management across the app. The `Provider` component from `react-redux` is
 *   used to pass the Redux store down through the component tree.
 * - `NewsAppProvider`: A custom context provider that can be used to manage global app states like user preferences,
 *   theme settings, or any other global state that does not fit naturally into Redux.
 * - `react-dom`: Provides `ReactDOM.createRoot` method for React 18's new root API, allowing for concurrent features.
 *
 * Styling:
 * - Global CSS styles are imported from `index.css`, and toast notifications styling is imported from
 *   `react-toastify/dist/ReactToastify.css`.
 *
 * Usage:
 * Ensure that `store` is properly configured in `./app/store` and that `NewsAppProvider` is set up to provide
 * necessary contexts. The application structure can be further extended by wrapping `App` with more context providers
 * or Redux stores as needed.
 *
 * Enhancements:
 * - For applications requiring routing, the commented-out `Router` and `HeaderNavigationMenu` components can be
 *   incorporated to manage navigation between different views.
 * - `React.StrictMode` is utilized for highlighting potential problems in an application. It activates additional
 *   checks and warnings for its descendants. Consider maintaining its use during development for best practices.
 *
 * Example Structure:
 * ```
 * ReactDOM.createRoot(document.getElementById('root')).render(
 *   <React.StrictMode>
 *     <Provider store={store}>
 *       <NewsAppProvider>
 *         <App />
 *       </NewsAppProvider>
 *     </Provider>
 *   </React.StrictMode>
 * );
 * ```
 *
 * Note:
 * - This structure supports scalability and maintainability by isolating global state management (Redux) and
 *   application-specific context (`NewsAppProvider`). It's a best practice to keep the entry point clean and
 *   focused solely on setting up providers and the app's root component.
 * - Ensure that the ID passed to `document.getElementById` matches the container element's ID in your `index.html`.
 */

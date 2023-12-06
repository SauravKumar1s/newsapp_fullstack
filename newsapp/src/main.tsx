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

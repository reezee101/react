import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {QueryClient, QueryClientProvider} from 'react-query';
import store from './store';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <QueryClientProvider client={queryClient}>  
    <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        {/* App.js에 있는 모든 컴포넌트들은 store에 있는 redux state를 사용할 수 있음 */}
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

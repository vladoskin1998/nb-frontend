
import ReactDOM from 'react-dom/client';
import './style/index.scss';
import App from './components/app/App';
import store from './store/store';
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { Loader } from './components/ui/Loader';
console.log(process.env.REACT_APP_GOOGLE_MAP_API_KEY);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Suspense fallback={<Loader />}>
    <Provider store={store}>
      <HashRouter >
        <App />
      </HashRouter>
    </Provider>
  </Suspense>
);


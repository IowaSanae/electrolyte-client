import './style/MAIN.css';
import './style/index.css';
import './style/animation.css';
import './style/responsive.css';
import App from './routes/Routes';
import { store } from './app/store';
import { Provider } from 'react-redux';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

reportWebVitals();

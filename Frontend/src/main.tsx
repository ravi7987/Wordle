
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom';
import './assets/css/main.css'
import Platform from './platform.tsx'
import store from './redux/store'

createRoot(document.getElementById('root')!).render(
  <Provider store={store} >
    <Router>
        <Platform />
      </Router>
  </Provider>,
)

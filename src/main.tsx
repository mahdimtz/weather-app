
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./styles/font.css"
import './core/i18n.js';
import { AppProvider } from './context/app/app-context.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <App/>
  </AppProvider>
  
)


import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./styles/font.css"
import './i18n';
import { AppProvider } from './context/app/app-context.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <App/>
  </AppProvider>
  
)

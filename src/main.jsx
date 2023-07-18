import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { AppStateContextProvider } from './context/AppStateContext.jsx'
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
<AppStateContextProvider>
    <Toaster/>
    <App />
</AppStateContextProvider>
)
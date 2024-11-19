import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/store'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        {/* <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>  this code reagarding of update of react router dom nothing special */}
        <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
            <App />
        </BrowserRouter>
    </Provider>
)

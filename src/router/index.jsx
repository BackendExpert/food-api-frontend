import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WebSite from '../layouts/WebSite'
import Popups from '../pages/Tests/Popups'
import ModelPopup from '../pages/Tests/ModelPopup'
import FormTest from '../pages/Tests/FormTest'
import DefultError from '../component/Error/DefultError'
import Auth from '../pages/Auth/Auth'
import DashHome from '../pages/Dashboard/DashHome'
import PrivateRoute from '../router/PrivateRoute'
import Unauthorized from './Unauthorized'
import Dashboard from '../layouts/Dashboard'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WebSite />} >
                    <Route path='*' element={<DefultError /> } />
                    <Route index element={<Auth /> } /> 
                    <Route path='model' element={<ModelPopup /> } />
                    <Route path='notifications' element={<Popups /> } />
                    <Route path='unauthorized' element={<Unauthorized /> } />
                </Route>

                <Route path='/dashboard' element={<PrivateRoute roles={['admin', 'advisor', 'user']}><Dashboard /></PrivateRoute>}>
                    <Route index element={<PrivateRoute roles={['admin', 'advisor', 'user']}><DashHome /></PrivateRoute>} />
                </Route>    
            </Routes>
        </BrowserRouter>
    )
}

export default App

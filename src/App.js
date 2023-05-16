import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import './App.css'
import MyProfile from './components/MyProfile'
import UsersProfile from './components/UsersProfile'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/my-profile" component={MyProfile} />
    <ProtectedRoute exact path="/users/:userId" component={UsersProfile} />
    <Route to="bad-path" component={NotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App

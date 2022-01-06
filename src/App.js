import {Route, Switch} from 'react-router-dom'
import Login from './Components/Login'
import ProtectedRoute from './Components/ProtectedRoute'
import Home from './Components/Home'
import Jobs from './Components/Jobs'
import JobDetails from './Components/JobDetails'
import NotFoundPage from './Components/NotFoundPage'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
    <Route component={NotFoundPage} />
  </Switch>
)

export default App

import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AdminLogin from './components/auth/AdminLogin';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddReminder from './components/profile-forms/AddReminder';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';

import AddMedicine from './components/medicine/AddMedicine';
import ViewMedicines from './components/medicine/ViewMedicines';
import Medicine from './components/medicine/Medicine';

import PrivateRoute from './components/routing/PrivateRoute';
import './App.css';

//Redux 
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => { 
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
  <Provider store={store}>
    <Router>
      <Fragment>
        <NavBar />
        <Route exact path="/" component={ Landing } />
        <section className="container">
          <Alert/>
          <Switch>
            <Route exact path="/register" component={ Register } /> 
            <Route exact path="/login" component={ Login } />
            <Route exact path='/adminLogin' component={ AdminLogin } />
            <Route exact path="/profiles" component={ Profiles } />
            <Route exact path="/profile/:id" component={ Profile } />
            <PrivateRoute exact path="/dashboard" component={ Dashboard } />
            <PrivateRoute exact path="/adminDashboard" component={ AdminDashboard } />
            <PrivateRoute exact path="/create-profile" component={ CreateProfile } />
            <PrivateRoute exact path="/edit-profile" component={ EditProfile } />
            <PrivateRoute exact path="/add-reminder" component={ AddReminder } />
            <PrivateRoute exact path='/posts' component={ Posts } />
            <PrivateRoute exact path='/addMedicine' component={ AddMedicine } />
            <PrivateRoute exact path='/viewMedicines' component={ ViewMedicines } />
            <PrivateRoute exact path="/medicine/:id" component={ Medicine } />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
)};

export default App;

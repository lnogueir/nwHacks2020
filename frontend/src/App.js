import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute.js'
import Dashboard from './components/Dashbard/Dashboard'
import Home from './components/Home'
import { ThemeProvider } from '@material-ui/core/styles';
import weNoteTheme from './assets/js/weNoteTheme'
import Utils from './assets/js/Utils'
import './assets/app.css';

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    let user = Utils.getUser()
    console.log(user)
    setUser(user)
  }, [])

  return (
    <ThemeProvider theme={weNoteTheme}>
      <div className="app">
        <Router>
          <Switch>
            <PrivateRoute path="/dashboard">
              <Dashboard user={user} />
            </PrivateRoute>
            <Route path="/">
              <Home user={user} />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute.js'
import Dashboard from './components/Dashbard/Dashboard'
import Home from './components/Home'
import { ThemeProvider } from '@material-ui/core/styles';
import weNoteTheme from './assets/js/weNoteTheme'
import Utils from './assets/js/Utils'
import './assets/app.css';
import Empty from './components/Empty';
import Files from './components/Files';

function App() {
  let notes=["16e2f29c5e0a8521fd7ee9139d966144.pdf", "b3f1b490d9425d13f7cced9fbefea84f.pdf"];
  const [user, setUser] = useState(null)

  useEffect(() => {
    let user = Utils.getUser()
    console.log(user)
    setUser(user)
  }, [])

  return (
    <Files notes={notes}></Files>
    //<Empty></Empty> Working
    /*
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
  */);
}

export default App;

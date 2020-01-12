import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute.js'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import { ThemeProvider } from '@material-ui/core/styles';
import weNoteTheme from './assets/js/weNoteTheme'
import './assets/app.css';


function App() {
  return (
    <ThemeProvider theme={weNoteTheme}>
      <div className="app">
        <Router>
          <Switch>
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;

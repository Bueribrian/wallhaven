import React, {  useContext } from "react";
import Home from "./pages/Home";
import Wall from "./pages/Wall";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { signInWithGoogle } from "./firebase";
import { SearchProvider } from "./context/SearchContext";
import {UserContext} from './context/UserProvider'
import { ThemeProvider } from "./context/ThemeProvider";
import { Grid, GridBody, GridSideNavbar, GridNavbar } from "./components/Grid";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function Application() {
  const user   = useContext(UserContext);

  console.log('user...',user)

  return (
    
    <div>
      {!user ?
        <div>
          <h1>Logueate campeon!</h1>
          <button onClick={()=>{
            try {
              signInWithGoogle();
            } catch (error) {
              console.error("Error signing in with Google", error);
            }
          }}>Login with Google!</button>
        </div>
        :
        <Router>
          <SearchProvider>
            <ThemeProvider>
              <Grid>
                <GridNavbar>
                  <Navbar />
                </GridNavbar>
                <GridSideNavbar />
                <GridBody>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/wall/:wallid" component={Wall} />
                    <Route component={NotFound} />
                  </Switch>
                </GridBody>
              </Grid>
            </ThemeProvider>
          </SearchProvider>

        </Router>
    }
    </div>
  );
}

export default Application;

import React, { useContext } from "react";
import Home from "./pages/Home";
import Wall from "./pages/Wall";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { signInWithGoogle, singOutWithGoogle } from "./firebase";
import { SearchProvider } from "./context/SearchContext";
import { UserContext } from "./context/UserProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import {  Button } from './components/StyledComponents'
import { Grid, GridBody, GridSideNavbar, GridNavbar } from "./components/Grid";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function Application() {
  const { user } = useContext(UserContext);

  console.log("user...", user);

  return (
    <div>
      <Router>
        <SearchProvider>
          <ThemeProvider>
            <Grid>
              <GridNavbar>
                <Navbar />
              </GridNavbar>
              <GridSideNavbar>
                {!user ? (
                  <div>
                    <h1>Estaria bueno que te loguees maquina!</h1>
                    <Button
                      onClick={() => {
                        alert('holas')
                        try {
                          signInWithGoogle();
                        } catch (error) {
                          console.error("Error signing in with Google", error);
                        }
                      }}
                    >
                      Apreta el boton, no seas trolo man.
                    </Button>
                  </div>
                ) : (
                  <div>
                    <img style={{width:'120px',height:'120px',borderRadius:'50%'}} src={user.photoURL}></img>
                    <h1>Bienvenido {user.displayName || 'https://api.adorable.io/avatars/120/abott@adorable.png'}</h1>
                    <Button
                      onClick={() => {
                        singOutWithGoogle();
                      }}
                    >
                      Cerrar sesion
                    </Button>
                  </div>
                )}
              </GridSideNavbar>
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
    </div>
  );
}

export default Application;

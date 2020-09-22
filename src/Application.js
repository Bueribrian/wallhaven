import React, { useContext } from "react";
import Home from "./pages/Home";
import Wall from "./pages/Wall";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import { Link } from "react-router-dom";
import { signInWithGoogle, singOutWithGoogle } from "./firebase";
import { SearchProvider } from "./context/SearchContext";
import { UserContext } from "./context/UserProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import { Button } from "./components/StyledComponents";
import { Grid, GridBody, GridSideNavbar, GridNavbar } from "./components/Grid";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function Application() {
  const { user } = useContext(UserContext);


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
                  <div className="signUp">
                    <h1>Sign up</h1>
                    <div className="signUp-google my-2">
                      <h3>Sign up with google </h3>{" "}
                      <Button
                        background="danger"
                        onClick={() => {
                          try {
                            signInWithGoogle();
                          } catch (error) {
                            console.error(
                              "Error signing in with Google",
                              error
                            );
                          }
                        }}
                      >
                        Google <i className="fab fa-google-plus-g"></i>
                      </Button>
                    </div>
                    <div className="signUp-normal my-2">
                      <h3>Sign up with wallparadise account</h3>{" "}
                      <Button>
                        <Link
                          style={{ textDecoration: "none", color: "#fff" }}
                          to="signup"
                        >
                          sign up
                        </Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="profile">
                    <img
                      className="profile-avatar"
                      alt="profile"
                      src={
                        user.photoURL ||
                        "https://api.adorable.io/avatars/120/abott@adorable.png"
                      }
                    ></img>
                    <p className="profile-name">Bienvenido</p>
                    <b>{user.displayName}</b>
                    <div>
                      <Button>
                        See my favorites <i className="fa fa-heart"></i>
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => {
                          singOutWithGoogle();
                        }}
                        background="danger"
                      >
                        Cerrar sesion
                      </Button>
                    </div>
                  </div>
                )}
              </GridSideNavbar>
              <GridBody>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/wall/:wallid" component={Wall} />
                  <Route
                    path="/search/:topic?/:searchWord?"
                    component={Search}
                  />
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

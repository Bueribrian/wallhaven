import React, { useState } from "react";
import Home from "./pages/Home";
import Wall from "./pages/Wall";
import Navbar from "./components/Navbar";
import { SearchProvider } from "./context/SearchContext";
import { ThemeProvider } from "./context/ThemeProvider";
import { Grid, GridBody, GridSideNavbar, GridNavbar } from "./components/Grid";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
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
                </Switch>
              </GridBody>
            </Grid>
          </ThemeProvider>
        </SearchProvider>
      </Router>
    </div>
  );
}

export default App;

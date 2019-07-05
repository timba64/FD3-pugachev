import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navibar from "./components/layout/Navibar";
import Dashboard from "./components/dashboard/Dashboard";
import AutoDetails from "./components/autos/AutoDetails";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CreateAuto from "./components/autos/CreateAuto";
import AdmPanel from "./components/panel/AdmPanel";
import AboutPage from "./components/about/AboutPage";
import ErrAuth from "./components/auth/ErrAuth";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navibar />
                <Switch>
                    <Route path="/" component={Dashboard} exact />
                    <Route path="/auto/:id" component={AutoDetails} />
                    <Route path="/signin" component={SignIn} exact />
                    <Route path="/signup" component={SignUp} exact />
                    <Route path="/create" component={CreateAuto} exact />
                    <Route path="/panel" component={AdmPanel} exact />
                    <Route path="/about" component={AboutPage} exact />
                    <Route path="/errauth" component={ErrAuth} exact />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;

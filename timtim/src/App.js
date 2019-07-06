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
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/create" component={CreateAuto} />
                    <Route path="/panel" component={AdmPanel} />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/errauth" component={ErrAuth} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;

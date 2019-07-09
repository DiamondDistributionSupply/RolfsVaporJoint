import React from "react"
import { Route, Switch } from "react-router-dom"

import Home from "./Views/Home/Home"
import AdminLogin from "./Views/AdminLogin/AdminLogin"
import AdminHome from "./Views/AdminHome/AdminHome"

export default <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/admin/login" component={AdminLogin} />
    <Route path="/admin/home" component={AdminHome} />
</Switch>
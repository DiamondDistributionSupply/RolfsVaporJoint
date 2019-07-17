import React from "react"
import { Route, Switch } from "react-router-dom"

import Home from "./Views/Home/Home"
import About from "./Views/About/About"
import AdminLogin from "./Views/AdminLogin/AdminLogin"
import AdminHome from "./Views/AdminHome/AdminHome"
import AdminEditMain from "./Views/AdminEditMain/AdminEditMain"
import AdminProducts from "./Views/AdminProducts/AdminProducts"
import AdminSingleJuice from "./Views/AdminSingleJuice/AdminSingleJuice"
import AdminSingleHardware from "./Views/AdminSingleHardware/AdminSingleHardware"

export default <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/admin/login" component={AdminLogin} />
    <Route path="/admin/home" component={AdminHome} />
    <Route path="/admin/edit/main" component={AdminEditMain} />
    <Route path="/admin/products" component={AdminProducts} />
    <Route path="/admin/juice/:juiceid" component={AdminSingleJuice} />
    <Route path="/admin/hardware/:hardwareid" component={AdminSingleHardware} />
</Switch>
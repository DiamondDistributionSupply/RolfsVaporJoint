import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"

import Home from "./Views/Home/Home"
import About from "./Views/About/About"
// import AdminLogin from "./Views/AdminLogin/AdminLogin"
// import AdminEditMain from "./Views/AdminEditMain/AdminEditMain"

export default <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    {/* <Route path="/admin/login" component={AdminLogin} />
    <Route path="/admin/edit/main" component={AdminEditMain} /> */}
    <Route render={() => <Redirect to={{pathname: "/"}} />} />
</Switch>
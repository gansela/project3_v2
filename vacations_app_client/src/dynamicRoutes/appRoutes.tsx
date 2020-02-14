import Button from "@material-ui/core/Button";
import { Link, Route } from "react-router-dom";
import React from "react";
import  routes  from "./routes.config"
import { IAppLinks } from "../ts/interfaces"



export const AppLinks = (props: IAppLinks) => {
    const { role } = props
    const result = routes.filter(route => route.isVisible && ((route.role === "all" && role !== "guest")  || route.role === role)).map(route => <Button color="inherit">
        <Link style={{ color: "white" }} to={route.path}>{route.title}</Link>
    </Button>)
    return <>{result}</>
}


export const AppSwitchRoutes = () => {

    const result = routes.map(route =>
        <Route path={route.path} component={route.component} />
    )
    return <>{result}</>
}
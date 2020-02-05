import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import './App.css';
import Container from '@material-ui/core/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppLinks, AppSwitchRoutes } from "./dynamicRoutes/appRoutes"
import { connect } from "react-redux"



class App extends React.Component<any>{
  constructor(props: any) {
    super(props)
    this.state = {
    }
  }


  render() {
    const { role, user } = this.props
    console.log(role)
    return (
      <Router >
        <div className="grade grade-div">
          <nav style={{ padding: "20px" }} className="grade">
            <AppLinks role={role} />
            <div className="userName"> {user || role}</div>
          </nav>
          <Container maxWidth="md" style={{ backgroundColor: "GhostWhite", borderRadius: "10px" }} className="overflow-auto">
            <Switch>
              <Route exact path="/"><Redirect to="/home" /></Route>
              <AppSwitchRoutes />
              <Route path="**" component={() => <h1> Not Found! </h1>} />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}




const mapToProps = (state: any) => {
  return state
}



export default connect(mapToProps, null)(App)
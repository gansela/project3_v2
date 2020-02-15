import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import './App.css';
import Container from '@material-ui/core/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppLinks, AppSwitchRoutes } from "./dynamicRoutes/appRoutes"
import { connect } from "react-redux"
import { stopSession } from "./redux/actions"
import Button from '@material-ui/core/Button';
import { createBrowserHistory } from "history";
import AlertModal from "./components/AlertModal/index"
const history = createBrowserHistory();



class App extends React.Component<any>{
  constructor(props: any) {
    super(props)
    this.state = {
    }
  }

  signOutButton = () => {
    const { signOut, } = this.props
    signOut()
    history.goBack()
  }

  render() {
    const { role, user, signOut, } = this.props
    return (
      <Router >
        <div className="grade grade-div">
          <nav style={{ padding: "10px" }} className="grade">
            <AppLinks role={role} />
            {isLogged(role, this.signOutButton)}
            <div className="userName">
              <span>{user || role}</span>
            </div>
          </nav>
          <Container maxWidth="md" style={{ backgroundColor: "GhostWhite", borderRadius: "10px", padding: "0px" }} className="overflow-auto">
            <Switch>
              <Route exact path="/"><Redirect to="/landing" /></Route>
              <AppSwitchRoutes />
              <Route path="**" component={() => <h1> Not Found! </h1>} />
            </Switch>
          </Container>
          <AlertModal />
        </div>
      </Router>
        );
      }
    }
    
const isLogged = (role: string, signOutfunc: any, ) => {
  if (role === "guest") return
        return (
    <Button style={{ color: "white" }} onClick={() => {
          signOutfunc()
        }}>Sign Out</Button>
        )
      }
      
      
const mapToProps = (state: any) => {
  return state
      }
      
const mapDispatch = (dispatch: any) => {
  return {
          signOut: () => {
          dispatch(stopSession())
        }
        }
      }
      
export default connect(mapToProps, mapDispatch)(App)
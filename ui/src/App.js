import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { PROJECT_VERSION } from './helper/config';
import Login from './components/User/SignIn/index';
import Index from './components/Index/index';
// loader css
import './styles/loader.css';

const App = () => {

  // const dispatch = useDispatch();
  const { token, user, projectVersion } = useSelector(rootReducer => rootReducer.userReducer)
  /* check user login. if the has not recived token send uerr login page  */
  if (token === null || user._id === null || PROJECT_VERSION !== projectVersion) {
    // reset breadcrumb
    return <Route component={Login} />;
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Index} />
        <Redirect to="/" />
      </Switch>
    </div >
  );
}

export default App;

import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignIn from 'pages/SignIn';
import MrkDocuments from 'pages/MrkDocuments';
import Loader from 'components/Loader';
import PrivateRoute from 'components/PrivateRoute';
import StartAppFail from 'components/StartAppFail';
import { LayoutApp } from 'components/LayoutApp';

const App = ({ loading, error }) => {
  if (error !== null) return <StartAppFail />;
  return (
    <>
      {loading ? <Loader /> :
        <Switch>
          <Route exact path="/signIn" component={SignIn} />
          <LayoutApp>
            <Switch>
              <PrivateRoute exact path="/" component={MrkDocuments} />
              <Redirect to="/" />
            </Switch>
          </LayoutApp>
          <Redirect to="/" />
        </Switch>}
    </>
  );
};

const mapStateToProps = state => ({
  loading: state.asyncInitialState.loading,
  error: state.asyncInitialState.error
});

export default connect(mapStateToProps)(App);
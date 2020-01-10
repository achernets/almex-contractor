import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignIn from 'pages/SignIn';
import Loader from 'components/Loader';
import StartAppFail from 'components/StartAppFail';

const App = ({ loading, error }) => {
  if (error !== null) return <StartAppFail />;
  return (
    <>
      {loading ? <Loader /> :
        <Switch>
          <Route exact path="/signIn" component={SignIn} />
          <Redirect to="/signIn" />
        </Switch>}
    </>

  );
};

const mapStateToProps = state => ({
  loading: state.asyncInitialState.loading,
  error: state.asyncInitialState.error
});

export default connect(mapStateToProps)(App);
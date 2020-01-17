import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignIn from 'pages/SignIn';
import MrkDocuments from 'pages/MrkDocuments';
import Profile from 'pages/Profile';
import Loader from 'components/Loader';
import PrivateRoute from 'components/PrivateRoute';
import StartAppFail from 'components/StartAppFail';
import { LayoutApp } from 'components/LayoutApp';
import { ConfigProvider } from 'antd';
import { getAntdLocale } from 'utils/helpers';

const App = ({ loading, error }) => {
  if (error !== null) return <StartAppFail />;
  return (
    <>
      {loading ? <Loader /> :
        <ConfigProvider locale={getAntdLocale()}>
          <Switch>
            <Route exact path="/signIn" component={SignIn} />
            <LayoutApp>
              <Switch>
                <PrivateRoute exact path="/mrkDocuments" component={MrkDocuments} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <Redirect to="/mrkDocuments" />
              </Switch>
            </LayoutApp>
            <Redirect to="/" />
          </Switch>
        </ConfigProvider>}
    </>
  );
};

const mapStateToProps = state => ({
  loading: state.asyncInitialState.loading,
  error: state.asyncInitialState.error
});

export default connect(mapStateToProps)(App);
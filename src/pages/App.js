import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import MrkDocuments from 'pages/MrkDocuments';
import Profile from 'pages/Profile';
import Loader from 'components/Loader';
import PrivateRoute from 'components/PrivateRoute';
import StartAppFail from 'components/StartAppFail';
import { LayoutApp } from 'components/LayoutApp';
import { ConfigProvider } from 'antd';
import { getAntdLocale } from 'utils/helpers';

const App = ({ loading, error }) => {
  useEffect(() => {
    const audio = () => {
      if (process.env.NODE_ENV !== 'development') document.getElementById('audio').play();
    };
    document.addEventListener('click', audio);
    return () => {
      document.removeEventListener('click', audio);
    };
  }, []);
  if (error !== null) return <StartAppFail />;
  return (
    <>
      {loading ? <Loader /> :
        <ConfigProvider locale={getAntdLocale()}>
          <Switch>
            <Route path="/signIn" component={SignIn} />
            <Route path="/SignUp" component={SignUp} />
            <LayoutApp>
              <Switch>
                <PrivateRoute path="/mrkDocuments" component={MrkDocuments} />
                <PrivateRoute path="/profile" component={Profile} />
                <Redirect to="/mrkDocuments" />
              </Switch>
            </LayoutApp>
            <Redirect to="/" />
          </Switch>
        </ConfigProvider>}
      <audio src={require('../images/gus.mp3')} id="audio"></audio>
    </>
  );
};

const mapStateToProps = state => ({
  loading: state.asyncInitialState.loading,
  error: state.asyncInitialState.error
});

export default connect(mapStateToProps)(App);
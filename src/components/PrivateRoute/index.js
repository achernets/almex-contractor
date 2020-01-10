import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  token,
  ...attributes
}) => {
  const render = props => token !== null ? <Component {...props} /> : <Redirect to={{ pathname: '/signIn' }} />;
  return <Route {...attributes} render={render} />;
};

const mapStateToProps = state => ({
  token: state.auth.token
});

export default connect(mapStateToProps)(PrivateRoute);

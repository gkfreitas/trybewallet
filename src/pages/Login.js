import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateEmail } from '../redux/actions';

class Login extends Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.changeButton);
  };

  handleClick = () => {
    const { email } = this.state;
    const { dispatch } = this.props;
    dispatch(updateEmail(email));
  };

  changeButton = () => {
    const { password, email } = this.state;
    const minLengthPassword = 6;
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-_]+\.[A-Za-z]{2,}$/;
    const ERROR_CASES = [password.length < minLengthPassword, !regex.test(email)];
    const someCase = ERROR_CASES.every((e) => !e);
    this.setState({
      isDisabled: !someCase,
    });
  };

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <form>
        <input
          data-testid="email-input"
          onChange={ this.handleChange }
          type="email"
          value={ email }
          name="email"
        />
        <input
          data-testid="password-input"
          onChange={ this.handleChange }
          type="password"
          value={ password }
          name="password"
          minLength="6"
        />
        <Link to="/carteira">
          <button onClick={ this.handleClick } disabled={ isDisabled }>Entrar</button>
        </Link>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);

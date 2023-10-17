import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import eyeIconHide from '../images/eye-password-hide-1.svg';
import eyeIcon from '../images/mingcute-eye-line.svg';
import undrawCoin from '../images/undraw-savings-1.svg';
import { updateEmail } from '../redux/actions';

class Login extends Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
    passwordHide: true,
  };

  handlePassword = () => {
    const { passwordHide } = this.state;
    this.setState({
      passwordHide: !passwordHide,
    });
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
    const { email, password, isDisabled, passwordHide } = this.state;
    return (
      <div
        className="flex flex-col md:flex-row-reverse justify-center items-center
      h-screen bg-[#BCF4B0]"
      >
        <form
          className="py-[55px] px-[15px] flex flex-col bg-[#fff]
        rounded-[50px] mt-[24px] mx-[26px]"
        >
          <div className="text-center">
            <h1
              className="uppercase text-[#072201] font-bold text-[20px]"
              style={ { fontFamily: 'IBM Plex Mono' } }
            >
              TrybeWallet
            </h1>
            <h2
              className="text-[24px] font-semibold mt-[60px]"
              style={ { fontFamily: 'Poppins',
              } }
            >
              Bem vindo de Volta

            </h2>
            <h3
              className="text-[#1E1E1E] text-[16px] mt-[14px]"
              style={ { fontFamily: 'Roboto',
              } }
            >
              Digite seu email e senha
            </h3>
          </div>
          <label
            className="flex flex-col mt-[80px] px-[15px] tracking-[0.48px]"
            style={ { fontFamily: 'Poppins',
              fontStyle: 'normal',
            } }
          >
            Email
            <input
              data-testid="email-input"
              onChange={ this.handleChange }
              type="email"
              value={ email }
              name="email"
              className="border-b-[1px] border-black outline-none text-[12px]"
            />
          </label>

          <label
            className="mt-[24px] mx-[15px] relative tracking-[0.48px]"
            style={ { fontFamily: 'Poppins',
              fontStyle: 'normal',
            } }
          >
            Senha
            <input
              className="border-b-[1px] border-black outline-none text-[12px] w-full"
              data-testid="password-input"
              onChange={ this.handleChange }
              type={ passwordHide ? 'password' : 'text' }
              value={ password }
              name="password"
              minLength="6"
            />
            <img
              role="presentation"
              onKeyDown={ this.handlePassword }
              onClick={ this.handlePassword }
              src={ passwordHide ? eyeIcon : eyeIconHide }
              alt="Icone de um olho"
              className="absolute right-0 top-0 cursor-pointer"
            />
          </label>
          <div className="flex justify-between mt-[12px] mx-[15px]">
            <label
              className=" font-light text-[10px] text-[#1E1E1E]"
              style={ { fontFamily: 'Roboto',
                fontWeight: '300',
              } }
            >
              <input type="checkbox" className=" mr-[6px] cursor-pointer" />
              Lembrar-se de mim
            </label>
            <span
              className="text-[#4B4B4B] text-[8px] font-light cursor-pointer"
              style={ {
                fontWeight: '300',
                fontFamily: 'Roboto',
              } }
            >
              Esqueceu a senha?
            </span>
          </div>
          <div className="flex justify-center">
            <Link to="/carteira">
              <button
                style={ { fontFamily: 'Roboto',
                } }
                className="uppercase px-[50px] py-[10px] bg-[#379524]
                rounded-[50px] mt-[34px] tracking-[0.85px] text-[10px] cursor-pointer"
                onClick={ this.handleClick }
                disabled={ isDisabled }
              >
                Entrar
              </button>
            </Link>
          </div>
        </form>
        <img
          src={ undrawCoin }
          alt="Boneco em cima de um porco colocando dinheiro"
          className="my-[60px] mx-auto md:w-[432px] md:h-[348px] md:ml-[25px]"
        />
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);

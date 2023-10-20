import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { emailState, expensesState } = this.props;
    const totalPrice = expensesState.reduce((acc, cur) => {
      const { currency, exchangeRates, value } = cur;
      const { ask } = exchangeRates[currency];
      const calc = acc + parseFloat(value * ask);
      return calc;
    }, 0);
    return (
      <div className="pt-[40px]">
        <div className="flex items-center relative justify-center">
          <h1
            className="text-[#030f00]"
            style={ {
              fontFamily: 'Poppins',
              fontSize: '32px',
              fontStyle: 'normal',
              fontWeight: '500',
            } }
          >
            Registre sua despesa
          </h1>
          <div className="flex items-center absolute right-[40px]">
            <h1
              data-testid="email-field"
              className="mr-[16px]"
              style={ {
                fontFamily: 'Roboto',
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: '400',

              } }
            >
              {emailState}

            </h1>
            <div
              className="w-[40px] h-[40px] bg-[#fff]
            rounded-full border-[1px] border-[#277b15]"
            />
          </div>
        </div>
        <div
          className="flex items-center justify-center mt-[60px]"
          style={ {
            fontFamily: 'IBM Plex Mono',
            fontSize: '48px',
            fontStyle: 'normal',
            fontWeight: '400',
          } }
        >
          <p
            data-testid="total-field"
            className="text-center "
          >
            { totalPrice.toFixed(2) }
          </p>
          <span data-testid="header-currency-field" className="ml-[15px]">BRL</span>

        </div>
        <p
          className="text-center text-[#b40000]"
          style={ {
            fontFamily: 'IBM Plex Mono',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: '400',

          } }
        >
          Total de despesas

        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailState: state.user.email,
  expensesState: state.wallet.expenses,
});

Header.propTypes = {
  emailState: PropTypes.string.isRequired,
  expensesState: PropTypes.arrayOf(PropTypes.shape({
    reduce: PropTypes.func.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(Header);

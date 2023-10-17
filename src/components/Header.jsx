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
      <div>
        <h1 data-testid="email-field">{emailState}</h1>
        <p data-testid="total-field">
          { totalPrice.toFixed(2) }
        </p>
        <span data-testid="header-currency-field">BRL</span>
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

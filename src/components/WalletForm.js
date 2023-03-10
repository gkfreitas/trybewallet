import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fecthCurrencies, updateExpenseFetch } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fecthCurrencies());
    this.setState({
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  handleClick = () => {
    const { dispatch } = this.props;
    dispatch(updateExpenseFetch(this.state));
    this.setState({
      value: '',
      description: '',
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.changeButton);
  };

  render() {
    const { loadedState, currenciesState } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form>
        <label>
          Valor:
          <input
            type="text"
            data-testid="value-input"
            name="value"
            onChange={ this.handleChange }
            value={ value }
          />
        </label>
        <label>
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            name="description"
            onChange={ this.handleChange }
            value={ description }
          />
        </label>
        <label>
          Moeda
          <select
            data-testid="currency-input"
            name="currency"
            onChange={ this.handleChange }
            value={ currency }
          >
            {loadedState && currenciesState.map((e) => <option key={ e }>{e}</option>)}
          </select>
        </label>
        <label>
          Método de pagamento:
          <select
            data-testid="method-input"
            name="method"
            onChange={ this.handleChange }
            value={ method }
          >
            {paymentMethods.map((e) => <option key={ e }>{e}</option>)}
          </select>
        </label>
        <label>
          Tipo de gasto:
          <select
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChange }
            value={ tag }
          >
            {tags.map((e) => <option key={ e }>{e}</option>)}
          </select>
        </label>
        <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesState: state.wallet.currencies,
  loadedState: state.wallet.loaded,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currenciesState: PropTypes.arrayOf(PropTypes.string).isRequired,
  loadedState: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(WalletForm);

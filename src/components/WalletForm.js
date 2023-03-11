import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editedExpense, fecthCurrencies, updateExpenseFetch } from '../redux/actions';

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

  componentDidUpdate(prevProps, prevState) {
    const { editorState, expensesState, idToEditState } = this.props;
    if (editorState && prevState === this.state) {
      const findById = expensesState.find((e) => e.id === idToEditState);
      const { value, description, method, currency, tag } = findById;
      this.setState({
        value,
        description,
        method,
        currency,
        tag,
      });
    }
  }

  handleClick = () => {
    const { dispatch } = this.props;
    dispatch(updateExpenseFetch(this.state));
    this.setState({
      value: '',
      description: '',
    });
  };

  handleClickEdit = () => {
    const { idToEditState, dispatch } = this.props;
    dispatch(editedExpense(this.state, idToEditState));
    this.setState({
      value: '',
      description: '',
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { loadedState, currenciesState, editorState } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    const addExpenseButton = (
      <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
    );
    const editExpenseButton = (
      <button
        type="button"
        onClick={ this.handleClickEdit }
      >
        Editar despesa
      </button>
    );

    return (
      <form data-testid="form-wallet">
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
            {loadedState && currenciesState.map((e) => (
              <option data-testid="currency-option" key={ e }>{e}</option>
            ))}
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
            {paymentMethods.map((e) => (
              <option data-testid="method-option" key={ e }>{e}</option>
            ))}
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
            {tags.map((e) => <option data-testid="tag-option" key={ e }>{e}</option>)}
          </select>
        </label>
        {
          editorState
            ? (editExpenseButton)
            : (addExpenseButton)
        }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesState: state.wallet.currencies,
  loadedState: state.wallet.loaded,
  idToEditState: state.wallet.idToEdit,
  editorState: state.wallet.editor,
  expensesState: state.wallet.expenses,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currenciesState: PropTypes.arrayOf(PropTypes.string).isRequired,
  loadedState: PropTypes.bool.isRequired,
  idToEditState: PropTypes.number.isRequired,
  editorState: PropTypes.bool.isRequired,
  expensesState: PropTypes.arrayOf(PropTypes.shape({
    reduce: PropTypes.func.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(WalletForm);

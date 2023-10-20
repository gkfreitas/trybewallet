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
    const { indexEditState, dispatch } = this.props;
    dispatch(editedExpense(this.state, indexEditState));
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
      <button
        className=" px-[20px] py-[10px] bg-[#379524] rounded-[5px] text-[#030F00]
        cursor-pointer"
        style={ {
          fontFamily: 'Poppins',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: '500',
        } }
        type="button"
        onClick={ this.handleClick }
      >
        Adicionar despesa

      </button>
    );
    const editExpenseButton = (
      <button
        className=" px-[20px] py-[10px] bg-[#379524] rounded-[5px] text-[#030F00]
        cursor-pointer"
        style={ {
          fontFamily: 'Poppins',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: '500',
        } }
        type="button"
        onClick={ this.handleClickEdit }
      >
        Editar despesa
      </button>
    );

    return (
      <form data-testid="form-wallet" className="px-[100px] ">
        <section className="flex justify-around">
          <label
            className="flex flex-col items-center text-[#0c3b02] mr-[12px]"
            style={ {
              fontFamily: 'Poppins',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: '500',
            } }
          >
            Valor
            <input
              type="text"
              data-testid="value-input"
              name="value"
              className="px-[11px] outline-none rounded-[5px] bg-[#F0FFDC] w-full"
              placeholder="R$"
              onChange={ this.handleChange }
              value={ value }
            />
          </label>
          <label
            className="flex flex-col items-center text-[#0c3b02] mr-[12px]"
            style={ {
              fontFamily: 'Poppins',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: '500',
            } }
          >
            Descrição
            <input
              className="px-[11px] outline-none rounded-[5px] bg-[#F0FFDC] w-full"
              type="text"
              data-testid="description-input"
              name="description"
              onChange={ this.handleChange }
              value={ description }
            />
          </label>
          <label
            className="flex flex-col items-center text-[#0c3b02] mr-[12px]"
            style={ {
              fontFamily: 'Poppins',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: '500',
            } }
          >
            Moeda
            <select
              className="px-[11px] outline-none rounded-[5px] bg-[#F0FFDC] w-[100px]"
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
          <label
            className="flex flex-col items-center text-[#0c3b02] mr-[14px]"
            style={ {
              fontFamily: 'Poppins',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: '500',
            } }
          >
            Pagemento
            <select
              className="px-[11px] outline-none rounded-[5px] bg-[#F0FFDC]"
              style={ {
                fontFamily: 'Poppins',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: '500',
              } }
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
          <label
            className="flex flex-col items-center text-[#0c3b02] mr-[12px]"
            style={ {
              fontFamily: 'Poppins',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: '500',
            } }
          >
            Tipo de gasto
            <select
              className="px-[11px] outline-none rounded-[5px] bg-[#F0FFDC]"
              data-testid="tag-input"
              name="tag"
              onChange={ this.handleChange }
              value={ tag }
            >
              {tags.map((e) => <option data-testid="tag-option" key={ e }>{e}</option>)}
            </select>
          </label>
        </section>
        <div className="flex justify-center mt-[30px]">
          {
            editorState
              ? (editExpenseButton)
              : (addExpenseButton)
          }
        </div>
      </form>
    );
  }
}
const mapStateToProps = (state) => ({
  currenciesState: state.wallet.currencies,
  loadedState: state.wallet.loaded,
  idToEditState: state.wallet.idToEdit,
  indexEditState: state.wallet.indexEdit,
  editorState: state.wallet.editor,
  expensesState: state.wallet.expenses,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currenciesState: PropTypes.arrayOf(PropTypes.string).isRequired,
  loadedState: PropTypes.bool.isRequired,
  idToEditState: PropTypes.number.isRequired,
  editorState: PropTypes.bool.isRequired,
  indexEditState: PropTypes.number.isRequired,
  expensesState: PropTypes.arrayOf(PropTypes.shape({
    reduce: PropTypes.func.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(WalletForm);

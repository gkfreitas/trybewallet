import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpense, editExpense } from '../redux/actions';

class Table extends Component {
  render() {
    const headers = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    const { expensesState, dispatch } = this.props;
    return (
      <table>
        <thead>
          <tr>
            {headers.map((e, i) => (
              <th key={ `${e}${i}` }>{e}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {expensesState.map((e, i) => (
            <tr key={ e.id }>
              <td>{e.description}</td>
              <td>{e.tag}</td>
              <td>{e.method}</td>
              <td>{parseFloat(e.value).toFixed(2)}</td>
              <td>{e.currency}</td>
              <td>BRL</td>
              <td>
                {
                  parseFloat(e.exchangeRates[e.currency].ask).toFixed(2)
                }
                { ' '}
                {parseFloat(e.value * e.exchangeRates[e.currency].ask).toFixed(2)}

              </td>
              <td>{e.exchangeRates[e.currency].name}</td>
              <td>
                <button
                  onClick={
                    () => dispatch(editExpense(e, i))
                  }
                  data-testid="edit-btn"
                >
                  Editar
                </button>
                <button
                  data-testid="delete-btn"
                  onClick={ () => dispatch(deleteExpense(e.id)) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  expensesState: state.wallet.expenses,
});

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expensesState: PropTypes.arrayOf(PropTypes.shape({
    reduce: PropTypes.func.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(Table);

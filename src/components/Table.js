import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const headers = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    const { expensesState } = this.props;
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
          {expensesState.map(({
            value,
            description,
            currency,
            method,
            tag,
            exchangeRates,
          }, i) => (
            <tr key={ i }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{parseFloat(value).toFixed(2)}</td>
              <td>{currency}</td>
              <td>BRL</td>
              <td>
                {
                  parseFloat(exchangeRates[currency].ask).toFixed(2)
                }
                { ' '}
                {parseFloat(value * exchangeRates[currency].ask).toFixed(2)}

              </td>
              <td>{exchangeRates[currency].name}</td>
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
  expensesState: PropTypes.arrayOf(PropTypes.shape({
    reduce: PropTypes.func.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(Table);

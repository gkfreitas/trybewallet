import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import deleteIcon from '../images/material-symbols-delete-outline.svg';
import editIcon from '../images/tabler-edit.svg';
import { deleteExpense, editExpense } from '../redux/actions';

class Table extends Component {
  render() {
    const headers = ['ID', 'Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    const { expensesState, dispatch } = this.props;
    return (
      <section className="mt-[30px] mx-auto max-w-[1280px]">
        <h1
          className="text-center"
          style={ {
            fontFamily: 'Poppins',
            flexShrink: '0',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: '400',
          } }
        >
          Despesas
        </h1>
        <table
          className="table-fixed w-full
       border-collapse"
        >
          <thead>
            <tr>
              {headers.map((e, i) => (
                <th
                  key={ `${e}${i}` }
                  className="bg-[#A1E393]"
                  style={ {
                    fontFamily: 'Poppins',
                    flexShrink: '0',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                  } }
                >
                  {e}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {expensesState.map((e, i) => (
              <tr
                key={ e.id }
                className={ `text-center 
            ${(i + 1) % 2 === 0 ? 'bg-[#BCF4B0]' : 'bg-[#E2FFCB]'}` }
              >
                <td>{i + 1}</td>
                <td className="break-words">{e.description}</td>
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
                  <div className="flex justify-around">
                    <img
                      role="presentation"
                      src={ editIcon }
                      alt="Icone de ditar"
                      data-testid="edit-btn"
                      onKeyDown={ () => dispatch(editExpense(e, i)) }
                      onClick={
                        () => dispatch(editExpense(e, i))
                      }
                      className="cursor-pointer"
                    />
                    <img
                      role="presentation"
                      src={ deleteIcon }
                      alt="Icone de ditar"
                      data-testid="delete-btn"
                      onKeyDown={ () => dispatch(deleteExpense(e.id)) }
                      onClick={ () => dispatch(deleteExpense(e.id)) }
                      className="cursor-pointer"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
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

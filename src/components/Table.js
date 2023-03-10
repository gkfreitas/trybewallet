import React, { Component } from 'react';

class Table extends Component {
  render() {
    const headers = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <table>
        <tr>
          {headers.map((e, i) => (
            <th key={ `${e}${i}` }>{e}</th>
          ))}
        </tr>
      </table>
    );
  }
}

export default Table;

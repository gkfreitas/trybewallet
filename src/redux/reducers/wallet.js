// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {

  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  loaded: false,
  totalPrice: 0,
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_SUCCESSFUL':
    return {
      ...state,
      currencies: Object.keys(action.payload).filter((e) => e !== 'USDT'),
      loaded: true,
    };
  case 'UPDATE_EXPENSE':
    action.payload.id = state.expenses.length;

    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };

  case 'DELETE_EXPENSE':

    return {
      ...state,
      expenses: state.expenses.filter((e) => e.id !== action.id),
    };
  default:
    return state;
  }
}

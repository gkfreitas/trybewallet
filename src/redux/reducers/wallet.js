// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {

  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  loaded: false,
  totalPrice: 0,
  indexEdit: 0,
};

export default function wallet(state = INITIAL_STATE, action) {
  const expensesArray = state.expenses;

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

  case 'STARTING_EDIT_EXPENSE':

    return {
      ...state,
      editor: true,
      idToEdit: action.id,
      indexEdit: action.index,
    };

  case 'EDITED_EXPENSE':

    expensesArray[action.id].description = action.payload.description;
    expensesArray[action.id].currency = action.payload.currency;
    expensesArray[action.id].value = action.payload.value;
    expensesArray[action.id].tag = action.payload.tag;
    expensesArray[action.id].method = action.payload.method;
    return {
      ...state,

      expenses: [...state.expenses],
      editor: false,
      idToEdit: 0,
    };
  default:
    return state;
  }
}

// Coloque aqui suas actions
export const updateEmail = (state) => ({
  type: 'UPDATE_EMAIL',
  email: state,
});

export const updateExpense = ({
  value, description, currency, method, tag,
}, exchangeRates) => ({
  type: 'UPDATE_EXPENSE',
  payload: { id: 0, value, description, currency, method, tag, exchangeRates },
});

export const editExpense = (state) => ({
  type: 'STARTING_EDIT_EXPENSE',
  payload: state,
  id: state.id,
});

export const editedExpense = (state, id) => ({
  type: 'EDITED_EXPENSE',
  payload: state,
  id,
});

export const deleteExpense = (id) => ({
  type: 'DELETE_EXPENSE',
  id,
});

export function updateExpenseFetch(state) {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    dispatch(updateExpense(state, data));
  };
}

function requestSuccessful(currencies) {
  return {
    type: 'REQUEST_SUCCESSFUL',
    payload: currencies,
  };
}

export function fecthCurrencies() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(requestSuccessful(data));
  };
}

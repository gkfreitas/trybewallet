// Coloque aqui suas actions
export const updateEmail = (state) => ({
  type: 'UPDATE_EMAIL',
  email: state,
});

function requestSuccessful(currencies) {
  return {
    type: 'REQUEST_SUCCESSFUL',
    payload: currencies,
  };
}

export function fecthCurrencies() {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => dispatch(requestSuccessful(Object.keys(data))));
  };
}

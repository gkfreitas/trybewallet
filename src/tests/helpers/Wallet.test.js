import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import Header from '../../components/Header';
import { updateExpenseFetch } from '../../redux/actions';
import mockData from './mockData';
import { renderWithRouterAndRedux } from './renderWith';

describe('Testes para a pagina Wallet', () => {
  const currencies = Object.keys(mockData);
  const initialStateMock = {
    user: {
      email: 'emailteste@gmail.com',
    },
    wallet: {
      currencies,
      expenses: [{
        id: 0,
        value: '100',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: {
          USD: {
            code: 'USD',
            codein: 'BRL',
            name: 'Dólar Americano/Real Brasileiro',
            high: '5.22',
            low: '5.1514',
            varBid: '0.0432',
            pctChange: '0.84',
            bid: '5.2062',
            ask: '5.2092',
            timestamp: '1678478439',
            create_date: '2023-03-10 17:00:39',
          },
        },
      },
      {
        id: 1,
        value: '100',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: {
          USD: {
            code: 'USD',
            codein: 'BRL',
            name: 'Dólar Americano/Real Brasileiro',
            high: '5.22',
            low: '5.1514',
            varBid: '0.0432',
            pctChange: '0.84',
            bid: '5.2062',
            ask: '5.2092',
            timestamp: '1678478439',
            create_date: '2023-03-10 17:00:39',
          },
        },
      }],
      loaded: true,
    },
  };
  it('Teste dos elementos do componente Header', () => {
    renderWithRouterAndRedux(<Header />, {
      initialState: initialStateMock,
    });
    const email = screen.getByRole('heading', {
      name: /emailteste@gmail\.com/i,
    });
    expect(email).toBeInTheDocument();

    const initialTotalPrice = screen.getByTestId('total-field');
    expect(initialTotalPrice).toHaveTextContent('1041.84');

    const baseCurrency = screen.getByTestId('header-currency-field');
    expect(baseCurrency).toBeInTheDocument();
    expect(baseCurrency).toHaveTextContent('BRL');
  });

  it('Teste dos elementos do componente WalletForm', () => {
    renderWithRouterAndRedux(<App />, {
      initialState: initialStateMock,
      initialEntries: ['/carteira'],
    });

    const valueInput = screen.getByRole('textbox', {
      name: /valor:/i,
    });
    expect(valueInput).toBeInTheDocument();

    const descriptionInput = screen.getByRole('textbox', {
      name: /descrição:/i,
    });
    expect(descriptionInput).toBeInTheDocument();

    const currenciesInput = screen.getByRole('combobox', {
      name: /moeda/i,
    });
    expect(currenciesInput).toBeInTheDocument();

    const currenciesOptions = screen.getAllByTestId('currency-option');
    expect(currenciesOptions).toHaveLength(currencies.length);

    const methodInput = screen.getByRole('combobox', {
      name: /método de pagamento:/i,
    });
    expect(methodInput).toBeInTheDocument();

    const methodOptions = screen.getAllByTestId('method-option');
    expect(methodOptions).toHaveLength(3);

    const tagInput = screen.getByRole('combobox', {
      name: /tipo de gasto:/i,
    });
    expect(tagInput).toBeInTheDocument();

    const tagOptions = screen.getAllByTestId('tag-option');
    expect(tagOptions).toHaveLength(5);

    const addExpenseButtton = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    expect(addExpenseButtton).toBeInTheDocument();
  });

  it('Teste para as funcionalidades da pagina wallet', () => {
    renderWithRouterAndRedux(<App />, {
      initialState: initialStateMock,
      initialEntries: ['/carteira'],
    });

    const valueInput = screen.getByRole('textbox', {
      name: /valor:/i,
    });
    const descriptionInput = screen.getByRole('textbox', {
      name: /descrição:/i,
    });
    const addExpenseButtton = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(valueInput, '100');
    userEvent.type(descriptionInput, '100 Dolares');
    userEvent.click(addExpenseButtton);

    expect(valueInput).toHaveTextContent('');
    expect(descriptionInput).toHaveTextContent('');

    const totalPrice = screen.getByTestId('total-field');
    expect(totalPrice).toHaveTextContent('1041.84');
  });

  it('Teste para o componente Table', async () => {
    const { store } = renderWithRouterAndRedux(<App />, {
      initialState: initialStateMock,
      initialEntries: ['/carteira'],
    });

    const deleteButton = screen.getAllByRole('button', {
      name: /excluir/i,
    });
    expect(deleteButton).toHaveLength(2);
    userEvent.click(deleteButton[0]);
    expect(screen.getAllByRole('button', {
      name: /excluir/i,
    })).toHaveLength(1);

    const editButton = screen.getAllByRole('button', {
      name: /editar/i,
    });
    const valueInput = screen.getByRole('textbox', {
      name: /valor:/i,
    });
    expect(valueInput).toBeInTheDocument();
    expect(valueInput).toHaveValue('');

    const descriptionInput = screen.getByRole('textbox', {
      name: /descrição:/i,
    });
    expect(descriptionInput).toBeInTheDocument();
    expect(descriptionInput).toHaveValue('');

    expect(editButton).toHaveLength(1);
    userEvent.click(editButton[0]);
    expect(valueInput).toHaveValue('100');

    const editExpenseButton = screen.getByRole('button', {
      name: /editar despesa/i,
    });
    expect(editExpenseButton).toBeInTheDocument();
    userEvent.click(editExpenseButton);

    const addExpenseButtton = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    expect(addExpenseButtton).toBeInTheDocument();
    userEvent.type(valueInput, '200');
    userEvent.click(addExpenseButtton);
    await store.dispatch(updateExpenseFetch({ value: '200', currency: 'USD' }, mockData));
    expect(valueInput).toHaveValue('');
  });
});

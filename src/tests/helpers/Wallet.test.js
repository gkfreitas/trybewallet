import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import Header from '../../components/Header';
import mockData from './mockData';
import { renderWithRouterAndRedux } from './renderWith';

describe('Testes para a pagina Wallet', () => {
  it('Teste dos elementos do componente Header', () => {
    const initialStateMock = {
      user: {
        email: 'emailteste@gmail.com',
      },
    };

    renderWithRouterAndRedux(<Header />, {
      initialState: initialStateMock,
    });
    const email = screen.getByRole('heading', {
      name: /emailteste@gmail\.com/i,
    });
    expect(email).toBeInTheDocument();

    const initialTotalPrice = screen.getByTestId('total-field');
    expect(initialTotalPrice).toHaveTextContent('0.00');

    const baseCurrency = screen.getByTestId('header-currency-field');
    expect(baseCurrency).toBeInTheDocument();
    expect(baseCurrency).toHaveTextContent('BRL');
  });

  it('Teste dos elementos do componente WalletForm', () => {
    const currencies = Object.keys(mockData);

    const initialStateMock = {
      user: {
        email: 'gabrielkelvinfreitas@gmail.com',
      },
      wallet: {
        currencies,
        expenses: [

        ],
        loaded: true,
      },
    };

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

  it('Teste para as funcionalidades da pagina wallet', async () => {
    const currencies = Object.keys(mockData);

    const initialStateMock = {
      user: {
        email: 'gabrielkelvinfreitas@gmail.com',
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
});

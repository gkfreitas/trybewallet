import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';

describe('Testes para a pagina Login', () => {
  it('Teste para os inputs Email e password', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox', {
      name: /email:/i,
    });
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByLabelText(/senha:/i);
    expect(inputPassword).toBeInTheDocument();

    const loginButton = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(loginButton).toBeInTheDocument();

    // Teste para ver se o botão vem desabilitado
    expect(loginButton).toHaveAttribute('disabled');

    const LOGIN_EMAIL = 'bielzinho123@gmail.com';
    const FAKE_EMAIL = 'bielzinho321.321';

    const LOGIN_PASSWORD = '123456';
    const FAKE_PASSWORD = '12345';

    userEvent.type(inputEmail, FAKE_EMAIL);
    expect(loginButton).toHaveAttribute('disabled');
    userEvent.type(inputPassword, FAKE_PASSWORD);
    expect(loginButton).toHaveAttribute('disabled');

    userEvent.type(inputEmail, LOGIN_EMAIL);
    expect(loginButton).toHaveAttribute('disabled');
    userEvent.type(inputPassword, LOGIN_PASSWORD);
    expect(loginButton).not.toHaveAttribute('disabled');

    userEvent.click(loginButton);
    expect(history.location.pathname).toBe('/carteira');
  });
});

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const loginElement = screen.getByText(/Log In/i);
  const signupElement = screen.getByText(/Sign Up/i);
  expect(loginElement).toBeInTheDocument();
  expect(signupElement).toBeInTheDocument();

});

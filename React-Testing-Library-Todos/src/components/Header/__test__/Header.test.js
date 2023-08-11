import { render, screen } from '@testing-library/react';
import Header from '../Header';

it('should render same text passed into the title prop', async () => {
  render(<Header title='App Header' />);
  const headerElement = screen.getByText(/app header/i);
  expect(headerElement).toBeInTheDocument();
});

it('should render same text passed into the title prop', async () => {
  render(<Header title='App Header' />);
  const headerElement = screen.getByRole('heading', { name: 'App Header' });
  expect(headerElement).toBeInTheDocument();
});

it('should render same text passed into the title prop', async () => {
  render(<Header title='App Header' />);
  const headerElement = screen.getByTitle('header');
  expect(headerElement).toBeInTheDocument();
});

it('should render same text passed into the title prop', async () => {
  render(<Header title='App Header' />);
  const headerElement = screen.getByTestId('header 1')
  expect(headerElement).toBeInTheDocument();
});

// Find by

it('should render same text passed into the title prop', async () => {
  render(<Header title='App Header' />);
  const headerElement = await screen.findByText(/app header/i);
  expect(headerElement).toBeInTheDocument();
});

// Query By

it('should render same text passed into the title prop', async () => {
  render(<Header title='App Header' />);
  const headerElement = screen.queryByText(/heading/i);
  expect(headerElement).not.toBeInTheDocument();
});

it('should render same text passed into the title prop', async () => {
  render(<Header title='App Header' />);
  const headerElements = screen.getAllByRole('heading');
  expect(headerElements.length).toBe(2);
});
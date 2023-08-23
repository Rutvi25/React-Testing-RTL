import { fireEvent, render, screen } from '@testing-library/react';
import AddInput from '../AddInput';

const mockedSetTodo = jest.fn();
describe('header', () => {
  it('should render same text passed into the title prop', async () => {
    render(
      <AddInput
        todos={[]}
        setTodos={async () => {
          mockedSetTodo;
        }}
      />
    );
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    expect(inputElement).toBeInTheDocument();
  });

  it('should be able to type in input', async () => {
    render(
      <AddInput
        todos={[]}
        setTodos={async () => {
          mockedSetTodo;
        }}
      />
    );
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    fireEvent.change(inputElement, { target: { value: 'Go for shopping' } });
    expect(inputElement.value).toBe('Go for shopping');
  });

  it('should have an empty input when add button is clicked', async () => {
    render(
      <AddInput
        todos={[]}
        setTodos={async () => {
          mockedSetTodo;
        }}
      />
    );
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    const buttonElement = screen.getByRole('button', { name: /Add/i });
    fireEvent.change(inputElement, { target: { value: 'Go for shopping' } });
    fireEvent.click(buttonElement)
    expect(inputElement.value).toBe('');
  });
});

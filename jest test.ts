import { render, screen } from '@testing-library/react';
import { DynamicForm } from './DynamicForm';
import { initialSchema } from './initialSchema'; // Import initial schema

test('renders form based on schema', () => {
  render(<DynamicForm schema={initialSchema} />);
  
  expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
});

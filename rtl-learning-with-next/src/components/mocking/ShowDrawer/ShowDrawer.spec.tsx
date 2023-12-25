import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { MyDrawer } from '../Drawer/Drawer';
import { ShowDrawer } from './ShowDrawer';

jest.mock('../Drawer/Drawer');
mocked(MyDrawer).mockImplementation(() => <div>mocked: drawer</div>);

describe('ShowDrawer', () => {
  it('renders MyDrawer', () => {
    render(<ShowDrawer />);
    expect(
      screen.queryByText('Hello Drawer Component!')
    ).not.toBeInTheDocument();
    expect(screen.getByText('mocked: drawer')).toBeInTheDocument();
  });
});

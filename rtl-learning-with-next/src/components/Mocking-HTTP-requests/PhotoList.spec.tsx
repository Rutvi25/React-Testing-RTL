import axios from 'axios';
import { mocked } from 'jest-mock';
import {
  screen,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import user from '@testing-library/user-event';
import { Photo } from '../../pages/api/photos';
import { PhotosList } from './PhotoList';
import React from 'react';

jest.mock('axios');

const mockedAxios = mocked(axios);
const mockedAxiosGet = mocked(mockedAxios.get);
const mockedAxiosPost = mocked(mockedAxios.post);

describe('PhotosList Component', () => {
  beforeEach(() => {
    mockedAxiosGet.mockResolvedValue({
      data: [
        {
          id: 1,
          thumbnailUrl: '/photo1.png',
          title: 'Hello World',
          favourite: false,
        },
      ] as Photo[],
    });
  });

  describe('When the application fully loads', () => {
    beforeEach(async () => {
      render(<PhotosList />);
      await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    });

    it('should render the photos', () => {
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    describe('When clicking the "Refresh" Button', () => {
      beforeEach(async () => {
        mockedAxiosGet.mockReset().mockResolvedValue({
          data: [
            {
              id: 1,
              thumbnailUrl: '/photo1.png',
              title: 'New Loaded Data',
              favourite: false,
            },
          ] as Photo[],
        });

        user.type(screen.getByLabelText('Your Name:'), 'Bruno');
        await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
      });

      it('should perform an HTTP call with name="Bruno"', () => {
        expect(mockedAxiosGet).toHaveBeenCalledWith('/api/photos?name=Bruno');
      });

      it('should render the newly loaded data', () => {
        expect(screen.queryByText('Hello World')).not.toBeInTheDocument();
        expect(screen.getByText('New Loaded Data')).toBeInTheDocument();
      });
    });

    describe('When clicking the "Refresh" Button and server returns an error', () => {
      beforeEach(async () => {
        mockedAxiosGet.mockReset().mockRejectedValue({
          response: {
            data: { message: 'Server says sorry!' },
          },
        });
        user.click(screen.getByText('Refresh'));
        await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
      });

      it('should render the error while keeping the old data', () => {
        expect(screen.getByText('Hello World')).toBeInTheDocument();
        expect(screen.getByText('Server says sorry!')).toBeInTheDocument();
      });
    });

    describe('When clicking the "Add to Favourites" button and changes the button text', () => {
      beforeEach(async () => {
        mockedAxiosPost.mockReset().mockResolvedValue({
          data: {
            id: 1,
            thumbnailUrl: '/photo1.png',
            title: 'New Loaded Data',
            favourite: true,
          } as Photo,
        });

        user.click(screen.getByRole('button', { name: 'Add To Favourites' }));
        await waitForElementToBeRemoved(() =>
          screen.getByRole('button', { name: 'Add To Favourites' })
        );
      });

      it('should render "Remove from Favourites"', () => {
        expect(
          screen.getByRole('button', { name: 'Remove from Favourites' })
        ).toBeInTheDocument();
        expect(
          screen.queryByRole('button', { name: 'Add to Favourites' })
        ).not.toBeInTheDocument();
      });
    });
  });
});

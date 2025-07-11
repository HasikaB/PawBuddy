import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import Index from '../index';
import { useUser } from '@clerk/clerk-expo';
import { useNavigationContainerRef } from 'expo-router';

jest.mock('@clerk/clerk-expo', () => ({
  useUser: jest.fn(),
}));

jest.mock('expo-router', () => ({
  Redirect: ({ href }) => <Text>Redirect to {href}</Text>,
  useNavigationContainerRef: jest.fn(),
}));

import { Text } from 'react-native';

describe('Index screen', () => {
  it('shows loading spinner initially', () => {
    useUser.mockReturnValue({ user: null, isLoaded: false });
    useNavigationContainerRef.mockReturnValue({ isReady: () => false });

    const { getByTestId } = render(<Index />);
    expect(getByTestId('spinner')).toBeTruthy();
  });

  it('redirects to login if not logged in', async () => {
    useUser.mockReturnValue({ user: null, isLoaded: true });
    useNavigationContainerRef.mockReturnValue({ isReady: () => true });

    const { getByText } = render(<Index />);
    await waitFor(() => expect(getByText(/Redirect to \/login/i)).toBeTruthy());
  });

  it('redirects to home if logged in', async () => {
    useUser.mockReturnValue({ user: { id: '123' }, isLoaded: true });
    useNavigationContainerRef.mockReturnValue({ isReady: () => true });

    const { getByText } = render(<Index />);
    await waitFor(() => expect(getByText(/Redirect to \/\(tabs\)\/home/i)).toBeTruthy());
  });
});

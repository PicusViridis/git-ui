import '@testing-library/jest-dom'
import React from 'react'
import { NavigateProps } from 'react-router-dom'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
  Navigate: ({ to }: NavigateProps) => <div>Navigate to {to}</div>,
  Outlet: () => <div>Outlet</div>,
}))

jest.mock('@saramorillon/hooks', () => ({
  ...jest.requireActual('@saramorillon/hooks'),
  useCopy: jest.fn(),
  usePagination: jest.fn(),
}))

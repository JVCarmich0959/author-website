import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App.jsx';

describe('App component', () => {
  it('mounts without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });
});

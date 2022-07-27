import React from 'react';
import '@testing-library/jest-dom';
import { render } from 'react-dom';
import MasterMind from '../MasterMind';

describe('Mastermind', () => {
    it('renders the component', () => {
        const container = document.createElement('div');
        render(<MasterMind />, container);
        expect(container).toMatchSnapshot();
    });
});
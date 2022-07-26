/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import '@testing-library/jest-dom';
import Modal from '../Modal';
import { render } from 'react-dom';

describe('Modal', () => {
    it('renders the (gameInfo) Modal successfully and is not active', () => {
        const setStateMocked = jest.fn();
        const useStateMock: any = (useState: any) => [useState, setStateMocked];
        jest.spyOn(React, 'useState').mockImplementation(useStateMock);
        const [showModalMock, setShowModalMock] = useStateMock(false);

        const container = document.createElement('div');
        render(<Modal setShowModal={ setShowModalMock } show={ showModalMock } gameStatus={ 0 } />, container);
        expect(container).toMatchSnapshot();
    });

    it('renders the (gameInfo) Modal successfully and is active', () => {
        const setStateMocked = jest.fn();
        const useStateMock: any = (useState: any) => [useState, setStateMocked];
        jest.spyOn(React, 'useState').mockImplementation(useStateMock);
        const [showModalMock, setShowModalMock] = useStateMock(true);

        const container = document.createElement('div');
        render(<Modal setShowModal={ setShowModalMock } show={ showModalMock } gameStatus={ 0 } />, container);
        expect(container).toMatchSnapshot();
    });
});
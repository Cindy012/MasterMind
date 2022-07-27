import React from 'react';
import '@testing-library/jest-dom';
import { render } from 'react-dom';
import Modal from '../Modal';
import GiveUpModal from '../GiveUpModal';

describe('Modal - situations:', () => {    
    it('renders the (GameInfo) Modal', () => {
        const gameStatus = 0;
        const setStateMocked = jest.fn();
        const useStateMock: any = (useState: any) => [useState, setStateMocked];
        jest.spyOn(React, 'useState').mockImplementation(useStateMock);
        const [showModalMock, setShowModalMock] = useStateMock(true);

        const container = document.createElement('div');
        render(<Modal setShowModal={ setShowModalMock } show={ showModalMock } gameStatus={ gameStatus } />, container);
        expect(container).toMatchSnapshot();
    });

    it('renders the (Not yet) Modal', () => {
        const gameStatus = 1;
        const setStateMocked = jest.fn();
        const useStateMock: any = (useState: any) => [useState, setStateMocked];
        jest.spyOn(React, 'useState').mockImplementation(useStateMock);
        const [showModalMock, setShowModalMock] = useStateMock(true);

        const container = document.createElement('div');
        render(<Modal setShowModal={ setShowModalMock } show={ showModalMock } gameStatus={ gameStatus } />, container);
        expect(container).toMatchSnapshot();
    });

    it('renders the (Winner) Modal', () => {
        const gameStatus = 2;
        const setStateMocked = jest.fn();
        const useStateMock: any = (useState: any) => [useState, setStateMocked];
        jest.spyOn(React, 'useState').mockImplementation(useStateMock);
        const [showModalMock, setShowModalMock] = useStateMock(true);

        const container = document.createElement('div');
        render(<Modal setShowModal={ setShowModalMock } show={ showModalMock } gameStatus={ gameStatus } />, container);
        expect(container).toMatchSnapshot();
    });

    it('renders the (Loser) Modal', () => {
        const gameStatus = 3;
        const setStateMocked = jest.fn();
        const useStateMock: any = (useState: any) => [useState, setStateMocked];
        jest.spyOn(React, 'useState').mockImplementation(useStateMock);
        const [showModalMock, setShowModalMock] = useStateMock(true);

        const container = document.createElement('div');
        render(<Modal setShowModal={ setShowModalMock } show={ showModalMock } gameStatus={ gameStatus } />, container);
        expect(container).toMatchSnapshot();
    });

    it('does not render the Modal successfully when gameStatus < gameStatus.length', () => {
        const gameStatus = -1;
        const setStateMocked = jest.fn();
        const useStateMock: any = (useState: any) => [useState, setStateMocked];
        jest.spyOn(React, 'useState').mockImplementation(useStateMock);
        const [showModalMock, setShowModalMock] = useStateMock(true);

        const container = document.createElement('div');
        render(<Modal setShowModal={ setShowModalMock } show={ showModalMock } gameStatus={ gameStatus } />, container);
        expect(container).toMatchSnapshot();
    });

    it('does not render the Modal successfully when gameStatus > gameStatus.length', () => {
        const gameStatus = 4;
        const setStateMocked = jest.fn();
        const useStateMock: any = (useState: any) => [useState, setStateMocked];
        jest.spyOn(React, 'useState').mockImplementation(useStateMock);
        const [showModalMock, setShowModalMock] = useStateMock(true);

        const container = document.createElement('div');
        render(<Modal setShowModal={ setShowModalMock } show={ showModalMock } gameStatus={ gameStatus } />, container);
        expect(container).toMatchSnapshot();
    });
});

describe('GiveUpModal', () => {
    it('renders the Modal', () => {
        const setStateMocked = jest.fn();
        const useStateMock: any = (useState: any) => [useState, setStateMocked];
        jest.spyOn(React, 'useState').mockImplementation(useStateMock);
        const [showGiveUpModalMock, setshowGiveUpModalMock] = useStateMock(true);

        const container = document.createElement('div');
        render(
            <GiveUpModal
                title='Stop Game'
                show={showGiveUpModalMock}
                setShowModal={setshowGiveUpModalMock}
                hideCloseButton 
                showAnswer={ function (): void {
                    throw new Error('Function not implemented.');
                }}
            />, container
        );
        expect(container).toMatchSnapshot();
    });
});
import * as React from 'react';
import '../enzymeAdapter';
import { shallow } from 'enzyme';
import Modal, { IButtonSet, IModalProps } from './Modal';

const title: JSX.Element = <div>Send Message</div>;

const titleAdvanced: JSX.Element = (
    <div>
        <div>Send Message</div>
        <div className="advanced_title">Advanced Settings</div>
    </div>
);

const initialButtons: IButtonSet = {
    primary: { name: 'Save', onClick: jest.fn() },
    secondary: { name: 'Cancel', onClick: jest.fn() }
};

const modalProps: IModalProps = {
    show: true,
    title: [title, titleAdvanced],
    buttons: initialButtons
};

const ModalShallow = shallow(<Modal {...modalProps} />);

describe('Component: Modal', () => {
    it('should render', () => {
        expect(ModalShallow).toBePresent();
        expect(ModalShallow).toHaveState('flipped', false);
    });
});

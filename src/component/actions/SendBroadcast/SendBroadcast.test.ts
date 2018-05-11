import { BroadcastMsg } from '../../../flowTypes';
import { composeComponentTestUtils } from '../../../testUtils';
import { createBroadcastMsgAction } from '../../../testUtils/assetCreators';
import SendBroadcastComp from './SendBroadcast';

describe('SendBroadcastComp', () => {
    const baseProps: BroadcastMsg = createBroadcastMsgAction();
    const { setup } = composeComponentTestUtils(SendBroadcastComp, baseProps);

    describe('render', () => {
        it('should render with contacts', () => {
            const { wrapper } = setup(true, {
                $merge: {
                    groups: [],
                    contacts: [
                        { uuid: 'contact-1', name: 'Norbert Kwizera' },
                        { uuid: 'contact-2', name: 'Kellan Alexander' }
                    ]
                }
            });
            expect(wrapper.html()).toContain('Kellan Alexander');
            expect(wrapper.html()).toMatchSnapshot('contacts');
        });

        it('should render with groups', () => {
            const { wrapper } = setup(true, {
                $merge: {
                    contacts: [],
                    groups: [
                        { uuid: 'group-1', name: 'Cat Facts' },
                        { uuid: 'group-2', name: 'Cat Fanciers' }
                    ]
                }
            });
            expect(wrapper.html()).toContain('Cat Fanciers');
            expect(wrapper.html()).toMatchSnapshot('groups');
        });

        it('should render a long list of both', () => {
            const { wrapper } = setup(true, {
                $merge: {
                    contacts: [
                        { uuid: 'contact-1', name: 'Norbert Kwizera' },
                        { uuid: 'contact-2', name: 'Kellan Alexander' },
                        { uuid: 'contact-3', name: 'Rowan Seymour' }
                    ],
                    groups: [
                        { uuid: 'group-1', name: 'Cat Facts' },
                        { uuid: 'group-2', name: 'Cat Fanciers' }
                    ]
                }
            });
            expect(wrapper.html()).toContain('...');
            expect(wrapper.html()).toMatchSnapshot('ellipsized');
        });

        it('should render placeholder if missing text', () => {
            const { wrapper } = setup(true, {
                $merge: {
                    text: null
                }
            });
            expect(wrapper.html()).toContain('Send a message to the contact');
            expect(wrapper.html()).toMatchSnapshot('placeholder text');
        });
    });
});
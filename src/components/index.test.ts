import {
    composeComponentTestUtils,
    configProviderContext,
    getSpecWrapper,
    setMock
} from '~/testUtils';
import { English, languages } from '~/testUtils/assetCreators';
import { set, setTrue } from '~/utils';

import { editorContainerSpecId, editorSpecId, FlowEditor, FlowEditorStoreProps } from '.';

const colorsFlow = require('~/test/flows/colors.json');

const baseProps: FlowEditorStoreProps = {
    language: English,
    languages,
    translating: false,
    fetchingFlow: false,
    definition: null,
    dependencies: null,
    fetchFlow: jest.fn()
};

const { setup, spyOn } = composeComponentTestUtils(FlowEditor, baseProps);

describe('Root', () => {
    const definition = require('~/test/flows/boring.json');

    describe('render', () => {
        it('should render self, children with required props', () => {
            const { wrapper } = setup();
            const editorContainer = getSpecWrapper(wrapper, editorContainerSpecId);
            const editor = getSpecWrapper(wrapper, editorSpecId);

            expect(editorContainer.hasClass('translating')).toBeFalsy();
            expect(editor.hasClass('editor')).toBeTruthy();
            expect(wrapper.find('Connect(LanguageSelector)').exists()).toBeTruthy();
            expect(wrapper).toMatchSnapshot();
        });

        it('should apply translating style if passed a truthy translating prop', () => {
            const { wrapper } = setup(true, { translating: setTrue() });
            const editorContainer = getSpecWrapper(wrapper, editorContainerSpecId);

            expect(editorContainer.hasClass('translating')).toBeTruthy();
            expect(wrapper).toMatchSnapshot();
        });

        it('should render flow if passed a definition, language', () => {
            const { wrapper } = setup(true, {
                language: set(English),
                definition: set(colorsFlow)
            });

            expect(wrapper.find('Connect(Flow)').exists()).toBeTruthy();
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('instance methods', () => {
        describe('componentDidMount', () => {
            it('should be called after component is mounted', () => {
                const componentDidMountSpy = spyOn('componentDidMount');
                const { wrapper } = setup();

                expect(componentDidMountSpy).toHaveBeenCalledTimes(1);

                componentDidMountSpy.mockRestore();
            });

            it('should call action creators', () => {
                const { wrapper, props } = setup(true, {
                    updateLanguage: setMock(),
                    fetchFlow: setMock(),
                    fetchFlows: setMock()
                });

                expect(props.fetchFlow).toHaveBeenCalledTimes(1);
                expect(props.fetchFlow).toHaveBeenCalledWith(
                    configProviderContext.assetService,
                    configProviderContext.flow
                );
            });
        });
    });
});
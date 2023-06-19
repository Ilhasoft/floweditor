import * as React from 'react';
import { renderAssetList } from 'components/flow/actions/helpers';
import { fakePropType } from 'config/ConfigProvider';
import { StartFlow } from 'flowTypes';
import { AssetType } from 'store/flowContext';
import styles from './StartFlow.module.scss';
import { applyVueInReact } from 'vuereact-combined';
// @ts-ignore
import { unnnicIcon } from '@weni/unnnic-system';

const UnnnicIcon = applyVueInReact(unnnicIcon);

const StartFlowComp: React.SFC<StartFlow> = (
  { flow: { name, uuid } },
  context: any
): JSX.Element => (
  <div className={styles.start_flow}>
    <UnnnicIcon icon="hierarchy-3-2" size="xs" className={styles.icon} />
    {renderAssetList([{ name, id: uuid, type: AssetType.Flow }], 3, context.config.endpoints)}
  </div>
);

StartFlowComp.contextTypes = {
  config: fakePropType
};

export default StartFlowComp;

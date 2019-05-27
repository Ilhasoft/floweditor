import * as React from 'react';
import { createClickHandler } from 'utils';

import styles from './TitleBar.module.scss';

export interface TitleBarProps {
  title: string;
  onRemoval(event: React.MouseEvent<HTMLElement>): any;
  __className?: string;
  showRemoval?: boolean;
  showMove?: boolean;
  onMoveUp?(event: React.MouseEvent<HTMLElement>): any;
  shouldCancelClick?: () => boolean;
}

interface TitleBarState {
  confirmingRemoval: boolean;
}

export const confirmationTime = 2000;

export const titlebarContainerSpecId = 'titlebar-container';
export const titlebarSpecId = 'titlebar';
export const moveIconSpecId = 'move-icon';
export const moveSpecId = 'move';
export const removeIconSpecId = 'remove-icon';
export const confirmationSpecId = 'confirmation';
export const confirmRemovalSpecId = 'confirm-removal';

/**
 * Simple title bar with confirmation removal
 */
export default class TitleBar extends React.Component<TitleBarProps, TitleBarState> {
  private confirmationTimeout: number;

  constructor(props: TitleBarProps) {
    super(props);

    this.state = {
      confirmingRemoval: false
    };

    this.handleConfirmRemoval = this.handleConfirmRemoval.bind(this);
  }

  public componentWillUnmount(): void {
    if (this.confirmationTimeout) {
      window.clearTimeout(this.confirmationTimeout);
    }
  }

  public handleMouseUpCapture(event: React.MouseEvent<HTMLElement>): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  public handleConfirmRemoval(event: React.MouseEvent<HTMLElement>): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.setState({
      confirmingRemoval: true
    });

    this.confirmationTimeout = window.setTimeout(
      () =>
        this.setState({
          confirmingRemoval: false
        }),
      confirmationTime
    );
  }

  private getMoveArrow(): JSX.Element {
    let moveArrow: JSX.Element = null;

    if (this.props.showMove) {
      moveArrow = (
        <div
          className={styles.up_button}
          {...createClickHandler(
            this.props.onMoveUp,
            this.props.shouldCancelClick,
            this.handleMouseUpCapture
          )}
          data-testid={moveIconSpecId}
        >
          <span className="fe-arrow-up" />
        </div>
      );
    } else {
      moveArrow = <div className={styles.up_button} data-spec={moveSpecId} />;
    }

    return moveArrow;
  }

  private getRemove(): JSX.Element {
    let remove: JSX.Element = null;

    if (this.props.showRemoval) {
      remove = (
        <div
          className={styles.remove_button}
          {...createClickHandler(
            this.handleConfirmRemoval,
            this.props.shouldCancelClick,
            this.handleMouseUpCapture
          )}
          data-testid={removeIconSpecId}
        >
          <span className="fe-x" />
        </div>
      );
    }

    return remove;
  }

  private getConfirmationEl(): JSX.Element {
    let confirmation: JSX.Element;

    if (this.state.confirmingRemoval) {
      confirmation = (
        <div className={styles.remove_confirm} data-spec={confirmationSpecId}>
          <div
            className={styles.remove_button}
            {...createClickHandler(
              this.props.onRemoval,
              this.props.shouldCancelClick,
              this.handleMouseUpCapture
            )}
            data-testid={confirmRemovalSpecId}
          >
            <span className="fe-x" />
          </div>
          Remove?
        </div>
      );
    }

    return confirmation;
  }

  public render(): JSX.Element {
    const confirmation: JSX.Element = this.getConfirmationEl();
    const moveArrow: JSX.Element = this.getMoveArrow();
    const remove: JSX.Element = this.getRemove();
    return (
      <div className={styles.titlebar} data-spec={titlebarContainerSpecId}>
        <div className={`${this.props.__className} ${styles.normal}`} data-spec={titlebarSpecId}>
          {moveArrow}
          {remove}
          {this.props.title}
        </div>
        {confirmation}
      </div>
    );
  }
}

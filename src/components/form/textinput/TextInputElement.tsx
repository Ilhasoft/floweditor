import { react as bindCallbacks } from 'auto-bind';
import { FormElementProps } from 'components/form/FormElement';
import * as React from 'react';
import { StringEntry } from 'store/nodeEditor';
import { applyVueInReact } from 'vuereact-combined';

// @ts-ignore
import { unnnicTextArea } from '@weni/unnnic-system';

export enum Count {
  SMS = 'SMS'
}

export enum TextInputStyle {
  small = 'small',
  medium = 'medium',
  normal = 'normal'
}

export enum TextInputSizes {
  sm = 'sm',
  md = 'md'
}

export interface TextInputProps extends FormElementProps {
  entry?: StringEntry;
  __className?: string;
  count?: Count;
  textarea?: boolean;
  placeholder?: string;
  autocomplete?: boolean;
  focus?: boolean;
  showInvalid?: boolean;
  maxLength?: number;
  counter?: string;
  style?: TextInputStyle;
  size?: TextInputSizes;
  onChange?: (value: string, name?: string) => void;
  onBlur?: (event: React.ChangeEvent) => void;
}

const UnnnicTextArea = applyVueInReact(unnnicTextArea);

export default class TextInputElement extends React.Component<TextInputProps> {
  constructor(props: TextInputProps) {
    super(props);

    let initial = '';
    if (this.props.entry && this.props.entry.value) {
      initial = this.props.entry.value;
    }

    this.state = {
      value: initial
    };

    bindCallbacks(this, {
      include: [/^on/, /Ref$/, 'setSelection', 'validate', /^has/, /^handle/]
    });
  }

  public componentDidMount(): void {
    // return this.props.focus && this.focusInput();
  }

  public handleChange({ currentTarget: { value } }: any): void {
    if (this.props.onChange) {
      this.props.onChange(value, this.props.name);
    }
  }

  public render(): JSX.Element {
    const optional: any = {};
    if (this.props.textarea) {
      optional['textarea'] = true;
    }

    if (this.props.counter) {
      optional['counter'] = this.props.counter;
    }

    return (
      <>
        <UnnnicTextArea
          value={this.props.entry.value}
          on={{
            input: (value: string) => this.handleChange({ currentTarget: { value } })
          }}
          label={this.props.showLabel ? this.props.name : null}
          maxLength={this.props.maxLength}
          size={this.props.size || TextInputSizes.sm}
        />

        {this.props.helpText}
      </>
    );
  }
}

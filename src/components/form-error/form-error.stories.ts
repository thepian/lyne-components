import type { InputType } from '@storybook/types';
import type { Meta, StoryContext, StoryObj, Args, ArgTypes } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { sbbSpread } from '../core/dom';

import readme from './readme.md?raw';
import '../icon';
import './form-error';

const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color': context.args.negative
    ? 'var(--sbb-color-black-default)'
    : 'var(--sbb-color-white-default)',
});

const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim elit, ultricies in tincidunt
quis, mattis eu quam. Nulla sit amet lorem fermentum, molestie nunc ut, hendrerit risus. Vestibulum rutrum elit et
lacus sollicitudin, quis malesuada lorem vehicula. Suspendisse at augue quis tellus vulputate tempor. Vivamus urna
velit, varius nec est ac, mollis efficitur lorem. Quisque non nisl eget massa interdum tempus. Praesent vel feugiat
metus. Donec pharetra odio at turpis bibendum, vel commodo dui vulputate. Aenean congue nec nisl vel bibendum.
Praesent sit amet lorem augue. Suspendisse ornare a justo sagittis fermentum.`;

const TemplateError = ({ errorText, ...args }: Args): TemplateResult => html`
  <sbb-form-error ${sbbSpread(args)}>${errorText}</sbb-form-error>
`;

const TemplateErrorWithIcon = ({ errorText, iconName, ...args }: Args): TemplateResult => html`
  <sbb-form-error ${sbbSpread(args)}>
    <sbb-icon name=${iconName} slot="icon"></sbb-icon>
    ${errorText}
  </sbb-form-error>
`;

const iconNameArg: InputType = {
  control: {
    type: 'text',
  },
};
const errorTextArg: InputType = {
  control: {
    type: 'text',
  },
};

const negativeArg: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  iconName: iconNameArg,
  errorText: errorTextArg,
  negative: negativeArg,
};

const defaultArgs: Args = {
  iconName: undefined,
  errorText: 'Required field.',
  negative: false,
};

export const Error: StoryObj = {
  render: TemplateError,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const ErrorNegative: StoryObj = {
  render: TemplateError,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
};

export const ErrorWithCustomIconAndLongMessage: StoryObj = {
  render: TemplateErrorWithIcon,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    errorText: longText,
    iconName: 'chevron-small-right-small',
  },
};

const meta: Meta = {
  decorators: [
    (story, context) => html`
      <div style=${styleMap({ ...wrapperStyle(context), padding: '2rem' })}>${story()}</div>
    `,
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-form-field/sbb-form-error',
};

export default meta;

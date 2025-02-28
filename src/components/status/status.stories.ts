import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../core/dom';

import readme from './readme.md?raw';

import './status';

const type: InputType = {
  control: {
    type: 'select',
  },
  options: ['info', 'success', 'warning', 'error'],
};

const titleContent: InputType = {
  control: {
    type: 'text',
  },
};

const text: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  type,
  'title-content': titleContent,
  text,
};

const defaultArgs: Args = {
  type: 'info',
  'title-content': undefined,
  text: 'Status info text',
};

const Template = ({ text, ...args }: Args): TemplateResult => html`
  <sbb-status ${sbbSpread(args)}> ${text}</sbb-status>
`;

export const info: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const success: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, type: 'success' },
};

export const warning: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, type: 'warning' },
};

export const error: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, type: 'error' },
};

export const infoWithTitle: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'title-content': 'Title' },
};

export const successWithTitle: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, type: 'success', 'title-content': 'Success!' },
};

export const warningWithTitle: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, type: 'warning', 'title-content': 'Warning!' },
};

export const errorWithTitle: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, type: 'error', 'title-content': 'Error!' },
};

const meta: Meta = {
  decorators: [
    (story) => html` <div style="padding: 2rem;">${story()}</div> `,
    withActions as Decorator,
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-status',
};

export default meta;

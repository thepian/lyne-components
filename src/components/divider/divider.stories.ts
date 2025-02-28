import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args, StoryContext } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { sbbSpread } from '../core/dom';

import readme from './readme.md?raw';
import './divider';

const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color': context.args.negative
    ? 'var(--sbb-color-charcoal-default)'
    : 'var(--sbb-color-white-default)',
});

const Template = (args): TemplateResult => html`
  <div style=${styleMap({ height: '340px', padding: '20px' })}>
    <sbb-divider ${sbbSpread(args)}></sbb-divider>
  </div>
`;

const orientation: InputType = {
  control: {
    type: 'select',
  },
  options: ['horizontal', 'vertical'],
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Appearance',
  },
};

const defaultArgTypes: ArgTypes = {
  orientation,
  negative,
};

const defaultArgs: Args = {
  orientation: orientation.options[0],
  negative: false,
};

export const dividerHorizontal: StoryObj = {
  render: Template,
  args: { ...defaultArgs },
  argTypes: defaultArgTypes,
};

export const dividerVertical: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    orientation: 'vertical',
  },
};

export const dividerNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    negative: true,
  },
};

const meta: Meta = {
  decorators: [
    (story, context) => html` <div style=${styleMap(wrapperStyle(context))}>${story()}</div> `,
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-divider',
};

export default meta;

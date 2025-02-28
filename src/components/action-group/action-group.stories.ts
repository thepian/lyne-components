import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { sbbSpread } from '../core/dom';

import readme from './readme.md?raw';
import './action-group';
import '../link';
import '../button';

const secondaryButtonTemplate = (alignSelf): TemplateResult => html`
  <sbb-button align-self=${alignSelf} variant="secondary"> Button 1 </sbb-button>
`;

const buttonTemplate = (alignSelf): TemplateResult => html`
  <sbb-button align-self=${alignSelf}>Button 2</sbb-button>
`;

const linkTemplate = (alignSelf): TemplateResult => html`
  <sbb-link
    align-self=${alignSelf}
    icon-name="chevron-small-left-small"
    href="https://github.com/lyne-design-system/lyne-components"
  >
    Link
  </sbb-link>
`;

const TemplateTwoElements = (alignSelfFirst?, alignSelfSecond?): TemplateResult => html`
  ${secondaryButtonTemplate(alignSelfFirst)} ${buttonTemplate(alignSelfSecond)}
`;

const TemplateThreeElements = (
  alignSelfFirst?,
  alignSelfSecond?,
  alignSelfThird?,
): TemplateResult => html`
  ${TemplateTwoElements(alignSelfFirst, alignSelfSecond)} ${linkTemplate(alignSelfThird)}
`;

const CommonTemplateThreeElementsAllocation = ({ ...args }): TemplateResult => html`
  <sbb-action-group ${sbbSpread(args)}>${TemplateThreeElements()}</sbb-action-group>
`;

const CommonTemplateTwoElementsAllocation = ({ ...args }): TemplateResult => html`
  <sbb-action-group ${sbbSpread(args)}>${TemplateTwoElements()}</sbb-action-group>
`;

const TemplateHorizontalAllocation111 = ({ ...args }): TemplateResult => html`
  <sbb-action-group ${sbbSpread(args)}>${TemplateThreeElements(null, 'center')}</sbb-action-group>
`;

const TemplateHorizontalAllocation201 = ({ ...args }): TemplateResult => html`
  <sbb-action-group ${sbbSpread(args)}
    >${TemplateThreeElements(null, null, 'end')}</sbb-action-group
  >
`;

const TemplateHorizontalAllocation102 = ({ ...args }): TemplateResult => html`
  <sbb-action-group ${sbbSpread(args)}>${TemplateThreeElements('start')}</sbb-action-group>
`;

const TemplateHorizontalAllocation101 = ({ ...args }): TemplateResult => html`
  <sbb-action-group ${sbbSpread(args)}>${TemplateTwoElements(null, 'end')}</sbb-action-group>
`;

const TemplateVerticalAllocation300FullWidth = ({ ...args }): TemplateResult => html`
  <sbb-action-group ${sbbSpread(args)}
    >${TemplateThreeElements(null, null, 'start')}</sbb-action-group
  >
`;

const TemplateVerticalAllocation030FullWidth = ({ ...args }): TemplateResult => html`
  <sbb-action-group ${sbbSpread(args)}
    >${TemplateThreeElements(null, null, 'center')}</sbb-action-group
  >
`;

const TemplateVerticalAllocation003FullWidth = ({ ...args }): TemplateResult => html`
  <sbb-action-group ${sbbSpread(args)}
    >${TemplateThreeElements(null, null, 'end')}</sbb-action-group
  >
`;

const buttonSize: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['l', 'm'],
};

const linkSize: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's', 'xs'],
};

const orientation: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['horizontal', 'vertical'],
};

const horizontalFrom: InputType = {
  control: {
    type: 'select',
  },
  options: ['unset', 'zero', 'micro', 'small', 'medium', 'large', 'wide', 'ultra'],
};

const alignGroup: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['start', 'center', 'stretch', 'end'],
};

const basicArgTypes: ArgTypes = {
  'align-group': alignGroup,
  orientation,
  'horizontal-from': horizontalFrom,
  'button-size': buttonSize,
  'link-size': linkSize,
};

const basicArgs: Args = {
  'align-group': 'start',
  orientation: 'horizontal',
  'horizontal-from': 'unset',
  'button-size': buttonSize.options[0],
  'link-size': linkSize.options[0],
};

const basicArgsVertical = {
  ...basicArgs,
  orientation: 'vertical',
};

const basicArgsVerticalFullWidth = {
  ...basicArgsVertical,
  'align-group': 'stretch',
};

export const HorizontalAllocation3_0_0: StoryObj = {
  render: CommonTemplateThreeElementsAllocation,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const HorizontalAllocation1_1_1: StoryObj = {
  render: TemplateHorizontalAllocation111,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const HorizontalAllocation2_0_1: StoryObj = {
  render: TemplateHorizontalAllocation201,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const HorizontalAllocation1_0_2: StoryObj = {
  render: TemplateHorizontalAllocation102,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'align-group': 'end' },
};

export const HorizontalAllocation2_0_0: StoryObj = {
  render: CommonTemplateTwoElementsAllocation,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const HorizontalAllocation1_0_1: StoryObj = {
  render: TemplateHorizontalAllocation101,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const VerticalAllocation3_0_0: StoryObj = {
  render: CommonTemplateThreeElementsAllocation,
  argTypes: basicArgTypes,
  args: { ...basicArgsVertical, 'align-group': 'start' },
};

export const VerticalAllocation2_0_0: StoryObj = {
  render: CommonTemplateTwoElementsAllocation,
  argTypes: basicArgTypes,
  args: { ...basicArgsVertical, 'align-group': 'start' },
};

export const VerticalAllocation0_3_0: StoryObj = {
  render: CommonTemplateThreeElementsAllocation,
  argTypes: basicArgTypes,
  args: { ...basicArgsVertical, 'align-group': 'center' },
};

export const VerticalAllocation0_2_0: StoryObj = {
  render: CommonTemplateTwoElementsAllocation,
  argTypes: basicArgTypes,
  args: { ...basicArgsVertical, 'align-group': 'center' },
};

export const VerticalAllocation0_0_3: StoryObj = {
  render: CommonTemplateThreeElementsAllocation,
  argTypes: basicArgTypes,
  args: { ...basicArgsVertical, 'align-group': 'end' },
};

export const VerticalAllocation0_0_2: StoryObj = {
  render: CommonTemplateTwoElementsAllocation,
  argTypes: basicArgTypes,
  args: { ...basicArgsVertical, 'align-group': 'end' },
};

export const VerticalAllocation3_0_0FullWidth: StoryObj = {
  render: TemplateVerticalAllocation300FullWidth,
  argTypes: basicArgTypes,
  args: { ...basicArgsVerticalFullWidth },
};

export const VerticalAllocation2_0_0FullWidth: StoryObj = {
  render: CommonTemplateTwoElementsAllocation,
  argTypes: basicArgTypes,
  args: { ...basicArgsVerticalFullWidth },
};

export const VerticalAllocation0_3_0FullWidth: StoryObj = {
  render: TemplateVerticalAllocation030FullWidth,
  argTypes: basicArgTypes,
  args: { ...basicArgsVerticalFullWidth },
};

export const VerticalAllocation0_2_0FullWidth: StoryObj = {
  render: CommonTemplateTwoElementsAllocation,
  argTypes: basicArgTypes,
  args: { ...basicArgsVerticalFullWidth },
};

export const VerticalAllocation0_0_3FullWidth: StoryObj = {
  render: TemplateVerticalAllocation003FullWidth,
  argTypes: basicArgTypes,
  args: { ...basicArgsVerticalFullWidth },
};

export const VerticalAllocation0_0_2FullWidth: StoryObj = {
  render: CommonTemplateTwoElementsAllocation,
  argTypes: basicArgTypes,
  args: { ...basicArgsVerticalFullWidth },
};

export const VerticalToHorizontal3_0_0: StoryObj = {
  render: CommonTemplateThreeElementsAllocation,
  argTypes: basicArgTypes,
  args: { ...basicArgsVertical, 'horizontal-from': 'medium' },
};

const meta: Meta = {
  decorators: [
    (story) => html` <div style=${styleMap({ padding: '2rem' })}>${story()}</div> `,
    withActions as Decorator,
  ],
  parameters: {
    actions: {
      handles: ['click'],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-action-group',
};

export default meta;

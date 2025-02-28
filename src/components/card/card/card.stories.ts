import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type {
  Meta,
  StoryObj,
  ArgTypes,
  Args,
  Decorator,
  StoryContext,
} from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { sbbSpread } from '../../core/dom';

import readme from './readme.md?raw';
import './card';
import '../card-badge';
import '../card-action';
import '../../title';

const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color':
    context.args.color === 'white' || context.args.color === 'transparent-bordered-dashed'
      ? 'var(--sbb-color-milk-default)'
      : context.args.color === 'milk'
        ? 'var(--sbb-color-white-default)'
        : '--sbb-color-platinum-default',
});

const ContentText = (): TemplateResult => html`
  <span class="sbb-text-m">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porttitor blandit odio, ut
    blandit libero cursus vel. Nunc eu congue mauris. Quisque sed facilisis leo. Curabitur
    malesuada, nibh ac blandit vehicula, urna sem scelerisque magna, sed tincidunt neque arcu ac
    justo.
  </span>
`;

const Content = (): TemplateResult => html`
  <sbb-title level="4">Example text</sbb-title>
  ${ContentText()}
`;

const Template = ({ size, color }: Args): TemplateResult => html`
  <sbb-card ${sbbSpread({ size, color })}> ${Content()} </sbb-card>
`;

const TemplateWithBadge = ({ size, color }: Args): TemplateResult => html`
  <sbb-card ${sbbSpread({ size, color })}>
    <sbb-card-badge>
      <span>%</span>
      <span>from CHF</span>
      <span>19.99</span>
    </sbb-card-badge>
    ${Content()}
  </sbb-card>
`;

const TemplateCardAction = ({ size, color, label, ...args }: Args): TemplateResult => html`
  <sbb-card ${sbbSpread({ size, color })}>
    <sbb-card-action ${sbbSpread(args)}>${label}</sbb-card-action>
    ${Content()}
  </sbb-card>
`;

const TemplateCardActionFixedHeight = ({
  size,
  color,
  label,
  ...args
}: Args): TemplateResult => html`
  <sbb-card ${sbbSpread({ size, color })} style=${styleMap({ height: '250px' })}>
    <sbb-card-action ${sbbSpread(args)}>${label}</sbb-card-action>
    ${Content()}
  </sbb-card>
`;

const TemplateCardActionWithBadge = ({ size, color, label, ...args }: Args): TemplateResult => html`
  <sbb-card ${sbbSpread({ size, color })}>
    <sbb-card-action ${sbbSpread(args)}>${label}</sbb-card-action>
    <sbb-card-badge>
      <span>%</span>
      <span>from CHF</span>
      <span>19.99</span>
    </sbb-card-badge>
    ${Content()}
  </sbb-card>
`;

const TemplateCardActionMultipleCards = (args): TemplateResult => html`
  <div style=${styleMap({ display: 'flex', gap: '1rem' })}>
    ${TemplateCardActionWithBadge(args)} ${TemplateCardActionWithBadge({ ...args, active: true })}
    ${TemplateCardActionWithBadge(args)} ${TemplateCardActionWithBadge(args)}
  </div>
`;

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'],
};

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['white', 'milk', 'transparent-bordered', 'transparent-bordered-dashed'],
};

const active: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Card Action',
  },
};

const label: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Card Action',
  },
};

const hrefs = ['https://www.sbb.ch', 'https://github.com/lyne-design-system/lyne-components'];
const href: InputType = {
  options: Object.keys(hrefs),
  mapping: hrefs,
  control: {
    type: 'select',
    labels: {
      0: 'sbb.ch',
      1: 'GitHub Lyne Components',
    },
  },
  table: {
    category: 'Card Action Link',
  },
};

const download: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Card Action Link',
  },
};

const target: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Card Action Link',
  },
};

const rel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Card Action Link',
  },
};

const name: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Card Action Button',
  },
};

const type: InputType = {
  control: {
    type: 'select',
  },
  options: ['button', 'reset', 'submit'],
  table: {
    category: 'Card Action Button',
  },
};

const form: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Card Action Button',
  },
};

const value: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Card Action Button',
  },
};

const defaultArgTypes: ArgTypes = {
  size,
  color,
};

const defaultArgTypesAction: ArgTypes = {
  ...defaultArgTypes,
  active,
  label,
  href,
  download,
  target,
  rel,
  name,
  type,
  form,
  value,
};

const defaultArgs: Args = {
  size: 'm',
  color: color.options[0],
};

const defaultArgsAction = {
  ...defaultArgs,
  active: false,
  label: 'Click this card to follow the action.',
  href: href.options[1],
  download: false,
  target: '_blank',
  rel: undefined,
  name: undefined,
  type: undefined,
  form: undefined,
  value: undefined,
};

const defaultArgsButton = {
  ...defaultArgsAction,
  href: undefined,
  download: undefined,
  target: undefined,
  name: 'Button name',
  type: type.options[0],
  form: 'form-name',
  value: 'Value',
};

export const ColorWhite: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

export const ColorMilk: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    color: color.options[1],
  },
};

export const ColorTransparent: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    color: color.options[2],
  },
};

export const ColorTransparentBorderedDashed: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    color: color.options[3],
  },
};

export const SizeXS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options[0],
  },
};

export const SizeS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options[1],
  },
};

export const SizeM: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options[2],
  },
};

export const SizeL: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options[3],
  },
};

export const SizeXL: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options[4],
  },
};

export const SizeXXL: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options[5],
  },
};

export const SizeXXXL: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options[6],
  },
};

export const SizeMWithBadge: StoryObj = {
  render: TemplateWithBadge,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options[2],
  },
};

export const SizeLWithBadge: StoryObj = {
  render: TemplateWithBadge,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options[3],
  },
};

export const SizeXLWithBadge: StoryObj = {
  render: TemplateWithBadge,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options[4],
  },
};

export const SizeXXLWithBadge: StoryObj = {
  render: TemplateWithBadge,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options[5],
  },
};

export const SizeXXXLWithBadge: StoryObj = {
  render: TemplateWithBadge,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options[6],
  },
};

export const Link: StoryObj = {
  render: TemplateCardAction,
  argTypes: defaultArgTypesAction,
  args: { ...defaultArgsAction },
};

export const Button: StoryObj = {
  render: TemplateCardAction,
  argTypes: defaultArgTypesAction,
  args: { ...defaultArgsButton },
};

export const ButtonActive: StoryObj = {
  render: TemplateCardAction,
  argTypes: defaultArgTypesAction,
  args: { ...defaultArgsButton, active: true },
};

export const ButtonActiveMilk: StoryObj = {
  render: TemplateCardAction,
  argTypes: defaultArgTypesAction,
  args: {
    ...defaultArgsButton,
    color: color.options[1],
    active: true,
  },
};

export const ButtonActiveTransparentBordered: StoryObj = {
  render: TemplateCardAction,
  argTypes: defaultArgTypesAction,
  args: {
    ...defaultArgsButton,
    color: color.options[2],
    active: true,
  },
};

export const ButtonActiveTransparentBorderedDashed: StoryObj = {
  render: TemplateCardAction,
  argTypes: defaultArgTypesAction,
  args: {
    ...defaultArgsButton,
    color: color.options[3],
    active: true,
  },
};

export const ButtonWithSbbBadge: StoryObj = {
  render: TemplateCardActionWithBadge,
  argTypes: defaultArgTypesAction,
  args: { ...defaultArgsButton },
};

export const LinkWithSbbBadge: StoryObj = {
  render: TemplateCardActionWithBadge,
  argTypes: defaultArgTypesAction,
  args: { ...defaultArgsAction },
};

export const LinkActiveWithSbbBadge: StoryObj = {
  render: TemplateCardActionWithBadge,
  argTypes: defaultArgTypesAction,
  args: { ...defaultArgsAction, active: true },
};

export const FixedHeight: StoryObj = {
  render: TemplateCardActionFixedHeight,
  argTypes: defaultArgTypesAction,
  args: { ...defaultArgsButton },
};

export const Multiple: StoryObj = {
  render: TemplateCardActionMultipleCards,
  argTypes: defaultArgTypesAction,
  args: { ...defaultArgsAction },
};

const meta: Meta = {
  decorators: [
    (story, context) => html`
      <div style=${styleMap({ ...wrapperStyle(context), padding: '2rem' })}>${story()}</div>
    `,
    withActions as Decorator,
  ],
  parameters: {
    actions: {
      handles: ['click'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-card/sbb-card',
};

export default meta;

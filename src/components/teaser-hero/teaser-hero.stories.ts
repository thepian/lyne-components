import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../core/dom';
import sampleImages from '../core/images';

import readme from './readme.md?raw';
import './teaser-hero';

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'link',
  },
};

const hrefs: string[] = [
  'https://www.sbb.ch',
  'https://github.com/lyne-design-system/lyne-components',
];
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
    category: 'Link',
  },
};

const rel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'link',
  },
};

const target: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'link',
  },
};

const content: InputType = {
  control: {
    type: 'text',
  },
};

const linkContent: InputType = {
  control: {
    type: 'text',
  },
};

const imageSrc: InputType = {
  control: {
    type: 'text',
  },
};

const imageAlt: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  'aria-label': ariaLabel,
  href,
  rel,
  target,
  content,
  'link-content': linkContent,
  'image-src': imageSrc,
  'image-alt': imageAlt,
};

const defaultArgs: Args = {
  'aria-label': undefined,
  href: href.options[0],
  rel: undefined,
  target: undefined,
  content: 'Break out and explore castles and palaces.',
  'link-content': 'Find out more',
  'image-src': sampleImages[1],
  'image-alt': 'SBB CFF FFS Employee',
};

const TemplateSbbTeaserHeroDefault = ({ content, ...args }: Args): TemplateResult => html`
  <sbb-teaser-hero ${sbbSpread(args)}>${content}</sbb-teaser-hero>
`;

const TemplateSbbTeaserWithSlots = ({
  content,
  'link-content': linkContent,
  'image-src': imageSrc,
  'image-alt': imageAlt,
  ...args
}): TemplateResult => html`
  <sbb-teaser-hero ${sbbSpread(args)}>
    ${content}
    <span slot="link-content">${linkContent}</span>
    <sbb-image slot="image" image-src=${imageSrc} alt=${imageAlt}></sbb-image>
  </sbb-teaser-hero>
`;

export const defaultTeaser: StoryObj = {
  render: TemplateSbbTeaserHeroDefault,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

export const openInNewWindow: StoryObj = {
  render: TemplateSbbTeaserHeroDefault,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    target: '_blank',
  },
};

export const withSlots: StoryObj = {
  render: TemplateSbbTeaserWithSlots,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

const meta: Meta = {
  decorators: [
    (story) => html` <div style="padding: 1em;">${story()}</div> `,
    withActions as Decorator,
  ],
  parameters: {
    chromatic: { diffThreshold: 0.11, delay: 5000 },
    actions: {
      handles: ['click'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'components/sbb-teaser/sbb-teaser-hero',
};

export default meta;

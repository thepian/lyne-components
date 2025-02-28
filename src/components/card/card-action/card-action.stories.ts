import type { Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import readme from './readme.md?raw';

import '../card';

const Template = (): TemplateResult => html`
  <sbb-card color="milk">
    'sbb-card-action' is an invisible action element. See 'sbb-card' examples to see it in action.
  </sbb-card>
`;

export const SbbCardActionElement: StoryObj = {
  render: Template,
};

const meta: Meta = {
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-card/sbb-card-action',
};

export default meta;

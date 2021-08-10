import events from './lyne-cta-button.events.ts';
import { h } from 'jsx-dom';

const variants = {
  control: {
    type: 'select'
  },
  options: [
    'primary',
    'primary-negative',
    'secondary',
    'secondary-negative',
    'tertiary',
    'tertiary-negative',
    'transparent',
    'transparent-negative'
  ]
};

export const button = (args) => <lyne-cta-button
  {...args}
/>;

button.argTypes = {
  disabled: false,
  variant: variants
};

button.args = {
  disabled: false,
  label: 'Label',
  variant: variants.options[0]
};

export default {
  parameters: {
    actions: {
      handles: [events.click]
    },
    chromatic: {
      delay: 1000,
      viewports: [
        320,
        764,
        1201
      ]
    }
  },
  title: 'Button'
};

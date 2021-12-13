import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './lyne-timetable-cus-him.sample-data';

const Template = (args) => (
  <lyne-timetable-cus-him
    config={JSON.stringify(args.config)}
    role={
      args.gridCellRole
        ? 'gridcell'
        : 'none'
    }
    variant={args.variant}
  >
  </lyne-timetable-cus-him>
);

const gridCellRole = {
  control: {
    type: 'boolean'
  }
};

const config = {
  table: {
    disable: false
  }
};

const variant = {
  control: {
    type: 'select'
  },
  options: [
    'first-level-list',
    'second-level-list',
    'second-level-message'
  ]
};

const defaultArgTypes = {
  config,
  gridCellRole,
  variant
};

const defaultArgs = {
  gridCellRole: true,
  variant: variant.options[0]
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const CusHimFirstLevelList = Template.bind({});

CusHimFirstLevelList.argTypes = defaultArgTypes;
CusHimFirstLevelList.args = {
  ...defaultArgs,
  config: sampleData[1]
};

CusHimFirstLevelList.documentation = {
  title: 'CUS/HIM Icon First Level List'
};

export const CusHimSecondLevelList = Template.bind({});

CusHimSecondLevelList.argTypes = defaultArgTypes;
CusHimSecondLevelList.args = {
  gridCellRole: false,
  config: sampleData[1],
  variant: variant.options[1]
};

CusHimSecondLevelList.documentation = {
  title: 'CUS/HIM Icon Second Level List'
};

export const CusHimSecondLevelMessage = Template.bind({});

CusHimSecondLevelMessage.argTypes = defaultArgTypes;
CusHimSecondLevelMessage.args = {
  gridCellRole: false,
  config: sampleData[2],
  variant: variant.options[2]
};

CusHimSecondLevelMessage.documentation = {
  title: 'CUS/HIM Second Level Message'
};


export default {
  decorators: [
    (Story) => (
      <div>
        <Story/>
      </div>
    )
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'Timetable/lyne-timetable-cus-him'
};

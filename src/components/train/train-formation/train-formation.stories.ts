import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../core/dom';

import readme from './readme.md?raw';
import '../../icon';
import '../train';
import '../train-wagon';
import '../train-blocked-passage';
import './train-formation';

const MountedFormationTemplate = (args: Args): TemplateResult => html`
  <sbb-train-formation ${sbbSpread(args)}>
    <sbb-train
      directionLabel="This attribute seems to be necessary due to a bug"
      direction-label="Direction of travel"
      station="Bern"
      direction="left"
      accessibility-label="The top of the train is in Sector A. The train leaves the station in this direction"
    >
      <sbb-train-wagon
        type="locomotive"
        additional-accessibility-text="Top of the train"
        sector="A"
      ></sbb-train-wagon>
      <sbb-train-wagon type="closed" sector="A"></sbb-train-wagon>
      <sbb-train-blocked-passage></sbb-train-blocked-passage>
      <sbb-train-wagon
        type="wagon"
        label="38"
        occupancy="low"
        blocked-passage="previous"
        wagon-class="1"
        sector="A"
      >
        <sbb-icon aria-hidden="false" aria-label="wheelchair space" name="sa-rs"></sbb-icon>
        <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
        <sbb-icon
          aria-hidden="false"
          aria-label="Business zone in 1st class: Reservation possible"
          name="sa-bz"
        ></sbb-icon>
        <sbb-icon
          aria-hidden="false"
          aria-label="Business zone in 1st class: Reservation possible"
          name="sa-bz"
        ></sbb-icon>
      </sbb-train-wagon>
      <sbb-train-wagon type="wagon" label="39" occupancy="none" wagon-class="1" sector="B">
        <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
      </sbb-train-wagon>
      <sbb-train-wagon type="wagon" label="40" occupancy="high" wagon-class="2" sector="B">
        <sbb-icon
          aria-hidden="false"
          aria-label="Restaurant 1st and 2nd class"
          name="sa-wr"
        ></sbb-icon>
        <sbb-icon aria-hidden="false" aria-label="wheelchair space" name="sa-rs"></sbb-icon>
      </sbb-train-wagon>
      <sbb-train-wagon type="wagon" label="41" occupancy="medium" wagon-class="2" sector="B">
        <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
      </sbb-train-wagon>
      <sbb-train-wagon
        type="wagon"
        label="42"
        occupancy="low"
        wagon-class="2"
        blocked-passage="next"
        sector="C"
      >
        <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
      </sbb-train-wagon>
      <sbb-train-blocked-passage></sbb-train-blocked-passage>
      <sbb-train-wagon
        type="wagon"
        label="43"
        occupancy="low"
        wagon-class="2"
        blocked-passage="both"
        sector="C"
      >
        <sbb-icon
          aria-hidden="false"
          aria-label="stroller space"
          name="sa-abteilkinderwagen"
        ></sbb-icon>
        <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
      </sbb-train-wagon>
      <sbb-train-blocked-passage></sbb-train-blocked-passage>
      <sbb-train-wagon
        blocked-passage="previous"
        type="wagon"
        label="44"
        occupancy="low"
        wagon-class="2"
        sector="C"
      >
        <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
        <sbb-icon aria-hidden="false" aria-label="Family zone" name="sa-fz"></sbb-icon>
      </sbb-train-wagon>
      <sbb-train-wagon
        type="wagon"
        label="45"
        occupancy="low"
        wagon-class="2"
        sector="D"
      ></sbb-train-wagon>
      <sbb-train-wagon
        type="wagon"
        label="46"
        occupancy="low"
        wagon-class="2"
        sector="D"
      ></sbb-train-wagon>
      <sbb-train-wagon
        type="wagon"
        label="47"
        additional-accessibility-text="End of the train"
        occupancy="low"
        wagon-class="2"
        sector="D"
      ></sbb-train-wagon>
    </sbb-train>
    <sbb-train
      directionLabel="This attribute seems to be necessary due to a bug"
      direction-label="Direction of travel"
      station="Luzern"
      direction="left"
      accessibility-label="The top of the train is in Sector E. The train leaves the station in this direction"
    >
      <sbb-train-wagon
        type="locomotive"
        accessibility-label-wagon="Locomotive"
        additional-accessibility-text="Top of the train"
        sector="E"
      ></sbb-train-wagon>
      <sbb-train-wagon type="closed" label="49" sector="E"></sbb-train-wagon>
      <sbb-train-blocked-passage></sbb-train-blocked-passage>
      <sbb-train-wagon
        type="wagon"
        label="50"
        occupancy="low"
        wagon-class="2"
        blocked-passage="previous"
        sector="E"
      ></sbb-train-wagon>
      <sbb-train-wagon
        type="wagon"
        label="51"
        occupancy="low"
        wagon-class="2"
        sector="F"
      ></sbb-train-wagon>
      <sbb-train-wagon
        type="wagon"
        label="52"
        occupancy="low"
        wagon-class="2"
        sector="F"
      ></sbb-train-wagon>
      <sbb-train-wagon
        type="wagon"
        label="53"
        occupancy="low"
        wagon-class="2"
        sector="F"
      ></sbb-train-wagon>
      <sbb-train-wagon
        type="wagon"
        label="54"
        occupancy="low"
        wagon-class="2"
        sector="G"
      ></sbb-train-wagon>
      <sbb-train-wagon
        type="wagon"
        label="55"
        occupancy="low"
        wagon-class="2"
        sector="G"
      ></sbb-train-wagon>
      <sbb-train-wagon
        type="wagon"
        label="56"
        occupancy="low"
        wagon-class="2"
        sector="G"
      ></sbb-train-wagon>
      <sbb-train-wagon
        type="wagon"
        label="57"
        occupancy="low"
        wagon-class="2"
        sector="H"
      ></sbb-train-wagon>
      <sbb-train-wagon
        type="wagon"
        label="58"
        occupancy="low"
        wagon-class="2"
        sector="H"
      ></sbb-train-wagon>
      <sbb-train-wagon
        type="wagon"
        label="59"
        occupancy="low"
        wagon-class="2"
        sector="H"
      ></sbb-train-wagon>
    </sbb-train>
  </sbb-train-formation>
`;

const SingleFormationTemplate = (args: Args): TemplateResult => html`
  <sbb-train-formation ${sbbSpread(args)}>
    <sbb-train
      directionLabel="This attribute seems to be necessary due to a bug"
      direction-label="Direction of travel"
      station=""
      direction="left"
      accessibility-label="The top of the train is in Sector A. The train leaves the station in this direction"
    >
      <sbb-train-wagon
        sector="A"
        type="locomotive"
        additional-accessibility-text="Top of the train"
      ></sbb-train-wagon>
      <sbb-train-wagon sector="A" type="closed"></sbb-train-wagon>
      <sbb-train-blocked-passage></sbb-train-blocked-passage>
      <sbb-train-wagon
        sector="A"
        type="wagon"
        label="38"
        occupancy="low"
        blocked-passage="previous"
        wagon-class="1"
      >
        <sbb-icon aria-hidden="false" aria-label="wheelchair space" name="sa-rs"></sbb-icon>
        <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
        <sbb-icon
          aria-hidden="false"
          aria-label="Business zone in 1st class: Reservation possible"
          name="sa-bz"
        ></sbb-icon>
        <sbb-icon
          aria-hidden="false"
          aria-label="Business zone in 1st class: Reservation possible"
          name="sa-bz"
        ></sbb-icon>
      </sbb-train-wagon>
      <sbb-train-wagon sector="B" type="wagon" label="39" occupancy="none" wagon-class="1">
        <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
      </sbb-train-wagon>
      <sbb-train-wagon sector="B" type="wagon" label="40" occupancy="high" wagon-class="2">
        <sbb-icon
          aria-hidden="false"
          aria-label="Restaurant 1st and 2nd class"
          name="sa-wr"
        ></sbb-icon>
        <sbb-icon aria-hidden="false" aria-label="wheelchair space" name="sa-rs"></sbb-icon>
      </sbb-train-wagon>
      <sbb-train-wagon sector="B" type="wagon" label="41" occupancy="medium" wagon-class="2">
        <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
      </sbb-train-wagon>
      <sbb-train-wagon
        sector="C"
        type="wagon"
        label="42"
        occupancy="low"
        wagon-class="2"
        blocked-passage="next"
      >
        <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
      </sbb-train-wagon>
      <sbb-train-blocked-passage></sbb-train-blocked-passage>
      <sbb-train-wagon
        sector="C"
        type="wagon"
        label="43"
        occupancy="low"
        wagon-class="2"
        blocked-passage="both"
      >
        <sbb-icon
          aria-hidden="false"
          aria-label="stroller space"
          name="sa-abteilkinderwagen"
        ></sbb-icon>
        <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
      </sbb-train-wagon>
      <sbb-train-blocked-passage></sbb-train-blocked-passage>
      <sbb-train-wagon
        sector="C"
        blocked-passage="previous"
        type="wagon"
        label="44"
        occupancy="low"
        wagon-class="2"
      >
        <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
        <sbb-icon aria-hidden="false" aria-label="Family zone" name="sa-fz"></sbb-icon>
      </sbb-train-wagon>
      <sbb-train-wagon
        sector="D"
        type="wagon"
        label="45"
        occupancy="low"
        wagon-class="2"
      ></sbb-train-wagon>
      <sbb-train-wagon
        sector="D"
        type="wagon"
        label="46"
        occupancy="low"
        wagon-class="2"
      ></sbb-train-wagon>
      <sbb-train-wagon
        sector="D"
        type="wagon"
        label="47"
        additional-accessibility-text="End of the train"
        occupancy="low"
        wagon-class="2"
      ></sbb-train-wagon>
    </sbb-train>
  </sbb-train-formation>
`;

const hideWagonLabel: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  'hide-wagon-label': hideWagonLabel,
};

const defaultArgs: Args = {
  'hide-wagon-label': false,
};

export const TrainFormation: StoryObj = {
  render: MountedFormationTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

export const SingleFormation: StoryObj = {
  render: SingleFormationTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

export const TrainFormationHideWagonLabel: StoryObj = {
  render: MountedFormationTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'hide-wagon-label': true,
  },
};

const meta: Meta = {
  decorators: [(story) => html` <div style="padding: 2rem;">${story()}</div> `],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'timetable/sbb-train-formation',
};

export default meta;

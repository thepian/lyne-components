import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbTimetableOccupancyElement } from './timetable-occupancy';

describe('sbb-timetable-occupancy', () => {
  let element: SbbTimetableOccupancyElement;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-timetable-occupancy first-class-occupancy="high"></sbb-timetable-occupancy>
    `);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbTimetableOccupancyElement);
  });
});

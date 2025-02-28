import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbExpansionPanelContentElement } from './expansion-panel-content';

describe('sbb-expansion-panel-content', () => {
  let element: SbbExpansionPanelContentElement;

  it('renders', async () => {
    element = await fixture(
      html`<sbb-expansion-panel-content>Content</sbb-expansion-panel-content>`,
    );
    assert.instanceOf(element, SbbExpansionPanelContentElement);
  });
});

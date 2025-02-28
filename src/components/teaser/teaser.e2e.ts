import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../core/testing';

import type { SbbTeaserElement } from './teaser';
import '.';

describe('sbb-teaser', () => {
  let element: SbbTeaserElement;

  it('should receive focus', async () => {
    element = await fixture(html`<sbb-teaser href="link" id="focus-id">Hero content</sbb-teaser>`);

    element.focus();
    await waitForLitRender(element);

    expect(document.activeElement.id).to.be.equal('focus-id');
  });
});

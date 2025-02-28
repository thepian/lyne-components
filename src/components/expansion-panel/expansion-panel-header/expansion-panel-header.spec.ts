import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing';

import './expansion-panel-header';

describe('sbb-expansion-panel-header', () => {
  it('renders collapsed', async () => {
    const root = await fixture(
      html`<sbb-expansion-panel-header>Header</sbb-expansion-panel-header>`,
    );

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(
      `
        <sbb-expansion-panel-header slot='header' dir="ltr" role="button" slot="header" tabindex="0" data-slot-names="unnamed">
          Header
        </sbb-expansion-panel-header>
      `,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('renders with icon', async () => {
    const root = await fixture(
      html`<sbb-expansion-panel-header icon-name="pie-medium">Header</sbb-expansion-panel-header>`,
    );

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(
      `
        <sbb-expansion-panel-header
          slot='header'
          icon-name="pie-medium"
          dir="ltr"
          role="button"
          slot="header"
          tabindex="0"
          data-icon
          data-slot-names="unnamed"
        >
          Header
        </sbb-expansion-panel-header>
      `,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('renders with slotted icon', async () => {
    const root = await fixture(html`
      <sbb-expansion-panel-header>
        <sbb-icon slot="icon" name="pie-medium"></sbb-icon>
        Header
      </sbb-expansion-panel-header>
    `);

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(
      `
        <sbb-expansion-panel-header slot='header' dir="ltr" role="button" slot="header" tabindex="0" data-icon data-slot-names="icon unnamed">
          <sbb-icon 
            aria-hidden="true" 
            data-namespace="default" 
            role="img" 
            slot='icon' 
            name='pie-medium'></sbb-icon>
          Header
        </sbb-expansion-panel-header>
      `,
    );
    await expect(root).shadowDom.to.be.equalSnapshot();
  });
});

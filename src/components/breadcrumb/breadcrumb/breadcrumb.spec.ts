import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './breadcrumb';

describe('sbb-breadcrumb', () => {
  it('renders with text', async () => {
    const root = await fixture(html`
      <sbb-breadcrumb href="/test" target="_blank" download="true" rel="subsection"
        >Breadcrumb</sbb-breadcrumb
      >
    `);

    expect(root).dom.to.be.equal(`
      <sbb-breadcrumb dir="ltr" role="link" tabindex="0" href="/test" target="_blank" download="true" rel="subsection">
        Breadcrumb
      </sbb-breadcrumb>
    `);

    await expect(root).shadowDom.to.equalSnapshot();
  });

  it('renders with icon', async () => {
    const root = await fixture(html`
      <sbb-breadcrumb href="/" icon-name="house-small"></sbb-breadcrumb>
    `);

    expect(root).dom.to.be.equal(`
      <sbb-breadcrumb dir="ltr" role="link" tabindex="0" href="/" icon-name="house-small"></sbb-breadcrumb>
    `);

    await expect(root).shadowDom.to.equalSnapshot();
  });

  it('renders with icon and text', async () => {
    const root = await fixture(html`
      <sbb-breadcrumb href="/" icon-name="house-small">Home</sbb-breadcrumb>
    `);

    expect(root).dom.to.be.equal(`
      <sbb-breadcrumb dir="ltr" role="link" tabindex="0" href="/" icon-name="house-small">
        Home
      </sbb-breadcrumb>
    `);

    await expect(root).shadowDom.to.equalSnapshot();
  });

  it('renders as span if no href is provided', async () => {
    const root = await fixture(html`<sbb-breadcrumb>Breadcrumb</sbb-breadcrumb>`);

    expect(root).dom.to.be.equal(`
      <sbb-breadcrumb dir="ltr">
        Breadcrumb
      </sbb-breadcrumb>
    `);

    await expect(root).shadowDom.to.equalSnapshot();
  });
});

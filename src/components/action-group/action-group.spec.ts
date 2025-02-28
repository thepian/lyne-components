import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { SbbButtonElement } from '../button';

import type { SbbActionGroupElement } from './action-group';
import '.';

describe('sbb-action-group', () => {
  it('renders', async () => {
    const root = await fixture(html`
      <sbb-action-group align-group="start" orientation="horizontal">
        <sbb-button variant="secondary">Button</sbb-button>
        <sbb-link
          icon-name="chevron-small-left-small"
          href="https://github.com/lyne-design-system/lyne-components"
        >
          Link
        </sbb-link>
      </sbb-action-group>
    `);

    expect(root).dom.to.be.equal(
      `
        <sbb-action-group align-group="start" orientation="horizontal" align-group="start" horizontal-from="medium" button-size="l" link-size="m">
          <sbb-button variant="secondary">Button</sbb-button>
          <sbb-link
            icon-name="chevron-small-left-small"
            href="https://github.com/lyne-design-system/lyne-components">
            Link
          </sbb-link>
        </sbb-action-group>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <div class="sbb-action-group">
          <slot></slot>
        </div>
      `,
    );
  });

  describe('property sync', () => {
    const assertButtons = (
      root: SbbActionGroupElement,
      assertion: (link: SbbButtonElement) => boolean,
    ): boolean => Array.from(root.querySelectorAll('sbb-button')).every(assertion);

    it('should sync default button-size property with sbb-button', async () => {
      const root = (await fixture(html`
        <sbb-action-group align-group="start" orientation="horizontal">
          <sbb-button variant="secondary">Button</sbb-button>
          <sbb-link
            icon-name="chevron-small-left-small"
            href="https://github.com/lyne-design-system/lyne-components"
          >
            Link
          </sbb-link>
        </sbb-action-group>
      `)) as SbbActionGroupElement;
      expect(assertButtons(root, (b) => b.size === 'l')).to.be.ok;
    });

    it('should sync button-size property with sbb-button', async () => {
      const root = (await fixture(html`
        <sbb-action-group align-group="start" orientation="horizontal" button-size="m">
          <sbb-button variant="secondary">Button</sbb-button>
          <sbb-link
            icon-name="chevron-small-left-small"
            href="https://github.com/lyne-design-system/lyne-components"
          >
            Link
          </sbb-link>
        </sbb-action-group>
      `)) as SbbActionGroupElement;
      expect(assertButtons(root, (b) => b.size === 'm')).to.be.ok;
    });

    it('should apply block variant to sbb-link', async () => {
      const root = (await fixture(html`
        <sbb-action-group align-group="start" orientation="horizontal" button-size="m">
          <sbb-button variant="secondary">Button</sbb-button>
          <sbb-link
            icon-name="chevron-small-left-small"
            href="https://github.com/lyne-design-system/lyne-components"
          >
            Link
          </sbb-link>
        </sbb-action-group>
      `)) as SbbActionGroupElement;
      expect(Array.from(root.querySelectorAll('sbb-link')).every((l) => l.variant === 'block')).to
        .be.ok;
    });

    it('should sync link-size property with sbb-link', async () => {
      const root = (await fixture(html`
        <sbb-action-group align-group="start" orientation="horizontal" link-size="s">
          <sbb-button variant="secondary">Button</sbb-button>
          <sbb-link
            icon-name="chevron-small-left-small"
            href="https://github.com/lyne-design-system/lyne-components"
          >
            Link
          </sbb-link>
        </sbb-action-group>
      `)) as SbbActionGroupElement;
      expect(Array.from(root.querySelectorAll('sbb-link')).every((l) => l.size === 's')).to.be.ok;
    });
  });
});

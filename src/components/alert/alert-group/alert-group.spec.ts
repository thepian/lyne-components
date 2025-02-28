import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './alert-group';
import '../alert';

describe('sbb-alert-group', () => {
  it('should render', async () => {
    const root = await fixture(html`
      <sbb-alert-group accessibility-title="Disruptions" accessibility-level="3">
        <sbb-alert
          title-content="Interruption between Genève and Lausanne"
          href="https://www.sbb.ch"
        >
          The rail traffic between Allaman and Morges is interrupted. All trains are cancelled.
        </sbb-alert>
      </sbb-alert-group>
    `);

    expect(root).dom.to.be.equal(
      `
        <sbb-alert-group accessibility-title='Disruptions' accessibility-level='3' role='status'>
          <sbb-alert title-content='Interruption between Genève and Lausanne' href='https://www.sbb.ch' size="m">
            The rail traffic between Allaman and Morges is interrupted. All trains are cancelled.
          </sbb-alert>
        </sbb-alert-group>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <div class="sbb-alert-group">
          <h2 class="sbb-alert-group__title">
            <slot name="accessibility-title">
              Disruptions
            </slot>
          </h2>
          <slot></slot>
        </div>
      `,
    );
  });

  it('should render with slots', async () => {
    const root = await fixture(html`
      <sbb-alert-group accessibility-level="3">
        <span slot="accessibility-title">Interruptions</span>
        <sbb-alert
          title-content="Interruption between Genève and Lausanne"
          href="https://www.sbb.ch"
        >
          The rail traffic between Allaman and Morges is interrupted. All trains are cancelled.
        </sbb-alert>
      </sbb-alert-group>
    `);

    expect(root).dom.to.be.equal(
      `
        <sbb-alert-group accessibility-level='3' role='status'>
          <span slot="accessibility-title">
            Interruptions
          </span>
          <sbb-alert title-content='Interruption between Genève and Lausanne' href='https://www.sbb.ch' size="m">
            The rail traffic between Allaman and Morges is interrupted. All trains are cancelled.
          </sbb-alert>
        </sbb-alert-group>
      `,
    );
    expect(root).shadowDom.to.be.equal(
      `
        <div class="sbb-alert-group">
          <h2 class="sbb-alert-group__title">
            <slot name="accessibility-title"></slot>
          </h2>
          <slot></slot>
        </div>
      `,
    );
  });
});

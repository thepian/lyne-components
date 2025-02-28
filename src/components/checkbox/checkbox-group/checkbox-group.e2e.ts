import { assert, expect, fixture } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../../core/testing';
import { SbbCheckboxElement } from '../checkbox';

import { SbbCheckboxGroupElement } from './checkbox-group';

describe('sbb-checkbox-group', () => {
  let element: SbbCheckboxGroupElement;
  let checkboxOne: SbbCheckboxElement,
    checkboxTwo: SbbCheckboxElement,
    checkboxThree: SbbCheckboxElement;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-checkbox-group>
        <sbb-checkbox id="checkbox-1" value="checkbox-1">Label 1</sbb-checkbox>
        <sbb-checkbox id="checkbox-2" disabled value="checkbox-2">Label 2</sbb-checkbox>
        <sbb-checkbox id="checkbox-3" value="checkbox-3">Label 3</sbb-checkbox>
      </sbb-checkbox-group>
    `);
    checkboxOne = document.querySelector('#checkbox-1');
    checkboxTwo = document.querySelector('#checkbox-2');
    checkboxThree = document.querySelector('#checkbox-3');
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbCheckboxGroupElement);
    assert.instanceOf(checkboxOne, SbbCheckboxElement);
    assert.instanceOf(checkboxTwo, SbbCheckboxElement);
    assert.instanceOf(checkboxThree, SbbCheckboxElement);
  });

  it('disabled status is inherited', async () => {
    element.setAttribute('disabled', 'true');
    await waitForLitRender(element);
    expect(element).to.have.attribute('disabled');

    expect(checkboxOne).to.have.attribute('disabled');
    expect(checkboxTwo).to.have.attribute('disabled');
    expect(checkboxThree).to.have.attribute('disabled');

    element.removeAttribute('disabled');
    await waitForLitRender(element);
    expect(checkboxTwo).to.have.attribute('disabled');
  });

  it('disabled status prevents changes', async () => {
    const checkboxes: SbbCheckboxElement[] = [checkboxOne, checkboxTwo, checkboxThree];
    checkboxes.forEach((check: SbbCheckboxElement) =>
      expect(check).not.to.have.attribute('checked'),
    );

    element.setAttribute('disabled', 'true');
    await waitForLitRender(element);
    expect(element).to.have.attribute('disabled');
    for (const check of checkboxes) {
      check.click();
    }
    await waitForLitRender(element);
    checkboxes.forEach((check: SbbCheckboxElement) =>
      expect(check).not.to.have.attribute('checked'),
    );

    element.removeAttribute('disabled');
    await waitForLitRender(element);
    for (const check of checkboxes) {
      check.click();
    }
    await waitForLitRender(element);

    expect(checkboxOne).to.have.attribute('checked');
    expect(checkboxTwo).not.to.have.attribute('checked');
    expect(checkboxThree).to.have.attribute('checked');
  });

  it('required status', async () => {
    element.setAttribute('required', 'true');
    await waitForLitRender(element);
    expect(element).to.have.attribute('required');
    expect(checkboxOne).to.have.attribute('required');
    expect(checkboxTwo).to.have.attribute('required');
    expect(checkboxThree).to.have.attribute('required');
  });

  it('arrow navigation', async () => {
    checkboxOne.focus();
    expect(document.activeElement.textContent).to.equal('Label 1');
    await sendKeys({ press: 'ArrowRight' });
    expect(document.activeElement.textContent).to.equal('Label 3');
    checkboxTwo.removeAttribute('disabled');
    await waitForLitRender(element);
    await sendKeys({ press: 'ArrowLeft' });
    expect(document.activeElement.textContent).to.equal('Label 2');
  });
});

import { assert, expect, fixture } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { i18nTimeInputChange } from '../core/i18n';
import type { ValidationChangeEvent } from '../core/interfaces';
import { EventSpy, waitForLitRender } from '../core/testing';

import { SbbTimeInputElement } from './time-input';

describe('sbb-time-input', () => {
  let element: SbbTimeInputElement, input: HTMLInputElement;

  beforeEach(async () => {
    await fixture(html`
      <sbb-time-input input="input-1"></sbb-time-input>
      <input id="input-1" />
    `);

    element = document.querySelector('sbb-time-input');
    input = document.querySelector('input');
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbTimeInputElement);
  });

  it('should configure native input', async () => {
    expect(input).to.have.attribute('type', 'text');
    expect(input).to.have.attribute('inputMode', 'numeric');
    expect(input).to.have.attribute('maxLength', '5');
    expect(input).to.have.attribute('placeholder', 'HH:MM');
    expect(input).to.have.attribute('data-sbb-time-input', '');
  });

  it('should emit form events', async () => {
    const changeSpy = new EventSpy('change', element);
    const inputSpy = new EventSpy('input', element);

    input.focus();
    await sendKeys({ press: '1' });
    input.blur();
    await waitForLitRender(element);

    expect(changeSpy.count).to.be.greaterThan(0);
    expect(inputSpy.count).to.be.greaterThan(0);
  });

  it('should emit validation change event', async () => {
    const validationChangeSpy = new EventSpy<CustomEvent<ValidationChangeEvent>>(
      SbbTimeInputElement.events.validationChange,
      element,
    );

    // When entering 99
    input.focus();
    await sendKeys({ type: '99' });
    input.blur();

    // Then validation event should emit with false
    expect(validationChangeSpy.lastEvent.detail).to.own.include({ valid: false });
    expect(input).to.have.attribute('data-sbb-invalid');

    // When adding another 9 (999)
    input.focus();
    await sendKeys({ press: 'ArrowRight' }); // Fix for Firefox: de-highlight text
    await sendKeys({ press: '9' });
    input.blur();

    // Then validation event should not be emitted a second time
    expect(validationChangeSpy.count).to.be.equal(1);
    expect(input).to.have.attribute('data-sbb-invalid');

    // When deleting trailing two nines (convert value to 9 which is valid)
    input.focus();
    await sendKeys({ press: 'Backspace' });
    await sendKeys({ press: 'Backspace' });
    input.blur();

    // Then validation event should be emitted with true
    expect(validationChangeSpy.count).to.be.equal(2);
    expect(validationChangeSpy.lastEvent.detail).to.own.include({ valid: true });
    expect(input).not.to.have.attribute('data-sbb-invalid');
  });

  it('should emit valid validation change event when empty', async () => {
    // Creating invalid entry
    input.focus();
    await sendKeys({ type: '99' });
    input.blur();
    await waitForLitRender(element);

    const validationChangeSpy = new EventSpy<CustomEvent<ValidationChangeEvent>>(
      SbbTimeInputElement.events.validationChange,
      element,
    );

    // When deleting input to achieve empty input
    input.focus();
    await sendKeys({ press: 'Backspace' });
    await sendKeys({ press: 'Backspace' });
    input.blur();

    // Then validation event should emit with true
    expect(validationChangeSpy.lastEvent.detail).to.own.include({ valid: true });
    expect(input).not.to.have.attribute('data-sbb-invalid');
  });

  it('should interpret valid values', async function () {
    this.timeout(5000);
    const testCases = [
      { value: '0', interpretedAs: '00:00' },
      { value: '1', interpretedAs: '01:00' },
      { value: '12', interpretedAs: '12:00' },
      { value: '123', interpretedAs: '01:23' },
      { value: '1.2', interpretedAs: '01:02' },
      { value: '1.12', interpretedAs: '01:12' },
      { value: '1,12', interpretedAs: '01:12' },
      { value: '1:12', interpretedAs: '01:12' },
      { value: '1h12', interpretedAs: '01:12' },
      { value: '1_12', interpretedAs: '01:12' },
      { value: '1;12', interpretedAs: '01:12' },
      { value: '1-12', interpretedAs: '01:12' },
      { value: '01:12', interpretedAs: '01:12' },
      { value: '12:', interpretedAs: '12:00' },
      { value: '12.3', interpretedAs: '12:03' },
      { value: ':00', interpretedAs: '00:00' },
      { value: ':01', interpretedAs: '00:01' },
      { value: ':1', interpretedAs: '00:01' },
      { value: 'h', interpretedAs: '00:00' },
      { value: '.', interpretedAs: '00:00' },
      { value: ':', interpretedAs: '00:00' },
    ];

    for (const testCase of testCases) {
      // Clear input
      input.value = '';

      input.focus();
      await sendKeys({ type: testCase.value });
      input.blur();
      await waitForLitRender(element);
      expect(input.value).to.be.equal(testCase.interpretedAs);

      const paragraphElement = element.shadowRoot.querySelector('p');
      expect(paragraphElement.innerText).to.be.equal(
        `${i18nTimeInputChange['en']} ${testCase.interpretedAs}.`,
      );
    }
  });

  it('should not touch invalid values', async () => {
    const testCases = [
      { value: '99', interpretedAs: '99' },
      { value: '24', interpretedAs: '24' },
      { value: 'hh', interpretedAs: 'hh' },
      { value: '', interpretedAs: '' },
      { value: '00:66', interpretedAs: '00:66' },
    ];

    for (const testCase of testCases) {
      // Clear input
      input.value = '';

      input.focus();
      await sendKeys({ type: testCase.value });
      input.blur();
      await waitForLitRender(element);
      expect(input.value).to.be.equal(testCase.interpretedAs);

      const paragraphElement = element.shadowRoot.querySelector('p');
      expect(paragraphElement.innerText).to.be.equal('');
    }
  });

  it('should prevent char insertion', async () => {
    input.focus();
    await sendKeys({ press: '1' });

    // Inserting invalid key
    await sendKeys({ press: 'V' });

    expect(input.value).to.be.equal('1');
  });

  it('should handle deletion', async () => {
    input.value = '12:00';

    await waitForLitRender(element);
    input.focus();
    input.setSelectionRange(0, 0);
    await sendKeys({ press: 'Delete' });
    await sendKeys({ press: 'Delete' });

    expect(input.value).to.be.equal(':00');
    await sendKeys({ press: 'Enter' });
    expect(input.value).to.be.equal('00:00');
  });

  it('should set and get value as a date', async () => {
    const blurSpy = new EventSpy('blur', input);
    const date = new Date('2023-01-01T15:00:00');

    element.setValueAsDate(date);
    await waitForLitRender(element);

    expect(input.value).to.be.equal('15:00');
    expect(blurSpy.count).to.be.equal(1);

    const dateCalculated = element.getValueAsDate().getTime();
    expect(new Date(dateCalculated).getHours()).to.be.equal(date.getHours());
    expect(new Date(dateCalculated).getMinutes()).to.be.equal(date.getMinutes());
  });

  it('should set and get value as a date (string)', async () => {
    const date = new Date('2023-01-01T15:00:00');

    element.setValueAsDate(date.toISOString());
    await waitForLitRender(element);
    expect(input.value).to.be.equal('15:00');

    const dateCalculated = element.getValueAsDate().getTime();
    expect(new Date(dateCalculated).getHours()).to.be.equal(date.getHours());
    expect(new Date(dateCalculated).getMinutes()).to.be.equal(date.getMinutes());
  });

  it('should work with sbb-form-field', async () => {
    const root = await fixture(html`
      <sbb-form-field>
        <sbb-time-input></sbb-time-input>
        <input />
      </sbb-form-field>
    `);
    element = root.querySelector('sbb-time-input');
    input = root.querySelector('input');

    element.setValueAsDate('2023-01-01T15:00:00');
    await waitForLitRender(element);
    expect(input.value).to.be.equal('15:00');
  });

  it('should support asynchronously adding input by element reference', async () => {
    const root = await fixture(html`
      <div>
        <sbb-time-input id="time-input"></sbb-time-input>
        <input id="input" />
      </div>
    `);
    element = root.querySelector('sbb-time-input');
    input = root.querySelector('input');
    element.input = input;
    element.setValueAsDate('2023-01-01T15:00:00');
    await waitForLitRender(element);

    expect(input.value).to.be.equal('15:00');
  });

  it('should support asynchronously adding input by id', async () => {
    const root = await fixture(html`
      <div>
        <sbb-time-input id="time-input"></sbb-time-input>
        <input id="input-2" />
      </div>
    `);
    element = root.querySelector('sbb-time-input');
    input = root.querySelector('input');

    element.input = 'input-2';
    element.setValueAsDate('2023-01-01T15:00:00');
    await waitForLitRender(element);

    expect(input.value).to.be.equal('15:00');
  });
});

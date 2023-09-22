'use strict';

import { suite, test } from '../../../lib/testy.js';
import { resultOfATestWith } from '../../support/runner_helpers.js';
import { expectFailureOn, expectSuccess } from '../../support/assertion_helpers.js';

import { I18nMessage } from '../../../lib/i18n/i18n_messages.js';

suite('numeric assertions', () => {
  test('isNearTo passes if an exact integer matches', async() => {
    const result = await resultOfATestWith(assert => assert.that(42).isNearTo(42));

    expectSuccess(result);
  });

  test('isNearTo fails if the integer part of the number is not equal', async() => {
    const result = await resultOfATestWith(assert => assert.that(42).isNearTo(43));

    expectFailureOn(result, I18nMessage.of('expectation_be_near_to', '42', '43', '4'));
  });

  test('isNearTo passes if the actual number rounded using the specified decimals matches the expected number', async() => {
    const result = await resultOfATestWith(assert => assert.that(42.0001).isNearTo(42, 3));

    expectSuccess(result);
  });

  test('isNearTo fails if the actual number rounded using the specified decimals does not match the expected number', async() => {
    const result = await resultOfATestWith(assert => assert.that(42.001).isNearTo(42, 3));

    expectFailureOn(result, I18nMessage.of('expectation_be_near_to', '42.001', '42', '3'));
  });

  test('isNearTo passes with a default precision of 4', async() => {
    const result = await resultOfATestWith(assert => assert.that(42.00001).isNearTo(42));

    expectSuccess(result);
  });

  test('isNearTo passes with a classical floating point representation issue', async() => {
    const result = await resultOfATestWith(assert => assert.that(0.1 + 0.2).isNearTo(0.3));

    expectSuccess(result);
  });
});

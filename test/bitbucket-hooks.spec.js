const { deepStrictEqual } = require('assert');
const { getHookChanges } = require('../src/bitbucket-hooks');
const PushEvent = require('./bitbucket-push-event');

const testHookChanges = (expected, branches) => deepStrictEqual(
    expected,
    getHookChanges(PushEvent, 'equestrian', branches)
);

describe('bitbucket hooks', () => {
    it('getHookChanges single', () => testHookChanges(['bitbucket'], ['master', 'bitbucket']));
    it('getHookChanges absent', () => testHookChanges([], ['production', 'test']));
});

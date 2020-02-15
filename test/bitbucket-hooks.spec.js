const { deepStrictEqual } = require('assert');
const { getHookChanges } = require('../src/bitbucket-hooks');
const PushEvent = require('./bitbucket-push-event');

describe('bitbucket hooks', () => {
    it('getHookChanges', () => deepStrictEqual(
        ['bitbucket'],
        getHookChanges(PushEvent, 'equestrian', ['master', 'bitbucket'])
    ))
});

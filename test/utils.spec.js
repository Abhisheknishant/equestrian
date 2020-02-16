const { strictEqual } = require('assert');
const substitute = require('../src/substitute');

describe('utils', () => {
    it('substitute', () => strictEqual(
        'ABC {var1}, TEXT TEXT ',
        substitute('ABC {var1}, {var2} {var2} ', { var2: 'TEXT'})
    ))
});

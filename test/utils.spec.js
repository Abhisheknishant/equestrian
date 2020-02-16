const { strictEqual, deepStrictEqual, throws } = require('assert');
const { substituteParameters, substituteSettings } = require('../src/substitute');

describe('utils', () => {
    it('substituteParameters', () => strictEqual(
        'ABC {var1}, TEXT TEXT ',
        substituteParameters('ABC {var1}, {var2} {var2} ', { var2: 'TEXT'})
    ));

    it('substituteSettings', () => deepStrictEqual(
        {
            DEVELOPMENT_CONFIG_FILE: '/home/user/project/config/development.json',
            CONFIG_DIR: '/home/user/project/config',
            PROJECT_DIR: '/home/user/project',
        },
        substituteSettings({
            DEVELOPMENT_CONFIG_FILE: '{CONFIG_DIR}/development.json',
            CONFIG_DIR: '{PROJECT_DIR}/config',
            PROJECT_DIR: '{HOME}/project',
        }, {
            HOME: '/home/user'
        })
    ));

    it('substituteSettings error', () => {
        throws(() => substituteSettings({
            DEVELOPMENT_CONFIG_FILE: '{CONFIG_DIR}/development.json',
            CONFIG_DIR: '{PROJECT_DIR}/config',
            PROJECT_DIR: '{HOME}/project',
        },
        { HOME: '/home/user' }, 1),
        new Error(`Too deep dive (0)`)
        );
    });
});

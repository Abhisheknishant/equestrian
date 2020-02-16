const NamedReferenceRegExp = /\{([a-z][\w_]+)\}/gi;

const quoteName = name => `{${name}}`; 

const substitute = (text, resolve = quoteName) => text.replace(NamedReferenceRegExp, (match, name) => resolve(name));

const substituteParameters = (text, params) => substitute(text, name => params[name] || quoteName(name));

function substituteSettings(settings, params = {}, level = 10) {
    let result = {};
    let modified = 0;
    Object.keys(settings).forEach(name => {
        const source = settings[name];
        const target = substitute(source, paramName => params[paramName] || settings[paramName] || quoteName(paramName));
        if (source !== target) {
            modified++;
        }
        result[name] = target;
    });
    if (modified > 0) {
        if (level <= 0) {
            throw new Error(`Too deep dive (${level})`);
        }
        result = substituteSettings(result, params, level - 1);
    }
    return result;
}

module.exports = { substitute, substituteParameters, substituteSettings };

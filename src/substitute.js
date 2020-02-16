const NamedReferenceRegExp = /\{([a-z][\w_]+)\}/gi;

const substitute = (text, params) => text.replace(NamedReferenceRegExp, (match, name) => name in params ? params[name] : `{${name}}`);

module.exports = substitute;

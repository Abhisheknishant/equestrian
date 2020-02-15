const Bitbucket = {
    getHookChanges(data, repository, branches) {
        const isValidEvent = data
            && data.push && data.push.changes
            && data.repository && data.repository.name === repository
        if (isValidEvent) {
            return data.push.changes
                .map(change => change.new.name)
                .filter((name, i, array) => branches.includes(name) && array.lastIndexOf(name) === i)
        }
        return [];
    }
}

module.exports = Bitbucket;

(function () {

    const pluginsTableNode = document.querySelector('table.plugins');
    const pluginTableRows = pluginsTableNode.tBodies[0].rows;
    let pluginList = [];

    for (let i = 0, row; row = pluginTableRows[i]; i++) {

        const plugin = {};

        function hasNextRow(index) {
            return (typeof pluginTableRows[index] === 'undefined') ? false : true;
        }

        function getNextRow() {
            const nextIndex = i + 1;
            if (hasNextRow) {
                return pluginTableRows[nextIndex];
            } else {
                return null;
            }
        }

        function getPluginName(c) {
            const node = c.querySelector('strong');
            return (node) ? node.innerText : "";
        }

        function getPluginAuthor(c) {
            const node = c.querySelector('div.plugin-version-author-uri').querySelector('a');
            return (node) ? node.innerText : "";
        }

        function getPluginRepoUrl(c) {
            const node = c.querySelector('div.plugin-version-author-uri').querySelector('a');
            return (node) ? node.href : "";
        }

        function getPluginVersion(c) {
            const node = c.querySelector('div.plugin-version-author-uri');
            return (node) ? node.innerText.substring(0, 6).replace(/[^\d.]/g, '').trim() : "";
        }

        function getPluginNewVersion(nr) {
            const node = nr.cells[0].querySelector('a');
            return (node) ? node.innerText.replace(/[^\d.]/g, '').trim() : ""; 
        }

        if (row.className.indexOf('plugin-update-tr') === -1) {
            for (var j = 0, col; col = row.cells[j]; j++) {
                if (col.className.match('^plugin-title.*$')) {
                    plugin.name = getPluginName(col);
                }
                if (col.className.indexOf('desc') !== -1) {
                    plugin.author = getPluginAuthor(col);
                    plugin.url = getPluginRepoUrl(col);
                    plugin.version = getPluginVersion(col);
                }
                if (row.className.indexOf('update') !== -1 && getNextRow()) {
                    const nextRow = getNextRow();
                    plugin.update = getPluginNewVersion(nextRow);
                } else {
                    plugin.update = "";
                }
            }
            pluginList.push(plugin);
        }
    }

    console.log("WordPress plugins list:");
    console.table(pluginList, ["name", "author", "url", "version", "update"]);

}) ();

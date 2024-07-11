(function() {

    const pluginsTableNode = document.querySelector('table.plugins');
    const pluginTableRows = pluginsTableNode.tBodies[0].rows;
    let pluginList = [];

    for (let i = 0, row; row = pluginTableRows[i]; i++) {
        const plugin = {};
        for (var j = 0, col; col = row.cells[j]; j++) {
            if (col.className.match('^plugin-title.*$')) {
                const pluginNameNode = col.querySelector('strong');
                plugin.name = pluginNameNode.innerText;
            }
            if (col.className.indexOf('desc') !== -1) {
                const pluginVersion = col.querySelector('div.plugin-version-author-uri');
                plugin.version = pluginVersion.innerText.substring(0, 6).replace(/[^\d.]/g, '').trim();
            }
        }
        pluginList.push(plugin);
    }

    console.log("WordPress plugins list:");
    console.table(pluginList, ["name", "version"]);

})();

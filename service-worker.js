chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: 'OFF'
    });
});

const wpAdminPluginUrlPart = 'wp-admin/plugins.php';

// When the user clicks on the extension action
chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url.indexOf(wpAdminPluginUrlPart) !== -1) {
        // We retrieve the action badge to check if the extension is 'ON' or 'OFF'
        const prevState = await chrome.action.getBadgeText({
            tabId: tab.id
        });
        // Next state will always be the opposite
        const nextState = prevState === 'ON' ? 'OFF' : 'ON';

        // Set the action badge to the next state
        await chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState
        });

        if (nextState === 'ON') {
            await chrome.scripting.executeScript({
                    target: {
                        tabId: tab.id
                    },
                    files: ["list.js"],
                })
                .then(() => console.log("WP Plugins - List js injected!"));
        } else if (nextState === 'OFF') {
            // Anything else?
        }
    }
});

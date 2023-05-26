const CONTEXT_MENU_ID = "hubforceId_selection";

function action(info, tab) {
    if (info.menuItemId !== CONTEXT_MENU_ID) {
        return;
    }

    chrome.storage.local.set({ hubforceSelectionText: info.selectionText }).then(() => console.log('setted'));
}

chrome.contextMenus.create({
    title: "Hubforce AI - Perform an action on the content.",
    contexts: ["selection"],
    id: CONTEXT_MENU_ID
});

chrome.contextMenus.onClicked.addListener(action);
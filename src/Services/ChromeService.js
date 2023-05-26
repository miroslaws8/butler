export class ChromeService {
    static getStorageKey() {
        return 'hubforceActive';
    }

    async getCurrentTab() {
        let queryOptions = { active: true, lastFocusedWindow: true };
        let [tab] = await chrome.tabs.query(queryOptions);
        return tab;
    }
}
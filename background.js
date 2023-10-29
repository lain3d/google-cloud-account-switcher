browser.webRequest.onBeforeRequest.addListener(
    async function (details) {
        // console.log("running...");
        const url = new URL(details.url);
        console.log('running ' + url.hostname);
        if (url.hostname.includes('console.cloud.google.com') && !url.searchParams.has('authuser')) {
            try {
                const result = await browser.storage.sync.get('authuser');
            
                console.log("checking authuser...");
                if (result.authuser) {
                    url.searchParams.append('authuser', result.authuser);
                    console.log("appending authuser...");
                    return { redirectUrl: url.href };
                } else {
                    console.log("authuser not set...");
                }
            } catch (error) {
                console.error('Error fetching authuser', error);
            }
        }
    },
    { urls: ["*://console.cloud.google.com/*"] },
    ["blocking"]
);

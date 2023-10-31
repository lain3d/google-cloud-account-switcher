browser.webRequest.onBeforeRequest.addListener(
    async function (details) {
        try {
            const result = await browser.storage.sync.get('authuser');
            if (result.authuser) {
                
                const url = new URL(details.url);
                
                // Check if we're on a Google Cloud Console URL
                if (url.hostname.includes('console.cloud.google.com')) {
                    
                    // Check if the URL's authuser matches the stored value
                    if (url.searchParams.get('authuser') === result.authuser) {
                        console.log("authuser already set correctly, no redirect needed");
                        return;
                    }
                    
                    // Otherwise, set or update the authuser parameter
                    url.searchParams.set('authuser', result.authuser);
                    
                    console.log("redirecting to URL with updated authuser");
                    return { redirectUrl: url.href };
                }
            } else {
                console.log("authuser not set in storage");
            }
        } catch (error) {
            console.error('Error fetching authuser from storage', error);
        }
    },
    { urls: ["*://console.cloud.google.com/*"] },
    ["blocking"]
);
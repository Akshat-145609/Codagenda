(function() {
    // 1. Keep track of already granted permissions
    const grantedDomains = new Set();

    // 2. Intercept Global Fetch
    const originalFetch = window.fetch;
    window.fetch = async function(url, options) {
        const domain = new URL(url, window.location.origin).hostname;
        
        // If domain is internal or already allowed, proceed
        if (domain === window.location.hostname || grantedDomains.has(domain)) {
            return originalFetch(url, options);
        }
        
        // Ask for permission
        const granted = await requestNetworkPermission(domain);
        if (!granted) {
            console.error(`Codagenda: Request to ${domain} was blocked.`);
            throw new Error("Network request blocked by user: " + domain);
        }
        
        grantedDomains.add(domain);
        return originalFetch(url, options);
    };

    // 3. Robust Permission Modal UI
    function requestNetworkPermission(domain) {
        return new Promise((resolve) => {
            const overlay = document.createElement('div');
            overlay.id = "anh-permission-overlay";
            overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:9999999; display:flex; align-items:center; justify-content:center; padding: 20px;";
            
            overlay.innerHTML = `
                <div style="background:#1e293b; color:white; padding:25px; border-radius:16px; max-width:400px; width:100%; font-family:system-ui, sans-serif; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5);">
                    <h3 style="margin-top:0; color:#3b82f6;">External Connection Required</h3>
                    <p style="color:#94a3b8; font-size:14px;">The code in this preview wants to fetch data from: <br><b style="color:#f8fafc;">${domain}</b></p>
                    <div style="display:flex; gap:12px; justify-content:flex-end; margin-top:20px;">
                        <button id="block-btn" style="padding:10px 16px; border-radius:8px; border:1px solid #475569; background:transparent; color:#94a3b8; cursor:pointer;">Block</button>
                        <button id="allow-btn" style="padding:10px 16px; border-radius:8px; border:none; background:#10b981; color:white; font-weight:bold; cursor:pointer;">Allow Connection</button>
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);

            // Handle Interaction
            const cleanup = (result) => {
                overlay.remove();
                resolve(result);
            };

            document.getElementById('allow-btn').addEventListener('click', () => cleanup(true));
            document.getElementById('block-btn').addEventListener('click', () => cleanup(false));
        });
    }
})();
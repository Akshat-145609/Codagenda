(function() {
    // 1. Intercept Global Fetch
    const originalFetch = window.fetch;
    window.fetch = async function(url, options) {
        const domain = new URL(url, window.location.origin).hostname;
        
        // If domain is not the current page, ask for permission
        if (domain !== window.location.hostname) {
            const granted = await requestNetworkPermission(domain);
            if (!granted) throw new Error("Network request blocked by user: " + domain);
        }
        return originalFetch(url, options);
    };

    // 2. The Permission Modal UI
    function requestNetworkPermission(domain) {
        return new Promise((resolve) => {
            const overlay = document.createElement('div');
            overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); z-index:999999; display:flex; align-items:center; justify-content:center;";
            
            overlay.innerHTML = `
                <div style="background:#1e293b; color:white; padding:20px; border-radius:12px; max-width:400px; font-family:sans-serif;">
                    <h3>External Connection Required</h3>
                    <p>The code wants to fetch content from <b>${domain}</b>. Is this source trusted?</p>
                    <div style="display:flex; gap:10px; justify-content:flex-end;">
                        <button id="block-btn" style="padding:8px 16px;">Block</button>
                        <button id="allow-btn" style="background:#10b981; border:none; color:white; padding:8px 16px; border-radius:4px;">Allow Connection</button>
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);

            document.getElementById('allow-btn').onclick = () => { overlay.remove(); resolve(true); };
            document.getElementById('block-btn').onclick = () => { overlay.remove(); resolve(false); };
        });
    }
})();
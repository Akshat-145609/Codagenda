(function() {
    const grantedDomains = new Set();

    const originalFetch = window.fetch;
    window.fetch = async function(url, options) {
        // Handle relative URLs
        const targetUrl = new URL(url, window.location.origin);
        const domain = targetUrl.hostname;
        
        if (domain === window.location.hostname || grantedDomains.has(domain)) {
            return originalFetch.apply(this, arguments);
        }
        
        const granted = await requestNetworkPermission(domain);
        if (!granted) {
            throw new Error("Network request blocked by user: " + domain);
        }
        
        grantedDomains.add(domain);
        return originalFetch.apply(this, arguments);
    };

    function requestNetworkPermission(domain) {
        return new Promise((resolve) => {
            const overlay = document.createElement('div');
            overlay.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:2147483647; display:flex; align-items:center; justify-content:center; padding: 20px;";
            
            overlay.innerHTML = `
                <div style="background:#1e293b; color:white; padding:25px; border-radius:16px; max-width:400px; width:100%; font-family:sans-serif; box-shadow: 0 20px 25px rgba(0,0,0,0.5);">
                    <h3 style="margin-top:0; color:#3b82f6;">External Connection Required</h3>
                    <p style="color:#94a3b8; font-size:14px;">The code wants to fetch data from: <br><b style="color:#f8fafc;">${domain}</b></p>
                    <div style="display:flex; gap:12px; justify-content:flex-end; margin-top:20px;">
                        <button id="block-btn" style="padding:10px 16px; border-radius:8px; border:1px solid #475569; background:transparent; color:#94a3b8; cursor:pointer;">Block</button>
                        <button id="allow-btn" style="padding:10px 16px; border-radius:8px; border:none; background:#10b981; color:white; font-weight:bold; cursor:pointer;">Allow Connection</button>
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);

            // Use pointerdown instead of click for more responsive event handling in iframes
            const allowBtn = overlay.querySelector('#allow-btn');
            const blockBtn = overlay.querySelector('#block-btn');

            const handleDecision = (val) => {
                overlay.remove();
                resolve(val);
            };

            allowBtn.addEventListener('pointerdown', (e) => { e.stopPropagation(); handleDecision(true); });
            blockBtn.addEventListener('pointerdown', (e) => { e.stopPropagation(); handleDecision(false); });
        });
    }
})();
(function() {
    const branding = document.createElement('div');
    branding.innerHTML = `
        <a href="index.htm" target="_blank" 
           style="position: fixed; bottom: 10px; right: 10px; z-index: 9999; 
                  background: #1e293b; color: #3b82f6; padding: 5px 12px; 
                  border-radius: 6px; font-family: sans-serif; font-size: 11px; 
                  font-weight: 600; text-decoration: none; border: 1px solid #334155;
                  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
            Powered by Codagenda
        </a>
    `;
    document.body.appendChild(branding);
})();
// redirect.js (Logic to trigger a modal)
function showRedirectModal(url) {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div id="redirect-modal" style="position:fixed; top:20%; left:30%; background:#1e293b; padding:20px; border-radius:10px; color:white; z-index:10000;">
            <p>You are about to visit an external link.</p>
            <a href="${url}" target="_blank">Proceed</a>
            <button onclick="document.getElementById('redirect-modal').remove()">Cancel</button>
        </div>
    `;
    document.body.appendChild(modal);
}
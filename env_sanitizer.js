(function() {
    // Prevent AI code from messing with your Hub's main storage
    const protectedKeys = ['hub_token', 'user_session'];
    
    const originalSet = Storage.prototype.setItem;
    Storage.prototype.setItem = function(key, value) {
        if (protectedKeys.includes(key)) {
            console.warn("Codagenda: Blocked unauthorized write to protected storage.");
            return;
        }
        originalSet.apply(this, arguments);
    };
})();
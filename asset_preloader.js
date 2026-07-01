(function() {
    window.CodagendaPreloader = {
        preload: async (urls) => {
            const promises = urls.map(url => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = url;
                    img.onload = resolve;
                    img.onerror = resolve; // Continue even if one fails
                });
            });
            await Promise.all(promises);
            console.log("Assets preloaded successfully.");
        }
    };
})();
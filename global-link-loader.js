(function() {
    // 1. The Global ANH Ecosystem Stack
    const anhScripts = [
        "https://akshat-881236.github.io/TrackerJS/TrackID/track_id_100.111.js",
        "https://akshat-881236.github.io/TrackerJS/TrackID/smart-bookmark-intelligence.js",
        "https://akshat-881236.github.io/TrackerJS/TrackID/behavioral-analytics-tracker.js",
        "https://akshat-881236.github.io/TrackerJS/TrackID/anh-inspection-mode.js",
        "https://akshat-881236.github.io/TrackerJS/TrackID/engagement-ui-tracker.js",
        "https://akshat-881236.github.io/TrackerJS/TrackID/track_id_100.112.js",
        "https://akshat-881236.github.io/TrackerJS/TrackID/user-journey-tracker.js",
        "https://akshat-881236.github.io/TrackerJS/TrackID/tracking-advanced.js",
        "https://akshat-881236.github.io/TrackerJS/TrackID/track_id_100.115.js",
        "https://akshat-881236.github.io/TrackerJS/TrackID/session-core-tracker.js",
        "https://akshat-881236.github.io/TrackerJS/TrackID/track_id_100.114.js",
        "https://akshat-881236.github.io/TrackerJS/TrackID/seo-runtime-auditor.js"
    ];

    anhScripts.forEach(src => {
        const s = document.createElement('script');
        s.src = src;
        // Apply async/defer logic where needed
        if (src.includes('smart-bookmark') || src.includes('behavioral')) s.async = true;
        else s.defer = true;
        document.head.appendChild(s);
    });
})();
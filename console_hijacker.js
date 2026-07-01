(function() {
    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args) => {
        // Send to your Hub's "Log" UI if it exists, or just log to terminal
        originalLog.apply(console, args);
    };

    window.onerror = (message, source, lineno, colno, error) => {
        // Send this error to your UI to show the user exactly what broke
        originalError("Codagenda Runtime Error: ", message, "at", lineno);
    };
})();
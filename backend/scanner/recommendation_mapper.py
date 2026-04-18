RECOMMENDATIONS = {
    "Strict-Transport-Security": (
        "Configure HSTS to enforce HTTPS connections. \n"
        "Recommended Value: 'max-age=63072000; includeSubDomains; preload'\n"
        "Impact: Mitigates Man-in-the-Middle (MitM) attacks and cookie hijacking."
    ),
    "Content-Security-Policy": (
        "Implement a CSP to control resources the user agent is allowed to load. \n"
        "Start with: \"default-src 'self'; script-src 'self' https://trusted.input; object-src 'none';\"\n"
        "Impact: Prevents Cross-Site Scripting (XSS) and data injection attacks."
    ),
    "X-Frame-Options": (
        "Protect against Clickjacking. \n"
        "Recommended Value: 'DENY' or 'SAMEORIGIN'\n"
        "Impact: Prevents the site from being embedded in iframes on malicious sites."
    ),
    "X-Content-Type-Options": (
        "Prevent MIME-sniffing. \n"
        "Recommended Value: 'nosniff'\n"
        "Impact: Forces the browser to strictly follow the declared Content-Type."
    ),
    "Referrer-Policy": (
        "Control how much referrer information is sent. \n"
        "Recommended Value: 'strict-origin-when-cross-origin'\n"
        "Impact: Protects user privacy and prevents leakage of sensitive URL tokens."
    ),
    "Permissions-Policy": (
        "Restrict access to powerful browser features. \n"
        "Recommended Value: \"geolocation=(), microphone=(), camera=()\"\n"
        "Impact: Reduces the attack surface by disabling unused browser APIs."
    ),
    "Cross-Origin-Opener-Policy": (
        "Isolate your browsing context. \n"
        "Recommended Value: 'same-origin'\n"
        "Impact: Prevents other tabs from accessing your window object (Spectre mitigation)."
    ),
    "Cross-Origin-Resource-Policy": (
        "Control who can read your resources. \n"
        "Recommended Value: 'same-origin'\n"
        "Impact: Prevents cross-origin reads of sensitive resources."
    ),
    "Cross-Origin-Embedder-Policy": (
        "Prevent loading cross-origin resources that don't opt-in. \n"
        "Recommended Value: 'require-corp'\n"
        "Impact: Enables high-performance features by ensuring environment isolation."
    ),
    "Upgrade-Insecure-Requests": (
        "Upgrade HTTP to HTTPS. \n"
        "Recommended Value: '1'\n"
        "Impact: Reduces mixed content issues."
    ),
    "Cache-Control": (
        "Prevent sensitive data caching. \n"
        "Recommended Value: 'no-store, max-age=0' for sensitive pages.\n"
        "Impact: Ensures privacy by keeping data off disk and proxy caches."
    ),
    "Clear-Site-Data": (
        "Clear browser data on logout. \n"
        "Recommended Value: '\"cache\", \"cookies\", \"storage\"'\n"
        "Impact: Ensures session cleanup and privacy."
    ),
    "Server": (
        "Information Disclosure Header. \n"
        "Recommendation: Remove this header or set to a generic value.\n"
        "Impact: Hides server version info from attackers."
    ),
    "X-Powered-By": (
        "Information Disclosure Header. \n"
        "Recommendation: Remove this header completely.\n"
        "Impact: Hides framework info from attackers."
    ),
    "X-AspNet-Version": (
        "Information Disclosure Header. \n"
        "Recommendation: Remove this header.\n"
        "Impact: Hides .NET version info."
    )
}

def map_recommendations(analysis):
    for item in analysis:
        if not item['present']:
            item['recommendation'] = RECOMMENDATIONS.get(item['header'], "Review official security guidelines for this header to ensure best practices.")
        else:
            item['recommendation'] = "Header is present. Verify that the configured value allows legitimate functionality while blocking threats."
    return analysis

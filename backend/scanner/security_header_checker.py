SECURITY_HEADERS = {
    # 1. Critical Prevention
    "Strict-Transport-Security": "High",
    "Content-Security-Policy": "High",
    "X-Frame-Options": "Medium",
    "X-Content-Type-Options": "Medium",
    "Referrer-Policy": "Low",

    # 2. Modern Isolation & Permissions
    "Permissions-Policy": "Info",
    "Cross-Origin-Opener-Policy": "Info",
    "Cross-Origin-Resource-Policy": "Info",
    "Cross-Origin-Embedder-Policy": "Info",
    "Upgrade-Insecure-Requests": "Low",
    
    # 3. Privacy & Cleanup
    "Cache-Control": "Low",
    "Clear-Site-Data": "Low",

    # 4. Information Hiding (Headers to Remove)
    "Server": "Info", 
    "X-Powered-By": "Info",
    "X-AspNet-Version": "Info"
}

def analyze_security_headers(headers: dict):
    # Normalize headers to lowercase for case-insensitive lookup
    headers_lower = {k.lower(): v for k, v in headers.items()}
    
    results = []
    for h, severity in SECURITY_HEADERS.items():
        # Check if the header key (lowercase) exists in our normalized dict
        is_present = h.lower() in headers_lower
        results.append({
            "header": h,
            "present": is_present,
            "severity": severity
        })
    return results

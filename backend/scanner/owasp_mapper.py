OWASP_MAP = {
    "Strict-Transport-Security": "WSTG-CRYP-03",
    "Content-Security-Policy": "WSTG-INPV-05",
    "X-Frame-Options": "WSTG-CLNT-09",
    "X-Content-Type-Options": "WSTG-CLNT-10"
}

def map_owasp(analysis):
    for item in analysis:
        item["owasp"] = OWASP_MAP.get(item["header"], "N/A")
    return analysis

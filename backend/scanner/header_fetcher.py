import requests

def fetch_headers(url: str, timeout: int = 20):
    if not url.startswith("http"):
        url = "https://" + url

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1"
    }

    try:
        session = requests.Session()
        # Some sites deny requests without cookies or specific session behavior
        r = session.get(url, headers=headers, timeout=timeout, allow_redirects=True)
        
        return {
            "final_url": r.url,
            "status_code": r.status_code,
            "headers": dict(r.headers)
        }
    except Exception as e:
        return {"error": str(e)}

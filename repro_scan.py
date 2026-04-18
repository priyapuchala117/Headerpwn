from backend.scanner.header_fetcher import fetch_headers
from backend.scanner.security_header_checker import analyze_security_headers
from backend.scanner.owasp_mapper import map_owasp

if __name__ == "__main__":
    url = "https://www.google.com"
    print(f"Scanning {url}...")
    
    result = fetch_headers(url, timeout=20)
    
    if "error" in result:
        print(f"Error: {result['error']}")
    else:
        print(f"\n--- Final Response [{result['status_code']}] {result['final_url']} ---")
        print("Raw Headers found:")
        for k, v in result['headers'].items():
            print(f"  {k}: {v}")
        
        analysis = analyze_security_headers(result['headers'])
        owasp = map_owasp(analysis)
        
        print("\nAnalysis Results:")
        for item in owasp:
            print(f"  {item['header']}: Present={item['present']}, Severity={item['severity']}, OWASP={item.get('owasp')}")

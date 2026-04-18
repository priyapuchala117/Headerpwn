import requests
from backend.fuzzer.header_payloads import get_all_payloads

def run_header_fuzz(url, timeout=10, baseline_status=None):
    results = []

    for ptype, payload in get_all_payloads():
        try:
            r = requests.get(url, headers=payload, timeout=timeout)
            anomaly = baseline_status is not None and r.status_code != baseline_status
            results.append({
                "type": ptype,
                "payload": payload,
                "status_code": r.status_code,
                "anomaly": anomaly
            })
        except Exception as e:
            error_msg = str(e)
            is_block = "RemoteDisconnected" in error_msg or "Connection aborted" in error_msg
            results.append({
                "type": ptype,
                "payload": payload,
                "error": "WAF/Firewall Blocked Request" if is_block else error_msg,
                "anomaly": is_block  # Treat blocks as interesting anomalies
            })

    return results

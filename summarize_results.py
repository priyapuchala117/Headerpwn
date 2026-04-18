import json

try:
    with open('scan_success.json', 'r', encoding='utf-16') as f:
        data = json.load(f)
except Exception:
    with open('scan_success.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

if 'value' in data:
    data = data['value']

print(f"Data Type: {type(data)}")

if isinstance(data, dict):
    for k, v in data.items():
        if isinstance(v, list):
            print(f"Key: {k}, Type: list, Len: {len(v)}")
        elif isinstance(v, dict):
            print(f"Key: {k}, Type: dict, Keys: {list(v.keys())}")
        else:
            print(f"Key: {k}, Type: {type(v)}, Val: {str(v)[:100]}")
elif isinstance(data, list):
    print(f"Top Level List Len: {len(data)}")
    if len(data) > 0:
        print(f"Item 0 Keys: {list(data[0].keys())}")

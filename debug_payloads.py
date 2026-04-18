import sys
import os

# Add cwd to sys.path
sys.path.insert(0, os.getcwd())

try:
    import backend
    print(f"Backend Location: {backend.__file__}")
except ImportError:
    print("Backend not found")

try:
    from backend.fuzzer.header_payloads import get_all_payloads
    print(f"Payloads: {get_all_payloads()}")
except Exception as e:
    print(f"Error importing payloads: {e}")

try:
    from backend.fuzzer import fuzz_engine
    print(f"Fuzz Engine Location: {fuzz_engine.__file__}")
except Exception as e:
    print(f"Error importing fuzz_engine: {e}")

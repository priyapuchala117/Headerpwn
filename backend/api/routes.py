from fastapi import APIRouter, HTTPException
from backend.api.schemas import ScanRequest
from backend.scanner.header_fetcher import fetch_headers
from backend.scanner.security_header_checker import analyze_security_headers
from backend.scanner.owasp_mapper import map_owasp
from backend.scanner.recommendation_mapper import map_recommendations
from backend.scanner.risk_score import calculate_risk_score
from backend.fuzzer.fuzz_engine import run_header_fuzz

router = APIRouter()

@router.post("/scan")
def scan(req: ScanRequest):
    result = fetch_headers(req.url)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])

    analysis = analyze_security_headers(result["headers"])
    owasp = map_owasp(analysis)
    analysis = map_recommendations(analysis) # Add recommendations
    risk = calculate_risk_score(analysis)

    fuzz = []
    if req.enable_fuzzing:
        fuzz = run_header_fuzz(
            req.url,
            timeout=req.timeout,
            baseline_status=result["status_code"]
        )

    return {
        "url": req.url,
        "status_code": result["status_code"],
        "headers": result["headers"],
        "analysis": analysis,
        "owasp": owasp,
        "risk_score": risk,
        "fuzzing": fuzz
    }

from fastapi.responses import FileResponse
from backend.reports.pdf_generator import generate_pdf_report
import os

@router.post("/scan/report")
async def get_report(data: dict):
    # Determine absolute path for report
    # Using temp file or specific location
    report_path = "scan_report.pdf"
    generate_pdf_report(data, report_path)
    
    return FileResponse(
        report_path, 
        media_type='application/pdf', 
        filename="Headerpwn_Report.pdf"
    )

from fpdf import FPDF
import datetime

class SecurityReport(FPDF):
    def header(self):
        if self.page_no() == 1:
            return # No header on cover page
            
        # Standard Header
        self.set_fill_color(30, 41, 59) # Slate-800
        self.rect(0, 0, 210, 20, 'F')
        self.set_font('Arial', 'B', 10)
        self.set_text_color(255, 255, 255)
        self.set_xy(10, 5)
        self.cell(0, 10, 'Headerpwn X - Security Audit', 0, 0, 'L')
        self.cell(0, 10, datetime.datetime.now().strftime('%Y-%m-%d'), 0, 0, 'R')
        self.ln(25)

    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.set_text_color(128)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')

    def chapter_title(self, label):
        self.set_font('Arial', 'B', 16)
        self.set_text_color(15, 23, 42) # Slate-900
        self.cell(0, 10, label, 0, 1, 'L')
        self.ln(5)
        # Line
        self.set_draw_color(99, 102, 241) # Indigo-500
        self.set_line_width(1)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(10)

def generate_pdf_report(data, filename="report.pdf"):
    pdf = SecurityReport()
    pdf.set_auto_page_break(auto=True, margin=20)
    
    # --- COVER PAGE ---
    pdf.add_page()
    
    # Background
    pdf.set_fill_color(15, 23, 42) # Slate-950
    pdf.rect(0, 0, 210, 297, 'F')
    
    # Title
    pdf.set_font('Arial', 'B', 36)
    pdf.set_text_color(255, 255, 255)
    pdf.set_y(80)
    pdf.cell(0, 15, "Security Analysis Report", 0, 1, 'C')
    
    pdf.set_font('Arial', '', 18)
    pdf.set_text_color(148, 163, 184) # Slate-400
    pdf.cell(0, 15, "Target Domain Audit", 0, 1, 'C')
    
    # Domain Box
    pdf.ln(20)
    pdf.set_font('Arial', 'B', 24)
    pdf.set_text_color(99, 102, 241) # Indigo-500
    pdf.cell(0, 20, data['url'], 0, 1, 'C')
    
    # Date
    pdf.set_y(230)
    pdf.set_font('Arial', '', 12)
    pdf.set_text_color(148, 163, 184)
    pdf.cell(0, 10, f"Generated on: {datetime.datetime.now().strftime('%B %d, %Y')}", 0, 1, 'C')
    
    # --- EXECUTIVE SUMMARY ---
    pdf.add_page()
    pdf.chapter_title("Executive Summary")
    
    # Score Card
    score = 100 - (data.get('risk_score', 0)) # Using Security Score
    pdf.set_font("Arial", 'B', 14)
    pdf.cell(50, 10, "Security Score:", 0, 0)
    
    if score >= 80: 
        pdf.set_text_color(22, 163, 74) # Green
        grade = "Excellent (A)"
    elif score >= 60: 
        pdf.set_text_color(217, 119, 6) # Orange
        grade = "Moderate (C)"
    else: 
        pdf.set_text_color(220, 38, 38) # Red
        grade = "Critical (F)"

    pdf.cell(0, 10, f"{score}/100 - {grade}", 0, 1)
    pdf.ln(10)
    
    # Summary Text
    pdf.set_font("Arial", '', 12)
    pdf.set_text_color(0)
    pdf.multi_cell(0, 8, f"This report provides a comprehensive security analysis of HTTP response headers for {data['url']}. The scan identified potential vulnerabilities related to missing or misconfigured security headers.")
    pdf.ln(10)
    
    # Stats
    analysis = data['analysis']
    missing_high = len([x for x in analysis if not x['present'] and x['severity'] == 'High'])
    missing_med = len([x for x in analysis if not x['present'] and x['severity'] == 'Medium'])
    passed = len([x for x in analysis if x['present']])
    
    pdf.set_fill_color(241, 245, 249)
    pdf.cell(60, 20, f"Critical Issues: {missing_high}", 1, 0, 'C', True)
    pdf.cell(60, 20, f"Warnings: {missing_med}", 1, 0, 'C', True)
    pdf.cell(60, 20, f"Passed Checks: {passed}", 1, 1, 'C', True)
    pdf.ln(15)

    # --- DETAILED FINDINGS ---
    pdf.chapter_title("Detailed Technical Findings")
    
    pdf.set_font("Arial", 'B', 10)
    pdf.set_fill_color(226, 232, 240)
    
    # Iterate findings
    for item in analysis:
        # Header Name bar
        pdf.set_font("Arial", 'B', 11)
        if item['present']:
            pdf.set_fill_color(220, 252, 231) # Light Green
            pdf.set_text_color(21, 128, 61)
            status_icon = "[PASS]"
        else:
            if item['severity'] == 'High':
                pdf.set_fill_color(254, 226, 226) # Light Red
                pdf.set_text_color(185, 28, 28)
                status_icon = "[FAIL]"
            elif item['severity'] == 'Medium':
                pdf.set_fill_color(255, 237, 213) # Light Orange
                pdf.set_text_color(194, 65, 12)
                status_icon = "[WARN]"
            else:
                pdf.set_fill_color(241, 245, 249)
                pdf.set_text_color(71, 85, 105)
                status_icon = "[INFO]"

        pdf.cell(0, 8, f" {status_icon} {item['header']}", 0, 1, 'L', True)
        
        # Details
        pdf.set_font("Arial", '', 10)
        pdf.set_text_color(51, 65, 85)
        
        # Indent content
        start_x = pdf.get_x() + 5
        pdf.set_x(start_x)
        
        if not item['present']:
             pdf.multi_cell(0, 6, f"Severity: {item['severity']}")
             pdf.set_x(start_x)
             pdf.multi_cell(0, 6, f"Description: Missing security header.")
             pdf.set_x(start_x)
             pdf.set_font("Arial", 'I', 10)
             pdf.multi_cell(0, 6, f"Recommendation: {item.get('recommendation', 'N/A')}")
        else:
             pdf.multi_cell(0, 6, f"Configured Value: {str(item.get('value', 'Present'))[:80]}")
        
        pdf.ln(5)

    # --- OWASP MAPPING ---
    if 'owasp' in data:
        pdf.add_page()
        pdf.chapter_title("OWASP Compliance Mapping")
        
        pdf.set_font("Arial", 'B', 10)
        pdf.set_fill_color(30, 41, 59)
        pdf.set_text_color(255, 255, 255)
        pdf.cell(60, 8, "Header", 1, 0, 'C', True)
        pdf.cell(40, 8, "OWASP Ref", 1, 0, 'C', True)
        pdf.cell(90, 8, "Requirement", 1, 1, 'C', True)
        
        pdf.set_font("Arial", '', 9)
        pdf.set_text_color(0)
        
        for o in data['owasp']:
             clean_ref = o.get('ref', 'N/A')
             clean_req = o.get('requirement', 'N/A')
             # Simple truncation for table fit
             pdf.cell(60, 8, o['header'], 1)
             pdf.cell(40, 8, clean_ref, 1)
             pdf.cell(90, 8, clean_req[:50], 1, 1)

    pdf.output(filename)
    return filename

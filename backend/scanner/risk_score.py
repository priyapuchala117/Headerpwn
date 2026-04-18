WEIGHTS = {"High": 15, "Medium": 5, "Low": 1, "Info": 0}

def calculate_risk_score(analysis):
    score = 0
    for a in analysis:
        if not a["present"]:
            score += WEIGHTS.get(a["severity"], 1)
    return score

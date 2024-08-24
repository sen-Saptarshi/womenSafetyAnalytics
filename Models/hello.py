def calculate_women_safety_risk(time_of_day, male_female_ratio,  historical_crime_rate):
    
    # Assign weights to each factor
    weights = {
        'time_of_day': 0.3,
        'male_female_ratio': 0.3,
        'historical_crime_rate': 0.2
    }
    time_of_day= input("Enter DAY/NIGHT ")
    # Calculate time of day risk score
    if time_of_day.lower() == 'night':
        time_risk_score = 1.0  # Night carries a higher risk
    else:
        time_risk_score = 0.3  # Day carries a lower risk

    # Normalize male-to-female ratio (higher ratio means higher risk)
    male_female_ratio= float(input("Enter MF Ratio"))
    male_female_risk_score = min(male_female_ratio / 5.0, 1.0)  # Assume a maximum ratio of 5:1

   
    historical_crime_rate= float(input("Enter Your Historical Data "))
    # Use historical crime rate as is (already normalized)
    crime_risk_score = historical_crime_rate

    # Calculate weighted risk
    overall_risk_score = (
        time_risk_score * weights['time_of_day'] +
        male_female_risk_score * weights['male_female_ratio'] +
        crime_risk_score * weights['historical_crime_rate']
    )

    # Convert to percentage
    risk_percentage = overall_risk_score * 100

    # Cap the risk percentage at 100%
    return min(risk_percentage, 100)

# Example usage
time_of_day = 'night'
male_female_ratio = 3.0
historical_crime_rate = 0.7

risk_percentage = calculate_women_safety_risk(time_of_day, male_female_ratio,  historical_crime_rate)
print(f"Calculated Risk Percentage for Women's Safety: {risk_percentage:.2f}%")

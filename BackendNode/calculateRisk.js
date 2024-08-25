const calculateWomenSafetyRisk = (
  timeOfDay,
  maleFemaleRatio,
  historicalCrimeRate
) => {
  // Assign weights to each factor
  const weights = {
    timeOfDay: 0.3,
    maleFemaleRatio: 0.3,
    historicalCrimeRate: 0.2,
  };

  // Calculate time of day risk score
  let timeRiskScore;
  if (timeOfDay>=18 || timeOfDay<=6) {
    timeRiskScore = 1.0; // Night carries a higher risk
  } else {
    timeRiskScore = 0.3; // Day carries a lower risk
  }

  // Normalize male-to-female ratio (higher ratio means higher risk)
  const maleFemaleRiskScore = Math.min(maleFemaleRatio / 5.0, 1.0); // Assume a maximum ratio of 5:1

  // Use historical crime rate as is (already normalized)
  const crimeRiskScore = historicalCrimeRate;

  // Calculate weighted risk
  const overallRiskScore =
    timeRiskScore * weights.timeOfDay +
    maleFemaleRiskScore * weights.maleFemaleRatio +
    crimeRiskScore * weights.historicalCrimeRate;

  // Convert to percentage
  const riskPercentage = overallRiskScore * 100;

  // Cap the risk percentage at 100%
  return Math.min(riskPercentage, 100);
};

module.exports = calculateWomenSafetyRisk;

// Example usage
// const timeOfDay = "night";
// const maleFemaleRatio = 3.0;
// const historicalCrimeRate = 0.7;

// const riskPercentage = calculateWomenSafetyRisk(
//   timeOfDay,
//   maleFemaleRatio,
//   historicalCrimeRate
// );
// console.log(
//   `Calculated Risk Percentage for Women's Safety: ${riskPercentage.toFixed(2)}%`
// );

export const convertToKeyValueArray = (details: { [key: string]: any }) => {
  const mapKeys: { [key: string]: string } = {
    grossSalary: "Gross Salary",
    netSalary: "Net Salary",
    socialInsurance: "Social Insurance",
    healthInsurance: "Health Insurance",
    unemployedInsurance: "Unemployed Insurance",
    taxDeductions: "Tax Deductions",
    personalIncomeTax: "Personal Income Tax",
  };

  return Object.keys(details).map((key) => ({
    key: mapKeys[key] || key,
    value: details[key],
  }));
};

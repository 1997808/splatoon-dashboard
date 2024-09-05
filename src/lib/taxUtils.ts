interface TaxPayload {
  incomeType: string;
  income: string;
  personalDeduction: string;
  dependentDeduction: string;
  numDependents: number;
  insuranceContributions: string;
  otherDeductions?: number | any;
  taxYear?: string | any;
  maritalStatus?: string | any;
  residencyStatus?: string | any;
}

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

export const calculateTax = (payload: TaxPayload) => {
  const {
    incomeType,
    income,
    personalDeduction,
    dependentDeduction,
    numDependents,
    insuranceContributions,
    otherDeductions,
    taxYear,
    maritalStatus,
    residencyStatus,
  } = payload;
  let grossSalary = 0;
  let netSalary = 0;
  let socialInsurance = 0;
  let healthInsurance = 0;
  let unemployedInsurance = 0;
  let personalIncomeTax = 0;
  let taxDeductions = 0;

  if (incomeType === "gross") {
    grossSalary = Number(income);
    let insuranceSalary =
      insuranceContributions === "Full"
        ? grossSalary
        : Number(insuranceContributions);

    socialInsurance = 0.08 * insuranceSalary;
    healthInsurance = 0.015 * insuranceSalary;
    unemployedInsurance = 0.01 * insuranceSalary;
    taxDeductions =
      Number(personalDeduction) +
      Number(dependentDeduction) * numDependents +
      socialInsurance +
      healthInsurance +
      unemployedInsurance;
    personalIncomeTax = vietnamPersonalIncomeTax(grossSalary - taxDeductions);
    netSalary =
      grossSalary -
      personalIncomeTax -
      socialInsurance -
      healthInsurance -
      unemployedInsurance;
  } else {
    netSalary = Number(income);
    const tempTaxDeductions =
      Number(personalDeduction) + Number(dependentDeduction) * numDependents;
    personalIncomeTax = vietnamPersonalIncomeTaxFromNet(
      netSalary - tempTaxDeductions,
    );
    let insuranceSalary = 0;
    if (insuranceContributions === "Full") {
      grossSalary = (netSalary + personalIncomeTax) / 0.895;
      socialInsurance = 0.08 * grossSalary;
      healthInsurance = 0.015 * grossSalary;
      unemployedInsurance = 0.01 * grossSalary;
    } else {
      insuranceSalary = Number(insuranceContributions);
      socialInsurance = 0.08 * insuranceSalary;
      healthInsurance = 0.015 * insuranceSalary;
      unemployedInsurance = 0.01 * insuranceSalary;
      grossSalary =
        netSalary +
        personalIncomeTax +
        socialInsurance +
        healthInsurance +
        unemployedInsurance;
    }
    taxDeductions =
      Number(personalDeduction) +
      Number(dependentDeduction) * numDependents +
      socialInsurance +
      healthInsurance +
      unemployedInsurance;
  }

  const result = {
    grossSalary,
    socialInsurance,
    healthInsurance,
    unemployedInsurance,
    taxDeductions,
    personalIncomeTax,
    netSalary,
  };
  return result;
};

const vietnamPersonalIncomeTax = (grossSalary: number) => {
  const million = 1000000;
  if (grossSalary > 80 * million)
    return 18.15 * million + 0.35 * (grossSalary - 80 * million);
  if (grossSalary > 52 * million)
    return 9.75 * million + 0.3 * (grossSalary - 52 * million);
  if (grossSalary > 32 * million)
    return 4.75 * million + 0.25 * (grossSalary - 32 * million);
  if (grossSalary > 18 * million)
    return 1.95 * million + 0.2 * (grossSalary - 18 * million);
  if (grossSalary > 10 * million)
    return 0.75 * million + 0.15 * (grossSalary - 10 * million);
  if (grossSalary > 5 * million)
    return 0.25 * million + 0.1 * (grossSalary - 5 * million);
  if (grossSalary > 0) return 0.05 * grossSalary;
  return 0;
};

const vietnamPersonalIncomeTaxFromNet = (netTaxes: number) => {
  const million = 1000000;
  if (netTaxes > 61.85 * million)
    return (netTaxes - 9.85 * million) / 0.65 - netTaxes;
  if (netTaxes > 42.25 * million)
    return (netTaxes - 5.85 * million) / 0.7 - netTaxes;
  if (netTaxes > 27.25 * million)
    return (netTaxes - 3.25 * million) / 0.75 - netTaxes;
  if (netTaxes > 16.05 * million)
    return (netTaxes - 1.65 * million) / 0.8 - netTaxes;
  if (netTaxes > 9.25 * million)
    return (netTaxes - 0.75 * million) / 0.85 - netTaxes;
  if (netTaxes > 4.75 * million)
    return (netTaxes - 0.25 * million) / 0.9 - netTaxes;
  if (netTaxes > 0) return netTaxes / 0.95 - netTaxes;
  return 0;
};

// grossSalary: 0,
// socialInsurance: 0,
// healthInsurance: 0,
// unemployedInsurance: 0,
// taxDeductions: 0,
// personalIncomeTax: 0,
// netSalary: 0

export const calculateStablePayment = (
  loanAmount: number,
  annualInterestRate: number,
  loanTermYears: number,
) => {
  const r = annualInterestRate / 100 / 12; // Monthly interest rate
  const n = loanTermYears * 12; // Loan term in months

  // Calculate monthly payment using amortized loan formula
  const averagePayment =
    (loanAmount * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);

  // Total payment over the loan period
  const totalPayment = averagePayment * n;

  // Total interest paid
  const totalInterest = totalPayment - loanAmount;

  return {
    totalPayment: Math.floor(totalPayment),
    totalInterest: Math.floor(totalInterest),
    averagePayment: Math.floor(averagePayment),
  };
};

/**
 * Calculates the details of a loan with a declining payment schedule.
 * @param loanAmount The total amount of the loan.
 * @param annualInterestRate The annual interest rate as a decimal.
 * @param loanTermYears The length of the loan in years.
 * @returns An object with the following properties:
 *  - `firstPayment`: the first payment amount
 *  - `lastPayment`: the last payment amount
 *  - `totalPayment`: the total amount paid over the life of the loan
 *  - `totalInterest`: the total interest paid over the life of the loan
 *  - `averagePayment`: the average payment amount
 */
export const calculateDecliningPayments = (
  loanAmount: number,
  annualInterestRate: number,
  loanTermYears: number,
) => {
  const r = annualInterestRate / 100 / 12; // Monthly interest rate
  const n = loanTermYears * 12; // Loan term in months
  const monthlyPrincipalRepayment = loanAmount / n; // Fixed monthly principal repayment

  let totalInterest = 0;
  let totalPayment = 0;

  // Array to store payments for each month
  const payments: number[] = [];

  // Calculate payments for each month
  for (let i = 1; i <= n; i++) {
    const remainingPrincipal = loanAmount - (i - 1) * monthlyPrincipalRepayment;
    const interestPayment = remainingPrincipal * r;
    const totalMonthlyPayment = monthlyPrincipalRepayment + interestPayment;

    payments.push(parseFloat(totalMonthlyPayment.toFixed(2)));
    totalInterest += interestPayment;
    totalPayment += totalMonthlyPayment;
  }

  const firstPayment = payments[0];
  const lastPayment = payments[payments.length - 1];
  const averagePayment = totalPayment / n;

  return {
    firstPayment: Math.floor(firstPayment),
    lastPayment: Math.floor(lastPayment),
    totalPayment: Math.floor(totalPayment),
    totalInterest: Math.floor(totalInterest),
    averagePayment: Math.floor(averagePayment),
  };
};

export const calculateInterestOnlyLoan = (
  loanAmount: number,
  annualInterestRate: number,
  loanTermYears: number,
) => {
  const r = annualInterestRate / 100 / 12; // Monthly interest rate
  const n = loanTermYears * 12; // Loan term in months

  // Monthly interest-only payment
  const averagePayment = loanAmount * r;

  // Total interest over the loan term
  const totalInterest = averagePayment * n;

  // Total payment (interest payments + principal repayment at the end)
  const totalPayment = totalInterest + loanAmount;

  return {
    averagePayment: Math.floor(averagePayment),
    totalInterest: Math.floor(totalInterest),
    totalPayment: Math.floor(totalPayment),
  };
};

export const calculateDepositCharge = (amount) => {
    return amount * 0.02;
};
export const calculateWithdrawalCharge = (amount) => {
    return amount * 0.04;
};
export const calculateRemainingLoan = (amount, duration) => {
    return amount - amount * (0.08 * duration);
};
export const calculateFDTotal = (amount, duration) => {
    return amount + amount * (0.06 * duration);
};
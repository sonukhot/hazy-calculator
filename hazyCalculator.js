function isSkippedValue(value) {
  return !value
}

function isNumericValue(value) {
  return !isNaN(value) && value !== ''
}

function isNothingValue(value) {
  return value === null || value === undefined
}

function isAcceptableValue(value) {
  const operators = ['+', '-', '*', '/']
  return isNumericValue(value) || operators.includes(value) || isSkippedValue(value)
}

function performCalculationStep(firstOperand, operator, secondOperand) {
  switch (operator) {
    case '+':
      return firstOperand + secondOperand
    case '-':
      return firstOperand - secondOperand
    case '*':
      return firstOperand * secondOperand
    case '/':
      return firstOperand / secondOperand
    default:
      throw new Error('Invalid input!')
  }
}

function calculate(calculationSteps) {
  let total
  let operator

  calculationSteps.forEach(nextCalculationStep => {
    if (!isAcceptableValue(nextCalculationStep)) {
      throw new Error('Invalid input!')
    }

    if (isNothingValue(total) && isNumericValue(nextCalculationStep)) {
      total = Number(nextCalculationStep)

    } else if (isNothingValue(operator) && !isSkippedValue(nextCalculationStep)) {
      operator = nextCalculationStep

    } else if (isNumericValue(nextCalculationStep)) {
      total = performCalculationStep(total, operator, Number(nextCalculationStep))
      operator = null

    } else if (!isSkippedValue(nextCalculationStep)) {
      throw new Error('Invalid input!')
    }
  })

  return total
}

module.exports = calculate

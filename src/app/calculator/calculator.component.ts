import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {

  inputExpression: string = '';
  result: number | string = '';

  numbers: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  operators: string[] = ['+', '-', '*', '/'];

  appendToExpression(value: string): void {
    this.inputExpression += value;
    this.evaluateExpression();
  }

  clearExpression(): void {
    this.inputExpression = '';
    this.result = '';
  }

  evaluateExpression(): void {
    try {
      this.result = this.calculate(this.inputExpression);
    } catch (error) {
      this.result = 'Invalid expression';
    }
  }

  calculate(expression: string): number {
    // Regular expression to match numbers and operators
    const tokens = expression.match(/(\d+|\+|\-|\*|\/)/g);
    if (!tokens) throw new Error('Invalid expression');

    let currentValue = parseFloat(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const nextValue = parseFloat(tokens[i + 1]);
      switch (operator) {
        case '+':
          currentValue += nextValue;
          break;
        case '-':
          currentValue -= nextValue;
          break;
        case '*':
          currentValue *= nextValue;
          break;
        case '/':
          currentValue /= nextValue;
          break;
        default:
          throw new Error('Invalid operator');
      }
    }

    return currentValue;
  }

}

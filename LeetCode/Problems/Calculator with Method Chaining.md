# 2726. Calculator with Method Chaining

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/calculator-with-method-chaining](https://leetcode.com/problems/calculator-with-method-chaining)
**Companies:** Bloomberg, Microsoft

---

## 1. Problem Description

Design a `Calculator` class that supports `add`, `subtract`, `multiply`, `divide`, `power`, and `getResult` with method chaining. Division by zero should throw an error. *(JavaScript problem)*

---

## 2. Approach: Return `this` for Chaining — O(1) per op ✅

```javascript
class Calculator {
    constructor(value) {
        this.result = value;
    }
    add(value)      { this.result += value; return this; }
    subtract(value) { this.result -= value; return this; }
    multiply(value) { this.result *= value; return this; }
    divide(value) {
        if (value === 0) throw "Division by zero is not allowed";
        this.result /= value;
        return this;
    }
    power(value)    { this.result **= value; return this; }
    getResult()     { return this.result; }
}
```

---

## Key Takeaway

> Method chaining: each mutating method returns `this`. This enables fluent API patterns like `new Calculator(10).add(5).subtract(2).getResult()`.

# 2726. Calculator with Method Chaining

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/calculator-with-method-chaining](https://leetcode.com/problems/calculator-with-method-chaining)
**Companies:** Bloomberg, Microsoft

---

## 1. Problem Description

Design a `Calculator` class that supports `add`, `subtract`, `multiply`, `divide`, `power`, and `getResult` with method chaining. Division by zero should throw an error. *(JavaScript problem)*

---

## 2. Examples

**Example 1:**
```text
new Calculator(10).add(5).subtract(3).multiply(2).divide(4).power(3).getResult()
```
- Start with 10.
- +5 → 15
- -3 → 12
- *2 → 24
- /4 → 6
- ^3 → 216
- Result = 216.

**Example 2 (error):**
```text
new Calculator(5).divide(0).getResult()
```
- Throws an error because division by zero is not allowed.

---

## 3. Walkthrough

1. `new Calculator(10)` creates an instance with `result = 10`.
2. `.add(5)` updates `result` to 15 and returns `this`.
3. `.subtract(3)` updates `result` to 12 and returns `this`.
4. `.multiply(2)` updates `result` to 24 and returns `this`.
5. `.divide(4)` updates `result` to 6 and returns `this`.
6. `.power(3)` updates `result` to 216 and returns `this`.
7. `.getResult()` returns the final `result` (216).

---

## 4. Approach: Return `this` for Chaining — O(1) per op ✅

```text
CLASS Calculator:
    CONSTRUCTOR(initialValue):
        SET result ← initialValue
    
    FUNCTION add(value):
        SET result ← result + value
        RETURN self
    
    FUNCTION subtract(value):
        SET result ← result - value
        RETURN self
    
    FUNCTION multiply(value):
        SET result ← result * value
        RETURN self
    
    FUNCTION divide(value):
        IF value == 0:
            THROW "Division by zero is not allowed"
        SET result ← result / value
        RETURN self
    
    FUNCTION power(value):
        SET result ← result ^ value
        RETURN self
    
    FUNCTION getResult():
        RETURN result
```

---

## 5. Complexity Analysis

- **Time:** O(1) per chained operation – each method performs a constant‑time arithmetic update.
- **Space:** O(1) – only the `result` field is stored.

---

## 6. Follow-Up Questions
- How would you extend the API to support parentheses or expression parsing?
- Can you make the class immutable, returning a new `Calculator` instance after each operation?
- How would you handle overflow or large integer arithmetic?

---

## Key Takeaway

> Method chaining works by having each mutating method return the instance (`this`). This enables a fluent API where multiple operations are composed in a single expression.

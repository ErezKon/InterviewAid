# 2469. Convert the Temperature

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/convert-the-temperature](https://leetcode.com/problems/convert-the-temperature)
**Companies:** Amazon, Google

---

## 1. Problem Description

You are given a non-negative floating point number rounded to two decimal places `celsius`, that denotes the **temperature in Celsius**.

You should convert Celsius into **Kelvin** and **Fahrenheit** and return it as an array `ans = [kelvin, fahrenheit]`.

Return *the array* `ans`. Answers within `10^-5` of the actual answer will be accepted.

**Note that:**

- `Kelvin = Celsius + 273.15`
- `Fahrenheit = Celsius * 1.80 + 32.00`

**Constraints:**
- `0 <= celsius <= 1000`

---

## 2. Examples

```
Example 1:
  Input: celsius = 36.50
  Output: [309.65000,97.70000]
  Explanation: Temperature at 36.50 Celsius converted in Kelvin is 309.65 and converted in Fahrenheit is 97.70.
```
```
Example 2:
  Input: celsius = 122.11
  Output: [395.26000,251.79800]
  Explanation: Temperature at 122.11 Celsius converted in Kelvin is 395.26 and converted in Fahrenheit is 251.798.
```

---

## 3. Approach: Direct Formula — O(1) ✅

```text
FUNCTION convertTemperature(celsius):
    // Kelvin = Celsius + 273.15
    // Fahrenheit = Celsius * 1.8 + 32
    SET kelvin ← celsius + 273.15
    SET fahrenheit ← celsius * 1.8 + 32.0
    RETURN [kelvin, fahrenheit]
```

---

## 4. Walkthrough

For `celsius = 0`:
1. Compute `kelvin = 0 + 273.15 = 273.15`.
2. Compute `fahrenheit = 0 * 1.8 + 32 = 32`.
3. Return `[273.15, 32]`.

For `celsius = 100`:
1. `kelvin = 100 + 273.15 = 373.15`.
2. `fahrenheit = 100 * 1.8 + 32 = 212`.
3. Return `[373.15, 212]`.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(1) | O(1) |

Both time and space are constant because the computation involves a few arithmetic operations.

---

## 6. Follow-Up Questions

- How would you handle temperature conversion for an array of Celsius values efficiently?
- What if the input temperature could be a floating‑point number with high precision?
- Can you extend the function to support conversion to Rankine as well?

---

## Key Takeaway

> Kelvin = Celsius + 273.15, Fahrenheit = Celsius × 1.8 + 32.

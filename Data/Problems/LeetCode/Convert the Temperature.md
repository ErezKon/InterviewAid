# 2469. Convert the Temperature

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/convert-the-temperature](https://leetcode.com/problems/convert-the-temperature)
**Companies:** Amazon, Google

---

## 1. Problem Description

Given a temperature in Celsius, convert it to Kelvin and Fahrenheit. Return `[kelvin, fahrenheit]`.

---

## 2. Examples

**Example 1:**
```
Input: celsius = 0
Output: [273.15, 32.0]
Explanation: 0°C = 273.15K and 0°C = 32°F.
```

**Example 2:**
```
Input: celsius = 100
Output: [373.15, 212.0]
Explanation: 100°C = 373.15K and 100°C = 212°F.
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

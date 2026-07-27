# 2469. Convert the Temperature

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/convert-the-temperature](https://leetcode.com/problems/convert-the-temperature)
**Companies:** Amazon, Google

---

## 1. Problem Description

Given a temperature in Celsius, convert it to Kelvin and Fahrenheit. Return `[kelvin, fahrenheit]`.

---

## 2. Approach: Direct Formula — O(1) ✅

```
FUNCTION convertTemperature(celsius):
    RETURN [celsius + 273.15, celsius * 1.8 + 32.0]
```

| Time | Space |
|------|-------|
| O(1) | O(1) |

---

## Key Takeaway

> Kelvin = Celsius + 273.15, Fahrenheit = Celsius × 1.8 + 32.

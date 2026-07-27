# 319. Bulb Switcher

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/bulb-switcher](https://leetcode.com/problems/bulb-switcher)
**Companies:** Accenture, Amazon, Bloomberg, Google, Infosys, Linkedin, Meta, Microsoft, Tcs

---

## Approach: Math — O(1) ✅

```
FUNCTION bulbSwitch(n):
    RETURN floor(sqrt(n))
```

A bulb ends ON if toggled an odd number of times. Bulb i is toggled by each of its divisors. Only perfect squares have an odd number of divisors.

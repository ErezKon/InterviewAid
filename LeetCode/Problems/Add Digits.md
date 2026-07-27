# 258. Add Digits

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/add-digits](https://leetcode.com/problems/add-digits)
**Companies:** Adobe, Amazon, Bloomberg, Google, Infosys, Meta, Microsoft, Pega, Uber, Visa

---

## Digital Root — O(1) ✅

```
FUNCTION addDigits(num):
    IF num == 0: RETURN 0
    RETURN 1 + (num - 1) % 9
```

Mathematical formula for digital root. No loops needed.

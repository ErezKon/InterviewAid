# 1736. Latest Time by Replacing Hidden Digits

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/latest-time-by-replacing-hidden-digits](https://leetcode.com/problems/latest-time-by-replacing-hidden-digits)
**Companies:** Google

---

## 1. Problem Description

Given time string `"HH:MM"` with some `?` digits, replace `?`s to maximize the time (24-hour format).

---

## 2. Approach: Greedy Per Digit — O(1) ✅

```
FUNCTION maximumTime(time):
    t = list(time)
    IF t[0] == '?': t[0] = '2' IF t[1] IN '?0123' ELSE '1'
    IF t[1] == '?': t[1] = '3' IF t[0] == '2' ELSE '9'
    IF t[3] == '?': t[3] = '5'
    IF t[4] == '?': t[4] = '9'
    RETURN JOIN(t)
```

| Time | Space |
|------|-------|
| O(1) | O(1) |

---

## 3. Key Takeaway

> Greedily maximize each digit considering constraints: hours ≤ 23, minutes ≤ 59. Process left to right with case analysis.

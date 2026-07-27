# 2243. Calculate Digit Sum of a String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/calculate-digit-sum-of-a-string](https://leetcode.com/problems/calculate-digit-sum-of-a-string)
**Companies:** Uber

---

## 1. Problem Description

Given a string `s` of digits and integer `k`, repeatedly split `s` into groups of size `k`, replace each group with the sum of its digits, then concatenate. Repeat until `len(s) <= k`.

---

## 2. Approach: Simulate — O(n) ✅

```
FUNCTION digitSum(s, k):
    WHILE len(s) > k:
        newS = ""
        FOR i FROM 0 TO len(s) - 1 STEP k:
            group = s[i:i+k]
            groupSum = SUM(int(ch) for ch in group)
            newS += str(groupSum)
        s = newS
    RETURN s
```

| Time | Space |
|------|-------|
| O(n) total across all rounds | O(n) |

---

## Key Takeaway

> Iterative digit grouping and summing. The string shrinks rapidly each iteration (logarithmic number of rounds).

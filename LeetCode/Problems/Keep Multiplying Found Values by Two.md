# 2154. Keep Multiplying Found Values by Two

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/keep-multiplying-found-values-by-two](https://leetcode.com/problems/keep-multiplying-found-values-by-two)
**Companies:** Bloomberg, Goldman Sachs, Google, Meta

---

## 1. Problem Description

Given an array `nums` and integer `original`, repeatedly double `original` while it exists in the array. Return the final value.

---

## 2. Approach: Hash Set — O(n) ✅

```
FUNCTION findFinalValue(nums, original):
    s = SET(nums)
    WHILE original IN s: original *= 2
    RETURN original
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> Set for O(1) lookup. The while loop runs at most O(log max) times since the value doubles each iteration.

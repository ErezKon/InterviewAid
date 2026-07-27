# 3523. Make Array Non-decreasing

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/make-array-non-decreasing](https://leetcode.com/problems/make-array-non-decreasing)
**Companies:** Google

---

## 1. Problem Description

Find the maximum length of the resulting array after repeatedly removing elements that violate non-decreasing order.

---

## 2. Approach: Monotonic Stack — O(n) ✅

```
// Use a stack to track elements that form a valid non-decreasing sequence
// Each element can "absorb" smaller preceding elements
// The answer is the size of the resulting stack
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> Elements that are larger than or equal to the previous kept element survive. Use a monotonic stack or greedy scan to count survivors.

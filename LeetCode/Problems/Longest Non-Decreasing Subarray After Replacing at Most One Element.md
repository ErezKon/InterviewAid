# 3738. Longest Non-Decreasing Subarray After Replacing at Most One Element

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-non-decreasing-subarray-after-replacing-at-most-one-element](https://leetcode.com/problems/longest-non-decreasing-subarray-after-replacing-at-most-one-element)
**Companies:** Google

---

## 1. Problem Description

Find the longest non-decreasing contiguous subarray after replacing at most one element with any value.

---

## 2. Approach: DP with Change Budget — O(n) ✅

```
// dp0[i] = longest non-decreasing subarray ending at i with 0 changes
// dp1[i] = longest non-decreasing subarray ending at i with ≤1 change
// Transition: if nums[i] >= nums[i-1], extend both
//             else use the one change to bridge
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Key Takeaway

> Track two states: length with 0 replacements and with 1 replacement. When the non-decreasing property breaks, the 1-change state can bridge one violation.

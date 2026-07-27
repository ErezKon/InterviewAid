# 3900. Longest Balanced Substring After One Swap

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-balanced-substring-after-one-swap](https://leetcode.com/problems/longest-balanced-substring-after-one-swap)
**Companies:** Google

---

## 1. Problem Description

Find the longest balanced substring (equal count of '0' and '1') achievable after swapping at most one pair of characters.

---

## 2. Approach: Prefix Balance + Greedy ✅

```
// Use prefix balance (count of 1s - count of 0s)
// Without swap: find longest subarray with balance 0
// With one swap: consider swapping a 0↔1 to extend balanced region
// Track prefix sums and look for balance offsets of ±2
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> A swap changes the balance by ±2. Look for longest subarray where prefix balance difference is 0 (no swap) or ±2 (one swap). Hash map of first occurrence of each balance.

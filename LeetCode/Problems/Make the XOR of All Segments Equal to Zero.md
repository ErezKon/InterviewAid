# 1787. Make the XOR of All Segments Equal to Zero

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/make-the-xor-of-all-segments-equal-to-zero](https://leetcode.com/problems/make-the-xor-of-all-segments-equal-to-zero)
**Companies:** Google, Medianet

---

## 1. Problem Description

Change minimum elements so that every contiguous subarray of length `k` has XOR equal to 0.

---

## 2. Approach: DP on Groups — O(n · 2^10) ✅

```
// XOR of subarray of length k = 0 implies arr is periodic with period k
// Elements at positions i mod k must satisfy XOR constraint
// DP over k groups, tracking XOR state
// For each group, either change all to a new value or keep common values
```

| Time | Space |
|------|-------|
| O(n · 1024) | O(1024) |

---

## 3. Key Takeaway

> Periodicity means `arr[i] = arr[i+k]`. Group by `i mod k`. DP over XOR states across groups. Optimize by trying "change entire group" vs "keep most frequent value".

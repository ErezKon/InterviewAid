# 1062. Longest Repeating Substring

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-repeating-substring](https://leetcode.com/problems/longest-repeating-substring)
**Companies:** Amazon, Coupang, Google, Meta

---

## 1. Problem Description

Find the length of the longest substring that occurs at least twice.

---

## 2. Approach: Binary Search + Rolling Hash — O(n log n) ✅

```
FUNCTION longestRepeatingSubstring(s):
    lo, hi = 0, len(s) - 1
    WHILE lo < hi:
        mid = (lo + hi + 1) / 2
        IF hasRepeat(s, mid): lo = mid
        ELSE: hi = mid - 1
    RETURN lo

FUNCTION hasRepeat(s, length):
    seen = set()
    FOR i ← 0 TO len(s) - length:
        sub = s[i:i+length]
        IF sub IN seen: RETURN true
        seen.ADD(sub)
    RETURN false
```

| Time | Space |
|------|-------|
| O(n log n) avg | O(n) |

---

## 3. Key Takeaway

> Binary search on length + hash-based duplicate check. For small n, DP approach also works: `dp[i][j] = dp[i-1][j-1] + 1` if `s[i]==s[j]` and `i≠j`.

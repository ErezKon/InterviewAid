# 1374. Generate a String With Characters That Have Odd Counts

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/generate-a-string-with-characters-that-have-odd-counts](https://leetcode.com/problems/generate-a-string-with-characters-that-have-odd-counts)
**Companies:** Google

---

## 1. Problem Description

Return a string of length `n` where every character has an odd frequency.

## 2. Approach: Simple Construction — O(n) ✅

```
FUNCTION generateTheString(n):
    IF n % 2 == 1 THEN RETURN 'a' * n
    ELSE RETURN 'a' * (n - 1) + 'b'
```

## Key Takeaway

> If `n` is odd, use one character `n` times. If even, use one character `n-1` times + a different character once. Both counts are odd.

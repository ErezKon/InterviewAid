# 2663. Lexicographically Smallest Beautiful String

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/lexicographically-smallest-beautiful-string](https://leetcode.com/problems/lexicographically-smallest-beautiful-string)
**Companies:** Amazon, Google

---

## 1. Problem Description

A "beautiful" string uses only the first `k` letters and contains no palindromic substring of length ≥ 2. Find the lexicographically smallest beautiful string greater than `s`, or return `""`.

---

## 2. Approach: Next Permutation Style — O(n) ✅

```
FUNCTION smallestBeautifulString(s, k):
    // Find rightmost position to increment
    // Increment it to next valid char (no palindrome with prev 1-2 chars)
    // Fill remaining positions with smallest valid chars
    i = len(s) - 1
    s[i] += 1
    WHILE i >= 0:
        IF s[i] >= 'a' + k: i -= 1; s[i] += 1  // carry
        ELSE IF s[i] == s[i-1] OR s[i] == s[i-2]: s[i] += 1
        ELSE: BREAK  // valid
    IF i < 0: RETURN ""
    // Fill i+1..n-1 with smallest valid chars
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> Like "next permutation" but with palindrome constraints. Increment from the right, carry if out of range, and greedily fill the suffix with the smallest valid characters (avoiding palindromes with previous 1-2 chars).

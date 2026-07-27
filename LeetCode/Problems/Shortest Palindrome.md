# 214. Shortest Palindrome

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/shortest-palindrome](https://leetcode.com/problems/shortest-palindrome)
**Companies:** Accenture, Amazon, Bloomberg, Google, Meta, Microsoft, Pocket Gems, Uber, Visa

---

## Problem Description

Given string `s`, find the shortest palindrome by adding characters only at the **front**. Equivalent to finding the longest palindromic prefix.

---

## Approach: KMP Failure Function — O(n) ✅

```
FUNCTION shortestPalindrome(s):
    rev = REVERSE(s)
    combined = s + "#" + rev

    // KMP failure function
    lps = [0] * len(combined)
    FOR i ← 1 TO len(combined) - 1:
        j = lps[i - 1]
        WHILE j > 0 AND combined[i] != combined[j]:
            j = lps[j - 1]
        IF combined[i] == combined[j]: j += 1
        lps[i] = j

    // lps[-1] = length of longest palindrome prefix
    RETURN rev[:len(s) - lps[-1]] + s
```

Find the longest palindrome starting at index 0, then prepend the reverse of the remaining suffix.

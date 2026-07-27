# 1930. Unique Length-3 Palindromic Subsequences

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/unique-length-3-palindromic-subsequences](https://leetcode.com/problems/unique-length-3-palindromic-subsequences)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION countPalindromicSubsequence(s):
    count = 0
    FOR c IN set(s):
        first = s.index(c)
        last = s.rindex(c)
        IF last > first + 1:
            count += len(set(s[first+1:last]))
    RETURN count
```

For each character as the outer pair, count distinct middle characters.

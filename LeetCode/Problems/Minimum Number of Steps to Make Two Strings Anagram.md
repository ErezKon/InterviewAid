# 1347. Minimum Number of Steps to Make Two Strings Anagram

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-steps-to-make-two-strings-anagram](https://leetcode.com/problems/minimum-number-of-steps-to-make-two-strings-anagram)
**Companies:** Amazon, Bloomberg, Doordash, Google, Ixl, Jpmorgan, Microsoft, Oracle, Sofi, Twitter

---

```
FUNCTION minSteps(s, t):
    count = [0] * 26
    FOR c IN s: count[c - 'a'] += 1
    FOR c IN t: count[c - 'a'] -= 1
    RETURN SUM(MAX(0, c) for c in count)
```

Count excess characters in s that need to be replaced.

# 1400. Construct K Palindrome Strings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-k-palindrome-strings](https://leetcode.com/problems/construct-k-palindrome-strings)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Uber

---

```
FUNCTION canConstruct(s, k):
    IF k > len(s): RETURN false
    oddCount = SUM(1 for c in Counter(s).values() if c % 2 == 1)
    RETURN oddCount <= k
```

Each palindrome needs at most one odd-count char. Need at least oddCount palindromes.

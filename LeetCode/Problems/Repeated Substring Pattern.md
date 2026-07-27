# 459. Repeated Substring Pattern

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/repeated-substring-pattern](https://leetcode.com/problems/repeated-substring-pattern)
**Companies:** Amazon, Bloomberg, Ebay, Google, Meta, Microsoft, Myntra, Tcs

---

```
FUNCTION repeatedSubstringPattern(s):
    RETURN s IN (s + s)[1:-1]
```

If `s` is made of repeated copies of a substring, then `s` appears in `(s+s)` when you remove the first and last characters. Elegant O(n) with KMP.

# 1781. Sum of Beauty of All Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-beauty-of-all-substrings](https://leetcode.com/problems/sum-of-beauty-of-all-substrings)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Zoho

---

```
FUNCTION beautySum(s):
    total = 0
    FOR i ← 0 TO n - 1:
        count = [0] * 26
        FOR j ← i TO n - 1:
            count[ord(s[j]) - ord('a')] += 1
            nonzero = [c for c in count if c > 0]
            total += MAX(nonzero) - MIN(nonzero)
    RETURN total
```

O(n² · 26). For each starting index, expand and track frequency counts.

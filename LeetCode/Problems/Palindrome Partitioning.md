# 131. Palindrome Partitioning

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/palindrome-partitioning](https://leetcode.com/problems/palindrome-partitioning)
**Companies:** Accenture, Amazon, Bloomberg, Coupang, Google, Meta, Microsoft, Scaler, Visa

---

## Approach: Backtracking — O(n·2ⁿ) ✅

```
FUNCTION partition(s):
    result = []
    backtrack(s, 0, [], result)
    RETURN result

FUNCTION backtrack(s, start, path, result):
    IF start == len(s):
        result.ADD(copy of path)
        RETURN

    FOR end ← start + 1 TO len(s):
        IF isPalindrome(s, start, end - 1):
            path.ADD(s[start..end-1])
            backtrack(s, end, path, result)
            path.REMOVE_LAST()
```

Optimization: precompute palindrome table with DP.

### Palindrome Partitioning II (#132)?

Min cuts. DP: `dp[i] = min cuts for s[0..i]`. O(n²).

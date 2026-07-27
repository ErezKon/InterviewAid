# 1415. The k-th Lexicographical String of All Happy Strings of Length n

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-k-th-lexicographical-string-of-all-happy-strings-of-length-n](https://leetcode.com/problems/the-k-th-lexicographical-string-of-all-happy-strings-of-length-n)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION getHappyString(n, k):
    // Total happy strings of length n = 3 * 2^(n-1)
    // First char: 3 choices, rest: 2 (not same as previous)
    result = []
    count = [0]

    FUNCTION backtrack(curr):
        IF len(curr) == n:
            count[0] += 1
            IF count[0] == k: result.extend(curr)
            RETURN count[0] == k

        FOR c IN 'abc':
            IF curr AND curr[-1] == c: CONTINUE
            IF backtrack(curr + [c]): RETURN true
        RETURN false

    backtrack([])
    RETURN JOIN(result) IF result ELSE ""
```

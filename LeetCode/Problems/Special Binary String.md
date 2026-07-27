# 761. Special Binary String

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/special-binary-string](https://leetcode.com/problems/special-binary-string)
**Companies:** Adobe, Amazon, Bloomberg, Bnp Paribas, Coursera, Google, Grammarly, Imc, Microsoft, Nvidia, Rubrik, Ukg

---

## Approach: Recursive Sort — O(n² log n) ✅

```
FUNCTION makeLargestSpecial(s):
    count = 0
    i = 0
    subs = []

    FOR j ← 0 TO len(s) - 1:
        IF s[j] == '1': count += 1
        ELSE: count -= 1

        IF count == 0:
            // s[i..j] is a special string, recurse on inner part
            inner = makeLargestSpecial(s[i+1 : j])
            subs.ADD("1" + inner + "0")
            i = j + 1

    SORT subs in reverse (descending)
    RETURN JOIN(subs)
```

Split into top-level special substrings, recursively optimize each, sort descending for lexicographically largest result.

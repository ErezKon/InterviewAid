# 38. Count and Say

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-and-say](https://leetcode.com/problems/count-and-say)
**Companies:** Amazon, Bloomberg, Expedia, Google, Lg Electronics, Meta, Microsoft, Oracle, Pinterest, Tcs, Veeva, Wix, Zoho

---

## Approach: Iterative Simulation — O(4ⁿ/3) ✅

```
FUNCTION countAndSay(n):
    result = "1"

    FOR i ← 2 TO n:
        next = ""
        j = 0
        WHILE j < len(result):
            char = result[j]
            count = 0
            WHILE j < len(result) AND result[j] == char:
                j += 1
                count += 1
            next += str(count) + char
        result = next

    RETURN result
```

Run-length encoding applied iteratively. Each term describes the previous term.

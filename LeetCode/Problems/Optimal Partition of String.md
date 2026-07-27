# 2405. Optimal Partition of String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/optimal-partition-of-string](https://leetcode.com/problems/optimal-partition-of-string)
**Companies:** Amazon, Google, Ibm, Microsoft

---

```
FUNCTION partitionString(s):
    seen = set(); parts = 1
    FOR c IN s:
        IF c IN seen: parts += 1; seen = set()
        seen.ADD(c)
    RETURN parts
```

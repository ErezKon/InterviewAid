# 2965. Find Missing and Repeated Values

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-missing-and-repeated-values](https://leetcode.com/problems/find-missing-and-repeated-values)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Zoho

---

```
FUNCTION findMissingAndRepeatedValues(grid):
    count = Counter()
    FOR row IN grid:
        FOR val IN row: count[val] += 1

    n = len(grid)
    repeated = missing = 0
    FOR i ← 1 TO n * n:
        IF count[i] == 2: repeated = i
        IF count[i] == 0: missing = i

    RETURN [repeated, missing]
```

# 1331. Rank Transform of an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/rank-transform-of-an-array](https://leetcode.com/problems/rank-transform-of-an-array)
**Companies:** Agoda, Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION arrayRankTransform(arr):
    rank = {}
    FOR val IN sorted(set(arr)):
        rank[val] = len(rank) + 1
    RETURN [rank[v] for v in arr]
```

# 3488. Closest Equal Element Queries

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/closest-equal-element-queries](https://leetcode.com/problems/closest-equal-element-queries)
**Companies:** Amazon, Bloomberg, Google, Salesforce

---

```
FUNCTION solveQueries(nums, queries):
    n = len(nums)
    positions = defaultdict(list)
    FOR i, num IN enumerate(nums): positions[num].ADD(i)

    // For each index, find nearest same-value index (circular)
    nearest = [n] * n
    FOR indices IN positions.values():
        FOR j ← 0 TO len(indices) - 1:
            prev = indices[(j - 1) % len(indices)]
            nxt = indices[(j + 1) % len(indices)]
            nearest[indices[j]] = MIN(
                (indices[j] - prev) % n,
                (nxt - indices[j]) % n
            )

    RETURN [nearest[q] IF nearest[q] < n ELSE -1 for q in queries]
```

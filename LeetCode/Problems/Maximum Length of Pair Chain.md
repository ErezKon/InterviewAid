# 646. Maximum Length of Pair Chain

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-length-of-pair-chain](https://leetcode.com/problems/maximum-length-of-pair-chain)
**Companies:** Amazon, Google

---

## Approach: Greedy (Interval Scheduling) — O(n log n) ✅

```
FUNCTION findLongestChain(pairs):
    SORT pairs by second element
    count = 0
    end = -infinity

    FOR [a, b] IN pairs:
        IF a > end:
            count += 1
            end = b

    RETURN count
```

Same as the classic interval scheduling maximization (activity selection problem).

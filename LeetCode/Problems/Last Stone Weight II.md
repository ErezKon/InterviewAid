# 1049. Last Stone Weight II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/last-stone-weight-ii](https://leetcode.com/problems/last-stone-weight-ii)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## 1. Problem Description

Repeatedly pick two stones, smash them (result = |y - x|), until ≤ 1 stone remains. Return the smallest possible weight.

---

## 2. Key Insight

Equivalent to partitioning stones into two groups and minimizing `|sum1 - sum2|`. This is the **subset sum closest to half** problem.

---

## 3. Approach: DP (Subset Sum) — O(n·S) ✅

```
FUNCTION lastStoneWeightII(stones):
    total = SUM(stones)
    target = total / 2
    dp = set([0])

    FOR stone IN stones:
        dp = {s + stone for s in dp if s + stone <= target} | dp

    RETURN total - 2 * MAX(dp)
```

| Time | Space |
|------|-------|
| O(n · S) where S = sum/2 | O(S) |

---

## 4. Key Takeaway

> Reduce stone smashing to a partition problem. Find the subset sum closest to `total/2`. Answer = `total - 2 * best_half`. Classic DP subset sum.

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

```text
FUNCTION lastStoneWeightII(stones):
    total ← SUM(stones)
    target ← total / 2
    dp ← SET([0])
    FOR stone IN stones:
        dp ← {s + stone FOR s IN dp IF s + stone ≤ target} ∪ dp
    best ← MAX(dp)
    RETURN total - 2 * best
```

| Time | Space |
|------|-------|
| O(n · S) where S = sum/2 | O(S) |

---

## Examples

| stones | smallest possible weight |
|--------|--------------------------|
| [2,7,4,1,8,1] | 1 |
| [31,26,33,21,40] | 5 |

---

## Walkthrough

1. Compute total weight = 23 for first example. Target = 11.
2. DP builds reachable sums up to 11: after processing all stones, the closest sum to 11 is 11.
3. Answer = 23 - 2*11 = 1.

---

## Complexity Analysis

Time: **O(n·S)** where *S* is half of total sum. Space: **O(S)** for the DP set.

---

## Follow-Up Questions

- How would you solve this with a bitset to improve constant factors?
- Can you adapt the solution for larger weight ranges using meet‑in‑the‑middle?
- What if you needed to output the actual partition of stones?

---

## Key Takeaway

> Reduce stone smashing to a partition problem. Find the subset sum closest to `total/2`. Answer = `total - 2 * best_half`. Classic DP subset sum.

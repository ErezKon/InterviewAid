# 1049. Last Stone Weight II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/last-stone-weight-ii](https://leetcode.com/problems/last-stone-weight-ii)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## 1. Problem Description

You are given an array of integers `stones` where `stones[i]` is the weight of the `i`-th stone.

We are playing a game with the stones. On each turn, we choose any two stones and smash them together. Suppose the stones have weights `x` and `y` with `x <= y`. The result of this smash is:

- If `x == y`, both stones are destroyed, and
- If `x != y`, the stone of weight `x` is destroyed, and the stone of weight `y` has new weight `y - x`.

At the end of the game, there is **at most one** stone left.

Return *the smallest possible weight of the left stone*. If there are no stones left, return `0`.

**Constraints:**
- `1 <= stones.length <= 30`
- `1 <= stones[i] <= 100`

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

```
Example 1:
  Input: stones = [2,7,4,1,8,1]
  Output: 1
  Explanation:
  We can combine 2 and 4 to get 2, so the array converts to [2,7,1,8,1] then,
  we can combine 7 and 8 to get 1, so the array converts to [2,1,1,1] then,
  we can combine 2 and 1 to get 1, so the array converts to [1,1,1] then,
  we can combine 1 and 1 to get 0, so the array converts to [1], then that's the optimal value.
```

```
Example 2:
  Input: stones = [31,26,33,21,40]
  Output: 5
```

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

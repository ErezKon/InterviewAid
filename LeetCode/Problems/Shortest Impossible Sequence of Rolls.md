# 2350. Shortest Impossible Sequence of Rolls

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/shortest-impossible-sequence-of-rolls](https://leetcode.com/problems/shortest-impossible-sequence-of-rolls)
**Companies:** Google

---

## Problem Description

Given array `rolls` (die rolls with values 1..k), find the length of the shortest sequence that **cannot** be formed as a subsequence of `rolls`.

---

## Key Insight

> Greedily count "complete rounds" — scan left to right, tracking which of the k values have appeared. Each time all k values have been seen, that completes one round. The answer is `rounds + 1`.

---

## Approach

```
FUNCTION shortestSequence(rolls, k):
    seen ← empty SET
    rounds ← 0
    FOR val IN rolls:
        seen.ADD(val)
        IF SIZE(seen) == k:
            rounds += 1
            seen.CLEAR()
    RETURN rounds + 1
```

| Time | Space |
|------|-------|
| O(n) | O(k) |

---

## Key Takeaway

> Each "complete round" covers one layer of all possible k values. After `r` complete rounds, all subsequences of length `r` are achievable — so the shortest impossible sequence has length `r + 1`.

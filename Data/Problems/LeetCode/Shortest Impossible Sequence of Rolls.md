# 2350. Shortest Impossible Sequence of Rolls

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/shortest-impossible-sequence-of-rolls](https://leetcode.com/problems/shortest-impossible-sequence-of-rolls)
**Companies:** Google
---

## Problem Description

You are given an integer array `rolls` of length `n` and an integer `k`. You roll a `k` sided dice numbered from `1` to `k`, `n` times, where the result of the `i^th` roll is `rolls[i]`.

Return *the length of the **shortest** sequence of rolls so that there's no such subsequence in* `rolls`.

A **sequence of rolls** of length `len` is the result of rolling a `k` sided dice `len` times.

**Constraints:**

- `n == rolls.length`
- `1 <= n <= 10^5`
- `1 <= rolls[i] <= k <= 10^5`

---

## Approach

```text
FUNCTION shortestSequence(rolls, k):
    // Track which values have appeared in the current round
    seen ← empty set
    rounds ← 0
    FOR val IN rolls:
        seen.ADD(val)
        IF SIZE(seen) = k:
            rounds ← rounds + 1
            seen.CLEAR()
    RETURN rounds + 1
```

---

## Examples

```
Example 1:
  Input: rolls = [4,2,1,2,3,3,2,4,1], k = 4
  Output: 3
  Explanation: Every sequence of rolls of length 1, [1], [2], [3], [4], can be taken from rolls.
  Every sequence of rolls of length 2, [1, 1], [1, 2], ..., [4, 4], can be taken from rolls.
  The sequence [1, 4, 2] cannot be taken from rolls, so we return 3.
  Note that there are other sequences that cannot be taken from rolls.
```

```
Example 2:
  Input: rolls = [1,1,2,2], k = 2
  Output: 2
  Explanation: Every sequence of rolls of length 1, [1], [2], can be taken from rolls.
  The sequence [2, 1] cannot be taken from rolls, so we return 2.
  Note that there are other sequences that cannot be taken from rolls but [2, 1] is the shortest.
```

```
Example 3:
  Input: rolls = [1,1,3,2,2,2,3,3], k = 4
  Output: 1
  Explanation: The sequence [4] cannot be taken from rolls, so we return 1.
  Note that there are other sequences that cannot be taken from rolls but [4] is the shortest.
```

---

## Walkthrough

Consider `rolls = [1,2,3,1,2,3]` with `k = 3`.

1. Start with `seen = {}` and `rounds = 0`.
2. Process `1` → `seen = {1}`.
3. Process `2` → `seen = {1,2}`.
4. Process `3` → `seen = {1,2,3}` → all values seen, increment `rounds` to 1 and clear `seen`.
5. Repeat steps 2‑4 for the second half, resulting in `rounds = 2`.
6. After processing all rolls, answer = `rounds + 1 = 3`.

---

## Complexity Analysis

- **Time:** O(n), where n is the length of `rolls`.
- **Space:** O(k) for the `seen` set (at most k elements).

---

## Follow-Up Questions

- How would the solution change if the die had a variable number of faces per roll?
- Can you extend the approach to find the actual shortest impossible sequence, not just its length?

---

## Key Takeaway

> By counting how many complete rounds of all `k` values appear, the shortest impossible subsequence length is simply the number of rounds plus one.

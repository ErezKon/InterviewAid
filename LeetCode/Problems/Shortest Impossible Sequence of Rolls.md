# 2350. Shortest Impossible Sequence of Rolls

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/shortest-impossible-sequence-of-rolls](https://leetcode.com/problems/shortest-impossible-sequence-of-rolls)
**Companies:** Google
---

## Problem Description

Given an array `rolls` representing die rolls with values from `1` to `k`, determine the length of the shortest sequence that **cannot** be formed as a subsequence of `rolls`.

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

**Example 1:**
```
Input: rolls = [1,2,3,1,2,3], k = 3
Output: 3
Explanation: After two complete rounds (1,2,3) the shortest impossible sequence is of length 3, e.g., [1,1,1].
```

**Example 2:**
```
Input: rolls = [1,1,2,2,3], k = 3
Output: 2
Explanation: Only one complete round of {1,2,3} is formed, so any sequence of length 2 that repeats a missing value is impossible.
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

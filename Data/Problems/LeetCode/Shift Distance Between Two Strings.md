# 3361. Shift Distance Between Two Strings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shift-distance-between-two-strings](https://leetcode.com/problems/shift-distance-between-two-strings)
**Companies:** Google

---

## Problem Description

You are given two strings `s` and `t` of the same length, and two integer arrays `nextCost` and `previousCost`.

In one operation, you can pick any index `i` of `s`, and perform **either one** of the following actions:

- Shift `s[i]` to the next letter in the alphabet. If `s[i] == 'z'`, you should replace it with `'a'`. This operation costs `nextCost[j]` where `j` is the index of `s[i]` in the alphabet.
- Shift `s[i]` to the previous letter in the alphabet. If `s[i] == 'a'`, you should replace it with `'z'`. This operation costs `previousCost[j]` where `j` is the index of `s[i]` in the alphabet.

The **shift distance** is the **minimum** total cost of operations required to transform `s` into `t`.

Return the **shift distance** from `s` to `t`.

**Constraints:**

- `1 <= s.length == t.length <= 10^5`
- `s` and `t` consist only of lowercase English letters.
- `nextCost.length == previousCost.length == 26`
- `0 <= nextCost[i], previousCost[i] <= 10^9`

---

## Approach

```
FUNCTION shiftDistance(s, t, nextCost, previousCost):
    // Precompute prefix sums for forward/backward shift costs around the alphabet ring
    total ← 0
    FOR i ← 0 TO len(s) - 1:
        a ← ord(s[i]) - ord('a')
        b ← ord(t[i]) - ord('a')
        IF a == b: CONTINUE
        // Cost to go forward from a to b
        fwd ← sum of nextCost[a], nextCost[(a+1)%26], ..., nextCost[(b-1)%26]
        // Cost to go backward from a to b
        bwd ← sum of previousCost[a], previousCost[(a-1)%26], ..., previousCost[(b+1)%26]
        total += MIN(fwd, bwd)
    RETURN total
```

Use prefix sums on a doubled alphabet array for O(1) range queries.

---

## Examples

```
Example 1:
  Input: s = "abab", t = "baba", nextCost = [100,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], previousCost = [1,100,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  Output: 2
  Explanation:
  - We choose index i = 0 and shift s[0] 25 times to the previous character for a total cost of 1.
  - We choose index i = 1 and shift s[1] 25 times to the next character for a total cost of 0.
  - We choose index i = 2 and shift s[2] 25 times to the previous character for a total cost of 1.
  - We choose index i = 3 and shift s[3] 25 times to the next character for a total cost of 0.
```

```
Example 2:
  Input: s = "leet", t = "code", nextCost = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], previousCost = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  Output: 31
  Explanation:
  - We choose index i = 0 and shift s[0] 9 times to the previous character for a total cost of 9.
  - We choose index i = 1 and shift s[1] 10 times to the next character for a total cost of 10.
  - We choose index i = 2 and shift s[2] 1 time to the previous character for a total cost of 1.
  - We choose index i = 3 and shift s[3] 11 times to the next character for a total cost of 11.
```

---

## Walkthrough

| Index | s[i] | t[i] | Forward Cost | Backward Cost | Chosen |
|-------|------|------|--------------|---------------|--------|
| 0 | a (0) | b (1) | nextCost[0] = 1 | previousCost[0] = 1 | 1 |
| 1 | b (1) | c (2) | nextCost[1] = 1 | previousCost[1] = 1 | 1 |
| 2 | c (2) | d (3) | nextCost[2] = 1 | previousCost[2] = 1 | 1 |

Total = 3.

---

## Complexity Analysis

- **Time:** O(n + 26) – one pass over the strings plus constant-time prefix-sum queries.
- **Space:** O(26) – prefix arrays for forward and backward costs.

---

## Follow-Up Questions

1. How would you handle a **dynamic** update to `nextCost`/`previousCost` after many queries?
2. Can the solution be extended to support **different alphabets** or Unicode characters?
3. What if the cost arrays are **non-circular** (no wrap-around)?

---

## Key Takeaway

> Precompute circular prefix sums for forward and backward shift costs, then each character pair is solved in O(1) by picking the cheaper direction.

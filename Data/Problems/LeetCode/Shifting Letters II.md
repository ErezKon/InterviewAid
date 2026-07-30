# 2381. Shifting Letters II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shifting-letters-ii](https://leetcode.com/problems/shifting-letters-ii)
**Companies:** Amazon, Google, Meta, Microsoft, Veritas, Zeta

---

## Problem Description

Given a string `s` and a list of shift operations `shifts`, where each operation is a triplet `[start, end, direction]` (direction = 1 for forward, 0 for backward), apply all shifts **simultaneously** to the characters in the inclusive range `[start, end]`. Shifts wrap around the alphabet.

---

## Examples

**Example 1:**
```
Input: s = "abc", shifts = [[0,1,1],[1,2,0]]
Output: "bac"
Explanation:
- Shift indices 0‑1 forward: a→b, b→c
- Shift indices 1‑2 backward: c→b, b→a (applied on original string)
- Net effect: a→b, b→a, c→c
```

**Example 2:**
```
Input: s = "xyz", shifts = [[0,2,1]]
Output: "yza"
Explanation: All characters shift forward by 1.
```

---

## Approach

```
FUNCTION shiftingLettersII(s, shifts):
    n ← LENGTH(s)
    diff ← ARRAY of zeros size n+1

    FOR each [start, end, direction] IN shifts:
        delta ← 1 IF direction == 1 ELSE -1
        diff[start] += delta
        diff[end + 1] -= delta

    result ← LIST(s)
    cumulative ← 0
    FOR i ← 0 TO n-1:
        cumulative += diff[i]
        shift ← cumulative % 26
        result[i] = CHAR((ORD(s[i]) - ORD('a') + shift + 26) % 26 + ORD('a'))

    RETURN JOIN(result)
```

The difference array batches range updates in O(1) each; a prefix sum yields the net shift per character.

---

## Walkthrough

| Index | Original | diff after ops | Cumulative shift | New char |
|-------|----------|----------------|------------------|---------|
| 0 | a | +1 (from [0,1,1]) | 1 | b |
| 1 | b | +1‑1 (from both ops) | 0 | b |
| 2 | c | -1 (from [1,2,0]) | -1 → 25 | b |

Resulting string: "bab" (adjusted for modulo arithmetic).

---

## Complexity Analysis

- **Time:** O(n + m) where n is length of `s` and m is number of shift operations.
- **Space:** O(n) for the difference array and result list.

---

## Follow‑Up Questions

1. How would you modify the algorithm to support **different shift magnitudes** per operation?
2. Can the solution be extended to handle **Unicode** characters beyond the English alphabet?
3. What if shift operations need to be **queried online** (add/remove) after initial processing?

---

## Key Takeaway

> Use a difference array to convert many overlapping range updates into a single linear pass, then apply the accumulated shift to each character.

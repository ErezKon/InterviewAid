# 2027. Minimum Moves to Convert String

**Difficulty:** 🟢 Easy
**Companies:** Bloomberg, Google, Jeavio

---

## Problem Description

You are given a string consisting of characters `O` and `X`. In one move, you can select any three consecutive characters and change them all to `O`. Return the **minimum number of moves** required to convert the entire string to only `O`s.

## Examples

**Example 1:**
```
Input: s = "XOXOX"
Output: 2
Explanation: Convert the first three characters to `OOO` (move 1), resulting in "OOOX". Then convert the last three characters (positions 2‑4) to `OOO` (move 2) → "OOOOO".
```

**Example 2:**
```
Input: s = "OOOO"
Output: 0
Explanation: No moves needed because the string already contains only `O`s.
```

## Approach

**Algorithm:** Greedy left‑to‑right scan

Iterate through the string. Whenever an `X` is encountered, perform a move that converts the current and the next two characters to `O`. Skip the next two positions because they are now `O`. This greedy choice is optimal because any move must cover the leftmost uncovered `X`, and covering three characters is the maximum coverage per move.

```text
FUNCTION minimumMoves(s):
    SET moves ← 0
    SET i ← 0
    WHILE i < LENGTH(s):
        IF s[i] == 'X':
            SET moves ← moves + 1
            SET i ← i + 3 // skip the three characters we just converted
        ELSE:
            SET i ← i + 1
    RETURN moves
```

## Walkthrough

| Step | Index `i` | Character | Action | Moves |
|------|-----------|-----------|--------|-------|
| 1 | 0 | X | Convert positions 0‑2 to `O` | 1 |
| 2 | 3 | O | Skip (already `O`) | 1 |
| 3 | 4 | X | Convert positions 4‑6 (out of bounds, treat as up to end) | 2 |

The string becomes all `O`s after two moves.

## Complexity Analysis

- **Time:** O(n) – single pass through the string.
- **Space:** O(1) – only a few integer variables.

## Follow‑Up Questions

1. How would the solution change if a move could convert any `k` consecutive characters?
2. What if you could also convert three consecutive `O`s to `X`s?
3. Can you extend the approach to minimize moves when characters other than `O`/`X` are allowed?

## Key Takeaway

> A greedy left‑to‑right scan that always handles the leftmost `X` with a three‑character conversion yields the minimum number of moves.

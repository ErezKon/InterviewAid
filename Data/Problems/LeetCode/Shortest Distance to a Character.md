# 821. Shortest Distance to a Character

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/shortest-distance-to-a-character](https://leetcode.com/problems/shortest-distance-to-a-character)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Problem Description

Given a string `s` and a target character `c`, return an integer array `result` where `result[i]` is the minimum distance from index `i` to any occurrence of `c` in `s`.

---

## Approach

```text
FUNCTION shortestToChar(s, c):
    n ← len(s)
    result ← ARRAY[n] filled with n
    // Left‑to‑right pass
    pos ← -n
    FOR i ← 0 TO n-1:
        IF s[i] == c: pos ← i
        result[i] ← i - pos
    // Right‑to‑left pass
    pos ← 2*n
    FOR i ← n-1 DOWN TO 0:
        IF s[i] == c: pos ← i
        result[i] ← MIN(result[i], pos - i)
    RETURN result
```

---

## Examples

| s | c | result |
|---|---|--------|
| "loveleetcode" | 'e' | [3,2,1,0,1,0,0,1,2,2,1,0] |
| "aaab" | 'b' | [3,2,1,0] |
| "abcde" | 'z' | [5,5,5,5,5] |

---

## Walkthrough

1. **First pass (left to right)** – Keep `pos` as the most recent index where `c` was seen. For each `i`, the distance to the nearest `c` on the left is `i - pos`.
2. **Second pass (right to left)** – Reset `pos` to a far‑right sentinel. Iterate backwards, updating `pos` when `c` is encountered. For each `i`, compute the distance to the nearest `c` on the right (`pos - i`) and keep the smaller of the two distances.
3. The final `result` array contains the minimum distance to `c` from every position.

---

## Complexity Analysis

- **Time:** O(n) – two linear scans of the string.
- **Space:** O(n) – the output array.

---

## Key Takeaway

> Two linear passes, one from each direction, efficiently compute the nearest‑character distance for every index.

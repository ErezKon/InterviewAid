# 821. Shortest Distance to a Character

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/shortest-distance-to-a-character](https://leetcode.com/problems/shortest-distance-to-a-character)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Problem Description

Given string `s` and character `c`, return an array where `result[i]` = distance from `s[i]` to the nearest occurrence of `c`.

---

## Approach

```
FUNCTION shortestToChar(s, c):
    n = len(s)
    result = [n] * n

    // Left to right
    pos = -n
    FOR i ← 0 TO n - 1:
        IF s[i] == c: pos = i
        result[i] = i - pos

    // Right to left
    pos = 2 * n
    FOR i ← n - 1 DOWN TO 0:
        IF s[i] == c: pos = i
        result[i] = MIN(result[i], pos - i)

    RETURN result
```

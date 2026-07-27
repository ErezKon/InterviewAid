# 2027. Minimum Moves to Convert String

**Difficulty:** 🟢 Easy
**Companies:** Bloomberg, Google, Jeavio

---

## Problem Description

String of `O`s and `X`s. One move converts 3 consecutive chars to `O`. Return the **minimum moves** to make all `O`s.

## Approach: Greedy — O(n) ✅

```
FUNCTION minimumMoves(s):
    count = 0; i = 0
    WHILE i < len(s):
        IF s[i] == 'X': count += 1; i += 3
        ELSE: i += 1
    RETURN count
```

When you hit an `X`, use one move to convert 3 chars and skip ahead by 3.

| Time | Space |
|------|-------|
| O(n) | O(1) |

## Key Takeaway

> Greedy left-to-right: on each `X`, use a move that covers 3 characters and skip them. Optimal because no smaller coverage is possible.

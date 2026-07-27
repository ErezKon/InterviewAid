# 2315. Count Asterisks

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-asterisks](https://leetcode.com/problems/count-asterisks)
**Companies:** Google

---

## 1. Problem Description

Given a string `s` with `|` (pipe) characters forming pairs, count the `*` characters that are **not** between any pair of pipes.

---

## 2. Approach: Toggle Flag — O(n) ✅

```
FUNCTION countAsterisks(s):
    insidePipes = false
    count = 0
    FOR ch IN s:
        IF ch == '|':
            insidePipes = NOT insidePipes
        ELSE IF ch == '*' AND NOT insidePipes:
            count += 1
    RETURN count
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> Toggle a boolean on each `|` to track whether we're inside or outside a pipe pair. Only count `*` when outside.

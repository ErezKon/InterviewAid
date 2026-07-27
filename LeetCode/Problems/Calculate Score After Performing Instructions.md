# 3522. Calculate Score After Performing Instructions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/calculate-score-after-performing-instructions](https://leetcode.com/problems/calculate-score-after-performing-instructions)
**Companies:** Apple

---

## 1. Problem Description

Given arrays `instructions` (strings `"add"` or `"jump"`) and `values`, start at index 0 with score 0. If `instructions[i]` is `"add"`, add `values[i]` to score and move to `i+1`. If `"jump"`, jump to `i + values[i]`. Stop when out of bounds. Return the final score.

---

## 2. Approach: Simulation — O(n) ✅

```
FUNCTION calculateScore(instructions, values):
    score = 0
    i = 0
    WHILE 0 <= i < len(instructions):
        IF instructions[i] == "add":
            score += values[i]
            i += 1
        ELSE:  // "jump"
            i += values[i]
    RETURN score
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> Direct simulation following the instruction pointer. Each index is visited at most once (guaranteed termination).

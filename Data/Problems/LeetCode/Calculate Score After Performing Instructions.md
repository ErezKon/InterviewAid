# 3522. Calculate Score After Performing Instructions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/calculate-score-after-performing-instructions](https://leetcode.com/problems/calculate-score-after-performing-instructions)
**Companies:** Apple

---

## 1. Problem Description

Given arrays `instructions` (strings `"add"` or `"jump"`) and `values`, start at index 0 with score 0. If `instructions[i]` is `"add"`, add `values[i]` to score and move to `i+1`. If `"jump"`, jump to `i + values[i]`. Stop when out of bounds. Return the final score.

## 2. Examples

**Example 1:**
```
instructions = ["add", "jump", "add"]
values = [5, 2, 3]
```
- Start at index 0, add 5 → score=5, move to 1.
- Index 1 is "jump" with value 2 → jump to index 3 (out of bounds).
- Final score = 5.

**Example 2:**
```
instructions = ["add", "add", "jump"]
values = [1, 2, 1]
```
- Add 1 (score=1) → i=1.
- Add 2 (score=3) → i=2.
- Jump 1 → i=3 (out of bounds).
- Final score = 3.

## 3. Approach: Simulation — O(n) ✅

```text
FUNCTION calculateScore(instructions, values):
    SET score ← 0
    SET i ← 0
    WHILE 0 <= i < LENGTH(instructions):
        IF instructions[i] == "add":
            SET score ← score + values[i]
            SET i ← i + 1
        ELSE: // "jump"
            SET i ← i + values[i]
    RETURN score
```

## 4. Walkthrough

| Step | i | instruction | action | score |
|------|---|-------------|--------|-------|
| 1 | 0 | add | score += 5 | 5 |
| 2 | 1 | jump (2) | i += 2 → 3 (out) | 5 |

The pointer moves forward until it leaves the array, guaranteeing termination.

## 5. Complexity Analysis

- **Time:** O(n) – each index visited at most once.
- **Space:** O(1) – only constant extra variables.

## 6. Follow-Up Questions
- How would you handle circular jumps that could cause infinite loops?
- Can you extend the simulation to support "multiply" instructions that multiply the score?
- What if the jump values could be negative?

---

## Key Takeaway

> Direct simulation following the instruction pointer. Each index is visited at most once (guaranteed termination).
# 293. Flip Game

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/flip-game](https://leetcode.com/problems/flip-game)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Linear Scan — O(n) ✅](#2-approach-linear-scan--on-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Given a string of `+` and `-`, return all possible states after flipping two consecutive `++` to `--`.

---

## 2. Approach: Linear Scan — O(n) ✅

```
FUNCTION generatePossibleNextMoves(currentState):
    result ← []
    FOR i ← 0 TO LENGTH(currentState) - 2 DO
        IF currentState[i:i+2] == '++' THEN
            result.ADD(currentState[:i] + '--' + currentState[i+2:])
    RETURN result
```

---

## 3. Key Takeaway

> Scan for all `++` pairs and generate the flipped state for each. O(n) per call.

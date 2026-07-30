# 293. Flip Game

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/flip-game](https://leetcode.com/problems/flip-game)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Linear Scan — O(n) ✅](#3-approach-linear-scan--on-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given a string of `+` and `-`, return all possible states after flipping two consecutive `++` to `--`.

---

## 2. Examples

**Example 1:**
```
Input: "++++"
Output: ["--++", "+--+", "++--"]
Explanation: Flip each possible "++" pair.
```

**Example 2:**
```
Input: "+-+-"
Output: []
Explanation: No consecutive "++" exists, so no moves.
```

---

## 3. Approach: Linear Scan — O(n) ✅

```text
FUNCTION generatePossibleNextMoves(currentState):
    result ← []
    FOR i ← 0 TO LENGTH(currentState) - 2 DO
        IF currentState[i:i+2] == '++' THEN
            newState ← currentState[:i] + '--' + currentState[i+2:]
            APPEND newState TO result
    RETURN result
```

---

## 4. Walkthrough

| Index | Substring | Action |
|-------|-----------|--------|
| 0‑1   | "++"     | Flip → "--" resulting in "--++" |
| 1‑2   | "++"     | Flip → "--" resulting in "+--+" |
| 2‑3   | "++"     | Flip → "--" resulting in "++--" |

The algorithm scans once, creates a new string for each valid flip, and collects them.

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — single pass over the string |
| **Space** | O(k) — where k is the number of possible moves (output size) |

---

## 6. Follow-Up Questions

- How would you modify the solution to return the states in lexicographic order?
- Can you generate the states lazily using an iterator instead of storing all at once?
- How would the algorithm change if flipping "--" to "++" were also allowed?

---

## 7. Key Takeaway

> Scan for all `++` pairs and generate the flipped state for each. O(n) per call.

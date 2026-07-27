# 1974. Minimum Time to Type Word Using Special Typewriter

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-type-word-using-special-typewriter](https://leetcode.com/problems/minimum-time-to-type-word-using-special-typewriter)
**Companies:** Ibm, Jpmorgan, Thomson Reuters

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Circular Distance — O(n)](#4-approach-circular-distance--on)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

A circular typewriter has letters `a-z` in a circle. The pointer starts at `'a'`. Each second, move clockwise/counterclockwise one position, or type the current letter. Return the **minimum** seconds to type `word`.

**Constraints:**
- `1 <= word.length <= 100`

---

## 2. Examples

```
Example 1:
  Input: word = "abc"
  Output: 5
  Explanation: a→type(1), move to b(1), type(1), move to c(1), type(1) = 5.

Example 2:
  Input: word = "bza"
  Output: 7
  Explanation: a→b(1)+type(1), b→z(2)+type(1), z→a(1)+type(1) = 7.
```

---

## 3. Key Insight

> For each letter, the move cost = `min(|diff|, 26 - |diff|)` (shorter arc on the circle), plus 1 for typing.

---

## 4. Approach: Circular Distance — O(n) ✅

```
FUNCTION minTimeToType(word):
    time = 0; curr = 'a'
    FOR c IN word:
        diff = ABS(ord(c) - ord(curr))
        time += MIN(diff, 26 - diff) + 1
        curr = c
    RETURN time
```

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 6. Key Takeaway

> **Circular distance = `min(d, 26-d)`** — always take the shorter arc. Add 1 for each typing action.

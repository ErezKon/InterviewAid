# 390. Elimination Game

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/elimination-game](https://leetcode.com/problems/elimination-game)
**Companies:** Amazon, Autodesk, Bloomberg, Google, Kickdrum, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Track Head Element](#approach-track-head-element--olog-n-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Start with `[1, 2, ..., n]`. Alternate between removing every other element from left-to-right and right-to-left until one number remains. Return that number.

**Constraints:**
- `1 <= n <= 10^9`

---

## Examples

```
Input: n = 9
Output: 6
Explanation:
  [1,2,3,4,5,6,7,8,9] → remove from left  → [2,4,6,8]
  [2,4,6,8]            → remove from right → [2,6]
  [2,6]                → remove from left  → [6]
```

---

## Key Insight

> Don't simulate — just track the **leftmost element** (`head`). The head advances when eliminating from the left (always) or from the right (only when the count is odd). Each round doubles the step size and halves the remaining count.

---

## Approach: Track Head Element — O(log n) ✅

```
FUNCTION lastRemaining(n):
    head = 1
    step = 1
    left = true
    remaining = n

    WHILE remaining > 1:
        IF left OR remaining % 2 == 1:
            head += step
        step *= 2
        remaining /= 2
        left = NOT left

    RETURN head
```

---

## Walkthrough

```
n = 9

Round 1 (left): remaining=9 (odd), left=true → head += 1 → head=2
  step=2, remaining=4, left=false

Round 2 (right): remaining=4 (even), left=false → head unchanged = 2
  step=4, remaining=2, left=true

Round 3 (left): remaining=2 (even), left=true → head += 4 → head=6
  step=8, remaining=1, left=false

remaining=1 → RETURN 6 ✅
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| **Time** | O(log n) |
| **Space** | O(1) |

---

## Key Takeaway

> **Simulation is O(n) and too slow for n up to 10⁹. Track only the head pointer — it shifts when removing from the left or when removing from the right with odd count. O(log n) math solution.**

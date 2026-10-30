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

You have a list `arr` of all integers in the range `[1, n]` sorted in a strictly increasing order. Apply the following algorithm on `arr`:

- Starting from left to right, remove the first number and every other number afterward until you reach the end of the list.
- Repeat the previous step again, but this time from right to left, remove the rightmost number and every other number from the remaining numbers.
- Keep repeating the steps again, alternating left to right and right to left, until a single number remains.

Given the integer `n`, return *the last number that remains in* `arr`.

**Constraints:**
- `1 <= n <= 10^9`

---

## Examples

**Example 1:**
```
Input: n = 9
Output: 6
Explanation: arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
arr = [2, 4, 6, 8]
arr = [2, 6]
arr = [6]
```

**Example 2:**
```
Input: n = 1
Output: 1
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

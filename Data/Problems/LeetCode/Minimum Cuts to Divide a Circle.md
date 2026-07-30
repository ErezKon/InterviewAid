# 2481. Minimum Cuts to Divide a Circle

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-cuts-to-divide-a-circle](https://leetcode.com/problems/minimum-cuts-to-divide-a-circle)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Tcs

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Math — O(1)](#approach-math--o1)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an integer `n`, return the **minimum number of cuts** needed to divide a circle into `n` equal slices.

**Constraints:**
- `1 ≤ n ≤ 100`

---

## Examples

**Example 1:**
```
Input: n = 4
Output: 2
Explanation: Two diameter cuts (perpendicular) create 4 equal slices.
```

**Example 2:**
```
Input: n = 3
Output: 3
Explanation: Three cuts from center to edge, 120° apart. No cut passes through as a diameter.
```

---

## Key Insight

> If `n` is even, each cut through the center (a diameter) creates 2 slices, so `n/2` cuts suffice. If `n` is odd (and > 1), cuts can't share a diameter — you need `n` cuts. If `n = 1`, no cuts needed.

```
Visual (n=4):         Visual (n=3):
    __|__                 /|\
   |  |  |              / | \
   |__|__|              /___|___\
  2 diameter cuts      3 radius cuts
```

---

## Approach: Math — O(1) ✅

```
FUNCTION numberOfCuts(n):
    IF n == 1: RETURN 0
    IF n % 2 == 0: RETURN n / 2
    RETURN n
```

---

## Walkthrough

| n | Even/Odd | Result | Reasoning |
|---|----------|--------|-----------|
| 1 | — | 0 | No cuts needed |
| 2 | Even | 1 | One diameter |
| 3 | Odd | 3 | Three radius cuts |
| 4 | Even | 2 | Two diameters |
| 6 | Even | 3 | Three diameters |

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(1) |
| **Space** | O(1) |

---

## Follow-Up Questions

1. **Why can't odd slices share diameters?** A diameter creates two cuts at once. For odd n, you'd need a non-integer number of diameters.
2. **What about n=2?** One diameter = 1 cut → 2 slices. Matches `n/2 = 1`.
3. **What if we wanted unequal slices?** Then `n-1` cuts always suffice for `n` pieces (like cutting a pizza with chords).

---

## Key Takeaway

> Circle-cutting is a **parity problem**: even slices share diameters (n/2 cuts), odd slices need individual radius cuts (n cuts).

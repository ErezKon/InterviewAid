# 1229. Meeting Scheduler

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/meeting-scheduler](https://leetcode.com/problems/meeting-scheduler)
**Companies:** Amazon, Apple, Citadel, Datadog, Google, Meta, Microsoft, Paypal, Sofi, Uber, Yandex

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given two people's availability slots `slots1` and `slots2`, and a meeting `duration`, find the **earliest** time slot that works for both and has length ≥ `duration`. Return `[start, start + duration]`, or `[]` if impossible.

**Constraints:**
- `1 ≤ slots1.length, slots2.length ≤ 10⁴`
- `0 ≤ start_i < end_i ≤ 10⁹`
- No overlapping slots within the same person's schedule

---

## Examples

**Example 1:**
```
Input:  slots1 = [[10,50],[60,120],[140,210]], slots2 = [[0,15],[60,70]], duration = 8
Output: [60,68]
Explanation: Both are free [60,70]. That's 10 minutes ≥ 8.
```

**Example 2:**
```
Input:  slots1 = [[10,50],[60,120],[140,210]], slots2 = [[0,15],[60,70]], duration = 12
Output: []
Explanation: No overlapping slot has 12+ minutes available.
```

---

## Key Insight

> Sort both slot lists by start time, then use **two pointers**. Compute the overlap of the current pair of slots. If the overlap ≥ duration, we found the answer. Otherwise, advance the pointer whose slot ends earlier (it can't overlap with future slots from the other person).

---

## Approach: Sort + Two Pointers — O(n log n) ✅

```
FUNCTION minAvailableDuration(slots1, slots2, duration):
    SORT slots1 BY start
    SORT slots2 BY start
    i ← 0
    j ← 0

    WHILE i < LEN(slots1) AND j < LEN(slots2) DO
        overlapStart ← MAX(slots1[i][0], slots2[j][0])
        overlapEnd ← MIN(slots1[i][1], slots2[j][1])

        IF overlapEnd - overlapStart ≥ duration THEN
            RETURN [overlapStart, overlapStart + duration]

        // Advance the slot that ends earlier
        IF slots1[i][1] < slots2[j][1] THEN
            i ← i + 1
        ELSE
            j ← j + 1

    RETURN []
```

---

## Walkthrough

```
slots1 = [[10,50],[60,120]], slots2 = [[0,15],[60,70]], duration = 8

i=0, j=0: overlap = [MAX(10,0), MIN(50,15)] = [10,15], length=5 < 8
           slots2[0] ends at 15 < slots1[0] ends at 50 → j=1

i=0, j=1: overlap = [MAX(10,60), MIN(50,70)] = [60,50], length=-10 < 0
           slots1[0] ends at 50 < slots2[1] ends at 70 → i=1

i=1, j=1: overlap = [MAX(60,60), MIN(120,70)] = [60,70], length=10 ≥ 8
           Return [60, 68] ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + two pointers | **O(n log n)** | **O(1)** |

---

## Follow-Up Questions

1. **What if there are k people?** Use a min-heap of current slots, one per person. At each step, check if all k current slots overlap sufficiently.
2. **What if we want all valid slots, not just the earliest?** Continue scanning after finding a match instead of returning immediately.
3. **What about recurring availability (weekly)?** Model as a union of weekly intervals, then apply the same two-pointer technique.

---

## Key Takeaway

> **Two-pointer interval intersection** — sort by start, compute overlap, advance the earlier-ending pointer. A fundamental technique for scheduling and interval problems.

---

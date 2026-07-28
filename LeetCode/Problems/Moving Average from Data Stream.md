# 346. Moving Average from Data Stream

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/moving-average-from-data-stream](https://leetcode.com/problems/moving-average-from-data-stream)
**Companies:** Amazon, Apple, Arista Networks, Bloomberg, Citadel, Google, Indeed, Meta, Microsoft, Qualcomm, Spotify, Tesla

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Queue + Running Sum — O(1)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Implement a class that computes the **moving average** of the last `size` values from a stream of integers.

**Constraints:**
- `1 <= size <= 1000`

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `MovingAverage(3)`<br>`next(1)`<br>`next(10)`<br>`next(3)`<br>`next(5)` | `null`<br>`1.0`<br>`5.5`<br>`6.0`<br>`6.0` | After the first three calls, the window contains `[1,10,3]` → average `14/3 ≈ 4.67`. After the fourth call, the oldest value `1` is dropped, window `[10,3,5]` → average `6.0`.

---

## 3. Key Insight

> Maintain a deque of at most `size` elements and a running sum. On each new value, add it; if queue exceeds size, remove the oldest and subtract from sum.

---

## 4. Approach: Queue + Running Sum — O(1) ✅

```text
CLASS MovingAverage:
    CONSTRUCTOR(size):
        queue ← deque()
        self.size ← size
        self.sum ← 0

    FUNCTION next(val):
        queue.APPEND(val)
        self.sum ← self.sum + val
        IF queue.LENGTH() > self.size:
            self.sum ← self.sum - queue.POPLEFT()
        RETURN self.sum / queue.LENGTH()
```

---

## 5. Walkthrough

Consider `size = 3` and the sequence of `next` calls `[1, 10, 3, 5]`.

| Step | Queue Content | Sum | Returned Avg |
|------|---------------|-----|--------------|
| Init | [] | 0 | - |
| next(1) | [1] | 1 | 1 / 1 = 1.0 |
| next(10) | [1,10] | 11 | 11 / 2 = 5.5 |
| next(3) | [1,10,3] | 14 | 14 / 3 ≈ 4.67 |
| next(5) | [10,3,5] (1 removed) | 18 | 18 / 3 = 6.0 |

The deque never exceeds the size, and the sum is updated in O(1) each step.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(1) per `next` call |
| **Space** | O(size) — deque |

---

## 7. Follow-Up Questions

- How would you modify the design to support a variable window size?
- Can you extend this to compute other statistics (e.g., median) efficiently?
- What if the stream is extremely large and you need to persist the state?

---

## 8. Key Takeaway

> **Sliding window with deque + running sum.** Classic data stream pattern. Each operation is O(1) amortized.

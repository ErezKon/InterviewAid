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

Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window.

Implement the `MovingAverage` class:

- `MovingAverage(int size)` Initializes the object with the size of the window `size`.
- `double next(int val)` Returns the moving average of the last `size` values of the stream.

**Constraints:**
- `1 <= size <= 1000`
- `-10⁵ <= val <= 10⁵`
- At most `10⁴` calls will be made to `next`.

---

## 2. Examples

```
Example 1:
  Input
  ["MovingAverage", "next", "next", "next", "next"]
  [[3], [1], [10], [3], [5]]
  Output
  [null, 1.0, 5.5, 4.66667, 6.0]

  Explanation
  MovingAverage movingAverage = new MovingAverage(3);
  movingAverage.next(1); // return 1.0 = 1 / 1
  movingAverage.next(10); // return 5.5 = (1 + 10) / 2
  movingAverage.next(3); // return 4.66667 = (1 + 10 + 3) / 3
  movingAverage.next(5); // return 6.0 = (10 + 3 + 5) / 3
```

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

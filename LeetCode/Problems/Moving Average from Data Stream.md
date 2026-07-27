# 346. Moving Average from Data Stream

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/moving-average-from-data-stream](https://leetcode.com/problems/moving-average-from-data-stream)
**Companies:** Amazon, Apple, Arista Networks, Bloomberg, Citadel, Google, Indeed, Meta, Microsoft, Qualcomm, Spotify, Tesla

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Queue + Running Sum — O(1)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Implement a class that computes the **moving average** of the last `size` values from a stream of integers.

**Constraints:**
- `1 <= size <= 1000`

---

## 2. Key Insight

> Maintain a deque of at most `size` elements and a running sum. On each new value, add it; if queue exceeds size, remove the oldest and subtract from sum.

---

## 3. Approach: Queue + Running Sum — O(1) ✅

```
CLASS MovingAverage:
    CONSTRUCTOR(size):
        queue = deque()
        self.size = size
        self.sum = 0

    FUNCTION next(val):
        queue.APPEND(val)
        sum += val
        IF len(queue) > size:
            sum -= queue.POPLEFT()
        RETURN sum / len(queue)
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(1) per `next` call |
| **Space** | O(size) — deque |

---

## 5. Key Takeaway

> **Sliding window with deque + running sum.** Classic data stream pattern. Each operation is O(1) amortized.

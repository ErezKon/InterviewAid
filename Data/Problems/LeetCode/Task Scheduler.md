
# 621. Task Scheduler

**Difficulty:** 🟡 Medium
**Acceptance:** 60.9%
**LeetCode:** [https://leetcode.com/problems/task-scheduler](https://leetcode.com/problems/task-scheduler)
**Companies:** Amazon, Apple, Bcg, Bloomberg, Coupang, Docusign, Goldman Sachs, Google, Linkedin, Mathworks, Meta, Micro1, Microsoft, Nutanix, Nvidia, Okta, Oracle, Roblox, Rubrik, Salesforce, Snowflake, Tcs, Tiktok, Uber, Zeta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach 1: Math Formula — O(n) ✅](#4-approach-1-math-formula--on-)
5. [Approach 2: Greedy with Max-Heap — O(n log 26)](#5-approach-2-greedy-with-max-heap--on-log-26)
6. [Walkthrough](#6-walkthrough)
7. [Complexity Analysis](#7-complexity-analysis)
8. [Follow-Up Questions](#8-follow-up-questions)

---

## 1. Problem Description

You are given an array of CPU `tasks`, each labeled with a letter from A to Z, and a number `n`. Each CPU interval can be idle or allow the completion of one task. Tasks can be completed in any order, but there's a constraint: there has to be a gap of **at least** `n` intervals between two tasks with the same label.

Return the **minimum** number of CPU intervals required to complete all tasks.

**Constraints:**
- `1 <= tasks.length <= 10^4`
- `tasks[i]` is an uppercase English letter.
- `0 <= n <= 100`

---

## 2. Examples

```
Example 1:
  Input: tasks = ["A","A","A","B","B","B"], n = 2
  Output: 8
  Explanation: A possible sequence is: A -> B -> idle -> A -> B -> idle -> A -> B.
  After completing task A, you must wait two intervals before doing A again. The same applies to task B.
  In the 3rd interval, neither A nor B can be done, so you idle. By the 4th interval, you can do A again
  as 2 intervals have passed.
```
```
Example 2:
  Input: tasks = ["A","C","A","B","D","B"], n = 1
  Output: 6
  Explanation: A possible sequence is: A -> B -> C -> D -> A -> B.
  With a cooling interval of 1, you can repeat a task after just one other task.
```
```
Example 3:
  Input: tasks = ["A","A","A","B","B","B"], n = 3
  Output: 10
  Explanation: A possible sequence is: A -> B -> idle -> idle -> A -> B -> idle -> idle -> A -> B.
  There are only two types of tasks, A and B, which need to be separated by 3 intervals.
  This leads to idling twice between repetitions of these tasks.
```

---

## 3. Key Insight

The most frequent task determines the structure. Imagine placing the most frequent task first with `n` gaps between them:

```
A _ _ A _ _ A _ _ A       (maxFreq = 4, n = 2)
```

The gaps create `(maxFreq - 1)` chunks of size `(n + 1)`. Fill other tasks into the gaps. The last chunk might be shorter.

---

## 4. Approach 1: Math Formula — O(n) ✅

```
FUNCTION leastInterval(tasks, n):
    freq = frequency count of tasks (array of 26)
    maxFreq = MAX(freq)
    maxCount = count of tasks with frequency == maxFreq

    // Frame: (maxFreq - 1) full chunks + last partial chunk
    result = (maxFreq - 1) * (n + 1) + maxCount

    // If we have more tasks than the frame can hold,
    // we don't need idle time at all
    RETURN MAX(result, LENGTH(tasks))
```

### Visual Explanation

```
tasks = [A,A,A,A,B,B,B,B,C,C], n = 2
maxFreq = 4 (A and B), maxCount = 2

Frame:
  A B _ | A B _ | A B _ | A B
  chunk1  chunk2  chunk3  last

(4 - 1) * (2 + 1) + 2 = 3 * 3 + 2 = 11

Fill C's into the gaps:
  A B C | A B C | A B _ | A B
                     ↑ one idle

Result: MAX(11, 10) = 11
```

### Why MAX(result, LENGTH(tasks))?

If there are enough diverse tasks to fill all gaps, no idle time is needed, and the answer is simply the total number of tasks.

---

## 5. Approach 2: Greedy with Max-Heap — O(n log 26)

Simulate the scheduling:

```
FUNCTION leastInterval(tasks, n):
    freq = frequency count of tasks
    maxHeap = MAX-HEAP of all frequencies > 0
    cooldownQueue = QUEUE of (freq, available_time)
    time = 0

    WHILE maxHeap IS NOT EMPTY OR cooldownQueue IS NOT EMPTY:
        time += 1

        IF maxHeap IS NOT EMPTY:
            f = maxHeap.EXTRACT_MAX() - 1
            IF f > 0:
                cooldownQueue.ENQUEUE((f, time + n))
        // else: idle

        IF cooldownQueue IS NOT EMPTY AND cooldownQueue.FRONT().availableTime == time:
            (f, _) = cooldownQueue.DEQUEUE()
            maxHeap.INSERT(f)

    RETURN time
```

---

## 6. Walkthrough

```
tasks = ["A","A","A","B","B","B"], n = 2

freq: A=3, B=3
maxFreq = 3, maxCount = 2

result = (3 - 1) * (2 + 1) + 2 = 2 * 3 + 2 = 8
MAX(8, 6) = 8

Schedule:
  A B _ | A B _ | A B
  1 2 3   4 5 6   7 8

Result: 8 ✅
```

---

## 7. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| **Math Formula** | **O(n)** | **O(1)** (26-element array) |
| Greedy Simulation | O(total_intervals · log 26) | O(26) |

Since the alphabet is fixed at 26, both are effectively O(n) where n = number of tasks.

---

## 8. Follow-Up Questions

### 8.1 What if tasks must be done in order?

This changes the problem significantly — you can't reorder tasks. You'd need to track the last execution time for each task type and insert idle time when cooldown isn't met.

### 8.2 Reorganize String (LeetCode #767)

Place characters so no two adjacent are the same. Similar greedy approach — always place the most frequent character that isn't the same as the last placed.

### 8.3 Rearrange String K Distance Apart (LeetCode #358)

Generalization: each occurrence of a character must be at least `k` apart. Same heap + cooldown queue approach.

### 8.4 What if there are priorities among tasks?

Would require a priority queue that considers both frequency and priority. The mathematical formula wouldn't apply directly.

---

## Key Takeaway

> The math formula approach is elegant: the most frequent task creates a "frame" of `(maxFreq - 1)` chunks of size `(n + 1)`, plus a tail. The answer is `MAX(frame_size, total_tasks)`. This problem tests both **greedy thinking** (schedule the most frequent first) and **mathematical modeling** (compute the frame directly).

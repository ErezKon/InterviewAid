# 933. Number of Recent Calls

**Difficulty:** 🟢 Easy
**LeetCode:** https://leetcode.com/problems/number-of-recent-calls
**Companies:** Amazon, Apple, Bloomberg, Databricks, Google, Meta, Microsoft, Roblox, Yandex

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Design a class `RecentCounter` that counts the number of requests received in the past **3000 milliseconds**. The class supports a method `ping(t)` where `t` is the current timestamp (in milliseconds) and is strictly increasing. `ping(t)` should return the number of calls with timestamps in the inclusive range `[t‑3000, t]`.

---

## 2. Examples

**Example 1**
```
RecentCounter rc = RecentCounter();
rc.ping(1);    // returns 1   (only [1])
rc.ping(100);  // returns 2   (timestamps [1,100])
rc.ping(3001); // returns 3   (timestamps [1,100,3001])
rc.ping(3002); // returns 3   (timestamps [100,3001,3002])
```

---

## 3. Approach

Maintain a **queue** (or deque) of timestamps. For each `ping(t)`:
1. Enqueue `t`.
2. Dequeue timestamps that are older than `t‑3000`.
3. The queue size is the answer.
Each timestamp enters and leaves the queue exactly once, giving **amortized O(1)** time per call.

---

## 4. Walkthrough

Consider the sequence of pings `[1, 100, 3001, 3002]`.
| Call | Queue after enqueue | Dequeue condition | Queue after dequeue | Return |
|------|----------------------|-------------------|----------------------|--------|
| ping(1)   | [1]                 | none (1‑3000 = -2999) | [1]                 | 1 |
| ping(100) | [1,100]             | none (100‑3000 = -2900) | [1,100]             | 2 |
| ping(3001)| [1,100,3001]        | remove 1 (1 < 1)   | [100,3001]          | 3 |
| ping(3002)| [100,3001,3002]     | none (3002‑3000=2) | [100,3001,3002]     | 3 |

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(1) amortized per `ping` |
| **Space** | O(W) where W is the number of calls within the 3000 ms window |

---

## 6. Follow-Up Questions

1. How would you modify the design to support a **variable window size** passed at construction time?
2. Can you achieve the same functionality using a **sliding‑window pointer** on an array instead of a queue?
3. What changes are needed if timestamps are not guaranteed to be strictly increasing?

---

## 7. Key Takeaway

> A simple queue provides an efficient sliding‑window solution: each request is added once and removed once, yielding O(1) amortized time.

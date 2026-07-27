# 933. Number of Recent Calls

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-recent-calls](https://leetcode.com/problems/number-of-recent-calls)
**Companies:** Amazon, Apple, Bloomberg, Databricks, Google, Meta, Microsoft, Roblox, Yandex

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Queue — O(1) amortized](#2-approach)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Implement a class that counts the number of requests in the last 3000 milliseconds.

---

## 2. Approach: Queue — O(1) amortized ✅

```
CLASS RecentCounter:
    CONSTRUCTOR:
        queue = deque()

    FUNCTION ping(t):
        queue.APPEND(t)
        WHILE queue.FRONT() < t - 3000:
            queue.POPLEFT()
        RETURN len(queue)
```

---

## 3. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(1) amortized per ping |
| **Space** | O(W) where W = 3000 window |

---

## 4. Key Takeaway

> **Sliding window with a queue.** Each element is enqueued and dequeued at most once. Deque maintains only requests within the 3000ms window.

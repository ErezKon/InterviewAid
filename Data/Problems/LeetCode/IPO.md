# 502. IPO

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/ipo](https://leetcode.com/problems/ipo)
**Companies:** Amazon, Bloomberg, Google, Innovaccer, Meta, Microsoft, Phonepe, Samsung, Stackline, Uber, Zeta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Greedy + Two Heaps — O(n log n) ✅](#4-approach-greedy--two-heaps--on-log-n-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Suppose LeetCode will start its **IPO** soon. In order to sell a good price of its shares to Venture Capital, LeetCode would like to work on some projects to increase its capital before the **IPO**. Since it has limited resources, it can only finish at most `k` distinct projects before the **IPO**. Help LeetCode design the best way to maximize its total capital after finishing at most `k` distinct projects.

You are given `n` projects where the `i^th` project has a pure profit `profits[i]` and a minimum capital of `capital[i]` is needed to start it.

Initially, you have `w` capital. When you finish a project, you will obtain its pure profit and the profit will be added to your total capital.

Pick a list of **at most** `k` distinct projects from given projects to **maximize your final capital**, and return *the final maximized capital*.

The answer is guaranteed to fit in a 32-bit signed integer.

**Constraints:**
- `1 <= k <= 10^5`
- `0 <= w <= 10^9`
- `n == profits.length`
- `n == capital.length`
- `1 <= n <= 10^5`
- `0 <= profits[i] <= 10^4`
- `0 <= capital[i] <= 10^9`

---

## 2. Examples

**Example 1:**
```
Input: k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]
Output: 4
Explanation: Since your initial capital is 0, you can only start the project indexed 0.
After finishing it you will obtain profit 1 and your capital becomes 1.
With capital 1, you can either start the project indexed 1 or the project indexed 2.
Since you can choose at most 2 projects, you need to finish the project indexed 2 to get the maximum capital.
Therefore, output the final maximized capital, which is 0 + 1 + 3 = 4.
```

**Example 2:**
```
Input: k = 3, w = 0, profits = [1,2,3], capital = [0,1,2]
Output: 6
```

---

## 3. Key Insight

**Greedy:** among all affordable projects, always pick the most profitable one. After completing it, your capital increases, potentially unlocking new projects. Use:
- **Sorting** by capital to efficiently find affordable projects
- **Max-heap** to quickly get the most profitable available project

---

## 4. Approach: Greedy + Two Heaps — O(n log n) ✅

```
FUNCTION findMaximizedCapital(k, w, profits, capital):
    // Sort by capital requirement
    projects = SORT(zip(capital, profits))
    i = 0
    maxHeap = MaxHeap()    // available profits

    FOR _ ← 0 TO k - 1:
        WHILE i < n AND projects[i].capital <= w:
            maxHeap.PUSH(projects[i].profit)
            i += 1
        IF maxHeap is empty: BREAK
        w += maxHeap.POP()

    RETURN w
```

---

## 5. Walkthrough

```
k=2, w=0, profits=[1,2,3], capital=[0,1,1]
Sorted: [(0,1), (1,2), (1,3)]
```

| Round | w | Unlock | maxHeap | Pick | New w |
|-------|---|--------|---------|------|-------|
| 1 | 0 | (0,1) | {1} | profit 1 | 1 |
| 2 | 1 | (1,2),(1,3) | {2,3} | profit 3 | 4 |

**Result:** `w = 4` ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n log n) | Sort + at most n heap operations |
| Space | O(n) | Heap storage |

---

## 7. Follow-Up Questions

### 7.1 What if projects can be done multiple times?

The greedy approach still works — just don't remove projects from the heap. But this could lead to infinite loops if a project has 0 profit.

### 7.2 What if each project has a time cost?

This becomes a scheduling problem — may need DP or more sophisticated greedy with deadlines.

### 7.3 Why is greedy optimal here?

Picking the highest-profit affordable project maximizes capital growth, which can only help unlock more projects. Deferring a high-profit project never helps.

---

## 8. Key Takeaway

> **Sort by capital + max-heap by profit** is the classic pattern for "pick the best affordable item" problems. Each round: unlock newly affordable projects, greedily pick the most profitable. This greedy choice is provably optimal.

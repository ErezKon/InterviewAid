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

You have initial capital `w` and can complete at most `k` projects. Each project `i` requires `capital[i]` to start and yields `profits[i]` (added to your capital). Maximize your final capital.

**Constraints:**
- `1 <= k <= 10⁵`
- `0 <= w <= 10⁹`
- `n == profits.length == capital.length`
- `1 <= n <= 10⁵`

---

## 2. Examples

```
Input: k=2, w=0, profits=[1,2,3], capital=[0,1,1]
Output: 4
Explanation: Start with w=0 → pick project 0 (cost 0, profit 1) → w=1
             → pick project 2 (cost 1, profit 3) → w=4
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

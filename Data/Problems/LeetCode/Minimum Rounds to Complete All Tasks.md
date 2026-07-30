# 2244. Minimum Rounds to Complete All Tasks

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-rounds-to-complete-all-tasks](https://leetcode.com/problems/minimum-rounds-to-complete-all-tasks)
**Companies:** Amazon, Anduril

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Greedy Math — O(n)](#4-approach-greedy-math--on)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an array `tasks` where `tasks[i]` is the difficulty level, in each round you can complete 2 or 3 tasks of the **same difficulty**. Return the **minimum** rounds to complete all tasks, or `-1` if impossible.

**Constraints:**
- `1 <= tasks.length <= 10⁵`
- `1 <= tasks[i] <= 10⁹`

---

## 2. Examples

```
Example 1:
  Input: tasks = [2,2,3,3,2,4,4,4,4,4]
  Output: 4
  Explanation: 2×3 tasks (1 round of 3), 3×2 tasks (1 round of 2), 
               4×5 tasks (1 round of 3 + 1 round of 2) = 1+1+2 = 4

Example 2:
  Input: tasks = [2,3,3]
  Output: -1
  Explanation: Only one task of difficulty 2 — can't form a round.
```

---

## 3. Key Insight

> For any frequency `f ≥ 2`, the minimum rounds = `⌈f/3⌉`. This works because:
> - `f % 3 == 0`: exactly `f/3` rounds of 3
> - `f % 3 == 1`: `(f-4)/3` rounds of 3 + 2 rounds of 2 = `⌈f/3⌉`
> - `f % 3 == 2`: `(f-2)/3` rounds of 3 + 1 round of 2 = `⌈f/3⌉`
> 
> Only `f == 1` is impossible.

---

## 4. Approach: Greedy Math — O(n) ✅

```
FUNCTION minimumRounds(tasks):
    count = frequency map of tasks
    rounds = 0

    FOR freq IN count.values():
        IF freq == 1: RETURN -1
        rounds += ceil(freq / 3)

    RETURN rounds
```

---

## 5. Walkthrough

```
tasks = [2,2,3,3,2,4,4,4,4,4]
freq: {2:3, 3:2, 4:5}

2 → freq=3: ceil(3/3)=1
3 → freq=2: ceil(2/3)=1
4 → freq=5: ceil(5/3)=2

Total = 1+1+2 = 4 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — count frequencies + iterate |
| **Space** | O(n) — frequency map |

---

## 7. Follow-Up Questions

**Q1: Why does ceil(f/3) work for all f ≥ 2?**
Any integer ≥ 2 can be represented as a sum of 2s and 3s. Using as many 3s as possible minimizes the count, and `ceil(f/3)` gives exactly that.

**Q2: What if rounds could be of size 2, 3, or 4?**
Then `ceil(f/4)` with a check that `f ≥ 2`.

---

## 8. Key Takeaway

> **Greedy grouping with ceiling division** — when you can process in groups of 2 or 3, the minimum groups = `⌈count/3⌉`. The only impossible case is a singleton group.

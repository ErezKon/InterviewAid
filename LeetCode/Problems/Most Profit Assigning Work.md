# 826. Most Profit Assigning Work

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/most-profit-assigning-work](https://leetcode.com/problems/most-profit-assigning-work)
**Companies:** Amazon, Doordash, Google, Meta, Microsoft, Netease

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sort + Two Pointers — O(n log n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Assign each worker a job with `difficulty ≤ worker's ability`. Each worker does at most one job. Multiple workers can do the same job. Return **maximum total profit**.

**Constraints:**
- `1 <= n <= 10⁴`

---

## 2. Key Insight

> Sort jobs by difficulty and workers by ability. Sweep through workers with a pointer into jobs, maintaining a running max profit. Each worker gets the best profit available at their ability level.

---

## 3. Approach: Sort + Two Pointers — O(n log n) ✅

```text
FUNCTION maxProfitAssignment(difficulty, profit, worker):
    jobs ← SORTED(zip(difficulty, profit))
    worker ← SORTED(worker)
    maxProfit ← 0
    j ← 0
    total ← 0
    FOR ability IN worker:
        WHILE j < LEN(jobs) AND jobs[j][0] ≤ ability:
            maxProfit ← MAX(maxProfit, jobs[j][1])
            j ← j + 1
        total ← total + maxProfit
    RETURN total
```

---

## 4. Examples

**Example 1:**
```
 difficulty = [2,4,6]
 profit    = [3,5,7]
 worker    = [1,3,5]
```
Workers with abilities 1,3,5 can take jobs with difficulties ≤ their ability. The best profits they can achieve are 0,3,5 respectively, giving total profit **8**.

**Example 2 (multiple workers same job):**
```
 difficulty = [1,2]
 profit    = [2,4]
 worker    = [2,2]
```
Both workers can take the job with difficulty 2 and profit 4, so total profit is **8**.

---

## 5. Walkthrough

Take Example 1.
1. Pair jobs: (2,3), (4,5), (6,7) and sort → already sorted.
2. Sort workers → [1,3,5].
3. ability=1: no job ≤1, maxProfit=0, total=0.
4. ability=3: advance j while job difficulty ≤3 → job (2,3). maxProfit becomes 3. total=3.
5. ability=5: advance j while difficulty ≤5 → job (4,5). maxProfit updates to 5. total=3+5=8.
6. End loop, return 8.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) — sorting |
| **Space** | O(n) |

---

## 7. Follow-Up Questions

- How would you adapt the solution if each job could be assigned to at most one worker?
- Can you solve the problem in O(n) time if the input arrays are already sorted?
- What changes are needed if workers have a cost associated with each assignment?

---

## 5. Key Takeaway

> **Sort both arrays, sweep with running max.** As workers get stronger, more jobs become available. The running max tracks the best profit seen so far — no need to re‑scan.

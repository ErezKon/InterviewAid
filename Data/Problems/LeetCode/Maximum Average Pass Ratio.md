# 1792. Maximum Average Pass Ratio

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-average-pass-ratio](https://leetcode.com/problems/maximum-average-pass-ratio)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Max Heap on Marginal Gain — O(k log n)](#approach-max-heap-on-marginal-gain--ok-log-n-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

There is a school that has classes of students and each class will be having a final exam. You are given a 2D integer array `classes`, where `classes[i] = [pass_i, total_i]`. You know beforehand that in the `i^th` class, there are `total_i` total students, but only `pass_i` number of students will pass the exam.

You are also given an integer `extraStudents`. There are another `extraStudents` brilliant students that are **guaranteed** to pass the exam of any class they are assigned to. You want to assign each of the `extraStudents` students to a class in a way that **maximizes** the **average** pass ratio across **all** the classes.

The **pass ratio** of a class is equal to the number of students of the class that will pass the exam divided by the total number of students of the class. The **average pass ratio** is the sum of pass ratios of all the classes divided by the number of the classes.

Return *the **maximum** possible average pass ratio after assigning the *`extraStudents`* students. *Answers within `10^-5` of the actual answer will be accepted.

**Constraints:**
- `1 <= classes.length <= 10^5`
- `classes[i].length == 2`
- `1 <= pass_i <= total_i <= 10^5`
- `1 <= extraStudents <= 10^5`

---

## Examples

**Example 1:**
```
Input: classes = [[1,2],[3,5],[2,2]], extraStudents = 2
Output: 0.78333
Explanation: You can assign the two extra students to the first class. The average pass ratio will be equal to (3/4 + 3/5 + 2/2) / 3 = 0.78333.
```

**Example 2:**
```
Input: classes = [[2,4],[3,9],[4,5],[2,10]], extraStudents = 4
Output: 0.53485
```

---

## Key Insight

> The **marginal gain** of adding a student to class `[p,t]` is `(p+1)/(t+1) - p/t`. This gain decreases as more students are added. Greedily assign each student to the class with the **highest marginal gain** using a max-heap.

---

## Approach: Max Heap on Marginal Gain — O(k log n) ✅

```
FUNCTION maxAverageRatio(classes, extraStudents):
    FUNCTION gain(p, t): RETURN (p+1)/(t+1) - p/t

    heap = MaxHeap([(-gain(p, t), p, t) for p, t in classes])

    FOR _ ← 0 TO extraStudents - 1:
        (_, p, t) = heap.POP()
        p += 1; t += 1
        heap.PUSH((-gain(p, t), p, t))

    RETURN AVG((p / t) for (_, p, t) in heap)
```

Greedily assign each student to the class with highest marginal gain.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Max Heap Greedy | **O((n + k) log n)** | O(n) |

---

## Key Takeaway

> **Marginal gain greedy with a max-heap is the standard pattern for "distribute k resources to maximize average/sum."** The gain function is concave, so greedy works optimally.

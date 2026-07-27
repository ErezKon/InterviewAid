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

Given `classes` as `[pass, total]` pairs and `extraStudents` brilliant students to distribute, maximize the **average pass ratio** across all classes. Each extra student added to a class is guaranteed to pass.

**Constraints:**
- `1 ≤ classes.length ≤ 10⁵`
- `1 ≤ extraStudents ≤ 10⁵`

---

## Examples

**Example 1:**
```
Input:  classes = [[1,2],[3,5],[2,2]], extraStudents = 2
Output: 0.78333
Explanation: Assign both extras to class [1,2] → [3,4]. 
             Ratios: 3/4, 3/5, 2/2. Avg = 0.78333.
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

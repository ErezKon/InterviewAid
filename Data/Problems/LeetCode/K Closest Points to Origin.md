# 973. K Closest Points to Origin

**Difficulty:** 🟡 Medium
**Acceptance:** 66.0%
**LeetCode:** [https://leetcode.com/problems/k-closest-points-to-origin](https://leetcode.com/problems/k-closest-points-to-origin)
**Companies:** Amazon, Apple, Asana, Axon, Bloomberg, Goldman Sachs, Google, Linkedin, Meta, Microsoft, Oracle, Plaid, Salesforce, Snapchat, Swiggy, Whatnot, Wix

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach 1: Max-Heap of Size k — O(n log k) ✅](#4-approach-1-max-heap-of-size-k--on-log-k-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an array of `points` where `points[i] = [xi, yi]` and integer `k`, return the `k` closest points to the origin `(0, 0)`. Answer may be in any order.

**Constraints:**
- `1 <= k <= points.length <= 10⁴`
- `-10⁴ <= xi, yi <= 10⁴`

---

## 2. Examples

```
Input: points = [[1,3],[-2,2]], k = 1
Output: [[-2,2]]
Explanation: dist(1,3) = √10, dist(-2,2) = √8. Closer: [-2,2]

Input: points = [[3,3],[5,-1],[-2,4]], k = 2
Output: [[3,3],[-2,4]]
```

---

## 3. Key Insight

This is a **top-k** problem. Use a **max-heap of size k** — push each point, and when size exceeds k, pop the farthest. No need for square roots; compare squared distances `x² + y²`.

---

## 4. Approach 1: Max-Heap of Size k — O(n log k) ✅

```
FUNCTION kClosest(points, k):
    heap = MaxHeap()    // by distance

    FOR point IN points:
        dist = point[0]² + point[1]²
        heap.PUSH((dist, point))
        IF heap.SIZE() > k:
            heap.POP()

    RETURN [point for (dist, point) in heap]
```

### Approach 2: Quickselect — O(n) average

Partition around the kth distance. Elements before the partition are the k closest.

---

## 5. Walkthrough

```
points = [[1,3],[-2,2],[5,1]], k = 2
```

| Point | dist² | Heap (max-heap, size ≤ 2) |
|-------|-------|--------------------------|
| [1,3] | 10 | [(10, [1,3])] |
| [-2,2] | 8 | [(10, [1,3]), (8, [-2,2])] |
| [5,1] | 26 | Push 26, pop max(26) → [(10, [1,3]), (8, [-2,2])] |

**Result:** `[[1,3], [-2,2]]` ✅

---

## 6. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| **Max-Heap** | **O(n log k)** | **O(k)** |
| Quickselect | O(n) avg, O(n²) worst | O(1) |
| Sort | O(n log n) | O(n) |

---

## 7. Follow-Up Questions

### 7.1 Why max-heap instead of min-heap?

A min-heap of all n elements requires O(n log n). A max-heap of size k evicts the farthest, keeping only the k closest in O(n log k).

### 7.2 When to prefer Quickselect?

When k is much smaller than n and average-case O(n) is sufficient. But worst case is O(n²) without randomization.

### 7.3 Streaming data?

Max-heap of size k works perfectly for streaming — process each point as it arrives, maintaining only k elements.

---

## 8. Key Takeaway

> Top-k closest = **max-heap of size k** (evict the farthest). No need to compute square roots — compare squared distances. Know three approaches: heap (O(n log k)), quickselect (O(n) avg), sort (O(n log n)).

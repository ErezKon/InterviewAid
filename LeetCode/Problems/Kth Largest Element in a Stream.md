# 703. Kth Largest Element in a Stream

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/kth-largest-element-in-a-stream](https://leetcode.com/problems/kth-largest-element-in-a-stream)
**Companies:** Adobe, Amazon, Arista Networks, Bloomberg, Goldman Sachs, Google, Meta, Microsoft, Salesforce, Tinder, Wells Fargo

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Min-Heap of Size k — O(log k) per add ✅](#4-approach-min-heap-of-size-k--olog-k-per-add-)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Design a class that finds the k-th largest element in a stream. Implement `add(val)` which adds val to the stream and returns the k-th largest element.

**Constraints:**
- `1 <= k <= 10⁴`
- Up to `10⁴` calls to `add`.

---

## 2. Examples

```
KthLargest(3, [4,5,8,2])
add(3) → 4  (stream: [2,3,4,5,8], 3rd largest = 4)
add(5) → 5  (stream: [2,3,4,5,5,8], 3rd largest = 5)
add(10) → 5 (stream: [2,3,4,5,5,8,10], 3rd largest = 5)
```

---

## 3. Key Insight

A **min-heap of size k** always keeps the k largest elements. The top of the heap = the k-th largest. Adding an element: push, then pop if size > k.

---

## 4. Approach: Min-Heap of Size k — O(log k) per add ✅

```
CLASS KthLargest:
    CONSTRUCTOR(k, nums):
        self.k = k
        self.heap = MinHeap()
        FOR num IN nums: self.add(num)

    FUNCTION add(val):
        heap.PUSH(val)
        IF heap.SIZE() > k: heap.POP()
        RETURN heap.TOP()
```

---

## 5. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Constructor | O(n log k) | Add n elements |
| add() | O(log k) | Heap push + optional pop |
| Space | O(k) | Min-heap of size k |

---

## 6. Key Takeaway

> Min-heap of size k is the go-to for streaming k-th largest. The root is always the answer. This is a fundamental heap pattern for top-k problems.

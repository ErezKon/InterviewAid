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

You are part of a university admissions office and need to keep track of the `kth` highest test score from applicants in real-time. This helps to determine cut-off marks for interviews and admissions dynamically as new applicants submit their scores.

You are tasked to implement a class which, for a given integer `k`, maintains a stream of test scores and continuously returns the `k`th highest test score **after** a new score has been submitted. More specifically, we are looking for the `k`th highest score in the sorted list of all scores.

Implement the `KthLargest` class:

- `KthLargest(int k, int[] nums)` Initializes the object with the integer `k` and the stream of test scores `nums`.
- `int add(int val)` Adds a new test score `val` to the stream and returns the element representing the `k^th` largest element in the pool of test scores so far.

**Constraints:**
- `0 <= nums.length <= 10^4`
- `1 <= k <= nums.length + 1`
- `-10^4 <= nums[i] <= 10^4`
- `-10^4 <= val <= 10^4`
- At most `10^4` calls will be made to `add`.

---

## 2. Examples

**Example 1:**
```
Input: ["KthLargest", "add", "add", "add", "add", "add"]
[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
Output: [null, 4, 5, 5, 8, 8]
Explanation: KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
kthLargest.add(3); // return 4
kthLargest.add(5); // return 5
kthLargest.add(10); // return 5
kthLargest.add(9); // return 8
kthLargest.add(4); // return 8
```

**Example 2:**
```
Input: ["KthLargest", "add", "add", "add", "add"]
[[4, [7, 7, 7, 7, 8, 3]], [2], [10], [9], [9]]
Output: [null, 7, 7, 7, 8]
Explanation: KthLargest kthLargest = new KthLargest(4, [7, 7, 7, 7, 8, 3]);
kthLargest.add(2); // return 7
kthLargest.add(10); // return 7
kthLargest.add(9); // return 7
kthLargest.add(9); // return 8
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

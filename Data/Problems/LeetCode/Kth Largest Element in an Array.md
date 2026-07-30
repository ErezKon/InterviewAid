
# 215. Kth Largest Element in an Array

**Difficulty:** 🟡 Medium
**Acceptance:** 67.6%
**LeetCode:** [https://leetcode.com/problems/kth-largest-element-in-an-array](https://leetcode.com/problems/kth-largest-element-in-an-array)
**Companies:** Accenture, Adobe, Alibaba, Amazon, Apple, Autodesk, Avito, Bloomberg, Bny Mellon, Bytedance, Cerner, Coupang, Deloitte, Ebay, Epam Systems, Flipkart, Goldman Sachs, Google, Ibm, Infosys, Intuit, Linkedin, Meta, Microsoft, Morgan Stanley, Nvidia, Oracle, Paypal, Pocket Gems, Qualcomm, Salesforce, Sap, Servicenow, Spotify, Tiktok, Turing, Uber, Verily, Visa, Walmart Labs, Zepto, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Sort — O(n log n)](#3-approach-1-sort--on-log-n)
4. [Approach 2: Min-Heap of Size k — O(n log k) ✅](#4-approach-2-min-heap-of-size-k--on-log-k-)
5. [Approach 3: Quickselect — O(n) Average ✅](#5-approach-3-quickselect--on-average-)
6. [Walkthrough (Quickselect)](#6-walkthrough-quickselect)
7. [Complexity Comparison](#7-complexity-comparison)
8. [Follow-Up Questions](#8-follow-up-questions)

---

## 1. Problem Description

Given an integer array `nums` and an integer `k`, return the **kth largest** element in the array.

Note: it is the kth largest in sorted order, not the kth distinct element.

---

## 2. Examples

```
Example 1:
  Input:  nums = [3,2,1,5,6,4], k = 2
  Output: 5

Example 2:
  Input:  nums = [3,2,3,1,2,4,5,5,6], k = 4
  Output: 4
```

---

## 3. Approach 1: Sort — O(n log n)

```
FUNCTION findKthLargest(nums, k):
    SORT nums in descending order
    RETURN nums[k - 1]
```

Simple, but doesn't leverage the fact that we only need one element.

---

## 4. Approach 2: Min-Heap of Size k — O(n log k) ✅

Maintain a **min-heap** of size `k`. The top of the heap is the kth largest.

```
FUNCTION findKthLargest(nums, k):
    heap = MIN-HEAP

    FOR each num IN nums:
        heap.INSERT(num)

        IF SIZE(heap) > k:
            heap.EXTRACT_MIN()         // remove smallest

    RETURN heap.PEEK()                 // kth largest is at the top
```

### Why Min-Heap?

The heap holds the **k largest** elements seen so far. The root (minimum of those k) is exactly the kth largest.

---

## 5. Approach 3: Quickselect — O(n) Average ✅

Based on the quicksort partition. We only recurse into the half that contains the target index.

```
FUNCTION findKthLargest(nums, k):
    // kth largest = (n - k)th smallest in 0-indexed
    target = LENGTH(nums) - k
    RETURN quickselect(nums, 0, LENGTH(nums) - 1, target)


FUNCTION quickselect(nums, lo, hi, target):
    IF lo == hi:
        RETURN nums[lo]

    pivotIndex = partition(nums, lo, hi)

    IF pivotIndex == target:
        RETURN nums[pivotIndex]
    ELSE IF pivotIndex < target:
        RETURN quickselect(nums, pivotIndex + 1, hi, target)
    ELSE:
        RETURN quickselect(nums, lo, pivotIndex - 1, target)


FUNCTION partition(nums, lo, hi):
    // Choose random pivot to avoid worst case
    randomIdx = RANDOM(lo, hi)
    SWAP(nums[randomIdx], nums[hi])

    pivot = nums[hi]
    i = lo

    FOR j ← lo TO hi - 1:
        IF nums[j] <= pivot:
            SWAP(nums[i], nums[j])
            i += 1

    SWAP(nums[i], nums[hi])
    RETURN i
```

### Why O(n) Average?

Each partition reduces the search space by roughly half (on average):
- n + n/2 + n/4 + ... ≈ 2n = O(n)

**Worst case (bad pivots):** O(n²), but random pivot makes this extremely unlikely.

---

## 6. Walkthrough (Quickselect)

```
nums = [3, 2, 1, 5, 6, 4], k = 2
target = 6 - 2 = 4 (4th index in sorted order = 5th element)

sorted would be: [1, 2, 3, 4, 5, 6]  → index 4 = value 5

quickselect(nums, 0, 5, target=4)
  Suppose pivot = 4 (index 5), partition around 4:
  After partition: [3, 2, 1, 4, 6, 5], pivotIndex = 3

  pivotIndex(3) < target(4) → search right half
  quickselect(nums, 4, 5, target=4)

  Suppose pivot = 5 (index 5), partition around 5:
  After partition: [3, 2, 1, 4, 5, 6], pivotIndex = 4

  pivotIndex(4) == target(4) → RETURN nums[4] = 5

Result: 5 ✅
```

---

## 7. Complexity Comparison

| Approach | Time (Average) | Time (Worst) | Space |
|----------|---------------|-------------|-------|
| Sort | O(n log n) | O(n log n) | O(1) - O(n) |
| **Min-Heap** | **O(n log k)** | O(n log k) | **O(k)** |
| **Quickselect** | **O(n)** | O(n²) | **O(1)** |

In practice, heap is preferred when k << n, quickselect when you need average-case O(n).

---

## 8. Follow-Up Questions

### 8.1 Find Median — special case where k = n/2

Use quickselect with `target = n/2`.

### 8.2 Kth Largest Element in a Stream (LeetCode #703)

Maintain a **min-heap of size k**. On each new element:

```
CLASS KthLargest:
    INIT(k, nums):
        this.k = k
        this.heap = MIN-HEAP
        FOR each num IN nums:
            this.add(num)

    ADD(val):
        heap.INSERT(val)
        IF SIZE(heap) > k:
            heap.EXTRACT_MIN()
        RETURN heap.PEEK()
```

### 8.3 Top K Frequent Elements (LeetCode #347)

1. Count frequencies with a hash map.
2. Use a min-heap of size k on (frequency, element) pairs.

Or use **bucket sort** for O(n):

```
FUNCTION topKFrequent(nums, k):
    freq = frequency map of nums
    buckets = ARRAY of n+1 empty lists

    FOR each (num, count) IN freq:
        buckets[count].ADD(num)

    result = []
    FOR i ← n DOWNTO 0:
        FOR each num IN buckets[i]:
            result.ADD(num)
            IF LENGTH(result) == k:
                RETURN result
```

### 8.4 K Closest Points to Origin (LeetCode #973)

Max-heap of size k on distances, or quickselect by distance.

---

## Key Takeaway

> This problem tests your knowledge of **selection algorithms**. The three approaches represent a trade-off: sort (simple, O(n log n)), heap (great for streaming/small k), quickselect (optimal average case). In interviews, discuss all three and let the interviewer guide which to implement. Quickselect's O(n) average is impressive, but the heap solution is more predictable and often preferred in production.

# 295. Find Median from Data Stream

**Difficulty:** 🔴 Hard
**Acceptance:** 52.0%
**LeetCode:** [https://leetcode.com/problems/find-median-from-data-stream](https://leetcode.com/problems/find-median-from-data-stream)
**Companies:** Amazon, Anduril, Apple, Bloomberg, Citadel, Cohesity, Coupang, Docusign, Ebay, Flipkart, Goldman Sachs, Google, Intuit, Ixl, Jpmorgan, Kla, Meesho, Meta, Microsoft, Nvidia, Okta, Oracle, Paypal, Pinterest, Salesforce, Snowflake, Splunk, Spotify, Sprinklr, Stackadapt, Tiktok, Tinder, Twitch, Uber, Visa, Walmart Labs, Worldquant, Yandex

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Two Heaps — O(log n) insert, O(1) median ✅](#3-approach-two-heaps--olog-n-insert-o1-median-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)

---

## 1. Problem Description

The **median** is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

- For example, for `arr = [2,3,4]`, the median is `3`.
- For example, for `arr = [2,3]`, the median is `(2 + 3) / 2 = 2.5`.

Implement the MedianFinder class:

- `MedianFinder()` initializes the `MedianFinder` object.
- `void addNum(int num)` adds the integer `num` from the data stream to the data structure.
- `double findMedian()` returns the median of all elements so far. Answers within `10^-5` of the actual answer will be accepted.

**Follow up:**

- If all integer numbers from the stream are in the range `[0, 100]`, how would you optimize your solution?
- If `99%` of all integer numbers from the stream are in the range `[0, 100]`, how would you optimize your solution?

**Constraints:**
- `-10^5 <= num <= 10^5`
- There will be at least one element in the data structure before calling `findMedian`.
- At most `5 * 10^4` calls will be made to `addNum` and `findMedian`.

---

## 2. Examples

**Example 1:**
```
Input
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
Output:
[null, null, null, 1.5, null, 2.0]
Explanation:
MedianFinder medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.addNum(2);    // arr = [1, 2]
medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
medianFinder.addNum(3);    // arr[1, 2, 3]
medianFinder.findMedian(); // return 2.0
```

---

## 3. Approach: Two Heaps — O(log n) insert, O(1) median ✅

### Key Insight

Split the stream into two halves:
- **maxHeap** (left half): stores the smaller half, top = largest of the small half
- **minHeap** (right half): stores the larger half, top = smallest of the large half

The median is at the tops of these heaps.

### Invariants

1. `maxHeap.size()` is either equal to or one more than `minHeap.size()`.
2. Every element in `maxHeap` ≤ every element in `minHeap`.

### Pseudocode

```
CLASS MedianFinder:
    CONSTRUCTOR:
        maxHeap = MaxHeap()     // left half (smaller elements)
        minHeap = MinHeap()     // right half (larger elements)

    FUNCTION addNum(num):
        maxHeap.PUSH(num)

        // Ensure maxHeap's top ≤ minHeap's top
        IF minHeap is not empty AND maxHeap.TOP() > minHeap.TOP():
            minHeap.PUSH(maxHeap.POP())

        // Balance sizes: maxHeap can have at most 1 more element
        IF maxHeap.SIZE() > minHeap.SIZE() + 1:
            minHeap.PUSH(maxHeap.POP())
        ELSE IF minHeap.SIZE() > maxHeap.SIZE():
            maxHeap.PUSH(minHeap.POP())

    FUNCTION findMedian():
        IF maxHeap.SIZE() > minHeap.SIZE():
            RETURN maxHeap.TOP()
        ELSE:
            RETURN (maxHeap.TOP() + minHeap.TOP()) / 2.0
```

---

## 4. Walkthrough

```
addNum(1): maxHeap=[1], minHeap=[]           → median=1
addNum(2): maxHeap=[1], minHeap=[2]          → median=(1+2)/2=1.5
addNum(3): maxHeap push 3 → [3,1], top=3 > minHeap top=2
           move 3 to minHeap → maxHeap=[1], minHeap=[2,3]
           minHeap bigger → move 2 to maxHeap → maxHeap=[2,1], minHeap=[3]
           → median=2
```

---

## 5. Complexity Analysis

| Operation | Time |
|-----------|------|
| addNum | O(log n) |
| findMedian | O(1) |
| **Space** | **O(n)** |

---

## 6. Follow-Up Questions

### 6.1 What if all integers are in range [0, 100]?

Use a **counting array** of size 101. For `findMedian`, scan from left to find the middle element(s). addNum is O(1), findMedian is O(100) = O(1).

### 6.2 What if 99% of integers are in range [0, 100]?

Use counting for the common range. Track outliers (< 0 or > 100) separately with their count. Adjust the median calculation based on outlier counts.

### 6.3 Sliding Window Median (LeetCode #480)?

Maintain two sorted structures (e.g., two multisets or balanced BSTs) for the window. On each slide, remove the outgoing element and add the incoming element, rebalancing as needed. O(n log k).

### 6.4 What about using a balanced BST (AVL/Red-Black)?

A balanced BST with order statistics (augmented with subtree sizes) supports O(log n) insert and O(log n) median. Less efficient than two heaps for median-only queries.

---

## Key Takeaway

> The **two-heap** technique splits a stream into lower and upper halves, keeping the median at the heap tops. This is the standard approach for streaming median problems. The key invariant: maxHeap.top ≤ minHeap.top, and sizes differ by at most 1.

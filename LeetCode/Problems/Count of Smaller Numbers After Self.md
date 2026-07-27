# 315. Count of Smaller Numbers After Self

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-of-smaller-numbers-after-self](https://leetcode.com/problems/count-of-smaller-numbers-after-self)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an integer array `nums`, return an array `counts` where `counts[i]` is the number of elements to the right of `nums[i]` that are strictly smaller than `nums[i]`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

---

## Examples

**Example 1:**
- **Input:** `nums = [5, 2, 6, 1]`
- **Output:** `[2, 1, 1, 0]`
- **Explanation:**
  - 5 → two smaller to right: 2, 1
  - 2 → one smaller to right: 1
  - 6 → one smaller to right: 1
  - 1 → none

**Example 2:**
- **Input:** `nums = [-1, -1]`
- **Output:** `[0, 0]`

---

## Key Insight

This is a **counting inversions** problem. For each element, we need to know how many smaller elements appear after it. Merge sort naturally counts these cross-half relationships: when merging, every time a right-half element is placed before a left-half element, it means the right element is smaller and appears later — exactly what we're counting.

We track original indices alongside values so we can attribute counts to the correct positions.

---

## Approach: Merge Sort — O(n log n) ✅

```
FUNCTION countSmaller(nums):
    counts = [0] * n
    indices = [0, 1, ..., n-1]

    FUNCTION mergeSort(lo, hi):
        IF lo >= hi: RETURN
        mid = (lo + hi) / 2
        mergeSort(lo, mid)
        mergeSort(mid + 1, hi)

        // During merge, count elements from right that are smaller
        temp = []
        i, j = lo, mid + 1
        rightCount = 0
        WHILE i <= mid AND j <= hi:
            IF nums[indices[j]] < nums[indices[i]]:
                rightCount += 1
                temp.ADD(indices[j])
                j += 1
            ELSE:
                counts[indices[i]] += rightCount
                temp.ADD(indices[i])
                i += 1
        WHILE i <= mid:
            counts[indices[i]] += rightCount
            temp.ADD(indices[i])
            i += 1
        WHILE j <= hi:
            temp.ADD(indices[j])
            j += 1
        indices[lo:hi+1] = temp

    mergeSort(0, n - 1)
    RETURN counts
```

**Key mechanism:** `rightCount` tracks how many right-half elements have been placed so far. When a left-half element is placed, all those right-half elements are smaller → add `rightCount` to that element's count.

---

## Walkthrough

**Input:** `nums = [5, 2, 6, 1]`, indices = `[0, 1, 2, 3]`

```
mergeSort(0, 3)
├── mergeSort(0, 1): [5, 2]
│   Merge: 2 < 5 → rightCount=1, then place 5 → counts[0] += 1
│   Result: indices=[1, 0], sorted by value: [2, 5]
│   counts = [1, 0, 0, 0]
│
├── mergeSort(2, 3): [6, 1]
│   Merge: 1 < 6 → rightCount=1, then place 6 → counts[2] += 1
│   Result: indices=[3, 2], sorted: [1, 6]
│   counts = [1, 0, 1, 0]
│
└── Merge halves: [2, 5] vs [1, 6]
    1 < 2 → rightCount=1
    2 placed → counts[1] += 1     counts = [1, 1, 1, 0]
    5 < 6 → counts[0] += 1       counts = [2, 1, 1, 0]
    6 placed → counts[2] += 1... but rightCount still 1
    
Final: counts = [2, 1, 1, 0] ✅
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n log n) — standard merge sort |
| **Space** | O(n) — for indices array and merge buffer |

---

## Follow-Up Questions

**Q1: Can this be solved with a BIT (Binary Indexed Tree)?**
Yes. Process right-to-left, inserting each value into a BIT. Query BIT for count of values < current. Coordinate-compress values first. O(n log n).

**Q2: How does this differ from LeetCode #493 (Reverse Pairs)?**
#493 counts pairs where `nums[i] > 2 * nums[j]` (i < j). The merge sort structure is the same, but the counting condition differs. Here it's strict less-than; there it's a 2× threshold.

**Q3: Can you use a balanced BST?**
Yes — insert elements right-to-left into a BST tracking subtree sizes. Each insertion takes O(log n) and you can count smaller elements during insertion. But self-balancing BST is complex to implement.

**Q4: What about the brute-force approach?**
O(n²) nested loops. Works for small n but TLEs for n = 10^5.

---

## Key Takeaway

> **Merge sort is a natural fit for counting order-dependent relationships (inversions, smaller-after, reverse pairs). Track original indices alongside values, and accumulate counts during the merge step where the sorted structure reveals cross-half relationships.**

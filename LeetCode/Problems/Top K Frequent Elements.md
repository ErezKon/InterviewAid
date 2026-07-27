# 347. Top K Frequent Elements

**Difficulty:** 🟡 Medium
**Acceptance:** 64.2%
**LeetCode:** [https://leetcode.com/problems/top-k-frequent-elements](https://leetcode.com/problems/top-k-frequent-elements)
**Companies:** Adobe, Amazon, Amd, Apple, Arista Networks, Atlassian, Avito, Bloomberg, Bytedance, Chewy, Disney, Docusign, Ebay, Epam Systems, Goldman Sachs, Google, Hubspot, Ibm, Infosys, Intuit, Jpmorgan, Meta, Microsoft, Microstrategy, Netflix, Nutanix, Nvidia, Oracle, Paypal, Pinterest, Pocket Gems, Rippling, Robinhood, Roku, Salesforce, Servicenow, Siemens, Smartsheet, Snapchat, Snowflake, Sofi, Tesla, Tiktok, Twilio, Uber, Visa, Walmart Labs, Workday, Yahoo, Yandex, Yelp, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Sorting — O(n log n)](#3-approach-1-sorting--on-log-n)
4. [Approach 2: Min-Heap — O(n log k) ✅](#4-approach-2-min-heap--on-log-k-)
5. [Approach 3: Bucket Sort — O(n) ✅](#5-approach-3-bucket-sort--on-)
6. [Approach 4: Quickselect — O(n) average](#6-approach-4-quickselect--on-average)
7. [Complexity Analysis](#7-complexity-analysis)
8. [Follow-Up Questions](#8-follow-up-questions)

---

## 1. Problem Description

Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in **any order**.

**Constraints:**
- `1 <= nums.length <= 10⁵`
- `-10⁴ <= nums[i] <= 10⁴`
- `k` is in the range `[1, number of unique elements]`
- The answer is **guaranteed** to be unique.

**Follow up:** Your algorithm's time complexity must be better than O(n log n).

---

## 2. Examples

```
Example 1:
  Input:  nums = [1,1,1,2,2,3], k = 2
  Output: [1,2]

Example 2:
  Input:  nums = [1], k = 1
  Output: [1]
```

---

## 3. Approach 1: Sorting — O(n log n)

Count frequencies, sort by frequency descending, take first k.

```
FUNCTION topKFrequent(nums, k):
    count = COUNT frequency of each element in nums
    sorted_items = SORT count.items() by frequency DESC
    RETURN first k elements from sorted_items
```

| Time | Space |
|------|-------|
| O(n log n) | O(n) |

---

## 4. Approach 2: Min-Heap — O(n log k) ✅

Maintain a min-heap of size k. For each unique element, push it. If heap exceeds size k, pop the minimum.

```
FUNCTION topKFrequent(nums, k):
    count = COUNT frequency of each element in nums
    heap = MinHeap()

    FOR (num, freq) IN count.items():
        heap.PUSH((freq, num))
        IF heap.SIZE() > k:
            heap.POP()          // remove least frequent

    RETURN [num for (freq, num) in heap]
```

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n log k) |
| **Space** | O(n + k) |

---

## 5. Approach 3: Bucket Sort — O(n) ✅

Use an array of buckets where index = frequency. Elements with frequency `f` go into `buckets[f]`.

```
FUNCTION topKFrequent(nums, k):
    count = COUNT frequency of each element in nums
    buckets = array of empty lists, size n + 1

    FOR (num, freq) IN count.items():
        buckets[freq].ADD(num)

    result = []
    FOR freq ← n DOWN TO 1:
        FOR num IN buckets[freq]:
            result.ADD(num)
            IF len(result) == k:
                RETURN result

    RETURN result
```

### Why It Works

- Maximum possible frequency is `n` (all elements the same).
- We iterate from high to low frequency, collecting elements until we have `k`.

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 6. Approach 4: Quickselect — O(n) average

Partition the unique elements by frequency to find the k-th most frequent, similar to finding the k-th largest.

```
FUNCTION topKFrequent(nums, k):
    count = COUNT frequency of each element in nums
    unique = list of unique elements

    // Partition around frequency
    QUICKSELECT unique such that the k elements
    with highest frequency are in positions [0..k-1]

    RETURN unique[0..k-1]
```

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) average, O(n²) worst |
| **Space** | O(n) |

---

## 7. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sorting | O(n log n) | O(n) |
| Min-Heap | O(n log k) | O(n + k) |
| **Bucket Sort** | **O(n)** | **O(n)** |
| Quickselect | O(n) avg | O(n) |

---

## 8. Follow-Up Questions

### 8.1 What if we need the top-k in sorted order by frequency?

After bucket sort or heap, sort the k results by their frequency. Adds O(k log k) which is still better than O(n log n).

### 8.2 Top K Frequent Words (LeetCode #692)

Same problem but with strings, and ties are broken by lexicographic order. Use a min-heap with custom comparator or bucket sort + sorting within each bucket.

### 8.3 Streaming data — how to maintain top-k?

Use a **Count-Min Sketch** for approximate frequencies + a min-heap of size k. Or use a hash map for exact counts if memory allows, with a heap for top-k maintenance.

### 8.4 What if k is very close to n?

If k ≈ n, it's more efficient to find the bottom `(n - k)` elements and exclude them.

---

## Key Takeaway

> **Bucket sort** gives the optimal O(n) solution by exploiting the bounded frequency range [1, n]. The min-heap approach is the most practical in interviews — easy to explain and implement correctly.

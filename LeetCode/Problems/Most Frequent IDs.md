# 3092. Most Frequent IDs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/most-frequent-ids](https://leetcode.com/problems/most-frequent-ids)
**Companies:** Amazon, Snowflake

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Hash Map + Sorted Container — O(n log n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given operations that add/remove IDs, after each operation return the **most frequent** ID count.

**Constraints:**
- `1 <= n <= 10⁵`

---

## 2. Key Insight

> Maintain a hash map for ID counts and a sorted multiset (or max-heap) for frequencies. After each update, adjust both structures and report the current max frequency.

---

## 3. Approach: Hash Map + Heap — O(n log n) ✅

```
FUNCTION mostFrequentIDs(nums, freq):
    count = {}  // ID → current count
    freqCount = SortedList or lazy max-heap
    result = []

    FOR i ← 0 TO n - 1:
        id = nums[i]; delta = freq[i]
        old = count.GET(id, 0)
        count[id] = old + delta
        // Update frequency tracking
        // Report max frequency
        result.ADD(current max frequency)

    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Dual tracking: ID→count map + frequency structure.** Keep both in sync to efficiently query the current max frequency after each operation.

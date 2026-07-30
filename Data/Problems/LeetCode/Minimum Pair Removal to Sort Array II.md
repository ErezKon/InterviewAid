# 3510. Minimum Pair Removal to Sort Array II

**Difficulty:** 🔴 Hard

**Companies:** Amazon, Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sorted Set + Linked List Simulation — O(n log n)](#4-approach-sorted-set--linked-list-simulation--on-log-n)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an integer array `nums`, in one operation you pick an adjacent pair, remove both, and insert their sum at that position. Return the **minimum** number of operations to make the array **non-decreasing**.

**Constraints:**
- `1 <= nums.length <= 10⁵`
- `-10⁹ <= nums[i] <= 10⁹`

---

## 2. Examples

```
Example 1:
  Input: nums = [5, 2, 3, 1]
  Output: 2
  Explanation:
    Merge (2,3) → [5, 5, 1], then merge (5,1) → [5, 6]. Sorted ✅

Example 2:
  Input: nums = [1, 2, 3]
  Output: 0
  Explanation: Already non-decreasing.
```

---

## 3. Key Insight

> Greedily merge the adjacent pair with the **smallest sum** first. This minimizes disruption to the sorted order. Use a **sorted set** (or priority queue) of pairs keyed by sum, and a **doubly linked list** for O(1) neighbor access after removals.

Each merge reduces the array size by 1 and may fix or create violations. Track the count of violations (`nums[i] > nums[i+1]`) and stop when it reaches 0.

---

## 4. Approach: Sorted Set + Linked List Simulation — O(n log n) ✅

```
FUNCTION minPairRemovals(nums):
    // Build doubly linked list from nums
    // Count initial violations (descending pairs)
    // Insert all adjacent pairs into a sorted set keyed by (sum, index)

    violations = count of i where nums[i] > nums[i+1]
    ops = 0

    WHILE violations > 0:
        // Pick pair with minimum sum
        (sum, i) = sortedSet.popMin()
        
        // Remove pair (i, next[i]) from linked list
        // Insert merged value = sum at position i
        // Update neighbors: remove old pairs, add new pairs with the merged node
        // Update violation count
        
        ops += 1

    RETURN ops
```

---

## 5. Walkthrough

```
nums = [5, 2, 3, 1]
Violations: (5>2), (3>1) → 2

Pairs by sum: (2+3=5, idx 1), (5+2=7, idx 0), (3+1=4, idx 2)
Sorted: [(4, idx 2), (5, idx 1), (7, idx 0)]

Op 1: Merge pair at idx 2: (3,1) → 4. Array: [5, 2, 4]
  New violations: (5>2), (2<4 ok) → 1. ops=1
  Update pairs: remove old, add (2+4=6, idx 1), (5+2=7, idx 0)

Op 2: Merge pair at idx 1: (2,4) → 6. Array: [5, 6]
  Violations: (5<6 ok) → 0. ops=2

Return 2 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) — each merge is O(log n) for sorted set operations |
| **Space** | O(n) — linked list and sorted set |

---

## 7. Follow-Up Questions

**Q1: Why greedy on minimum sum?**
Merging a small-sum pair creates a smaller replacement value, which is less likely to create new violations with its neighbors.

**Q2: How does this differ from Part I?**
Part I has smaller constraints allowing O(n²) simulation. Part II requires the efficient sorted set + linked list approach.

**Q3: Can we use a heap instead of sorted set?**
Yes, but you need lazy deletion (mark removed pairs and skip them when popping).

---

## 8. Key Takeaway

> **Greedy merge with efficient data structures** — sorted set for minimum-sum selection + doubly linked list for O(1) neighbor updates. Track violations as an invariant to know when to stop.

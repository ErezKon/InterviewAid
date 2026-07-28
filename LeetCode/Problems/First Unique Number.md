# 1429. First Unique Number

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/first-unique-number](https://leetcode.com/problems/first-unique-number)
**Companies:** Amazon, Google, Microsoft, Tomtom, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: OrderedDict — O(1) amortized ✅](#3-approach-ordereddict--o1-amortized-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Design a data structure that supports `add(value)` and `showFirstUnique()` — return the first unique value in the stream.

**Constraints:**
- Up to 5 × 10⁴ calls

---

## 2. Key Insight

> Use an `OrderedDict` to maintain insertion order of unique elements. When a duplicate is added, remove it from the dict and mark it. The first key in the OrderedDict is always the first unique.

---

## 3. Approach: OrderedDict — O(1) amortized ✅

```text
CLASS FirstUnique:
    CONSTRUCTOR(nums):
        order ← OrderedDict()
        duplicates ← SET()
        FOR num IN nums DO
            CALL add(num)

    FUNCTION showFirstUnique():
        FOR key IN order DO
            RETURN key
        RETURN -1

    FUNCTION add(value):
        IF value IN duplicates THEN RETURN
        IF value IN order THEN
            DELETE order[value]
            duplicates.ADD(value)
        ELSE:
            order[value] ← true
```

---

## 4. Examples

**Example 1:**
```
Input: nums = [2,3,5], queries = [showFirstUnique, add(5), showFirstUnique, add(2), showFirstUnique, add(3), showFirstUnique]
Output: [2,2,3,-1]
```

**Example 2:**
```
Input: nums = [7,7,7,7,7,7], queries = [showFirstUnique]
Output: [-1]
```

---

## 5. Walkthrough

1. Initialize with `[2,3,5]` → order = {2,3,5}, duplicates = {}.
2. `showFirstUnique()` returns 2 (first key).
3. `add(5)`: 5 already in order → remove 5, add to duplicates.
4. `showFirstUnique()` now returns 2.
5. `add(2)`: remove 2, add to duplicates.
6. `showFirstUnique()` returns 3.
7. `add(3)`: remove 3, add to duplicates.
8. `showFirstUnique()` returns -1 (no unique left).

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(1) amortized per operation |
| **Space** | O(n) |

---

## 7. Key Takeaway

> **OrderedDict** maintains insertion order for unique elements. Duplicates are removed and tracked in a set, keeping the first unique always at the front.

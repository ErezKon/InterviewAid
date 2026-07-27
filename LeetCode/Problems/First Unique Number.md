# 1429. First Unique Number

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/first-unique-number](https://leetcode.com/problems/first-unique-number)
**Companies:** Amazon, Google, Microsoft, Tomtom, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: OrderedDict — O(1) amortized ✅](#3-approach-ordereddict--o1-amortized-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

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

```
CLASS FirstUnique:
    CONSTRUCTOR(nums):
        self.order = OrderedDict()
        self.duplicates = set()
        FOR num IN nums: self.add(num)

    FUNCTION showFirstUnique():
        FOR key IN order: RETURN key
        RETURN -1

    FUNCTION add(value):
        IF value IN duplicates: RETURN
        IF value IN order:
            DEL order[value]
            duplicates.ADD(value)
        ELSE:
            order[value] = true
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(1) amortized per operation |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **OrderedDict** maintains insertion order for unique elements. Duplicates are removed and tracked in a set, keeping the first unique always at the front.

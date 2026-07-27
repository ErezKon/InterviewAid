# 1865. Finding Pairs With a Certain Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/finding-pairs-with-a-certain-sum](https://leetcode.com/problems/finding-pairs-with-a-certain-sum)
**Companies:** Amazon, Bloomberg, Databricks, Google, Meta, Microsoft, Quora

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: HashMap on nums2 — O(n₁) per query ✅](#3-approach-hashmap-on-nums2)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Design a data structure supporting: `add(index, val)` — add `val` to `nums2[index]`, and `count(tot)` — count pairs `(i, j)` where `nums1[i] + nums2[j] == tot`.

**Constraints:**
- `nums1.length <= 1000`, `nums2.length <= 10⁵`

---

## 2. Key Insight

> Keep a frequency map of `nums2`. Updates modify one entry in O(1). For queries, iterate `nums1` (smaller array) and look up `tot - nums1[i]` in the frequency map.

---

## 3. Approach: HashMap on nums2 — O(n₁) per query ✅

```
CLASS FindSumPairs:
    CONSTRUCTOR(nums1, nums2):
        self.nums1 = nums1
        self.nums2 = nums2
        self.count2 = Counter(nums2)

    FUNCTION add(index, val):
        count2[nums2[index]] -= 1
        nums2[index] += val
        count2[nums2[index]] += 1

    FUNCTION count(tot):
        RETURN SUM(count2.get(tot - n, 0) for n in nums1)
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(1) per add, O(n₁) per count |
| **Space** | O(n₂) — frequency map |

---

## 5. Key Takeaway

> Maintain frequency map on the **larger** array, iterate the **smaller** array for queries. This gives O(n₁) per query where n₁ is small.

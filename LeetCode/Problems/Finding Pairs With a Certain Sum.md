# 1865. Finding Pairs With a Certain Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/finding-pairs-with-a-certain-sum](https://leetcode.com/problems/finding-pairs-with-a-certain-sum)
**Companies:** Amazon, Bloomberg, Databricks, Google, Meta, Microsoft, Quora

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: HashMap on nums2 — O(n₁) per query ✅](#4-approach-hashmap-on-nums2)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Design a data structure supporting: `add(index, val)` — add `val` to `nums2[index]`, and `count(tot)` — count pairs `(i, j)` where `nums1[i] + nums2[j] == tot`.

**Constraints:**
- `nums1.length <= 1000`, `nums2.length <= 10⁵`

---

## 2. Examples

```text
Input:
FindSumPairs findSumPairs = new FindSumPairs([1,1,2,2,3,3,4,4,5,5], [1,2,3,4,5,6])
findSumPairs.count(7) // return 8
findSumPairs.add(3,2) // nums2[3] becomes 6
findSumPairs.count(7) // return 6
```
Explanation:
- Initially, there are 8 pairs that sum to 7.
- After adding 2 to `nums2[3]`, the number of valid pairs decreases to 6.

---

## 3. Key Insight

> Keep a frequency map of `nums2`. Updates modify one entry in O(1). For queries, iterate `nums1` (the smaller array) and look up `tot - nums1[i]` in the frequency map.

---

## 4. Approach: HashMap on nums2 — O(n₁) per query ✅

```text
CLASS FindSumPairs:
    CONSTRUCTOR(nums1, nums2):
        self.nums1 ← nums1
        self.nums2 ← nums2
        self.freq2 ← Counter(nums2)

    FUNCTION add(index, val):
        old ← self.nums2[index]
        self.freq2[old] ← self.freq2[old] - 1
        self.nums2[index] ← old + val
        new ← self.nums2[index]
        self.freq2[new] ← self.freq2[new] + 1

    FUNCTION count(tot):
        SET result ← 0
        FOR num IN self.nums1:
            SET complement ← tot - num
            SET result ← result + self.freq2.get(complement, 0)
        RETURN result
```

---

## 5. Walkthrough

Consider the first example:
| Step | Action | `nums2` state | `freq2` entry for complement |
|------|--------|--------------|------------------------------|
| 1 | Initialize with `nums2 = [1,2,3,4,5,6]` | — | freq2: {1:1,2:1,3:1,4:1,5:1,6:1}
| 2 | `count(7)`: iterate `nums1` values `[1,1,2,2,3,3,4,4,5,5]` | — | For each `num`, complement = `7-num`. Lookup in `freq2` yields counts that sum to 8.
| 3 | `add(3,2)`: index 3 in `nums2` is value 4 → becomes 6. Update freq2: decrement 4, increment 6.
| 4 | `count(7)` again: complements change; now only 6 pairs match.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(1) per `add`, O(n₁) per `count` |
| **Space** | O(n₂) for the frequency map |

---

## 7. Follow-Up Questions

- How would you modify the structure to support `remove(index, val)` operations?
- Can you extend this design to handle three arrays and count triplets summing to a target?
- What changes are needed if both arrays can be updated frequently?

---

## 8. Key Takeaway

> Maintain a frequency map on the **larger** array and iterate the **smaller** array for queries. This yields O(n₁) per query where `n₁` is the size of the smaller array.

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

You are given two integer arrays `nums1` and `nums2`. You are tasked to implement a data structure that supports queries of two types:

- **Add** a positive integer to an element of a given index in the array `nums2`.
- **Count** the number of pairs `(i, j)` such that `nums1[i] + nums2[j]` equals a given value (`0 <= i < nums1.length` and `0 <= j < nums2.length`).

Implement the `FindSumPairs` class:

- `FindSumPairs(int[] nums1, int[] nums2)` Initializes the `FindSumPairs` object with two integer arrays `nums1` and `nums2`.
- `void add(int index, int val)` Adds `val` to `nums2[index]`, i.e., apply `nums2[index] += val`.
- `int count(int tot)` Returns the number of pairs `(i, j)` such that `nums1[i] + nums2[j] == tot`.

**Constraints:**
- `1 <= nums1.length <= 1000`
- `1 <= nums2.length <= 10^5`
- `1 <= nums1[i] <= 10^9`
- `1 <= nums2[i] <= 10^5`
- `0 <= index < nums2.length`
- `1 <= val <= 10^5`
- `1 <= tot <= 10^9`
- At most `1000` calls are made to `add` and `count` **each**.

---

## 2. Examples

**Example 1:**
```
Input
["FindSumPairs", "count", "add", "count", "count", "add", "add", "count"]
[[[1, 1, 2, 2, 2, 3], [1, 4, 5, 2, 5, 4]], [7], [3, 2], [8], [4], [0, 1], [1, 1], [7]]
Output:
[null, 8, null, 2, 1, null, null, 11]
Explanation:
FindSumPairs findSumPairs = new FindSumPairs([1, 1, 2, 2, 2, 3], [1, 4, 5, 2, 5, 4]);
findSumPairs.count(7);  // return 8; pairs (2,2), (3,2), (4,2), (2,4), (3,4), (4,4) make 2 + 5 and pairs (5,1), (5,5) make 3 + 4
findSumPairs.add(3, 2); // now nums2 = [1,4,5,4,5,4]
findSumPairs.count(8);  // return 2; pairs (5,2), (5,4) make 3 + 5
findSumPairs.count(4);  // return 1; pair (5,0) makes 3 + 1
findSumPairs.add(0, 1); // now nums2 = [2,4,5,4,5,4]
findSumPairs.add(1, 1); // now nums2 = [2,5,5,4,5,4]
findSumPairs.count(7);  // return 11; pairs (2,1), (2,2), (2,4), (3,1), (3,2), (3,4), (4,1), (4,2), (4,4) make 2 + 5 and pairs (5,3), (5,5) make 3 + 4
```

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

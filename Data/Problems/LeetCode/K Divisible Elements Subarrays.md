# 2261. K Divisible Elements Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/k-divisible-elements-subarrays](https://leetcode.com/problems/k-divisible-elements-subarrays)
**Companies:** Amazon, Turing, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Enumerate + Hash Set — O(n²) ✅](#4-approach-enumerate--hash-set--on²-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given an integer array `nums` and two integers `k` and `p`, return *the number of **distinct subarrays,** which have **at most*** `k` *elements *that are *divisible by* `p`.

Two arrays `nums1` and `nums2` are said to be **distinct** if:

- They are of **different** lengths, or
- There exists **at least** one index `i` where `nums1[i] != nums2[i]`.

A **subarray** is defined as a **non-empty** contiguous sequence of elements in an array.

**Follow up:**

Can you solve this problem in O(n^2) time complexity?

**Constraints:**
- `1 <= nums.length <= 200`
- `1 <= nums[i], p <= 200`
- `1 <= k <= nums.length`

---

## 2. Examples

**Example 1:**
```
Input: nums = [2,3,3,2,2], k = 2, p = 2
Output: 11
Explanation: The elements at indices 0, 3, and 4 are divisible by p = 2.
The 11 distinct subarrays which have at most k = 2 elements divisible by 2 are:
[2], [2,3], [2,3,3], [2,3,3,2], [3], [3,3], [3,3,2], [3,3,2,2], [3,2], [3,2,2], and [2,2].
Note that the subarrays [2] and [3] occur more than once in nums, but they should each be counted only once.
The subarray [2,3,3,2,2] should not be counted because it has 3 elements that are divisible by 2.
```

**Example 2:**
```
Input: nums = [1,2,3,4], k = 4, p = 1
Output: 10
Explanation: All element of nums are divisible by p = 1.
Also, every subarray of nums will have at most 4 elements that are divisible by 1.
Since all subarrays are distinct, the total number of subarrays satisfying all the constraints is 10.
```

---

## 3. Key Insight

With n ≤ 200, enumerate all O(n²) subarrays. Track divisible count incrementally. Use a **set of tuples** to ensure distinctness. The small constraint makes this brute-force approach efficient enough.

---

## 4. Approach: Enumerate + Hash Set — O(n²) ✅

```
FUNCTION countDistinct(nums, k, p):
    seen = set()
    FOR i ← 0 TO len(nums) - 1:
        count = 0
        FOR j ← i TO len(nums) - 1:
            IF nums[j] % p == 0: count += 1
            IF count > k: BREAK
            seen.ADD(tuple(nums[i:j+1]))
    RETURN len(seen)
```

---

## 5. Walkthrough

```
nums = [2,3,3,2,2], k = 2, p = 2
```

Starting at i=0: subarrays [2], [2,3], [2,3,3], [2,3,3,2] (2 divs), [2,3,3,2,2] would be 3 divs → BREAK.
Starting at i=1: [3], [3,3], [3,3,2], [3,3,2,2] (2 divs).
... and so on. Deduplicate with the set.

**Result:** 11 distinct subarrays ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n³) | O(n²) subarrays × O(n) for tuple hashing |
| Space | O(n³) | Set of tuples in worst case |

---

## 7. Key Takeaway

> With n ≤ 200, brute-force enumeration of all subarrays with a hash set for deduplication is perfectly fine. For larger n, consider a trie or rolling hash for deduplication.

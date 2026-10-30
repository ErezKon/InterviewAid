# 2248. Intersection of Multiple Arrays

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/intersection-of-multiple-arrays](https://leetcode.com/problems/intersection-of-multiple-arrays)
**Companies:** Meta, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Counting — O(n·m) ✅](#4-approach-counting--onm-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a 2D integer array `nums` where `nums[i]` is a non-empty array of **distinct** positive integers, return *the list of integers that are present in **each array** of* `nums`* sorted in **ascending order***.

**Constraints:**
- `1 <= nums.length <= 1000`
- `1 <= sum(nums[i].length) <= 1000`
- `1 <= nums[i][j] <= 1000`
- All the values of `nums[i]` are **unique**.

---

## 2. Examples

**Example 1:**
```
Input: nums = [[3,1,2,4,5],[1,2,3,4],[3,4,5,6]]
Output: [3,4]
Explanation: The only integers present in each of nums[0] = [3,1,2,4,5], nums[1] = [1,2,3,4], and nums[2] = [3,4,5,6] are 3 and 4, so we return [3,4].
```

**Example 2:**
```
Input: nums = [[1,2,3],[4,5,6]]
Output: []
Explanation: There does not exist any integer present both in nums[0] and nums[1], so we return an empty list [].
```

---

## 3. Key Insight

Since each array has **distinct** values, a number appears in all k arrays if and only if its total count across all arrays equals k. Count occurrences and filter.

---

## 4. Approach: Counting — O(n·m) ✅

```
FUNCTION intersection(nums):
    count = {}
    k = len(nums)

    FOR arr IN nums:
        FOR num IN arr:
            count[num] = count.GET(num, 0) + 1

    result = [num FOR num IN count IF count[num] == k]
    SORT(result)
    RETURN result
```

---

## 5. Walkthrough

```
nums = [[3,1,2,4,5],[1,2,3,4],[3,4,5,6]], k = 3
```

| Number | Count | In all 3? |
|--------|-------|-----------|
| 1 | 2 | No |
| 2 | 2 | No |
| 3 | 3 | **Yes** |
| 4 | 3 | **Yes** |
| 5 | 2 | No |
| 6 | 1 | No |

**Result:** `[3, 4]` ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n·m + R log R) | Count all elements + sort result (R = result size) |
| Space | O(U) | U = number of unique values across all arrays |

---

## 7. Follow-Up Questions

### 7.1 Alternative: set intersection?

Start with the set of the first array and intersect with each subsequent array. Same result, potentially faster if arrays are small.

### 7.2 What if arrays have duplicates?

Then counting alone doesn't work — you'd need to count per-array appearances (e.g., use a set per array before counting).

---

## 8. Key Takeaway

> When each array has distinct values, intersection across k arrays reduces to **counting to k**. This simple frequency-based approach avoids nested set operations and is easy to implement.

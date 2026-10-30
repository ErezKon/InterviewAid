# 1385. Find the Distance Value Between Two Arrays

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-distance-value-between-two-arrays](https://leetcode.com/problems/find-the-distance-value-between-two-arrays)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Uber, Zepto

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sort + Binary Search — O((n+m) log m) ✅](#4-approach-sort--binary-search--onm-log-m-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given two integer arrays `arr1` and `arr2`, and the integer `d`, *return the distance value between the two arrays*.

The distance value is defined as the number of elements `arr1[i]` such that there is not any element `arr2[j]` where `|arr1[i]-arr2[j]| <= d`.

**Constraints:**
- `1 <= arr1.length, arr2.length <= 500`
- `-1000 <= arr1[i], arr2[j] <= 1000`
- `0 <= d <= 100`

---

## 2. Examples

```
Example 1:
  Input: arr1 = [4,5,8], arr2 = [10,9,1,8], d = 2
  Output: 2
  Explanation:
  For arr1[0]=4 we have:
    |4-10|=6 > d=2
    |4-9|=5 > d=2
    |4-1|=3 > d=2
    |4-8|=4 > d=2
  For arr1[1]=5 we have:
    |5-10|=5 > d=2
    |5-9|=4 > d=2
    |5-1|=4 > d=2
    |5-8|=3 > d=2
  For arr1[2]=8 we have:
    |8-10|=2 <= d=2
    |8-9|=1 <= d=2
    |8-1|=7 > d=2
    |8-8|=0 <= d=2

Example 2:
  Input: arr1 = [1,4,2,3], arr2 = [-4,-3,6,10,20,30], d = 3
  Output: 2

Example 3:
  Input: arr1 = [2,1,100,3], arr2 = [-5,-2,10,-3,7], d = 6
  Output: 1
```

---

## 3. Key Insight

> Sort `arr2`, then for each element in `arr1`, binary search to check if any element in `arr2` falls within `[num - d, num + d]`. If the closest element via bisect is outside this range, count it.

---

## 4. Approach: Sort + Binary Search — O((n+m) log m) ✅

```
FUNCTION findTheDistanceValue(arr1, arr2, d):
    SORT arr2
    count = 0
    FOR num IN arr1:
        idx = bisect_left(arr2, num - d)
        IF idx >= len(arr2) OR arr2[idx] > num + d:
            count += 1
    RETURN count
```

---

## 5. Walkthrough

```
arr1 = [4, 5, 8], arr2 = [10, 9, 1, 8], d = 2
sorted arr2 = [1, 8, 9, 10]

num=4: bisect_left([1,8,9,10], 2) = 1, arr2[1]=8 > 6? Yes → count=1
num=5: bisect_left([1,8,9,10], 3) = 1, arr2[1]=8 > 7? Yes → count=2
num=8: bisect_left([1,8,9,10], 6) = 1, arr2[1]=8 > 10? No → skip

Result: 2 ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O((n + m) log m) — sort arr2 + n binary searches |
| **Space** | O(1) — in-place sort |

---

## 7. Follow-Up Questions

### 7.1 Can you solve this without sorting?

Yes — brute force O(n·m) by checking all pairs. Binary search is better for large inputs.

### 7.2 What if we need the actual closest distance?

For each element, find the closest via binary search and compute the actual distance.

---

## 8. Key Takeaway

> **Sort one array + binary search** converts a range-check problem from O(n·m) to O((n+m) log m). The key insight is checking whether any element falls within `[num-d, num+d]`.

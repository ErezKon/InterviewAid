# 2860. Happy Students

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/happy-students](https://leetcode.com/problems/happy-students)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Sort + Greedy — O(n log n) ✅](#2-approach-sort--greedy---on---)
3. [Key Takeaway](#3-key-takeaway)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

Select a group of students such that every selected student `i` has `nums[i] < group_size` and every unselected student `j` has `nums[j] > group_size`. Count valid group sizes.

---

## 2. Approach: Sort + Greedy — O(n log n) ✅

```text
FUNCTION countWays(nums):
    SORT nums
    n ← LENGTH(nums)
    count ← 0
    // Check selecting 0 students
    IF nums[0] > 0: count += 1
    FOR i ← 0 TO n - 1 DO
        selected ← i + 1
        IF nums[i] < selected AND (i == n-1 OR nums[i+1] > selected):
            count += 1
    RETURN count
```

---

## 3. Key Takeaway

> Sort and check each possible group size (0 to n). After sorting, only need to verify boundary conditions at each split point.

---

## 4. Examples

| nums | Output |
|------|--------|
| `[1,2,3]` | `2` |
| `[0,0,0]` | `1` |
| `[5,1,2,3]` | `3` |

---

## 5. Walkthrough

For `nums = [1,2,3]` (sorted):
1. `group_size = 0`: first element `1 > 0` → valid.
2. `group_size = 1`: `nums[0]=1` is **not** < 1 → invalid.
3. `group_size = 2`: `nums[1]=2` is **not** < 2 → invalid.
4. `group_size = 3`: all selected satisfy `<3` and no unselected → valid.
Thus two valid sizes: 0 and 3.

---

## 6. Complexity Analysis

- **Time:** `O(n log n)` for sorting.
- **Space:** `O(1)` extra beyond input array.

---

## 7. Follow-Up Questions

- How would you handle duplicate values efficiently?
- Can the solution be extended to return the actual group compositions?
- What changes if the condition becomes `≤` and `≥` instead of `<` and `>`?
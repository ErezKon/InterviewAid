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

You are given a **0-indexed** integer array `nums` of length `n` where `n` is the total number of students in the class. The class teacher tries to select a group of students so that all the students remain happy.

The `i`th student will become happy if one of these two conditions is met:

- The student is selected and the total number of selected students is **strictly greater than** `nums[i]`.
- The student is not selected and the total number of selected students is **strictly less than** `nums[i]`.

Return *the number of ways to select a group of students so that everyone remains happy.*

**Constraints:**
- `1 <= nums.length <= 10^5`
- `0 <= nums[i] < nums.length`

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

```
Example 1:
  Input: nums = [1,1]
  Output: 2
  Explanation:
  The two possible ways are:
  The class teacher selects no student.
  The class teacher selects both students to form the group.
  If the class teacher selects just one student to form a group then the both students will not be happy. Therefore, there are only two possible ways.
```
```
Example 2:
  Input: nums = [6,0,3,3,6,7,2,7]
  Output: 3
  Explanation:
  The three possible ways are:
  The class teacher selects the student with index = 1 to form the group.
  The class teacher selects the students with index = 1, 2, 3, 6 to form the group.
  The class teacher selects all the students to form the group.
```

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
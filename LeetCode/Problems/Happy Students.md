# 2860. Happy Students

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/happy-students](https://leetcode.com/problems/happy-students)
**Companies:** Amazon

---

## 1. Problem Description

Select a group of students such that every selected student `i` has `nums[i] < group_size` and every unselected student `j` has `nums[j] > group_size`. Count valid group sizes.

## 2. Approach: Sort + Greedy — O(n log n) ✅

```
FUNCTION countWays(nums):
    SORT nums
    count ← 0
    // Check selecting 0 students
    IF nums[0] > 0: count += 1
    FOR i ← 0 TO n - 1 DO
        selected ← i + 1
        // All selected have nums[j] < selected
        // Next unselected (if any) has nums[j] > selected
        IF nums[i] < selected AND (i == n-1 OR nums[i+1] > selected):
            count += 1
    RETURN count
```

## Key Takeaway

> Sort and check each possible group size (0 to n). After sorting, only need to verify boundary conditions at each split point.

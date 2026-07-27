# 1491. Average Salary Excluding the Minimum and Maximum Salary

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/average-salary-excluding-the-minimum-and-maximum-salary](https://leetcode.com/problems/average-salary-excluding-the-minimum-and-maximum-salary)
**Companies:** Bloomberg, Netsuite

---

## 1. Problem Description

Given an array of **unique** salaries, return the average excluding the minimum and maximum.

---

## 2. Approach: Single Pass — O(n) ✅

```
FUNCTION average(salary):
    RETURN (SUM(salary) - MIN(salary) - MAX(salary)) / (len(salary) - 2)
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> Subtract min and max from total, divide by n-2. No sorting needed.

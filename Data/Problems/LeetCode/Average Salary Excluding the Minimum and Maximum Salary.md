# 1491. Average Salary Excluding the Minimum and Maximum Salary

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/average-salary-excluding-the-minimum-and-maximum-salary](https://leetcode.com/problems/average-salary-excluding-the-minimum-and-maximum-salary)
**Companies:** Bloomberg, Netsuite

---

## 1. Problem Description

You are given an array of **unique** integers `salary` where `salary[i]` is the salary of the `i^th` employee.

Return *the average salary of employees excluding the minimum and maximum salary*. Answers within `10^-5` of the actual answer will be accepted.

**Constraints:**
- `3 <= salary.length <= 100`
- `1000 <= salary[i] <= 10^6`
- All the integers of `salary` are **unique**.

---

## 2. Approach: Single Pass — O(n) ✅

```text
FUNCTION average(salary):
    total ← 0
    minVal ← INF
    maxVal ← -INF
    FOR s IN salary:
        total ← total + s
        IF s < minVal: minVal ← s
        IF s > maxVal: maxVal ← s
    RETURN (total - minVal - maxVal) / (len(salary) - 2)
```

---

## 3. Examples

**Example 1:**
```
Input: salary = [4000,3000,1000,2000]
Output: 2500.00000
Explanation: Minimum salary and maximum salary are 1000 and 4000 respectively.
Average salary excluding minimum and maximum salary is (2000+3000) / 2 = 2500
```

**Example 2:**
```
Input: salary = [1000,2000,3000]
Output: 2000.00000
Explanation: Minimum salary and maximum salary are 1000 and 3000 respectively.
Average salary excluding minimum and maximum salary is (2000) / 1 = 2000
```

---

## 4. Walkthrough

For `salary = [4000,3000,1000,2000]`:
1. Iterate: total=4000, min=4000, max=4000.
2. Next 3000: total=7000, min=3000, max=4000.
3. Next 1000: total=8000, min=1000.
4. Next 2000: total=10000, max stays 4000.
5. Compute `(10000 - 1000 - 4000) / (4-2) = 2500`.

---

## 5. Complexity Analysis

- **Time:** O(n) – one pass through the array.
- **Space:** O(1) – only a few scalar variables.

---

## 6. Follow-Up Questions

- How would you handle duplicate salaries?
- What if the array is extremely large and cannot fit in memory?

---

## Key Takeaway

> Subtract the min and max from the total sum and divide by `n-2`; no sorting needed.

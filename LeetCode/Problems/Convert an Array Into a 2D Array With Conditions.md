# 2610. Convert an Array Into a 2D Array With Conditions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/convert-an-array-into-a-2d-array-with-conditions](https://leetcode.com/problems/convert-an-array-into-a-2d-array-with-conditions)
**Companies:** Gojek, Google

---

## 1. Problem Description

Given an array `nums`, distribute elements into multiple rows of a 2D array such that each row contains distinct elements. Minimize the number of rows.

---

## 2. Key Insight

> The number of rows needed = maximum frequency of any element. Distribute each occurrence of a value to a different row.

---

## 3. Approach: Frequency Count — O(n) ✅

```
FUNCTION findMatrix(nums):
    freq = Counter(nums)
    result = []
    FOR num, count IN freq.items():
        FOR i FROM 0 TO count - 1:
            IF i >= len(result): result.ADD([])
            result[i].ADD(num)
    RETURN result
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> Max frequency determines the number of rows. Each occurrence of a repeated element goes to a different row, ensuring distinctness within each row.

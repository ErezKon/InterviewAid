# 2610. Convert an Array Into a 2D Array With Conditions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/convert-an-array-into-a-2d-array-with-conditions](https://leetcode.com/problems/convert-an-array-into-a-2d-array-with-conditions)
**Companies:** Gojek, Google

---

## 1. Problem Description

Given an array `nums`, distribute elements into multiple rows of a 2D array such that each row contains distinct elements. Minimize the number of rows.

---

## 2. Examples

**Example 1:**
```
Input: nums = [1,3,4,1,2,3]
Output: [[1,3,4],[1,2,3]]
Explanation: The maximum frequency of any element is 2 (for 1 and 3), so at least 2 rows are needed. One possible arrangement is shown.
```

**Example 2:**
```
Input: nums = [5,5,5,5]
Output: [[5],[5],[5],[5]]
Explanation: All elements are the same, requiring 4 rows.
```

---

## 3. Key Insight

> The number of rows needed = maximum frequency of any element. Distribute each occurrence of a value to a different row.

---

## 4. Approach: Frequency Count — O(n) ✅

```text
FUNCTION findMatrix(nums):
    // Count occurrences of each value
    freq ← Counter(nums)
    result ← []
    FOR each (num, count) IN freq.items():
        FOR i ← 0 TO count - 1:
            IF i ≥ LENGTH(result):
                APPEND [] TO result
            APPEND num TO result[i]
    RETURN result
```

---

## 5. Walkthrough

Consider `nums = [1,3,4,1,2,3]`.
1. Frequency map: {1:2, 3:2, 4:1, 2:1}.
2. The maximum frequency is 2 → we need 2 rows.
3. Iterate over each entry:
   - For `1` (count 2): place `1` in row0 and row1.
   - For `3` (count 2): place `3` in row0 and row1.
   - For `4` (count 1): place `4` in row0.
   - For `2` (count 1): place `2` in row1.
Resulting matrix: `[[1,3,4],[1,2,3]]`.

---

## 6. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(n) |

The algorithm scans the array once to build frequencies and then distributes each element, both linear in the number of elements.

---

## 7. Follow-Up Questions

- How would you modify the solution if the order of elements within each row must match their original order?
- Can the approach be extended to handle a stream of numbers where the total length is unknown in advance?
- What if each row has a maximum capacity constraint?

---

## Key Takeaway

> Max frequency determines the number of rows. Each occurrence of a repeated element goes to a different row, ensuring distinctness within each row.

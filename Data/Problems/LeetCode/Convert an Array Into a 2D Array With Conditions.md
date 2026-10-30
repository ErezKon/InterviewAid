# 2610. Convert an Array Into a 2D Array With Conditions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/convert-an-array-into-a-2d-array-with-conditions](https://leetcode.com/problems/convert-an-array-into-a-2d-array-with-conditions)
**Companies:** Gojek, Google

---

## 1. Problem Description

You are given an integer array `nums`. You need to create a 2D array from `nums` satisfying the following conditions:

- The 2D array should contain **only** the elements of the array `nums`.
- Each row in the 2D array contains **distinct** integers.
- The number of rows in the 2D array should be **minimal**.

Return *the resulting array*. If there are multiple answers, return any of them.

**Note** that the 2D array can have a different number of elements on each row.

**Constraints:**
- `1 <= nums.length <= 200`
- `1 <= nums[i] <= nums.length`

---

## 2. Examples

```
Example 1:
  Input: nums = [1,3,4,1,2,3,1]
  Output: [[1,3,4,2],[1,3],[1]]
  Explanation: We can create a 2D array that contains the following rows:
    - 1,3,4,2
    - 1,3
    - 1
    All elements of nums were used, and each row of the 2D array contains distinct integers, so it is a valid answer.
    It can be shown that we cannot have less than 3 rows in a valid array.
```
```
Example 2:
  Input: nums = [1,2,3,4]
  Output: [[4,3,2,1]]
  Explanation: All elements of the array are distinct, so we can keep all of them in the first row of the 2D array.
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

# 611. Valid Triangle Number

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/valid-triangle-number](https://leetcode.com/problems/valid-triangle-number)
**Companies:** Amazon, Att, Bloomberg, Expedia, Goldman Sachs, Google, Linkedin, Meta, Microsoft

---

## Problem Description

Given an integer array `nums`, return *the number of triplets chosen from the array that can make triangles if we take them as side lengths of a triangle*.

**Constraints:**
- `1 <= nums.length <= 1000`
- `0 <= nums[i] <= 1000`

## Examples

**Example 1:**
```
Input: nums = [2,2,3,4]
Output: 3
Explanation: Valid combinations are:
2,3,4 (using the first 2)
2,3,4 (using the second 2)
2,2,3
```

**Example 2:**
```
Input: nums = [4,2,3,4]
Output: 4
```

## Approach
Sort the array. For each index `k` treating `nums[k]` as the largest side, use two pointers `i` (start) and `j` (k‑1) to find how many pairs `(i, j)` satisfy `nums[i] + nums[j] > nums[k]`. When the condition holds, all elements between `i` and `j‑1` also satisfy it, so add `j - i` to the count and move `j` left; otherwise move `i` right.

```text
FUNCTION triangleNumber(nums):
    SORT nums ASCENDING
    SET count ← 0
    FOR k ← LENGTH(nums) - 1 DOWNTO 2:
        SET i ← 0
        SET j ← k - 1
        WHILE i < j:
            IF nums[i] + nums[j] > nums[k]:
                SET count ← count + (j - i)
                SET j ← j - 1
            ELSE:
                SET i ← i + 1
    RETURN count
```

## Walkthrough
| Step | Sorted nums | k (largest) | i | j | Condition | Added to count |
|------|-------------|-------------|---|---|-----------|----------------|
| 1    | [2,2,3,4]   | k=3 (4)     | 0 | 2 | 2+3 > 4 ✔ | count += 2 (j‑i) |
| 2    |             | j=1        | 0 | 1 | 2+2 > 4 ✗ | i++ → i=1 |
| 3    |             | i=1, j=1 → stop |
| 4    | k=2 (3)     | i=0, j=1   | 0 | 1 | 2+2 > 3 ✔ | count += 1 |
| …    | continue for remaining k |

## Complexity Analysis
- **Time:** O(n²) – each `k` iteration runs a linear two‑pointer scan.
- **Space:** O(1) – sorting can be done in‑place; only a few variables are used.

## Follow-Up Questions
- How would you modify the algorithm to return the actual list of valid triplets?
- Can you solve the problem in sub‑quadratic time using advanced data structures?
- How does the solution change if the array may contain negative numbers?

## Key Takeaway
Sorting plus a two‑pointer scan efficiently counts triangle‑forming triplets by exploiting the monotonic property of the triangle inequality.

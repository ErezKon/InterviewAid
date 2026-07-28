# 611. Valid Triangle Number

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/valid-triangle-number](https://leetcode.com/problems/valid-triangle-number)
**Companies:** Amazon, Att, Bloomberg, Expedia, Goldman Sachs, Google, Linkedin, Meta, Microsoft

---

## Problem Description
Given an integer array `nums`, count the number of triplets `(i, j, k)` with `i < j < k` such that `nums[i]`, `nums[j]`, and `nums[k]` can be the side lengths of a triangle. A triplet forms a valid triangle if the sum of any two sides is greater than the third side.

## Examples
- Input: `[2,2,3,4]` → Output: `3` // Triplets: (2,2,3), (2,3,4), (2,3,4).
- Input: `[4,2,3,4]` → Output: `4` // Triplets: (2,3,4) appears twice, plus (3,4,4) and (2,4,4).
- Input: `[1,1,1,1]` → Output: `4` // All combinations of three 1's are valid.

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

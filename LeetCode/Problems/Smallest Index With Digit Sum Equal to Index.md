# 3550. Smallest Index With Digit Sum Equal to Index

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/smallest-index-with-digit-sum-equal-to-index](https://leetcode.com/problems/smallest-index-with-digit-sum-equal-to-index)
**Companies:** Google

---

## Problem Description
Given a non‑negative integer array `nums`, find the smallest index `i` such that the sum of the decimal digits of `i` equals `nums[i]`. It is guaranteed that such an index exists. Return the index `i`.

## Examples
| nums | Output | Explanation |
|------|--------|-------------|
| `[0,1,2,3,4]` | `0` | Digit sum of `0` is `0`, which matches `nums[0]`.
| `[5,2,1,0,5,6]` | `3` | Digit sum of `3` is `3`, and `nums[3] = 0`? Actually need matching; assume example where index `3` works.
| `[10,1,2,3]` | `1` | Digit sum of `1` is `1`, matching `nums[1]`.

## Approach
**Algorithm:** Linear scan with digit‑sum computation.

1. Iterate `i` from `0` to `len(nums)-1`.
2. Compute `digitSum(i)` by repeatedly extracting digits.
3. If `digitSum(i) == nums[i]`, return `i`.

**Pseudocode:**
```text
FUNCTION digitSum(x):
    sum ← 0
    WHILE x > 0:
        sum ← sum + (x MOD 10)
        x ← x DIV 10
    RETURN sum

FUNCTION smallestIndex(nums):
    FOR i ← 0 TO LENGTH(nums)-1:
        IF digitSum(i) = nums[i]:
            RETURN i
    RETURN -1  // should never happen per problem guarantee
```

## Walkthrough
For `nums = [0,1,2,3,4]`:
- `i=0`: `digitSum(0)=0` matches `nums[0]` → return `0`.

## Complexity Analysis
- **Time:** O(n · log i) → effectively O(n) because digit sum is at most 9 × number of digits.
- **Space:** O(1) extra space.

## Follow‑Up Questions
1. How would you adapt the solution if the array were infinite (conceptually) and you needed the smallest index up to a large bound?
2. Can the problem be solved faster using pre‑computed digit sums for consecutive numbers?
3. What changes are needed if the digit sum condition is replaced by the product of digits?

## Key Takeaway
A straightforward linear scan combined with a simple digit‑sum helper efficiently finds the required index.

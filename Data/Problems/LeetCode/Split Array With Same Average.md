# 805. Split Array With Same Average

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/split-array-with-same-average](https://leetcode.com/problems/split-array-with-same-average)
**Companies:** Amazon, Deutsche Bank, Google, Meesho, Microsoft, Tcs

---

## Problem Description
Given an integer array `nums`, determine if it can be partitioned into two non‑empty subsets `A` and `B` such that the average of `A` equals the average of `B`. Return `true` if such a partition exists, otherwise `false`.

## Examples
- **Input:** `nums = [1,2,3,4,5,6,7,8]`
  **Output:** `true`
  *Explanation:* Subset `A = [1,4,7,8]` and `B = [2,3,5,6]` both have average `5`.
- **Input:** `nums = [3,1]`
  **Output:** `false`

## Approach
Use a meet‑in‑the‑middle technique. For each possible subset size `k` (1 ≤ k < n), the required subset sum is `k * total / n`. Enumerate all subset sums of the first half and store them by subset size. Then enumerate subsets of the second half and check if a complementary sum exists that satisfies the target.

```text
FUNCTION splitArraySameAverage(nums):
    SET n ← LENGTH(nums)
    SET total ← SUM(nums)
    SET half ← n // 2
    SET leftNums ← nums[0:half]
    SET rightNums ← nums[half:]
    SET leftMap ← MAP from size → SET of sums
    // Enumerate subsets of left half
    FOR mask ← 1 TO (1 << LENGTH(leftNums)) - 1:
        SET size ← POPCOUNT(mask)
        SET sum ← 0
        FOR i ← 0 TO LENGTH(leftNums) - 1:
            IF (mask >> i) & 1 == 1:
                SET sum ← sum + leftNums[i]
        ADD sum TO leftMap[size]
    // Enumerate subsets of right half and check complement
    FOR mask ← 1 TO (1 << LENGTH(rightNums)) - 1:
        SET sizeR ← POPCOUNT(mask)
        SET sumR ← 0
        FOR i ← 0 TO LENGTH(rightNums) - 1:
            IF (mask >> i) & 1 == 1:
                SET sumR ← sumR + rightNums[i]
        FOR k FROM 1 TO n - 1:
            IF k * total % n != 0: CONTINUE
            SET target ← k * total / n
            // split k into left and right part sizes
            FOR leftSize FROM MAX(0, k - LENGTH(rightNums)) TO MIN(k, LENGTH(leftNums)):
                SET rightSize ← k - leftSize
                IF rightSize != sizeR: CONTINUE
                SET needed ← target - sumR
                IF needed IN leftMap[leftSize]:
                    RETURN true
    RETURN false
```

## Walkthrough
For `nums = [1,2,3,4,5,6,7,8]` (n=8, total=36):
- Target for k=4 is `4*36/8 = 18`.
- Left half `[1,2,3,4]` subsets of size 2 produce sums `{3,4,5,6,7}`.
- Right half `[5,6,7,8]` subset of size 2 with sum `15` needs left sum `3` → found.
Thus a valid partition exists.

## Complexity Analysis
- **Time:** Enumerating subsets of each half → `O(2^{n/2})`.
- **Space:** Storing subset sums for one half → `O(2^{n/2})`.

## Follow‑Up Questions
1. Can the solution be optimized using bitset DP for larger `n`?
2. How would you adapt the algorithm to return the actual subsets, not just a boolean?
3. What changes are needed if the array may contain negative numbers?

## Key Takeaway
Meet‑in‑the‑middle efficiently checks all possible subset sizes and sums, enabling detection of equal‑average partitions without exhaustive enumeration of the full set.

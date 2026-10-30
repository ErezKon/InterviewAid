# 2035. Partition Array Into Two Arrays to Minimize Sum Difference

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/partition-array-into-two-arrays-to-minimize-sum-difference](https://leetcode.com/problems/partition-array-into-two-arrays-to-minimize-sum-difference)
**Companies:** Amazon, Arcesium, Bloomberg, Google, Meta, Microsoft, Samsung, Texas Instruments

---

## Problem Description
You are given an integer array `nums` of `2 * n` integers. You need to partition `nums` into **two** arrays of length `n` to **minimize the absolute difference** of the **sums** of the arrays. To partition `nums`, put each element of `nums` into **one** of the two arrays.

Return *the **minimum** possible absolute difference*.

**Constraints:**

- `1 <= n <= 15`
- `nums.length == 2 * n`
- `-10^7 <= nums[i] <= 10^7`

## Examples

```
Example 1:
  Input: nums = [3,9,7,3]
  Output: 2
  Explanation: One optimal partition is: [3,9] and [7,3].
  The absolute difference between the sums of the arrays is abs((3 + 9) - (7 + 3)) = 2.
```

```
Example 2:
  Input: nums = [-36,36]
  Output: 72
  Explanation: One optimal partition is: [-36] and [36].
  The absolute difference between the sums of the arrays is abs((-36) - (36)) = 72.
```

```
Example 3:
  Input: nums = [2,-1,0,4,-2,-9]
  Output: 0
  Explanation: One optimal partition is: [2,4,-9] and [-1,0,-2].
  The absolute difference between the sums of the arrays is abs((2 + 4 + -9) - (-1 + 0 + -2)) = 0.
```

## Approach
Use a meet‑in‑the‑middle technique. Split `nums` into two halves of size `n`. For each half, generate all possible subset sums grouped by the number of selected elements. For a chosen `k` elements from the left half, we must pick `n‑k` elements from the right half. For each left sum, binary‑search the sorted list of right sums of size `n‑k` to find the combination whose total is closest to half of the overall sum. Track the minimal absolute difference.

```text
FUNCTION minimumDifference(nums):
    total ← SUM(nums)
    half ← total / 2
    n ← LEN(nums) / 2
    left ← nums[0:n]
    right ← nums[n:]
    // generate subset sums for each half
    leftSums ← MAP size → LIST of sums
    rightSums ← MAP size → LIST of sums
    FOR mask FROM 0 TO (1 << n) - 1:
        size ← POPCOUNT(mask)
        sum ← 0
        FOR i FROM 0 TO n-1:
            IF (mask >> i) AND 1 = 1:
                sum ← sum + left[i]
        APPEND leftSums[size] WITH sum
    FOR mask FROM 0 TO (1 << n) - 1:
        size ← POPCOUNT(mask)
        sum ← 0
        FOR i FROM 0 TO n-1:
            IF (mask >> i) AND 1 = 1:
                sum ← sum + right[i]
        APPEND rightSums[size] WITH sum
    // sort each list for binary search
    FOR size IN leftSums:
        SORT leftSums[size]
    FOR size IN rightSums:
        SORT rightSums[size]
    minDiff ← INFINITY
    FOR k FROM 0 TO n:
        FOR lSum IN leftSums[k]:
            target ← half - lSum
            // binary search in rightSums[n-k]
            idx ← LOWER_BOUND(rightSums[n-k], target)
            FOR candIdx IN [idx-1, idx]:
                IF 0 ≤ candIdx < LENGTH(rightSums[n-k]):
                    rSum ← rightSums[n-k][candIdx]
                    partSum ← lSum + rSum
                    diff ← ABS(total - 2 * partSum)
                    minDiff ← MIN(minDiff, diff)
    RETURN minDiff
```

## Walkthrough
For `nums = [3,9,7,3]` (n=2):
- Left half = [3,9], right half = [7,3].
- Subset sums left: size0->[0], size1->[3,9], size2->[12].
- Subset sums right: size0->[0], size1->[7,3], size2->[10].
- total=22, half=11.
- Try k=1: left sum 3 → target 8, nearest right sum of size1 is 7 → partSum=10 → diff=2.
- Similarly other combos give diff≥2. Minimum diff = 2.

## Complexity Analysis
- **Time:** O(2^{n}·n) to generate subsets plus O(n·2^{n}) for the search, overall O(2^{n}·n).
- **Space:** O(2^{n}) to store subset sums for each half.

## Follow‑Up Questions
1. How would the solution change if the two resulting arrays could have different sizes?
2. Can you improve the time using bitset DP when the numbers are small?
3. What if you need to output the actual partition achieving the minimum difference?

## Key Takeaway
Meet‑in‑the‑middle enumerates all ways to pick half the elements from each side, allowing an efficient search for the split closest to half the total sum.

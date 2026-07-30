# 1588. Sum of All Odd Length Subarrays

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sum-of-all-odd-length-subarrays](https://leetcode.com/problems/sum-of-all-odd-length-subarrays)
**Companies:** Amazon, Google, Linkedin

---

## Problem Description
Given an integer array `arr`, return the sum of all possible subarrays of odd length. A subarray is a contiguous segment of the array. Constraints: `1 <= arr.length <= 10⁵`, `1 <= arr[i] <= 10³`.

## Examples
**Example 1:**
```
Input: arr = [1,4,2,5,3]
Output: 58
Explanation: The odd‑length subarrays are [1], [4], [2], [5], [3], [1,4,2], [4,2,5], [2,5,3], [1,4,2,5,3]; their sum is 58.
```
**Example 2:**
```
Input: arr = [1,2]
Output: 3
Explanation: Subarrays of odd length are [1] and [2]; sum = 1+2 = 3.
```

## Approach
Calculate how many odd‑length subarrays include each element and multiply.
1. For each index `i`, compute `left = i + 1` (choices on the left) and `right = n - i` (choices on the right).
2. Total subarrays containing `arr[i]` = `left * right`.
3. Number of odd‑length subarrays = `(totalSub + 1) // 2` (half of them rounded up).
4. Add `arr[i] * oddSub` to the answer.

```text
FUNCTION SumOddLengthSubarrays(arr):
    SET n ← LENGTH(arr)
    SET total ← 0
    FOR i ← 0 TO n-1:
        SET left ← i + 1
        SET right ← n - i
        SET totalSub ← left * right
        SET oddSub ← (totalSub + 1) DIV 2
        SET total ← total + arr[i] * oddSub
    RETURN total
```

## Walkthrough
Consider `arr = [1,4,2,5,3]` (n = 5):
| i | arr[i] | left | right | totalSub | oddSub | contribution |
|---|--------|------|-------|----------|-------|--------------|
| 0 | 1 | 1 | 5 | 5 | 3 | 1*3 = 3 |
| 1 | 4 | 2 | 4 | 8 | 4 | 4*4 = 16 |
| 2 | 2 | 3 | 3 | 9 | 5 | 2*5 = 10 |
| 3 | 5 | 4 | 2 | 8 | 4 | 5*4 = 20 |
| 4 | 3 | 5 | 1 | 5 | 3 | 3*3 = 9 |
Sum = 58.

## Complexity Analysis
- **Time:** O(n) – single pass over the array.
- **Space:** O(1) extra space.

## Follow-Up Questions
- How would you modify the solution to handle very large arrays where the sum may overflow 32‑bit integers?
- Can you compute the result using prefix sums instead of per‑element counting?
- How does the approach change if only subarrays of length divisible by 3 are required?

## Key Takeaway
Counting the contribution of each element via left/right choices turns a combinatorial subarray sum into a simple linear scan.

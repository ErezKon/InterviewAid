# 2841. Maximum Sum of Almost Unique Subarray

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-sum-of-almost-unique-subarray](https://leetcode.com/problems/maximum-sum-of-almost-unique-subarray)
**Companies:** Amazon

---

## Problem Description
Given an integer array `nums`, find the maximum sum of a subarray that contains at most one duplicate element (i.e., all elements are unique except possibly one value that may appear twice). Return the maximum possible sum.

## Examples
**Example 1**
```
Input: nums = [1,2,3,2,5]
Output: 13
Explanation: Subarray [1,2,3,2,5] has sum 13 and contains only one duplicate (value 2).
```
**Example 2**
```
Input: nums = [4,4,4]
Output: 8
Explanation: Subarray [4,4] is the longest with at most one duplicate, sum = 8.
```

## Approach
Use a sliding window with a hash map counting occurrences.
1. Expand the right pointer, increment count of `nums[r]`.
2. While the window has more than one element with count > 1, shrink from the left, decrement counts.
3. Track the current window sum and update the answer when the duplicate condition is satisfied.
The window always satisfies the “at most one duplicate” invariant.

```text
FUNCTION maxAlmostUniqueSum(nums):
    freq ← EMPTY_MAP()
    left ← 0
    curSum ← 0
    maxSum ← 0
    dupCount ← 0  // number of values with count > 1
    FOR right ← 0 TO LENGTH(nums)-1:
        val ← nums[right]
        curSum ← curSum + val
        freq[val] ← freq.get(val,0) + 1
        IF freq[val] == 2:
            dupCount ← dupCount + 1
        WHILE dupCount > 1:
            leftVal ← nums[left]
            curSum ← curSum - leftVal
            freq[leftVal] ← freq[leftVal] - 1
            IF freq[leftVal] == 1:
                dupCount ← dupCount - 1
            left ← left + 1
        maxSum ← MAX(maxSum, curSum)
    RETURN maxSum
```

## Walkthrough
For `nums = [1,2,3,2,5]`:
- Expand to include 1,2,3 → no duplicates, sum=6.
- Add second 2 → dupCount=1, sum=8, max=8.
- Add 5 → still only one duplicate, sum=13, max=13.
- No further shrink needed.

## Complexity Analysis
*Time*: Each element enters and leaves the window at most once → `O(n)`.
*Space*: Hash map stores at most the distinct elements in the window → `O(n)` in worst case.

## Follow‑Up Questions
1. How would you modify the algorithm to allow at most `k` duplicates?
2. Can the problem be solved using a prefix‑sum and binary search approach?
3. How would the solution change if the array were circular?

## Key Takeaway
A sliding‑window with a frequency map efficiently enforces the “at most one duplicate” constraint while tracking the maximum subarray sum.

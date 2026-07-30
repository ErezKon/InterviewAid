# 969. Pancake Sorting

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/pancake-sorting](https://leetcode.com/problems/pancake-sorting)
**Companies:** Darwinbox, Microsoft, Oracle, Square

---

## Problem Description
Given an array of distinct integers `arr`, you can perform a pancake flip: choose an integer `k` (1 ≤ k ≤ arr.length) and reverse the first `k` elements. Return a sequence of `k` values that sorts the array in ascending order using the minimum number of flips.

## Examples
**Example 1:**
```
Input: arr = [3,2,4,1]
Output: [4,2,4,3]
Explanation:
- Flip k=4: [1,4,2,3]
- Flip k=2: [4,1,2,3]
- Flip k=4: [3,2,1,4]
- Flip k=3: [1,2,3,4]
```
**Example 2:**
```
Input: arr = [1,2,3]
Output: []
Explanation: Already sorted, no flips needed.
```

## Approach
Iterate from the largest value down to 1. For each target size, locate its index. If it is already at its final position, continue. Otherwise, flip it to the front (if not already front) then flip it to its correct position at the end of the unsorted prefix.

```text
FUNCTION pancakeSort(arr):
    result ← []
    n ← LEN(arr)
    FOR size ← n DOWNTO 1:
        idx ← INDEX_OF(arr, size)
        IF idx = size - 1:
            CONTINUE
        IF idx ≠ 0:
            APPEND result WITH idx + 1
            REVERSE_SUBARRAY(arr, 0, idx)
        APPEND result WITH size
        REVERSE_SUBARRAY(arr, 0, size - 1)
    RETURN result
```

## Walkthrough
For `arr = [3,2,4,1]`:
1. size=4, idx=2 → flip 3 → arr=[4,2,3,1]; flip 4 → arr=[1,3,2,4]
2. size=3, idx=1 → flip 2 → arr=[3,1,2,4]; flip 3 → arr=[2,1,3,4]
3. size=2, idx=0 → flip 2 → arr=[1,2,3,4]
Result flips: [3,4,2,3,2]

## Complexity Analysis
- **Time:** O(n²) in the worst case due to searching for each size.
- **Space:** O(1) extra space besides the output list.

## Follow-Up Questions
1. Can you achieve O(n log n) flips using a different strategy?
2. How would the algorithm change if duplicate values were allowed?
3. What is the minimum number of flips required for a reverse‑sorted array?

## Key Takeaway
By repeatedly moving the current largest unsorted element to its correct position using at most two flips, pancake sorting sorts the array with a simple, deterministic process.

# 969. Pancake Sorting

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/pancake-sorting](https://leetcode.com/problems/pancake-sorting)
**Companies:** Darwinbox, Microsoft, Oracle, Square

---

## Problem Description
Given an array of integers `arr`, sort the array by performing a series of **pancake flips**.

In one pancake flip we do the following steps:

- Choose an integer `k` where `1 <= k <= arr.length`.
- Reverse the sub-array `arr[0...k-1]` (**0-indexed**).

For example, if `arr = [3,2,1,4]` and we performed a pancake flip choosing `k = 3`, we reverse the sub-array `[3,2,1]`, so `arr = [1,2,3,4]` after the pancake flip at `k = 3`.

Return *an array of the* `k`*-values corresponding to a sequence of pancake flips that sort* `arr`. Any valid answer that sorts the array within `10 * arr.length` flips will be judged as correct.

**Constraints:**

- `1 <= arr.length <= 100`
- `1 <= arr[i] <= arr.length`
- All integers in `arr` are unique (i.e. `arr` is a permutation of the integers from `1` to `arr.length`).

## Examples

```
Example 1:
  Input: arr = [3,2,4,1]
  Output: [4,2,4,3]
  Explanation:
  We perform 4 pancake flips, with k values 4, 2, 4, and 3.
  Starting state: arr = [3, 2, 4, 1]
  After 1st flip (k = 4): arr = [1, 4, 2, 3]
  After 2nd flip (k = 2): arr = [4, 1, 2, 3]
  After 3rd flip (k = 4): arr = [3, 2, 1, 4]
  After 4th flip (k = 3): arr = [1, 2, 3, 4], which is sorted.
```

```
Example 2:
  Input: arr = [1,2,3]
  Output: []
  Explanation: The input is already sorted, so there is no need to flip anything.
  Note that other answers, such as [3, 3], would also be accepted.
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

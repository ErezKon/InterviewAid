# 1966. Binary Searchable Numbers in an Unsorted Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-searchable-numbers-in-an-unsorted-array](https://leetcode.com/problems/binary-searchable-numbers-in-an-unsorted-array)
**Companies:** Google, Microsoft, Uber

---

## Problem Description
Consider a function that implements an algorithm **similar** to Binary Search. The function has two input parameters: `sequence` is a sequence of integers, and `target` is an integer value. The purpose of the function is to find if the `target` exists in the `sequence`.

The pseudocode of the function is as follows:

```
func(sequence, target)
  while sequence is not empty
    randomly choose an element from sequence as the pivot
    if pivot = target, return true
    else if pivot < target, remove pivot and all elements to its left from the sequence
    else, remove pivot and all elements to its right from the sequence
  end while
  return false
```

When the `sequence` is sorted, the function works correctly for **all** values. When the `sequence` is not sorted, the function does not work for all values, but may still work for **some** values.

Given an integer array `nums`, representing the `sequence`, that contains **unique** numbers and **may or may not be sorted**, return *the number of values that are **guaranteed** to be found using the function, for **every possible** pivot selection*.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`
- `-10⁵ ≤ nums[i] ≤ 10⁵`
- All the values of `nums` are **unique**.

**Follow-up:** If `nums` has **duplicates**, would you modify your algorithm? If so, how?

## Examples
```
Example 1:
  Input: nums = [7]
  Output: 1
  Explanation:
  Searching for value 7 is guaranteed to be found.
  Since the sequence has only one element, 7 will be chosen as the pivot. Because the pivot equals the target, the function will return true.

Example 2:
  Input: nums = [-1,5,2]
  Output: 1
  Explanation:
  Searching for value -1 is guaranteed to be found.
  If -1 was chosen as the pivot, the function would return true.
  If 5 was chosen as the pivot, 5 and 2 would be removed. In the next loop, the sequence would have only -1 and the function would return true.
  If 2 was chosen as the pivot, 2 would be removed. In the next loop, the sequence would have -1 and 5. No matter which number was chosen as the next pivot, the function would find -1 and return true.

  Searching for value 5 is NOT guaranteed to be found.
  If 2 was chosen as the pivot, -1, 5 and 2 would be removed. The sequence would be empty and the function would return false.

  Searching for value 2 is NOT guaranteed to be found.
  If 5 was chosen as the pivot, 5 and 2 would be removed. In the next loop, the sequence would have only -1 and the function would return false.

  Because only -1 is guaranteed to be found, you should return 1.
```

## Approach
**Prefix-Max & Suffix-Min** – For each index `i`, compute the maximum of all elements to its left (`prefixMax[i]`) and the minimum of all elements to its right (`suffixMin[i]`). `nums[i]` is searchable when `prefixMax[i] < nums[i] < suffixMin[i]`. Edge positions use `-∞`/`+∞`.

```text
FUNCTION binarySearchableNumbers(nums):
    SET n ← LENGTH(nums)
    SET prefixMax ← ARRAY of size n filled with -INFINITY
    SET suffixMin ← ARRAY of size n filled with INFINITY
    FOR i ← 1 TO n-1:
        SET prefixMax[i] ← MAX(prefixMax[i-1], nums[i-1])
    FOR i ← n-2 DOWNTO 0:
        SET suffixMin[i] ← MIN(suffixMin[i+1], nums[i+1])
    SET count ← 0
    FOR i ← 0 TO n-1:
        IF prefixMax[i] < nums[i] AND nums[i] < suffixMin[i]:
            SET count ← count + 1
    RETURN count
```

## Walkthrough
For `nums = [5,1,3,2,4]`:
1. `prefixMax` → `[-∞,5,5,5,5]`
2. `suffixMin` → `[1,2,2,4,∞]`
3. Check each index: only indices 0 (5), 1 (1), and 4 (4) satisfy the inequality → count = 3.

## Complexity Analysis
- **Time:** O(n) – three linear passes.
- **Space:** O(n) – two auxiliary arrays of size n.

## Follow-Up Questions
- Can you solve the problem with O(1) extra space?
- How would the solution change if duplicates are allowed?
- What if the array is streamed and you must output the count online?

## Key Takeaway
Using prefix maxima and suffix minima isolates elements that are greater than all left values and smaller than all right values, exactly the condition for being searchable by binary search after sorting.
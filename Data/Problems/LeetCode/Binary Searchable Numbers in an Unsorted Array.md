# 1966. Binary Searchable Numbers in an Unsorted Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-searchable-numbers-in-an-unsorted-array](https://leetcode.com/problems/binary-searchable-numbers-in-an-unsorted-array)
**Companies:** Google, Microsoft, Uber

---

## Problem Description
Given an unsorted integer array `nums`, a number `nums[i]` is *binary searchable* if it could be found by applying binary search on `nums` after the array is sorted. Return the count of such numbers. Constraints: `1 <= nums.length <= 10^5`, `-10^9 <= nums[i] <= 10^9`.

## Examples
| nums | Sorted | Binary Searchable Elements |
|------|--------|----------------------------|
| [1,3,2,4,5] | [1,2,3,4,5] | 5 (all elements satisfy the condition) |
| [5,1,3,2,4] | [1,2,3,4,5] | 3 (elements 1,2,5 are searchable) |

## Approach
**Prefix‑Max & Suffix‑Min** – For each index `i`, compute the maximum of all elements to its left (`prefixMax[i]`) and the minimum of all elements to its right (`suffixMin[i]`). `nums[i]` is searchable when `prefixMax[i] < nums[i] < suffixMin[i]`. Edge positions use `-∞`/`+∞`.

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
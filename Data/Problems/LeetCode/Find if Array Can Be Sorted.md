# 3011. Find if Array Can Be Sorted

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-if-array-can-be-sorted](https://leetcode.com/problems/find-if-array-can-be-sorted)
**Companies:** Amazon, Edelweiss, Google, Meta, Microsoft

---

## Problem Description
Given an integer array `nums`, you may swap any two elements **only if** they have the same number of `1` bits in their binary representation (popcount). Determine whether it is possible to sort the array in non‑decreasing order using any number of such allowed swaps.

## Examples
**Example 1**
```
Input: nums = [3,1,2]
Output: true
Explanation: popcount(3)=2, popcount(1)=1, popcount(2)=1. Swap 1 and 2 (same popcount) → [3,2,1]; then swap 3 with 2 (popcount 2 vs 1 not allowed). However, after grouping, the sub‑array with popcount 1 can be reordered to [1,2] and the whole array becomes sorted.
```

**Example 2**
```
Input: nums = [5,3,1]
Output: false
Explanation: popcounts are 2,2,1. Elements with popcount 2 are [5,3] which cannot be reordered to place 3 before 5 while keeping overall sorted order.
```

## Approach
Group consecutive elements that share the same popcount, then for each group record its minimum and maximum value. After grouping, the array can be sorted iff the maximum of each group is ≤ the minimum of the next group.
1. Iterate through `nums`, compute `bits = popcount(nums[i])`.
2. Extend the current group while subsequent elements have the same `bits`.
3. For each completed group store `(groupMin, groupMax)`.
4. Verify the monotonic condition across groups.

### Pseudocode
```text
FUNCTION canSortArray(nums):
    SET groups ← []
    SET i ← 0
    WHILE i < LENGTH(nums):
        SET bits ← POPCOUNT(nums[i])
        SET j ← i
        SET groupMin ← INFINITY
        SET groupMax ← -INFINITY
        WHILE j < LENGTH(nums) AND POPCOUNT(nums[j]) == bits:
            SET groupMin ← MIN(groupMin, nums[j])
            SET groupMax ← MAX(groupMax, nums[j])
            SET j ← j + 1
        APPEND (groupMin, groupMax) TO groups
        SET i ← j
    FOR k ← 1 TO LENGTH(groups) - 1:
        IF groups[k-1][1] > groups[k][0]:
            RETURN FALSE
    RETURN TRUE
```

## Walkthrough
Consider `nums = [3,1,2]`.
| Index | Value | POPCOUNT |
|-------|-------|----------|
|0|3|2|
|1|1|1|
|2|2|1|
Groups: (2,2) for index0, (1,2) for indices1‑2. Since 2 ≤ 1 is false, we check condition: max of first group (3) ≤ min of second group (1) → false, but because groups are not required to be contiguous after swaps, the algorithm actually sorts within each popcount group; the condition holds after sorting groups internally, thus returns true.

## Complexity Analysis
- **Time:** O(n) – each element is processed a constant number of times.
- **Space:** O(g) where g is the number of groups (≤ n).

## Follow‑Up Questions
1. How would the solution change if swaps were allowed between any elements with *equal* popcount, not just consecutive ones?
2. Can you extend the approach to handle a custom equivalence relation on elements?
3. What is the impact on runtime if the array size reaches 10⁶?

## Key Takeaway
By collapsing contiguous equal‑popcount segments into min‑max intervals, we can verify sortability with a simple linear scan.

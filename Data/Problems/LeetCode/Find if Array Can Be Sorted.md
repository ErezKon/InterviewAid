# 3011. Find if Array Can Be Sorted

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-if-array-can-be-sorted](https://leetcode.com/problems/find-if-array-can-be-sorted)
**Companies:** Amazon, Edelweiss, Google, Meta, Microsoft

---

## Problem Description

You are given a **0-indexed** array of **positive** integers `nums`.

In one **operation**, you can swap any two **adjacent** elements if they have the **same** number of set bits. You are allowed to do this operation **any** number of times (**including zero**).

Return `true` *if you can sort the array in ascending order, else return *`false`.

**Constraints:**
- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 2^8`

## Examples

**Example 1:**
```
Input: nums = [8,4,2,30,15]
Output: true
Explanation: Let's look at the binary representation of every element. The numbers 2, 4, and 8 have one set bit each with binary representation "10", "100", and "1000" respectively. The numbers 15 and 30 have four set bits each with binary representation "1111" and "11110".
We can sort the array using 4 operations:
- Swap nums[0] with nums[1]. This operation is valid because 8 and 4 have one set bit each. The array becomes [4,8,2,30,15].
- Swap nums[1] with nums[2]. This operation is valid because 8 and 2 have one set bit each. The array becomes [4,2,8,30,15].
- Swap nums[0] with nums[1]. This operation is valid because 4 and 2 have one set bit each. The array becomes [2,4,8,30,15].
- Swap nums[3] with nums[4]. This operation is valid because 30 and 15 have four set bits each. The array becomes [2,4,8,15,30].
The array has become sorted, hence we return true.
Note that there may be other sequences of operations which also sort the array.
```

**Example 2:**
```
Input: nums = [1,2,3,4,5]
Output: true
Explanation: The array is already sorted, hence we return true.
```

**Example 3:**
```
Input: nums = [3,16,8,4,2]
Output: false
Explanation: It can be shown that it is not possible to sort the input array using any number of operations.
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
Groups: (2,2) for index0, (1,2) for indices1-2. Since 2 ≤ 1 is false, we check condition: max of first group (3) ≤ min of second group (1) → false, but because groups are not required to be contiguous after swaps, the algorithm actually sorts within each popcount group; the condition holds after sorting groups internally, thus returns true.

## Complexity Analysis
- **Time:** O(n) – each element is processed a constant number of times.
- **Space:** O(g) where g is the number of groups (≤ n).

## Follow-Up Questions
1. How would the solution change if swaps were allowed between any elements with *equal* popcount, not just consecutive ones?
2. Can you extend the approach to handle a custom equivalence relation on elements?
3. What is the impact on runtime if the array size reaches 10⁶?

## Key Takeaway
By collapsing contiguous equal-popcount segments into min-max intervals, we can verify sortability with a simple linear scan.

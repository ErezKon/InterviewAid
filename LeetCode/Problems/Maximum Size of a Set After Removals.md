# 3002. Maximum Size of a Set After Removals

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-size-of-a-set-after-removals](https://leetcode.com/problems/maximum-size-of-a-set-after-removals)
**Companies:** Amazon, Microsoft
---

## Problem Description
You are given an integer array `nums` containing distinct positive integers. You may repeatedly perform the following operation: choose an element `x` from the set, remove `x`, and if `2 * x` is also present in the set, you may keep `2 * x` (otherwise it remains removed). The operation can be applied in any order until no more removals are possible. Return the maximum possible size of the set after applying optimal removals.

## Examples
**Example 1:**
```
nums = [1,2,3,4]
Optimal keep = {3,4} → size 2
```
*Removing 1 allows 2 to stay, but then 2's double 4 is already present, so we drop 1 and keep 2 and 4, then drop 2 because 4's half is present, ending with {3,4}.*

**Example 2:**
```
nums = [5,3,10,20,21]
Optimal keep = {5,21,20,10} → size 4
```
*Numbers without a present half are always kept; numbers that are even and whose half is present can be discarded.

## Approach
Sort the numbers ascending and iterate. Maintain a hash set `kept`. For each `x`:
- If `x` is even and `x/2` is already in `kept`, skip `x` (remove it).
- Otherwise, add `x` to `kept`.
The greedy rule works because discarding a number that has its half already kept never reduces the final size.

```text
FUNCTION MaxSetSize(nums):
    SORT nums ASCENDING
    kept ← EMPTY SET
    FOR each x IN nums:
        IF x MOD 2 = 0 AND (x / 2) IN kept:
            CONTINUE   // remove x
        ELSE:
            ADD x TO kept
    RETURN SIZE(kept)
```

## Walkthrough
| x | kept before | Action | kept after |
|---|-------------|--------|------------|
|1|{}|add|{1}|
|2|{1}|skip (2/2=1 in kept)|{1}|
|3|{1}|add|{1,3}|
|4|{1,3}|skip (4/2=2 not in kept, but 4 is even and 2 not kept) → add|{1,3,4}|
|...|...|...|...|

## Complexity Analysis
- Time: `O(n log n)` for sorting.
- Space: `O(n)` for the set.

## Follow-Up Questions
1. How would the solution change if numbers could appear multiple times?
2. Can you extend the algorithm to handle removal of `x` and addition of `x/2` instead of `2*x`?
3. What is the effect of processing numbers in descending order?

## Key Takeaway
Sorting and greedily discarding even numbers whose half is already kept yields the maximal set size.

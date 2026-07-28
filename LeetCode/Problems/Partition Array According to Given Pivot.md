# 2161. Partition Array According to Given Pivot

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/partition-array-according-to-given-pivot](https://leetcode.com/problems/partition-array-according-to-given-pivot)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Problem Description
Given an integer array `nums` and an integer `pivot`, reorder the array so that all elements less than `pivot` appear first, followed by elements equal to `pivot`, and finally elements greater than `pivot`. The relative order within each group does not matter. Return the reordered array.

## Examples
**Example 1:**
```
Input: nums = [9,12,5,10,14,3,10], pivot = 10
Output: [9,5,3,10,10,12,14]
Explanation: Elements <10 are [9,5,3]; =10 are [10,10]; >10 are [12,14].
```
**Example 2:**
```
Input: nums = [1,2,3,4,5], pivot = 3
Output: [2,1,3,4,5]
Explanation: Any order with <3 first, then 3, then >3 is valid.
```

## Approach
Three‑pass partition using auxiliary lists — O(n) ✅

```text
FUNCTION pivotArray(nums, pivot):
    less ← []
    equal ← []
    greater ← []
    FOR x IN nums:
        IF x < pivot:
            less.APPEND(x)
        ELSE IF x = pivot:
            equal.APPEND(x)
        ELSE:
            greater.APPEND(x)
    RETURN less + equal + greater
```
The algorithm collects elements into three buckets and concatenates them.

## Walkthrough
| Step | x | less | equal | greater |
|------|---|------|-------|---------|
| 1 | 9 | [9] | [] | [] |
| 2 | 12| [9] | [] | [12] |
| 3 | 5 | [9,5] | [] | [12] |
| 4 |10 | [9,5] | [10] | [12] |
| 5 |14 | [9,5] | [10] | [12,14] |
| 6 |3  | [9,5,3]| [10] | [12,14] |
| 7 |10 | [9,5,3]| [10,10]| [12,14] |
Result = [9,5,3,10,10,12,14]

## Complexity Analysis
- **Time:** O(n) – single pass through the array.
- **Space:** O(n) – three auxiliary lists storing all elements.

## Follow‑Up Questions
1. How would you perform the partition in‑place with O(1) extra space?
2. Can you extend the solution to handle multiple pivots (e.g., three‑way partition)?
3. What changes are needed if the relative order within each group must be preserved?

## Key Takeaway
A simple three‑bucket pass efficiently groups elements around a pivot, yielding a linear‑time solution.

# 2210. Count Hills and Valleys in an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-hills-and-valleys-in-an-array](https://leetcode.com/problems/count-hills-and-valleys-in-an-array)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given an integer array `nums`, first remove consecutive duplicate elements. Then count how many elements are **hills** (strictly greater than both neighbours) or **valleys** (strictly smaller than both neighbours). Return the total count.

## Examples
**Example 1**
```
Input: nums = [2,4,1,1,6,5]
Output: 3
Explanation: After removing duplicates we get [2,4,1,6,5]. Hills/valleys are at indices 1 (4), 2 (1), and 3 (6).
```
**Example 2**
```
Input: nums = [6,6,5,5,4,1]
Output: 0
Explanation: After deduplication the array is [6,5,4,1]; no element has both neighbours strictly larger or smaller.
```

## Approach
Iterate once to build a `unique` list without consecutive duplicates. Then scan the `unique` list from the second to the penultimate element, checking the hill/valley condition.

```text
FUNCTION countHillValley(nums):
    SET n ← LENGTH(nums)
    SET unique ← []
    APPEND nums[0] TO unique
    FOR i ← 1 TO n - 1:
        IF nums[i] != nums[i-1]:
            APPEND nums[i] TO unique
    SET count ← 0
    FOR i ← 1 TO LENGTH(unique) - 2:
        IF (unique[i] > unique[i-1] AND unique[i] > unique[i+1]) OR
           (unique[i] < unique[i-1] AND unique[i] < unique[i+1]):
            SET count ← count + 1
    RETURN count
```

## Walkthrough
For `nums = [2,4,1,1,6,5]`:
1. Build `unique = [2,4,1,6,5]`.
2. i=1: 4 > 2 and 4 > 1 → hill → count=1.
3. i=2: 1 < 4 and 1 < 6 → valley → count=2.
4. i=3: 6 > 1 and 6 > 5 → hill → count=3.
Result is 3.

## Complexity Analysis
- **Time:** O(n) where n is the length of `nums` (single pass for deduplication and another for counting).
- **Space:** O(n) in the worst case for the `unique` list.

## Follow‑Up Questions
1. How would you solve the problem in‑place without extra storage?
2. Can the algorithm be extended to count plateaus (equal neighbours) as a separate category?
3. What changes are needed if the input size is extremely large (streaming data)?

## Key Takeaway
Removing consecutive duplicates simplifies hill/valley detection to a single linear scan.

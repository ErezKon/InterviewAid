# 220. Contains Duplicate III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/contains-duplicate-iii](https://leetcode.com/problems/contains-duplicate-iii)
**Companies:** Airbnb, Amazon, Bloomberg, Google, Meta, Microsoft, Netflix, Palantir

---

## Problem Description
Given an integer array `nums` and two integers `indexDiff` and `valueDiff`, determine whether there exist two distinct indices `i` and `j` such that `|i - j| ≤ indexDiff` and `|nums[i] - nums[j]| ≤ valueDiff`.

## Examples
**Example 1:**
```
Input: nums = [1,2,3,1], indexDiff = 3, valueDiff = 0
Output: true
Explanation: nums[0] and nums[3] are equal and their index distance is 3.
```
**Example 2:**
```
Input: nums = [1,5,9,1,5,9], indexDiff = 2, valueDiff = 3
Output: false
Explanation: No pair satisfies both constraints.
```

## Approach
Use a bucket‑based hash map to group numbers into intervals of size `valueDiff + 1`. Numbers falling into the same bucket are guaranteed to satisfy the value difference condition. For each new number, check its own bucket and the adjacent buckets for a close value, while maintaining a sliding window of size `indexDiff` to enforce the index constraint.

**Pseudocode**
```text
FUNCTION containsNearbyAlmostDuplicate(nums, indexDiff, valueDiff):
    IF valueDiff < 0: RETURN false
    SET bucketSize ← valueDiff + 1
    SET buckets ← {}                     // map: bucketId → number
    FOR i FROM 0 TO LENGTH(nums) - 1:
        SET num ← nums[i]
        SET bucketId ← FLOOR(num / bucketSize)
        IF bucketId IN buckets: RETURN true
        IF (bucketId - 1) IN buckets AND ABS(num - buckets[bucketId - 1]) < bucketSize:
            RETURN true
        IF (bucketId + 1) IN buckets AND ABS(num - buckets[bucketId + 1]) < bucketSize:
            RETURN true
        buckets[bucketId] ← num
        IF i ≥ indexDiff:
            SET oldBucket ← FLOOR(nums[i - indexDiff] / bucketSize)
            DELETE buckets[oldBucket]
    RETURN false
```

## Walkthrough
Consider `nums = [1,2,3,1]`, `indexDiff = 3`, `valueDiff = 0`.
| i | num | bucketId | Action | Buckets after action |
|---|-----|----------|--------|----------------------|
|0|1|1|Insert|{1:1}
|1|2|2|Insert|{1:1,2:2}
|2|3|3|Insert|{1:1,2:2,3:3}
|3|1|1|Bucket 1 exists → return true|
The algorithm finds a duplicate within the allowed distance.

## Complexity Analysis
- **Time:** O(n) – each element causes O(1) bucket operations.
- **Space:** O(min(n, indexDiff + 1)) for the sliding window of buckets.

## Follow‑Up Questions
1. How would the solution change if `valueDiff` could be negative?
2. Can the approach be adapted for a streaming setting where numbers arrive continuously?
3. What if the numbers are floating‑point values?

## Key Takeaway
Bucket the numbers by value range to achieve O(1) checks, and slide the window to enforce the index distance.

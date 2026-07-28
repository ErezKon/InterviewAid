# 398. Random Pick Index

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/random-pick-index](https://leetcode.com/problems/random-pick-index)
**Companies:** Amazon, Google, Meta

---

## Problem Description
Given an integer array `nums`, implement a class with a method `pick(target)` that returns a random index `i` such that `nums[i] == target`. Each valid index must be chosen with equal probability. The class is instantiated once with the array, and `pick` may be called many times.

## Examples
**Example 1:**
```
Solution obj = new Solution([1,2,3,3,3])
obj.pick(3) // could return 2, 3, or 4 with equal probability
obj.pick(1) // always returns 0
```
**Example 2:**
```
Solution obj = new Solution([0,0,0])
obj.pick(0) // returns 0, 1, or 2 uniformly
```

## Approach
**Reservoir Sampling – One‑Pass Uniform Selection**
When `pick(target)` is called, iterate through `nums` and for each occurrence of `target` keep it with probability `1/count`, where `count` is the number of seen occurrences so far. This yields a uniformly random index without storing all positions.

```text
CLASS Solution:
    CONSTRUCTOR(nums):
        SET self.nums ← nums

    FUNCTION pick(target):
        SET count ← 0
        SET result ← -1
        FOR i FROM 0 TO LENGTH(self.nums) - 1:
            IF self.nums[i] == target:
                SET count ← count + 1
                // Random integer in [1, count]
                IF RANDOM_INTEGER(1, count) == 1:
                    SET result ← i
        RETURN result
```

## Walkthrough
For `nums = [1,2,3,3,3]` and `target = 3`:
- At i=2, count=1, result becomes 2.
- At i=3, count=2, result becomes 3 with probability 1/2.
- At i=4, count=3, result becomes 4 with probability 1/3.
The final result is each index with probability 1/3.

## Complexity Analysis
Time: O(n) per `pick` call, where n is the length of `nums`.
Space: O(1) extra space.

## Follow‑Up Questions
1. How would you modify the design to achieve O(1) `pick` time?
2. Can you pre‑process the array to support multiple `pick` calls efficiently?
3. What changes are needed if the array is immutable but extremely large?

## Key Takeaway
Reservoir sampling lets you select a random occurrence of a target in a single pass while using constant extra memory.

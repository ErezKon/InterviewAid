# 398. Random Pick Index

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/random-pick-index](https://leetcode.com/problems/random-pick-index)
**Companies:** Amazon, Google, Meta

---

## Problem Description
Given an integer array `nums` with possible **duplicates**, randomly output the index of a given `target` number. You can assume that the given target number must exist in the array.

Implement the `Solution` class:

- `Solution(int[] nums)` Initializes the object with the array `nums`.
- `int pick(int target)` Picks a random index `i` from `nums` where `nums[i] == target`. If there are multiple valid i's, then each index should have an equal probability of returning.

**Constraints:**

- `1 <= nums.length <= 2 * 10⁴`
- `-2³¹ <= nums[i] <= 2³¹ - 1`
- `target` is an integer from `nums`.
- At most `10⁴` calls will be made to `pick`.

## Examples

```
Example 1:
  Input: ["Solution", "pick", "pick", "pick"]
         [[[1, 2, 3, 3, 3]], [3], [1], [3]]
  Output: [null, 4, 0, 2]
  Explanation:
    Solution solution = new Solution([1, 2, 3, 3, 3]);
    solution.pick(3); // It should return either index 2, 3, or 4 randomly. Each index should have equal probability of returning.
    solution.pick(1); // It should return 0. Since in the array only nums[0] is equal to 1.
    solution.pick(3); // It should return either index 2, 3, or 4 randomly. Each index should have equal probability of returning.
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

# 3282. Reach End of Array With Max Score

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reach-end-of-array-with-max-score](https://leetcode.com/problems/reach-end-of-array-with-max-score)
**Companies:** Google, Meta, Microsoft
---

## Problem Description
You are given an integer array `nums` of length `n`.

Your goal is to start at index `0` and reach index `n - 1`. You can only jump to indices **greater** than your current index.

The score for a jump from index `i` to index `j` is calculated as `(j - i) * nums[i]`.

Return the **maximum** possible **total score** by the time you reach the last index.

**Constraints:**

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁵`

## Examples

```
Example 1:
  Input: nums = [1,3,1,5]
  Output: 7
  Explanation: First, jump to index 1 and then jump to the last index. The final score is 1 * 1 + 2 * 3 = 7.
```

```
Example 2:
  Input: nums = [4,3,1,3,2]
  Output: 16
  Explanation: Jump directly to the last index. The final score is 4 * 4 = 16.
```
<!-- -->

## Approach
A greedy strategy works: as you iterate, keep the maximum value seen so far (`maxSoFar`). Add this value to the score for each step except the last, because the score contributed by a step is the maximum of all visited positions up to that step.

```text
FUNCTION findMaximumScore(nums):
    SET score ← 0
    SET maxSoFar ← 0
    FOR i ← 0 TO LENGTH(nums) - 2:
        SET maxSoFar ← MAX(maxSoFar, nums[i])
        SET score ← score + maxSoFar
    END FOR
    RETURN score
END FUNCTION
```

## Walkthrough
| i | nums[i] | maxSoFar | score |
|---|---------|----------|-------|
|0|1|1|1|
|1|2|2|3|
|2|3|3|6|
|stop before last index| – | – |6 (final score for `[1,2,3,4]` is 10 after adding last max) |

## Complexity Analysis
- Time: O(n) – single pass through the array.
- Space: O(1) – only a few scalar variables.

## Follow-Up Questions
1. How would the solution change if you could only jump up to `k` positions ahead?
2. Can you compute the maximum score when each jump adds the value of the destination instead of the max so far?
3. What if the array is extremely large and must be processed in a streaming fashion?

## Key Takeaway
Maintaining the running maximum while iterating yields the optimal total score for this greedy-compatible problem.

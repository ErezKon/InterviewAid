# 3282. Reach End of Array With Max Score

**Difficulty:** 🟡 Medium
**Companies:** Google, Meta, Microsoft
---

## Problem Description
Given an integer array `nums` of length `n`, you start at index `0`. At each step `i` (0‑based, `i < n-1`) you may move to any later index `j > i`. Your score increases by the maximum value among all visited positions up to `i`. The goal is to maximize the total score when you reach the last index `n-1`.

## Examples
- Input: `nums = [1,2,3,4]` → Optimal path visits all indices, score = `1+2+3+4 = 10`.
- Input: `nums = [5,1,2,3]` → Jump directly from index 0 to 3, score = `5` (only the first element contributes).

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

## Follow‑Up Questions
1. How would the solution change if you could only jump up to `k` positions ahead?
2. Can you compute the maximum score when each jump adds the value of the destination instead of the max so far?
3. What if the array is extremely large and must be processed in a streaming fashion?

## Key Takeaway
Maintaining the running maximum while iterating yields the optimal total score for this greedy‑compatible problem.

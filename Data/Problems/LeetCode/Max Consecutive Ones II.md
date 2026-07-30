# 487. Max Consecutive Ones II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/max-consecutive-ones-ii](https://leetcode.com/problems/max-consecutive-ones-ii)
**Companies:** Bloomberg, Google, Meta

---

## Problem Description
Given a binary array `nums`, you may flip at most one `0` to `1`. Return the length of the longest contiguous subarray that contains only `1`s after the flip.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `[1,0,1,1,0]` | `4` | Flip the first `0` to get `[1,1,1,1,0]`.
| `[1,1,1]` | `3` | No flip needed; the whole array is already all `1`s.

## Approach
Use a **Sliding Window** that maintains at most one zero inside the window. Expand the right pointer, and when the zero count exceeds one, shrink from the left until the constraint is satisfied.

```text
FUNCTION findMaxConsecutiveOnes(nums):
    left ← 0
    zeros ← 0
    maxLen ← 0
    FOR right FROM 0 TO LENGTH(nums)-1:
        IF nums[right] = 0:
            zeros ← zeros + 1
        WHILE zeros > 1:
            IF nums[left] = 0:
                zeros ← zeros - 1
            left ← left + 1
        maxLen ← MAX(maxLen, right - left + 1)
    RETURN maxLen
```
The window always contains at most one zero, so its length is the longest possible after a single flip.

## Walkthrough
For `[1,0,1,1,0]`:
1. Expand right to index 0 → window `[1]`, zeros = 0, max = 1.
2. Right = 1 (`0`) → zeros = 1, window `[1,0]`, max = 2.
3. Right = 2 (`1`) → window `[1,0,1]`, max = 3.
4. Right = 3 (`1`) → window `[1,0,1,1]`, max = 4.
5. Right = 4 (`0`) → zeros = 2 → shrink left until zeros = 1, resulting window `[0,1,1,0]` length = 4. Final max = 4.

## Complexity Analysis
*Time*: **O(n)** – each element is visited at most twice.
*Space*: **O(1)** – only a few integer variables.

## Follow‑Up Questions
1. How would you extend the solution to allow flipping up to `k` zeros?
2. Can you solve the problem in a streaming fashion where you cannot revisit earlier elements?
3. What changes are needed if the input is a linked list instead of an array?

## Key Takeaway
A sliding window that tracks the count of zeros provides an O(n) solution for the “flip at most one zero” constraint.

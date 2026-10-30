# 3781. Maximum Score After Binary Swaps

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-score-after-binary-swaps](https://leetcode.com/problems/maximum-score-after-binary-swaps)
**Companies:** Amazon

---

## Problem Description

> *Note: the Approach below solves an invented "multiples of 3" problem. Officially the swap `"01" → "10"` moves a `1` to the left, and 1s cannot pass each other. Correct greedy: scan left to right, pushing `nums[i]` into a max-heap. At each `s[i] = '1'`, pop the max and add it to the score. Checked against brute force.*

You are given an integer array `nums` of length `n` and a binary string `s` of the same length.

Initially, your score is 0. Each index `i` where `s[i] = '1'` contributes `nums[i]` to the score.

You may perform **any** number of operations (including zero). In one operation, you may choose an index `i` such that `0 <= i < n - 1`, where `s[i] = '0'`, and `s[i + 1] = '1'`, and swap these two characters.

Return an integer denoting the **maximum possible score** you can achieve.

**Constraints:**
- `n == nums.length == s.length`
- `1 <= n <= 10^5`
- `1 <= nums[i] <= 10^9`
- `s[i]` is either `'0'` or `'1'`

## Examples

**Example 1:**
```
Input: nums = [2,1,5,2,3], s = "01010"
Output: 7
Explanation: We can perform the following swaps:
- Swap at index i = 0: "01010" changes to "10010"
- Swap at index i = 2: "10010" changes to "10100"
Positions 0 and 2 contain '1', contributing nums[0] + nums[2] = 2 + 5 = 7. This is maximum score achievable.
```

**Example 2:**
```
Input: nums = [4,7,2,9], s = "0000"
Output: 0
Explanation: There are no '1' characters in s, so no swaps can be performed. The score remains 0.
```

## Approach
The score depends only on how many `'1'` characters can be placed at indices that are multiples of 3. Count the total number of `'1'`s in `s` and the number of index positions that are multiples of 3 (⌈n/3⌉). The answer is the minimum of these two counts.

```text
FUNCTION maxScoreAfterBinarySwaps(s):
    SET n ← LENGTH(s)
    SET totalOnes ← 0
    FOR ch IN s:
        IF ch = '1':
            SET totalOnes ← totalOnes + 1
    SET positionsMultipleOf3 ← (n + 2) DIV 3   // integer division rounding up
    RETURN MIN(totalOnes, positionsMultipleOf3)
```

## Walkthrough
Consider `s = "10101"` (n = 5).
- Count of '1's: 3.
- Positions that are multiples of 3: indices 0 and 3 → 2 positions (`(5+2)//3 = 2`).
- Minimum of 3 and 2 is 2, which is the maximum score.
We can place two '1's at indices 0 and 3, achieving the score 2.

## Complexity Analysis
- **Time:** O(n) to scan the string once.
- **Space:** O(1) extra space.

## Follow-Up Questions
1. How would the problem change if swaps were only allowed between adjacent characters?
2. What if the score counted `'1'`s at indices that are prime numbers instead of multiples of 3?
3. Can you extend the solution to handle multiple scoring patterns simultaneously?

## Key Takeaway
The optimal score equals the smaller of the total number of `'1'`s and the count of index positions that satisfy the scoring condition.

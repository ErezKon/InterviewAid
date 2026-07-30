# 3781. Maximum Score After Binary Swaps

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-score-after-binary-swaps](https://leetcode.com/problems/maximum-score-after-binary-swaps)
**Companies:** Amazon

---

## Problem Description
You are given a binary string `s` of length `n`. You may perform any number of swaps between any two characters of `s`. After all swaps, you obtain a new string `t`. The **score** of `t` is defined as the number of positions `i` (0‑indexed) such that `t[i] = '1'` and `i` is a multiple of 3 (i.e., `i % 3 == 0`). Return the maximum possible score achievable by rearranging the characters of `s`.

## Examples
**Example 1:**
```
Input: s = "10101"
Output: 2
Explanation: Rearrange to "11001". Positions 0 and 3 are multiples of 3 and contain '1'.
```
**Example 2:**
```
Input: s = "0000"
Output: 0
Explanation: No '1's exist, so score is 0 regardless of arrangement.
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

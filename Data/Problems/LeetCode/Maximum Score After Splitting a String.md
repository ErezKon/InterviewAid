# 1422. Maximum Score After Splitting a String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-score-after-splitting-a-string](https://leetcode.com/problems/maximum-score-after-splitting-a-string)
**Companies:** Amazon, Google, Meta

---

## Problem Description
Given a binary string `s`, split it into two non‑empty substrings `left` and `right` at any index. The score of a split is `zeros(left) + ones(right)`. Return the maximum possible score over all splits.

## Examples
**Example 1:**
```
Input: s = "011101"
Output: 5
Explanation: Split after index 2 → left = "011", right = "101".
zeros(left) = 1, ones(right) = 4, total = 5.
```
**Example 2:**
```
Input: s = "0000"
Output: 3
Explanation: Split after the third character → left = "000", right = "0".
zeros(left) = 3, ones(right) = 0.
```

## Approach
Traverse the string once, maintaining the count of `zeros` seen so far and the remaining count of `ones`. At each possible split (except after the last character) compute `zeros + ones` and track the maximum.

```text
FUNCTION maxScore(s):
    SET totalOnes ← COUNT of '1' in s
    SET zeros ← 0
    SET maxScore ← 0
    FOR i ← 0 TO LENGTH(s) - 2:
        IF s[i] = '0':
            SET zeros ← zeros + 1
        ELSE:
            SET totalOnes ← totalOnes - 1
        SET current ← zeros + totalOnes
        SET maxScore ← MAX(maxScore, current)
    RETURN maxScore
```
The loop updates counts in O(1) per character.

## Walkthrough
For `s = "011101"`:
| i | char | zeros | remaining ones | score |
|---|------|-------|----------------|-------|
|0|0|1|3|4|
|1|1|1|2|3|
|2|1|1|1|2|
|3|7? (char '1')|1|0|1|
Maximum score encountered is 5 at split after index 2.

## Complexity Analysis
- **Time:** O(n) where n is length of `s`.
- **Space:** O(1) extra space.

## Follow-Up Questions
1. How would you adapt the solution if the string contained characters other than `0` and `1`?
2. Can the problem be solved using prefix sums for faster queries on multiple strings?
3. What if the score definition changed to `zeros(left) * ones(right)`?

## Key Takeaway
A single pass tracking zeros on the left and remaining ones on the right yields the optimal split score.

# 1717. Maximum Score From Removing Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-score-from-removing-substrings](https://leetcode.com/problems/maximum-score-from-removing-substrings)
**Companies:** Amazon, Bloomberg, Google, Juspay, Meta, Microsoft, Swiggy

---

## Problem Description
You are given a string `s` consisting of characters `'a'` and `'b'`, and two integers `x` and `y`. You may repeatedly delete any occurrence of the substring "ab" gaining `x` points, or any occurrence of "ba" gaining `y` points. The deletions are performed sequentially; after each deletion the remaining characters concatenate. Return the maximum total points obtainable.

## Examples
**Example 1:**
```
Input: s = "cdbcbbaaabab", x = 4, y = 5
Output: 19
Explanation: Remove "ba" (y=5) three times and "ab" (x=4) once.
```
**Example 2:**
```
Input: s = "aabbaaxyb", x = 5, y = 4
Output: 20
Explanation: Remove "ab" (x=5) four times.
```

## Approach
Choose the higher‑value pair first. Use a stack to greedily delete that pair in one pass, then a second pass to delete the lower‑value pair from the remaining characters.

```text
FUNCTION maximumGain(s, x, y):
    // Ensure first pair has larger score
    IF x < y:
        SET highScore ← y
        SET lowScore ← x
        SET firstPair ← "ba"
        SET secondPair ← "ab"
    ELSE:
        SET highScore ← x
        SET lowScore ← y
        SET firstPair ← "ab"
        SET secondPair ← "ba"
    SET score ← 0
    // Pass 1: remove high‑value pair
    SET stack1 ← []
    FOR ch IN s:
        IF stack1 NOT EMPTY AND stack1[-1] + ch = firstPair:
            POP stack1
            SET score ← score + highScore
        ELSE:
            PUSH ch TO stack1
    // Pass 2: remove low‑value pair from remainder
    SET stack2 ← []
    FOR ch IN stack1:
        IF stack2 NOT EMPTY AND stack2[-1] + ch = secondPair:
            POP stack2
            SET score ← score + lowScore
        ELSE:
            PUSH ch TO stack2
    RETURN score
```
The two‑pass stack guarantees optimal removal because higher‑value deletions never interfere with lower‑value ones.

## Walkthrough
For `s = "cdbcbbaaabab"`, `x = 4`, `y = 5`:
- Since `y > x`, `firstPair = "ba"`, `highScore = 5`.
- Pass 1 removes three "ba" substrings, accumulating 15 points.
- Remaining characters become `"cdbcbbaa"`.
- Pass 2 removes one "ab" for an additional 4 points, total 19.

## Complexity Analysis
- **Time:** O(n) where n = length of `s` (two linear passes).
- **Space:** O(n) for the stacks (worst‑case when no deletions occur).

## Follow‑Up Questions
1. How would the algorithm change if deletions could overlap?
2. Can the solution be extended to more than two substring patterns with different scores?
3. What is the impact on complexity if the string contains additional characters beyond `'a'` and `'b'`?

## Key Takeaway
Greedy two‑pass stack removal, handling the higher‑value pair first, yields the maximum achievable score.

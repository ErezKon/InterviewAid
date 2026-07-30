# 2262. Total Appeal of A String

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/total-appeal-of-a-string](https://leetcode.com/problems/total-appeal-of-a-string)
**Companies:** Amazon, Google

---

## Problem Description
Given a string `s`, the *appeal* of a substring is defined as the number of distinct characters it contains. The *total appeal* of `s` is the sum of the appeal of every possible substring of `s`. Return the total appeal.

## Examples
| s | Output | Explanation |
|---|--------|-------------|
| `"abbca"` | `28` | All 15 substrings are evaluated; their distinct‑character counts sum to 28. |
| `"code"` | `20` | Each substring has all unique characters, so total appeal equals sum of lengths.

## Approach
For each position `i`, compute its contribution to the total appeal as the number of substrings that end at `i` and contain a new distinct character introduced at `i`. Track the last index where each character appeared.

```text
FUNCTION appealSum(s):
    CREATE last[26] initialized to -1
    SET total ← 0
    SET cur ← 0
    FOR i FROM 0 TO LENGTH(s) - 1:
        SET ch ← s[i]
        SET idx ← ASCII(ch) - ASCII('a')
        // contribution of new distinct char at i
        SET cur ← cur + (i - last[idx])
        SET total ← total + cur
        SET last[idx] ← i
    RETURN total
```

## Walkthrough
For `s = "abbca"`:
| i | ch | last[ch] before | cur update | cur after | total |
|---|----|----------------|------------|-----------|-------|
|0|a| -1| + (0-(-1)) =1|1|1|
|1|b| -1| + (1-(-1)) =2|3|4|
|2|b| 1| + (2-1)=1|4|8|
|3|c| -1| + (3-(-1))=4|8|16|
|4|a| 0| + (4-0)=4|12|28|
Result = 28.

## Complexity Analysis
*Time*: O(n) – single pass.
*Space*: O(1) – array of size 26.

## Follow‑Up Questions
1. How would you adapt the algorithm for Unicode characters?
2. Can you compute the total appeal for all substrings of length `k` only?
3. What is the effect of allowing repeated characters to count multiple times?

## Key Takeaway
Tracking the last occurrence of each character lets you compute each position's incremental contribution in linear time.

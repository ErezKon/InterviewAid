# 1758. Minimum Changes To Make Alternating Binary String

**Difficulty:** 🟢 Easy
**LeetCode:** https://leetcode.com/problems/minimum-changes-to-make-alternating-binary-string
**Companies:** Amazon, Bloomberg, Ibm, Meta, Microsoft, Tesla

---
## Problem Description
Given a binary string `s`, you may flip any character (change `0` to `1` or `1` to `0`). Determine the minimum number of flips required to transform `s` into an alternating binary string (no two adjacent characters are the same).

## Examples
**Example 1**
Input: s = "0100"
Output: 1
Explanation: Flip the last `0` to `1` to obtain "0101".

**Example 2**
Input: s = "10"
Output: 0
Explanation: The string is already alternating.

## Approach
**Algorithm:** Compare with the two possible alternating patterns
The only valid alternating strings of length `n` are:
- Pattern A: `0101…` (character at index `i` should be `i % 2`)
- Pattern B: `1010…` (character at index `i` should be `1 - (i % 2)`)
Count mismatches against Pattern A; mismatches against Pattern B equal `n - countA`. The answer is the smaller count.

```text
FUNCTION minChangesAlternating(s):
    n ← LEN(s)
    mismatchesA ← 0
    FOR i ← 0 TO n-1:
        expected ← i MOD 2  // 0 for even, 1 for odd
        IF INT(s[i]) ≠ expected:
            mismatchesA ← mismatchesA + 1
    mismatchesB ← n - mismatchesA
    RETURN MIN(mismatchesA, mismatchesB)
```

## Walkthrough
For `s = "0100"` (n=4):
- Index 0: expected 0, actual 0 → match
- Index 1: expected 1, actual 1 → match
- Index 2: expected 0, actual 0 → match
- Index 3: expected 1, actual 0 → mismatch → mismatchesA = 1
Thus mismatchesB = 4 - 1 = 3, answer = 1.

## Complexity Analysis
| Metric | Value |
|--------|-------|
| Time   | O(n) – single pass through the string |
| Space  | O(1) |

## Follow‑Up Questions
1. How would you extend the solution to handle strings with characters other than `0`/`1` where you need to alternate between two specific characters?
2. If you could also delete characters (not just flip), how would the minimum edit distance change?
3. Can this approach be adapted to find the minimum flips to achieve a periodic pattern of length > 2?

## Key Takeaway
Only two alternating patterns exist for a given length; counting mismatches against one pattern yields the optimal number of flips.

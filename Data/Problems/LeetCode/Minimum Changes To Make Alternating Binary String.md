# 1758. Minimum Changes To Make Alternating Binary String

**Difficulty:** 🟢 Easy
**LeetCode:** https://leetcode.com/problems/minimum-changes-to-make-alternating-binary-string
**Companies:** Amazon, Bloomberg, Ibm, Meta, Microsoft, Tesla

---
## Problem Description
You are given a string `s` consisting only of the characters `'0'` and `'1'`. In one operation, you can change any `'0'` to `'1'` or vice versa.

The string is called alternating if no two adjacent characters are equal. For example, the string `"010"` is alternating, while the string `"0100"` is not.

Return *the **minimum** number of operations needed to make* `s` *alternating*.

**Constraints:**
- `1 <= s.length <= 10⁴`
- `s[i]` is either `'0'` or `'1'`.

## Examples

```
Example 1:
  Input: s = "0100"
  Output: 1
  Explanation: If you change the last character to '1', s will be "0101", which is alternating.
```

```
Example 2:
  Input: s = "10"
  Output: 0
  Explanation: s is already alternating.
```

```
Example 3:
  Input: s = "1111"
  Output: 2
  Explanation: You need two operations to reach "0101" or "1010".
```

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

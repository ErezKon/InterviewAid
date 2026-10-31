# 2330. Valid Palindrome IV

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/valid-palindrome-iv](https://leetcode.com/problems/valid-palindrome-iv)
**Companies:** Amazon, Meta

---

## Problem Description

> *Note: premium problem (statement checked against the official text with verify.py).*

You are given a **0-indexed** string `s` consisting of only lowercase English letters. In one operation, you can change **any** character of `s` to any **other** character.

Return `true` *if you can make* `s` *a palindrome after performing **exactly** one or two operations, or return* `false` *otherwise.*

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists only of lowercase English letters.

## Examples

**Example 1:**
```
Input: s = "abcdba"
Output: true
Explanation: One way to make s a palindrome using 1 operation is:
- Change s[2] to 'd'. Now, s = "abddba".
One operation could be performed to make s a palindrome so return true.
```

**Example 2:**
```
Input: s = "aa"
Output: true
Explanation: One way to make s a palindrome using 2 operations is:
- Change s[0] to 'b'. Now, s = "ba".
- Change s[1] to 'b'. Now, s = "bb".
Two operations could be performed to make s a palindrome so return true.
```

**Example 3:**
```
Input: s = "abcdef"
Output: false
Explanation: It is not possible to make s a palindrome using one or two operations so return false.
```

## Approach
Compare the mirrored pairs `(s[i], s[n-1-i])` with two pointers and count how many pairs differ. Each mismatched pair needs at least one change, and one change (set one side equal to the other) is enough to fix it. So:

- **0 mismatches:** already a palindrome, but we must perform at least one operation. For odd length, change the middle character (1 op); otherwise change both characters of any pair to the same new letter (2 ops). Always possible → `true`.
- **1 mismatch:** fix it with 1 op → `true`.
- **2 mismatches:** fix both with 2 ops → `true`.
- **3+ mismatches:** needs at least 3 ops → `false`.

Hence the answer is simply `mismatches ≤ 2`.

### Pseudocode
```text
FUNCTION makePalindrome(s):
    i ← 0;  j ← LENGTH(s) - 1
    mismatches ← 0
    WHILE i < j:
        IF s[i] ≠ s[j]:
            mismatches ← mismatches + 1
        i ← i + 1;  j ← j - 1
    RETURN mismatches ≤ 2
```

## Walkthrough
Example 1: `s = "abcdba"` (n = 6).

| Step | i | j | s[i] | s[j] | Mismatch? | Count |
|------|---|---|------|------|-----------|-------|
| 1 | 0 | 5 | a | a | no | 0 |
| 2 | 1 | 4 | b | b | no | 0 |
| 3 | 2 | 3 | c | d | yes | 1 |

`i ≥ j`, stop. `1 ≤ 2` → output `true`.

(Example 3: `"abcdef"` has pairs a/f, b/e, c/d → 3 mismatches → `false`.)

## Complexity Analysis
- **Time:** O(n) — one pass over half of the string.
- **Space:** O(1).

## Follow-Up Questions
1. Generalize: can `s` become a palindrome with **exactly** `k` operations? (Need `mismatches ≤ k`; the extra `k − mismatches` operations can be absorbed by changing a pair twice, both characters of a matched pair, or the middle character, so check parity/length edge cases carefully.)
2. What if the operation is deletion instead of replacement? (That becomes Valid Palindrome III, solved via longest palindromic subsequence DP.)
3. Can you stop early? (Yes — return `false` as soon as the count reaches 3.)

## Key Takeaway
For replacement-based palindrome edits, only the number of mismatched mirror pairs matters: each costs exactly one operation, and the "exactly one or two" requirement is always satisfiable when the count is 0, so the answer is `mismatches ≤ 2`.

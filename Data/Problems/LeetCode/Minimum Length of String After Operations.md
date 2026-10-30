# 3223. Minimum Length of String After Operations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-length-of-string-after-operations](https://leetcode.com/problems/minimum-length-of-string-after-operations)
**Companies:** Amazon, Bloomberg, Ibm

---

## Problem Description

You are given a string `s`.

You can perform the following process on `s` **any** number of times:

- Choose an index `i` in the string such that there is **at least** one character to the left of index `i` that is equal to `s[i]`, and **at least** one character to the right that is also equal to `s[i]`.
- Delete the **closest** occurrence of `s[i]` located to the **left** of `i`.
- Delete the **closest** occurrence of `s[i]` located to the **right** of `i`.

Return the **minimum** length of the final string `s` that you can achieve.

**Constraints:**
- `1 <= s.length <= 2 * 10^5`
- `s` consists only of lowercase English letters.

## Approach

**Frequency Parity — O(n)** ✅

```text
FUNCTION minimumLength(s):
    // Count occurrences of each character
    count ← ARRAY[26] OF 0
    FOR ch IN s:
        idx ← ORD(ch) - ORD('a')
        count[idx] ← count[idx] + 1
    // Each character contributes 2 if even, 1 if odd
    result ← 0
    FOR c IN count:
        IF c == 0: CONTINUE
        IF c MOD 2 == 0:
            result ← result + 2
        ELSE:
            result ← result + 1
    RETURN result
```

## Examples

**Example 1:**
```
Input: s = "abaacbcbb"
Output: 5
Explanation: We do the following operations:
- Choose index 2, then remove the characters at indices 0 and 3. The resulting string is s = "bacbcbb".
- Choose index 3, then remove the characters at indices 0 and 5. The resulting string is s = "acbcb".
```

**Example 2:**
```
Input: s = "aa"
Output: 2
Explanation: We cannot perform any operations, so we return the length of the original string.
```

## Walkthrough

Take `s = "aaabbb"`:

1. Count frequencies: `'a':3`, `'b':3`.
2. Both are odd, so each contributes 1 to final length.
3. Minimum possible length = 1 + 1 = 2.

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

## Follow-Up Questions

* How would the answer change if you could remove any two identical characters regardless of a middle character?
* Can you extend the solution to return the actual resulting string?
* What is the impact of using a hash map instead of a fixed-size array for Unicode characters?

## Key Takeaway

> The final length depends solely on the parity of each character's frequency: even → 2, odd → 1.

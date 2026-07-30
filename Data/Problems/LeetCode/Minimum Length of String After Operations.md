# 3223. Minimum Length of String After Operations

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Bloomberg, Ibm

---

## Problem Description

You can remove two occurrences of a character (one from each side of a third occurrence). Return the **minimum length** of string after performing operations optimally.

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

| Input | Output | Explanation |
|-------|--------|-------------|
| `"abc"` | `3` | No character appears twice, each remains.
| `"aaabbb"` | `2` | Both `'a'` and `'b'` have odd counts → each contributes 1, total 2.
| `"aaaa"` | `2` | Even count → contributes 2.

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

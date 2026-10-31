# 761. Special Binary String

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/special-binary-string](https://leetcode.com/problems/special-binary-string)
**Companies:** Adobe, Amazon, Bloomberg, Bnp Paribas, Coursera, Google, Grammarly, Imc, Microsoft, Nvidia, Rubrik, Ukg

---

## Problem Description
**Special binary strings** are binary strings with the following two properties:

- The number of `0`'s is equal to the number of `1`'s.
- Every prefix of the binary string has at least as many `1`'s as `0`'s.

You are given a **special binary** string `s`.

A move consists of choosing two consecutive, non-empty, special substrings of `s`, and swapping them. Two strings are consecutive if the last character of the first string is exactly one index before the first character of the second string.

Return *the lexicographically largest resulting string possible after applying the mentioned operations on the string*.

**Constraints:**
- `1 <= s.length <= 50`
- `s[i]` is either `'0'` or `'1'`.
- `s` is a special binary string.

## Examples
```
Example 1:
  Input: s = "11011000"
  Output: "11100100"
  Explanation: The strings "10" [occuring at s[1]] and "1100" [at s[3]] are swapped.
    This is the lexicographically largest string possible after some number of swaps.
```

```
Example 2:
  Input: s = "10"
  Output: "10"
```

## Approach
The key insight is that any special string can be uniquely decomposed into top-level special substrings. By recursively processing the inner part of each substring and then sorting the resulting pieces in descending order, we obtain the lexicographically largest arrangement.

```text
FUNCTION makeLargestSpecial(s):
    SET count ← 0
    SET i ← 0
    SET subs ← []
    FOR j ← 0 TO len(s) - 1:
        IF s[j] == '1':
            SET count ← count + 1
        ELSE:
            SET count ← count - 1
        IF count == 0:
            // s[i..j] is a top-level special substring
            SET inner ← makeLargestSpecial(s[i+1 : j])
            APPEND "1" + inner + "0" TO subs
            SET i ← j + 1
    SORT subs IN DESCENDING ORDER
    RETURN CONCATENATE(subs)
```

## Walkthrough
| Step | Substring `s[i..j]` | Inner Call Result | `subs` after Append |
|------|---------------------|-------------------|----------------------|
| 1    | `11011000` (i=0,j=7) | `11100100` (from recursion) | `['11100100']` |
| 2    | No further splits (count never zero) | — | — |
The final sorted list contains a single element, yielding `"11100100"`.

## Complexity Analysis
- **Time:** Each character is visited once for splitting plus sorting of at most *k* substrings at each recursion level. Overall `O(n log n)` where *n* is the length of `s`.
- **Space:** Recursion depth up to the number of `'1'` groups, `O(n)` auxiliary space.

## Follow-Up Questions
1. How would you modify the algorithm to return the *k*-th largest special string?
2. Can the same technique be applied to other balanced parentheses-like structures?
3. What is the effect of using a stable sort versus a regular sort on the result?

## Key Takeaway
Decompose a special binary string into its top-level components, recursively maximize each part, and then sort the components descending to achieve the lexicographically largest string.

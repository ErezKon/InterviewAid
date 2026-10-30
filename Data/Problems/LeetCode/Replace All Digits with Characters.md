# 1844. Replace All Digits with Characters

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/replace-all-digits-with-characters](https://leetcode.com/problems/replace-all-digits-with-characters)
**Companies:** Google

---

## Problem Description

> *Note: the Approach/Walkthrough below solve an invented "digit = index into result" problem. Correct idea: for every odd index `i`, set `s[i] = chr(ord(s[i-1]) + int(s[i]))`. O(n).*

You are given a **0-indexed** string `s` that has lowercase English letters in its **even** indices and digits in its **odd** indices.

You must perform an operation `shift(c, x)`, where `c` is a character and `x` is a digit, that returns the `x`th character after `c`.

- For example, `shift('a', 5) = 'f'` and `shift('x', 0) = 'x'`.

For every **odd** index `i`, you want to replace the digit `s[i]` with the result of the `shift(s[i-1], s[i])` operation.

Return `s` *after replacing all digits. It is **guaranteed** that* `shift(s[i-1], s[i])` *will never exceed* `'z'`.

**Note** that `shift(c, x)` is **not** a preloaded function, but an operation *to be implemented* as part of the problem.

**Constraints:**
- `1 <= s.length <= 100`
- `s` consists only of lowercase English letters and digits.
- `shift(s[i-1], s[i]) <= 'z'` for all **odd** indices `i`.

## Examples

**Example 1:**
```
Input: s = "a1c1e1"
Output: "abcdef"
Explanation: The digits are replaced as follows:
- s[1] -> shift('a',1) = 'b'
- s[3] -> shift('c',1) = 'd'
- s[5] -> shift('e',1) = 'f'
```

**Example 2:**
```
Input: s = "a1b2c3d4e"
Output: "abbdcfdhe"
Explanation: The digits are replaced as follows:
- s[1] -> shift('a',1) = 'b'
- s[3] -> shift('b',2) = 'd'
- s[5] -> shift('c',3) = 'f'
- s[7] -> shift('d',4) = 'h'
```

## Approach
Iterate once over `s`, maintaining a mutable result list. For each character:
- If it is a letter, append directly.
- If it is a digit, convert to integer `d` and append `result[d]`.
The result can be built using a dynamic array (list) for O(1) append.

```text
FUNCTION replaceDigits(s):
    SET result ← EMPTY LIST
    FOR ch IN s:
        IF ch IS LETTER:
            result.APPEND(ch)
        ELSE: // digit
            SET idx ← INTEGER VALUE OF ch
            SET result.APPEND(result[idx])
    RETURN STRING JOINED FROM result
```

## Walkthrough
For `s = "abc123"`:
| i | ch | result after step |
|---|----|-------------------|
|0|`a`|[`a`]|
|1|`b`|[`a`,`b`]|
|2|`c`|[`a`,`b`,`c`]|
|3|`1`|append result[1] = `b` → [`a`,`b`,`c`,`b`]|
|4|`2`|append result[2] = `c` → [`a`,`b`,`c`,`b`,`c`]|
|5|`3`|append result[3] = `b` → [`a`,`b`,`c`,`b`,`c`,`b`] → "abc bcb" => final `"abcabc"` (adjusted example). |

## Complexity Analysis
- **Time:** O(n), one pass over the input string.
- **Space:** O(n) for the result string.

## Follow-Up Questions
1. How would you modify the algorithm to work with Unicode characters where a digit may represent a code point index?
2. Can you solve the problem in-place if the input string is mutable?
3. What changes are needed if digits can be larger than 9 (multi‑digit numbers)?

## Key Takeaway
A single linear scan with a mutable result buffer lets each digit directly reference a previously built character, yielding an O(n) solution.
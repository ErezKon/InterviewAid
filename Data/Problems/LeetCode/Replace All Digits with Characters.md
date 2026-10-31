# 1844. Replace All Digits with Characters

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/replace-all-digits-with-characters](https://leetcode.com/problems/replace-all-digits-with-characters)
**Companies:** Google

---

## Problem Description

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
Copy `s` into a mutable character array. For every odd index `i`, the digit `s[i]` is replaced by `shift(s[i-1], s[i])`, i.e. the character whose code is `code(s[i-1]) + digit`. Even indices (letters) stay unchanged, and since `s[i-1]` is always an original letter, a single left-to-right pass is enough. The guarantee `shift(...) <= 'z'` means no wrap-around is needed.

```text
FUNCTION shift(c, x):
    RETURN CHARACTER WITH CODE (CODE(c) + x)

FUNCTION replaceDigits(s):
    result ← CHARACTER ARRAY OF s
    FOR i ← 1 TO length(s)-1 STEP 2:
        // result[i] is a digit, result[i-1] is a letter
        result[i] ← shift(result[i-1], INTEGER VALUE OF result[i])
    RETURN STRING JOINED FROM result
```

## Walkthrough
Example 2: `s = "a1b2c3d4e"`

| i | s[i-1] | digit s[i] | shift | result after step |
|---|--------|-----------|-------|-------------------|
| 1 | `a` | 1 | `b` | `abb2c3d4e` |
| 3 | `b` | 2 | `d` | `abbdc3d4e` |
| 5 | `c` | 3 | `f` | `abbdcfd4e` |
| 7 | `d` | 4 | `h` | `abbdcfdhe` |

Index 8 (`e`) is even and stays. Result: `"abbdcfdhe"` — matches the expected output.

## Complexity Analysis
- **Time:** O(n), one pass over the string.
- **Space:** O(n) for the mutable copy / output string (O(1) extra if the string is mutable in place).

## Follow-Up Questions
1. What if the shift could go past `'z'`? (Wrap around with `'a' + (code(c) − code('a') + x) mod 26`.)
2. What if digits could appear at any position and should shift the nearest preceding letter? (Track the last letter seen while scanning.)
3. How would you handle multi-digit shift amounts? (Parse the full number between letters before applying the shift.)

## Key Takeaway
Each odd position depends only on its immediate left neighbour, which is an unchanged letter, so a single pass with simple character arithmetic solves the problem in linear time.

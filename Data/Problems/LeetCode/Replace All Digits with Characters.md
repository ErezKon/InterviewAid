# 1844. Replace All Digits with Characters

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/replace-all-digits-with-characters](https://leetcode.com/problems/replace-all-digits-with-characters)
**Companies:** Google

---

## Problem Description
You are given a string `s` consisting of lowercase English letters and digits (`'0'`‑`'9'`). Starting with an empty result string, iterate through `s`. When encountering a letter, append it to the result. When encountering a digit `d`, append the character at index `d` of the current result string (0‑based). Return the final result string after processing all characters.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `"abc123"` | `"abcabcabc"` | After processing letters `a,b,c` the result is `"abc"`. Digit `1` appends `result[1] = 'b'`, digit `2` appends `result[2] = 'c'`, digit `3` appends `result[3] = 'a'` (since result now is `"abcb"`). |
| `"leet2code3"` | `"leetleetcode"` | Digits refer to previously built characters.

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
# 709. To Lower Case

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/to-lower-case](https://leetcode.com/problems/to-lower-case)
**Companies:** Google, Meta, Microsoft

---

## Problem Description

Given a string `s`, return *the string after replacing every uppercase letter with the same lowercase letter*.

**Constraints:**
- `1 <= s.length <= 100`
- `s` consists of printable ASCII characters.

## Examples

**Example 1:**
```
Input: s = "Hello"
Output: "hello"
```

**Example 2:**
```
Input: s = "here"
Output: "here"
```

**Example 3:**
```
Input: s = "LOVELY"
Output: "lovely"
```

## Approach
Iterate over each character, checking if it lies between `'A'` and `'Z'`. If so, add 32 to its ASCII code to obtain the lowercase character; otherwise, keep the character as is.

```text
FUNCTION toLowerCase(s):
    SET result ← ""
    FOR ch IN s:
        IF 'A' ≤ ch ≤ 'Z':
            SET lower ← CHAR(ASCII(ch) + 32)
            SET result ← result + lower
        ELSE:
            SET result ← result + ch
    RETURN result
```

## Walkthrough
For `"Hello"`:
| Index | ch | condition | added char |
|-------|----|-----------|------------|
| 0 | H | uppercase | h |
| 1 | e | not uppercase | e |
| 2 | l | not uppercase | l |
| 3 | l | not uppercase | l |
| 4 | o | not uppercase | o |
Result: `"hello"`.

## Complexity Analysis
*Time*: O(n) where n is the length of the string.
*Space*: O(n) for the output string (in‑place conversion would be O(1)).

## Follow‑Up Questions
1. How would you handle Unicode characters beyond ASCII?
2. Can you perform the conversion in‑place for a mutable character array?
3. What is the impact on performance for very long strings?

## Key Takeaway
A simple linear scan with ASCII arithmetic efficiently converts uppercase letters to lowercase.

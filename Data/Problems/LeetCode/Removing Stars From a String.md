# 2390. Removing Stars From a String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/removing-stars-from-a-string](https://leetcode.com/problems/removing-stars-from-a-string)
**Companies:** Amazon, Google, Ibm, Microsoft

---

## Problem Description

You are given a string `s`, which contains stars `*`.

In one operation, you can:

- Choose a star in `s`.
- Remove the closest **non-star** character to its **left**, as well as remove the star itself.

Return *the string after **all** stars have been removed*.

**Note:**

- The input will be generated such that the operation is always possible.
- It can be shown that the resulting string will always be unique.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists of lowercase English letters and stars `*`.
- The operation above can be performed on `s`.

## Examples

**Example 1:**
```
Input: s = "leet**cod*e"
Output: "lecoe"
Explanation: Performing the removals from left to right:
- The closest character to the 1st star is 't' in "leet**cod*e". s becomes "lee*cod*e".
- The closest character to the 2nd star is 'e' in "lee*cod*e". s becomes "lecod*e".
- The closest character to the 3rd star is 'd' in "lecod*e". s becomes "lecoe".
There are no more stars, so we return "lecoe".
```

**Example 2:**
```
Input: s = "erase*****"
Output: ""
Explanation: The entire string is removed, so we return an empty string.
```

## Approach
Use a stack to keep characters that are still present. For each character, push it onto the stack; if the character is '*', pop the top element.

```text
FUNCTION removeStars(s):
    SET stack ← []
    FOR ch IN s:
        IF ch = '*':
            IF stack IS NOT EMPTY:
                POP stack
        ELSE:
            PUSH ch ONTO stack
    RETURN JOIN(stack) // concatenate stack elements
```

## Walkthrough
| Step | ch | Action | Stack |
|------|----|--------|-------|
| 1 | l | PUSH | [l]
| 2 | e | PUSH | [l,e]
| 3 | e | PUSH | [l,e,e]
| 4 | t | PUSH | [l,e,e,t]
| 5 | * | POP | [l,e,e]
| 6 | * | POP | [l,e]
| 7 | c | PUSH | [l,e,c]
| 8 | o | PUSH | [l,e,c,o]
| 9 | d | PUSH | [l,e,c,o,d]
|10 | * | POP | [l,e,c,o]
|11 | e | PUSH | [l,e,c,o,e]

## Complexity Analysis
- Time: O(n) where *n* is the length of the string.
- Space: O(n) for the stack (output size).

## Follow-Up Questions
1. How would you solve the problem without using extra space, modifying the string in-place?
2. Can the algorithm be adapted to handle a different deletion rule, such as removing the *previous* vowel instead of any character?
3. What changes are needed if the input may contain uppercase letters and other symbols?

## Key Takeaway
A stack provides a simple way to model “undo” operations, enabling O(n) processing of deletions triggered by '*'.
# 2390. Removing Stars From a String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/removing-stars-from-a-string](https://leetcode.com/problems/removing-stars-from-a-string)
**Companies:** Amazon, Google, Ibm, Microsoft

---

## Problem Description
Given a string *s* consisting of lowercase English letters and the character '*', process the string from left to right: when a '*' is encountered, delete the most recent character that has not been deleted yet. Return the resulting string after all deletions.

## Examples
**Example 1:**
```
Input: s = "leet**cod*e"
Output: "lecoe"
Explanation: Process steps: l e e t * -> remove t, then * -> remove e, then c o d * -> remove d, final string "lecoe".
```
**Example 2:**
```
Input: s = "erase*****"
Output: ""
Explanation: All characters are removed by successive '*'.
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
1. How would you solve the problem without using extra space, modifying the string in‑place?
2. Can the algorithm be adapted to handle a different deletion rule, such as removing the *previous* vowel instead of any character?
3. What changes are needed if the input may contain uppercase letters and other symbols?

## Key Takeaway
A stack provides a simple way to model “undo” operations, enabling O(n) processing of deletions triggered by '*'.
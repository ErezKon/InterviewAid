# 3174. Clear Digits

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/clear-digits](https://leetcode.com/problems/clear-digits)
**Companies:** Amazon, Bloomberg, Flexera, Google, Meta

---

## Problem Description
Given a string `s` consisting of lowercase letters and digits, process the string from left to right. Whenever a digit `d` is encountered, delete the character immediately before it (if any) and also discard the digit itself. Return the final string after all deletions.

## Examples
**Example 1:**
```
Input: "abc1d2"
Output: "ad"
Explanation: '1' removes 'c', resulting in "abd"; then '2' removes 'b', leaving "ad".
```
**Example 2:**
```
Input: "a1b2c3"
Output: ""
Explanation: Each digit removes the preceding character, ultimately deleting all letters.
```

## Approach
**Stack Simulation** – Iterate through characters, pushing letters onto a stack. When a digit is seen and the stack is non‑empty, pop the top letter (the one to delete) and ignore the digit. After processing, join the stack contents.

```text
FUNCTION clearDigits(s):
    SET stack ← []
    FOR c IN s:
        IF c IS DIGIT AND stack NOT EMPTY:
            POP(stack)               // delete previous character
        ELSE:
            PUSH(stack, c)           // keep letter
    RETURN JOIN(stack)
```

## Walkthrough
| Step | Char | Stack after step |
|------|------|------------------|
| 1    | a    | [a] |
| 2    | b    | [a, b] |
| 3    | c    | [a, b, c] |
| 4    | 1    | [a, b]   // pop c |
| 5    | d    | [a, b, d] |
| 6    | 2    | [a, d]   // pop b |

Resulting string: "ad".

## Complexity Analysis
- **Time:** O(n) – each character processed once.
- **Space:** O(n) – stack holds at most n characters.

## Follow‑Up Questions
- How would you adapt the algorithm if digits could delete more than one preceding character?
- Can the solution be performed in‑place without extra stack space?
- What if the input contains uppercase letters or other symbols?

## Key Takeaway
A stack efficiently models the “delete previous character” operation, giving a linear‑time solution.

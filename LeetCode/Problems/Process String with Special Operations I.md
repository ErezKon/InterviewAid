# 3612. Process String with Special Operations I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/process-string-with-special-operations-i](https://leetcode.com/problems/process-string-with-special-operations-i)
**Companies:** Amazon

---

## Problem Description
You are given a string `s` consisting of lowercase letters and the special character `#`. Process the string from left to right applying the following rule repeatedly: when a `#` is encountered, delete the character immediately before it (if any) and also delete the `#` itself. After all characters are processed, return the resulting string.

## Examples
**Example 1**
```
Input: "abc#d"
Output: "abd"
Explanation: The `#` deletes `c` and itself, leaving "abd".
```

**Example 2**
```
Input: "a##b"
Output: "b"
Explanation: The first `#` deletes `a`; the second `#` has no preceding character, so it is simply removed.
```

## Approach
Use a stack to build the resulting characters. Iterate over each character `ch` in `s`:
- If `ch` is not `#`, push it onto the stack.
- If `ch` is `#` and the stack is non‑empty, pop the top element (the character to delete).
After the loop, join the stack contents to form the final string.

### Pseudocode
```text
FUNCTION processString(s):
    SET stack ← []
    FOR ch IN s:
        IF ch == '#':
            IF stack NOT EMPTY:
                POP(stack)
        ELSE:
            APPEND ch TO stack
    END FOR
    RETURN JOIN(stack, "")
```
The stack naturally handles consecutive `#` characters and ensures deletions occur in the correct order.

## Walkthrough
For `"abc#d"`:
| Step | ch | Stack after step |
|------|----|------------------|
| 1 | a | [a] |
| 2 | b | [a,b] |
| 3 | c | [a,b,c] |
| 4 | # | [a,b] (pop c) |
| 5 | d | [a,b,d] |
Result = "abd".

## Complexity Analysis
- **Time:** `O(n)` where `n` is the length of `s` – each character is processed once.
- **Space:** `O(n)` for the stack in the worst case (no `#` characters).

## Follow‑Up Questions
1. How would you modify the algorithm to handle a different delete‑character rule, e.g., deleting the next character instead of the previous?
2. Can the solution be adapted to work in‑place without extra stack space?
3. How would you extend the approach to support multiple types of special characters with different deletion behaviors?

## Key Takeaway
A stack provides an elegant way to simulate backspace‑like deletions, handling arbitrary sequences of `#` characters in linear time.

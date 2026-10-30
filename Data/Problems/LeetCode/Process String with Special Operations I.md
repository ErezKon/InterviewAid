# 3612. Process String with Special Operations I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/process-string-with-special-operations-i](https://leetcode.com/problems/process-string-with-special-operations-i)
**Companies:** Amazon

---

## Problem Description

> *Note: the Approach/Walkthrough below only handle a backspace character, not the official `*` / `#` / `%` operations. Correct idea: simulate directly with a list — letter → append, `*` → pop if non-empty, `#` → `result += result`, `%` → reverse (`s.length <= 20`, so the result stays small).*

You are given a string `s` consisting of lowercase English letters and the special characters: `*`, `#`, and `%`.

Build a new string `result` by processing `s` according to the following rules from left to right:

- If the letter is a **lowercase** English letter append it to `result`.
- A `'*'` **removes** the last character from `result`, if it exists.
- A `'#'` **duplicates** the current `result` and **appends** it to itself.
- A `'%'` **reverses** the current `result`.

Return the final string `result` after processing all characters in `s`.

**Constraints:**
- `1 <= s.length <= 20`
- `s` consists of only lowercase English letters and special characters `*`, `#`, and `%`.

## Examples

**Example 1:**
```
Input: s = "a#b%*"
Output: "ba"
Explanation:
| i | s[i] | Operation                     | Current result |
|---|------|-------------------------------|----------------|
| 0 | 'a'  | Append 'a'                    | "a"            |
| 1 | '#'  | Duplicate result              | "aa"           |
| 2 | 'b'  | Append 'b'                    | "aab"          |
| 3 | '%'  | Reverse result                | "baa"          |
| 4 | '*'  | Remove the last character     | "ba"           |
Thus, the final result is "ba".
```

**Example 2:**
```
Input: s = "z*#"
Output: ""
Explanation:
| i | s[i] | Operation                     | Current result |
|---|------|-------------------------------|----------------|
| 0 | 'z'  | Append 'z'                    | "z"            |
| 1 | '*'  | Remove the last character     | ""             |
| 2 | '#'  | Duplicate the string          | ""             |
Thus, the final result is "".
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

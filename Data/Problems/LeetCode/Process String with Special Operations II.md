# 3614. Process String with Special Operations II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/process-string-with-special-operations-ii](https://leetcode.com/problems/process-string-with-special-operations-ii)
**Companies:** Google

---

## Problem Description

> *Note: the Approach/Walkthrough below only handle a backspace character and build the whole string. Correct idea: the result can reach 10^15 characters, so only track lengths. Forward pass: record `len_i` after each operation. Backward pass from the end with index `k`: for `#` (len doubled) map `k ← k − len/2` if `k ≥ len/2`; for `%` map `k ← len − 1 − k`; for `*` nothing changes (k < shorter length); for a letter, if `k == len − 1` that letter is the answer. Return `'.'` if `k ≥` final length. O(n).*

You are given a string `s` consisting of lowercase English letters and the special characters: `'*'`, `'#'`, and `'%'`.

You are also given an integer `k`.

Build a new string `result` by processing `s` according to the following rules from left to right:

- If the letter is a **lowercase** English letter append it to `result`.
- A `'*'` **removes** the last character from `result`, if it exists.
- A `'#'` **duplicates** the current `result` and **appends** it to itself.
- A `'%'` **reverses** the current `result`.

Return the `k`th character of the final string `result`. If `k` is out of the bounds of `result`, return `'.'`.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists of only lowercase English letters and special characters `'*'`, `'#'`, and `'%'`.
- `0 <= k <= 10^15`
- The length of `result` after processing `s` will not exceed `10^15`.

## Examples

**Example 1:**
```
Input: s = "a#b%*", k = 1
Output: "a"
Explanation:
| i | s[i] | Operation                 | Current result |
|---|------|---------------------------|----------------|
| 0 | 'a'  | Append 'a'                | "a"            |
| 1 | '#'  | Duplicate result          | "aa"           |
| 2 | 'b'  | Append 'b'                | "aab"          |
| 3 | '%'  | Reverse result            | "baa"          |
| 4 | '*'  | Remove the last character | "ba"           |
The final result is "ba". The character at index k = 1 is 'a'.
```

**Example 2:**
```
Input: s = "cd%#*#", k = 3
Output: "d"
Explanation:
| i | s[i] | Operation                 | Current result |
|---|------|---------------------------|----------------|
| 0 | 'c'  | Append 'c'                | "c"            |
| 1 | 'd'  | Append 'd'                | "cd"           |
| 2 | '%'  | Reverse result            | "dc"           |
| 3 | '#'  | Duplicate result          | "dcdc"         |
| 4 | '*'  | Remove the last character | "dcd"          |
| 5 | '#'  | Duplicate result          | "dcddcd"       |
The final result is "dcddcd". The character at index k = 3 is 'd'.
```

**Example 3:**
```
Input: s = "z*#", k = 0
Output: "."
Explanation:
| i | s[i] | Operation                 | Current result |
|---|------|---------------------------|----------------|
| 0 | 'z'  | Append 'z'                | "z"            |
| 1 | '*'  | Remove the last character | ""             |
| 2 | '#'  | Duplicate the string      | ""             |
The final result is "". Since index k = 0 is out of bounds, the output is '.'.
```

## Approach
The problem is analogous to a backspace operation and can be solved with a stack:
1. Iterate over each character `ch` in `s`.
2. If `ch` is not `*`, push it onto the stack.
3. If `ch` is `*` and the stack is non‑empty, pop the top element (the character to delete). The `*` itself is never stored.
After processing all characters, concatenate the stack contents to obtain the result.

### Pseudocode
```text
FUNCTION processStringII(s):
    SET stack ← []
    FOR ch IN s:
        IF ch == '*':
            IF stack NOT EMPTY:
                POP(stack)
        ELSE:
            APPEND ch TO stack
    END FOR
    RETURN JOIN(stack, "")
```
The stack automatically handles consecutive `*` characters and ensures deletions occur in the correct order.

## Walkthrough
For `"ab*c*"`:
| Step | ch | Stack after step |
|------|----|------------------|
| 1 | a | [a] |
| 2 | b | [a,b] |
| 3 | * | [a] (pop b) |
| 4 | c | [a,c] |
| 5 | * | [a] (pop c) |
Result = "a".

## Complexity Analysis
- **Time:** `O(n)` where `n` is the length of `s` – each character is examined once.
- **Space:** `O(n)` for the stack in the worst case (no `*` characters).

## Follow‑Up Questions
1. How would you adapt the algorithm if the deletion rule removed the **next** character instead of the previous one?
2. Can the solution be implemented in‑place using two‑pointer technique to achieve `O(1)` extra space?
3. How would you handle multiple special characters each with distinct deletion semantics?

## Key Takeaway
A stack efficiently simulates the backspace‑like deletions caused by `*`, yielding a linear‑time solution.

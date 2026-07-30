# 3614. Process String with Special Operations II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/process-string-with-special-operations-ii](https://leetcode.com/problems/process-string-with-special-operations-ii)
**Companies:** Google

---

## Problem Description
You are given a string `s` consisting of lowercase letters and the special character `*`. The string must be processed from left to right with the following rule applied repeatedly:
- When a `*` is encountered, delete the character immediately before it (if any) **and** delete the `*` itself.
- After deletion, the processing continues from the position following the removed `*` (i.e., the next character in the original string).
If multiple `*` characters appear consecutively, each operates on the current state of the string. Return the final string after all characters have been processed.

## Examples
**Example 1**
```
Input: "ab*c*"
Output: "a"
Explanation:
- `*` after `b` deletes `b` → "a*c*".
- Next `*` after `c` deletes `c` → "a*".
- Final `*` deletes `a` → "" (empty string).
```

**Example 2**
```
Input: "a**b"
Output: "b"
Explanation:
- First `*` deletes `a` → "*b".
- Second `*` has no preceding character, so it is simply removed → "b".
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

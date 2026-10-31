# 3612. Process String with Special Operations I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/process-string-with-special-operations-i](https://leetcode.com/problems/process-string-with-special-operations-i)
**Companies:** Amazon

---

## Problem Description

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
With `s.length <= 20`, the result stays small (at most about `2^19` characters in the extreme all-`#` case, in practice far less), so direct simulation with a character list is enough. Iterate over each character `ch` in `s`:
- Lowercase letter: append it to `result`.
- `*`: pop the last character if `result` is non-empty.
- `#`: append a copy of `result` to itself.
- `%`: reverse `result` in place.
After the loop, join the list into the final string.

### Pseudocode
```text
FUNCTION processStr(s):
    SET result ← []
    FOR ch IN s:
        IF ch == '*':
            IF result NOT EMPTY:
                POP(result)
        ELSE IF ch == '#':
            SET result ← result + result
        ELSE IF ch == '%':
            REVERSE(result)
        ELSE:
            APPEND ch TO result
    END FOR
    RETURN JOIN(result, "")
```
`*` on an empty result and `#` / `%` on an empty result are naturally no-ops.

## Walkthrough
Example 1: `s = "a#b%*"`.

| Step | ch | result after step |
|------|----|-------------------|
| 1 | a | [a] |
| 2 | # | [a,a] |
| 3 | b | [a,a,b] |
| 4 | % | [b,a,a] |
| 5 | * | [b,a] (pop a) |

Result = `"ba"`.

## Complexity Analysis
- **Time:** `O(n * L)` where `L` is the maximum length `result` reaches - each `#` or `%` costs time linear in the current length; with `n <= 20` this is tiny.
- **Space:** `O(|result|)` for the character list.

## Follow-Up Questions
1. If `s` could be `10^5` characters long and you only needed the `k`-th character, how would you avoid building the string? (See part II: track lengths and map `k` backwards.)
2. How could you make `%` O(1) by keeping a deque and a "reversed" flag instead of physically reversing?
3. How would you add an undo operation that reverts the previous special operation?

## Key Takeaway
When constraints are tiny, direct simulation of each operation on a mutable list is the simplest correct solution; recognize when size limits stop it from scaling.

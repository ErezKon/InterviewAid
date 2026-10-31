# 3614. Process String with Special Operations II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/process-string-with-special-operations-ii](https://leetcode.com/problems/process-string-with-special-operations-ii)
**Companies:** Google

---

## Problem Description

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
The final string can have up to `10^15` characters, so it cannot be built. Track only lengths and map the index `k` backwards through the operations:
1. **Forward pass:** compute `len[i]`, the length of `result` after processing `s[i]` (letter: +1, `*`: max(len-1, 0), `#`: doubled, `%`: unchanged). If `k >= len[n-1]`, return `'.'`.
2. **Backward pass:** walk `i` from `n-1` down to `0` with `L = len[i]`:
   - `#`: the string was `X + X` with `|X| = L/2`; if `k >= L/2`, set `k ← k - L/2`.
   - `%`: the string was reversed, so `k ← L - 1 - k`.
   - `*`: the removed character was at index `L`, and `k < L`, so `k` is unchanged.
   - letter: it sits at index `L - 1`; if `k == L - 1`, this letter is the answer, otherwise `k` is in the earlier part and unchanged.

### Pseudocode
```text
FUNCTION processStr(s, k):
    SET L ← 0
    SET len ← ARRAY LENGTH |s|
    FOR i ← 0 TO |s| - 1:
        IF s[i] == '*': L ← MAX(L - 1, 0)
        ELSE IF s[i] == '#': L ← 2 * L
        ELSE IF s[i] != '%': L ← L + 1
        len[i] ← L
    IF k >= L: RETURN '.'
    FOR i ← |s| - 1 DOWN TO 0:
        L ← len[i]
        IF s[i] == '#':
            IF k >= L / 2: k ← k - L / 2
        ELSE IF s[i] == '%':
            k ← L - 1 - k
        ELSE IF s[i] != '*':
            IF k == L - 1: RETURN s[i]
    END FOR
```
The loop always returns at some letter: `k` stays inside the current length, and every character ultimately originates from an appended letter.

## Walkthrough
Example 2: `s = "cd%#*#"`, `k = 3`.

Forward lengths: `c → 1`, `d → 2`, `% → 2`, `# → 4`, `* → 3`, `# → 6`. Final length 6 > 3, so continue.

| i | s[i] | L | Action | k after |
|---|------|---|--------|---------|
| 5 | # | 6 | k = 3 >= 3 → k - 3 | 0 |
| 4 | * | 3 | unchanged | 0 |
| 3 | # | 4 | k = 0 < 2 → unchanged | 0 |
| 2 | % | 2 | k = 2 - 1 - 0 | 1 |
| 1 | d | 2 | k == L - 1 = 1 → answer | `'d'` |

Result: `"d"`.

## Complexity Analysis
- **Time:** `O(n)` where `n` is the length of `s` - one forward and one backward pass.
- **Space:** `O(n)` for the stored lengths (values up to `10^15` fit in 64-bit integers).

## Follow-Up Questions
1. How would you answer many queries `k_1, k_2, ...` on the same `s` efficiently?
2. What changes if `#` appended the reversed copy (`X + reverse(X)`) instead of a plain duplicate?
3. Can you avoid storing all lengths by recomputing them in reverse (hint: `*` is not invertible, so why does that make it hard)?

## Key Takeaway
When the generated string is astronomically long, record lengths on a forward pass and invert each operation on the index during a backward pass until it lands on the letter that created it.

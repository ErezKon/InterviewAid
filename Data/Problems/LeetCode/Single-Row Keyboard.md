# 1165. Single-Row Keyboard

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/single-row-keyboard](https://leetcode.com/problems/single-row-keyboard)
**Companies:** Google

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

There is a special keyboard with **all keys in a single row**.

Given a string `keyboard` of length `26` indicating the layout of the keyboard (indexed from `0` to `25`). Initially, your finger is at index `0`. To type a character, you have to move your finger to the index of the desired character. The time taken to move your finger from index `i` to index `j` is `|i - j|`.

You want to type a string `word`. Write a function to calculate how much time it takes to type it with one finger.

**Constraints:**
- `keyboard.length == 26`
- `keyboard` contains each English lowercase letter exactly once in some order.
- `1 <= word.length <= 10^4`
- `word[i]` is an English lowercase letter.

**Examples:**

**Example 1:**
```
Input: keyboard = "abcdefghijklmnopqrstuvwxyz", word = "cba"
Output: 4
Explanation: The index moves from 0 to 2 to write 'c' then to 1 to write 'b' then to 0 again to write 'a'.
Total time = 2 + 1 + 1 = 4.
```

**Example 2:**
```
Input: keyboard = "pqrstuvwxyzabcdefghijklmno", word = "leetcode"
Output: 73
```

---

## Approach: Index Map — O(n) ✅

Precompute each character's position, then sum absolute differences.

```
FUNCTION calculateTime(keyboard, word):
    pos = {}
    FOR i, ch IN enumerate(keyboard):
        pos[ch] = i

    total = 0
    prev = 0
    FOR ch IN word:
        total += ABS(pos[ch] - prev)
        prev = pos[ch]
    RETURN total
```

### Walkthrough — `keyboard = "abcdefg..."`, `word = "cba"`

| char | pos | |pos - prev| | prev | total |
|------|-----|-------------|------|-------|
| c    | 2   | 2           | 2    | 2     |
| b    | 1   | 1           | 1    | 3     |
| a    | 0   | 1           | 0    | 4     |

Result: `4`

| Time | Space |
|------|-------|
| O(n) | O(1) (26 chars) |

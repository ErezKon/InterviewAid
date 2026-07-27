# 1165. Single-Row Keyboard

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/single-row-keyboard](https://leetcode.com/problems/single-row-keyboard)
**Companies:** Google

---

## Problem Description

A keyboard has all 26 lowercase English letters in a single row. Given the `keyboard` layout (a permutation of the 26 letters) and a string `word`, return the total distance to type the word using only one finger, starting at index 0.

The distance is the sum of `|index_of(current_char) - index_of(previous_char)|` for each character.

### Examples

**Example 1:**
- **Input:** `keyboard = "abcdefghijklmnopqrstuvwxyz"`, `word = "cba"`
- **Output:** `4`
- **Explanation:** Move from `a`(0) to `c`(2) = 2, then `c`(2) to `b`(1) = 1, then `b`(1) to `a`(0) = 1. Total = 4.

**Example 2:**
- **Input:** `keyboard = "pqrstuvwxyzabcdefghijklmno"`, `word = "leetcode"`
- **Output:** `73`

### Constraints

- `keyboard` is a permutation of all 26 lowercase letters.
- `1 <= word.length <= 10⁴`

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

# 3014. Minimum Number of Pushes to Type Word I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-pushes-to-type-word-i](https://leetcode.com/problems/minimum-number-of-pushes-to-type-word-i)
**Companies:** Amazon, Elitmus, Google, Snapchat

---

## Problem Description
You are given a string `word` consisting of lowercase English letters. The phone keypad contains the letters `a`‑`z` in order, with each key holding eight consecutive letters (e.g., `a`‑`h` on key 1, `i`‑`p` on key 2, `q`‑`x` on key 3, `y`‑`z` on key 4). Pressing a key once types the first letter on that key, twice types the second, and so on. After typing a letter, you must press the **next** key to start a new sequence. Compute the minimum total number of key presses required to type the entire `word`.

## Examples
**Example 1**
```
Input: word = "abc"
Output: 3
Explanation: Each letter is the first on its key, so 1 press per letter.
```
**Example 2**
```
Input: word = "zzzz"
Output: 8
Explanation: `z` is the second letter on the fourth key, requiring 2 presses each → 2*4 = 8.
```

## Approach
The position of a character within its key determines the number of presses. Since keys contain eight letters, the index of a character `c` (0‑based) is `ord(c) - ord('a')`. The number of presses for `c` is `(index % 8) + 1`.

```text
FUNCTION minimumPushes(word):
    presses ← 0
    FOR ch IN word:
        idx ← ASCII(ch) - ASCII('a')
        presses ← presses + (idx MOD 8) + 1
    RETURN presses
```

## Walkthrough
For `word = "hello"`:
| Char | idx | idx % 8 | presses |
|------|-----|--------|---------|
| h    | 7   | 7      | 8 |
| e    | 4   | 4      | 5 |
| l    |11   | 3      | 4 |
| l    |11   | 3      | 4 |
| o    |14   | 6      | 7 |
Total = 8+5+4+4+7 = 28.

## Complexity Analysis
- **Time:** O(|word|) – one pass over the string.
- **Space:** O(1).

## Follow-Up Questions
1. How would the solution change if the keypad layout were non‑uniform (different numbers of letters per key)?
2. What if you could reorder the characters to minimize total presses?
3. Extend to a scenario where pressing a key also incurs a fixed overhead cost.

## Key Takeaway
The minimum pushes equal the sum of each character’s position within its eight‑letter key, which can be computed directly from the character’s alphabet index.

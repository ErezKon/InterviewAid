# 3016. Minimum Number of Pushes to Type Word II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-pushes-to-type-word-ii](https://leetcode.com/problems/minimum-number-of-pushes-to-type-word-ii)
**Companies:** Amazon, De Shaw

---

## Problem Description
Given a string `word` of lowercase English letters, you can type each character using a phone keypad where each key holds eight consecutive letters (`a`‑`h` on key 1, `i`‑`p` on key 2, `q`‑`x` on key 3, `y`‑`z` on key 4). After typing a character, you must press the **next** key before typing another character on the same key. Compute the minimum total number of key presses required to type the entire `word`.

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
The number of presses for a character equals its position within its key plus one. The position is `(ord(c) - ord('a')) % 8`. Summing this for all characters yields the answer.

```text
FUNCTION minimumPushes(word):
    presses ← 0
    FOR ch IN word:
        idx ← ASCII(ch) - ASCII('a')
        presses ← presses + (idx MOD 8) + 1
    RETURN presses
```

## Walkthrough
For `word = "hello"` the calculation mirrors the I version: total presses = 28.

## Complexity Analysis
- **Time:** O(|word|) – single pass.
- **Space:** O(1).

## Follow-Up Questions
1. How would the solution adapt if keys contained a variable number of letters?
2. What if you could reorder the string to minimize total presses?
3. Extend to include a fixed cost per key change.

## Key Takeaway
Even with the “next‑key” constraint, the optimal strategy is to type characters in order, counting each character’s offset within its eight‑letter key.

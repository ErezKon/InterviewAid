# 3227. Vowels Game in a String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/vowels-game-in-a-string](https://leetcode.com/problems/vowels-game-in-a-string)
**Companies:** Amazon, Google, Meta

---

## Problem Description

> *Note: the original description skipped the game rules; the Approach below ("Alice wins iff at least one vowel exists") is the correct conclusion of the official game — with an odd vowel count Alice removes everything; with an even positive count she leaves exactly one vowel, Bob cannot remove it, and Alice takes the rest.*

Alice and Bob are playing a game on a string.

You are given a string `s`, Alice and Bob will take turns playing the following game where Alice starts **first**:

- On Alice's turn, she has to remove any **non-empty** substring from `s` that contains an **odd** number of vowels.
- On Bob's turn, he has to remove any **non-empty** substring from `s` that contains an **even** number of vowels.

The first player who cannot make a move on their turn loses the game. We assume that both Alice and Bob play **optimally**.

Return `true` if Alice wins the game, and `false` otherwise.

The English vowels are: `a`, `e`, `i`, `o`, and `u`.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists only of lowercase English letters.

## Examples

**Example 1:**
```
Input: s = "leetcoder"
Output: true
Explanation: Alice can win the game as follows:
- Alice plays first, she can delete the underlined substring in s = "leetcoder" which contains 3 vowels. The resulting string is s = "der".
- Bob plays second, he can delete the underlined substring in s = "der" which contains 0 vowels. The resulting string is s = "er".
- Alice plays third, she can delete the whole string s = "er" which contains 1 vowel.
- Bob plays fourth, since the string is empty, there is no valid play for Bob. So Alice wins the game.
```

**Example 2:**
```
Input: s = "bbcd"
Output: false
Explanation: There is no valid play for Alice in her first turn, so Alice loses the game.
```

## Approach
Count the number of vowel characters in the string. If the count is greater than zero, Alice wins; otherwise, Bob wins.

```text
FUNCTION doesAliceWin(s):
    SET vowelCount ← 0
    FOR ch ← each character IN s:
        IF ch IN {'a','e','i','o','u'}:
            SET vowelCount ← vowelCount + 1
    RETURN vowelCount > 0
```

## Walkthrough
| Step | Character | Vowel Count |
|------|-----------|-------------|
| 1    | 'l'       | 0           |
| 2    | 'e'       | 1           |
| ...  | ...       | ...         |
The function returns `true` because the final count is > 0.

## Complexity Analysis
- Time: O(n), where n is the length of the string.
- Space: O(1) extra space.

## Follow-Up Questions
- How would you modify the solution if consonants also contributed to the score?
- What if the game required counting only distinct vowels?
- Can the game be extended to handle uppercase letters efficiently?

## Key Takeaway
A simple linear scan to count vowels determines the winner in constant extra space.

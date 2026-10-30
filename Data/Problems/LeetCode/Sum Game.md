# 1927. Sum Game

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-game](https://leetcode.com/problems/sum-game)
**Companies:** De Shaw

---

## Problem Description

> *Note: the original description had the roles reversed — Alice (first player) wants the half-sums to be **unequal**, Bob wants them equal. Correct criterion: Alice wins iff the total number of `'?'` is odd, or `2·(sumLeft − sumRight) ≠ 9·(qRight − qLeft)`.*

Alice and Bob take turns playing a game, with **Alice** **starting first**.

You are given a string `num` of **even length** consisting of digits and `'?'` characters. On each turn, a player will do the following if there is still at least one `'?'` in `num`:

1. Choose an index `i` where `num[i] == '?'`.
2. Replace `num[i]` with any digit between `'0'` and `'9'`.

The game ends when there are no more `'?'` characters in `num`.

For Bob to win, the sum of the digits in the first half of `num` must be **equal** to the sum of the digits in the second half. For Alice to win, the sums must **not be equal**.

- For example, if the game ended with `num = "243801"`, then Bob wins because `2+4+3 = 8+0+1`. If the game ended with `num = "243803"`, then Alice wins because `2+4+3 != 8+0+3`.

Assuming Alice and Bob play **optimally**, return `true` *if Alice will win and* `false` *if Bob will win*.

**Constraints:**
- `2 <= num.length <= 10^5`
- `num.length` is **even**.
- `num` consists of only digits and `'?'`.

## Examples

**Example 1:**
```
Input: num = "5023"
Output: false
Explanation: There are no moves to be made.
The sum of the first half is equal to the sum of the second half: 5 + 0 = 2 + 3.
```

**Example 2:**
```
Input: num = "25??"
Output: true
Explanation: Alice can replace one of the '?'s with '9' and it will be impossible for Bob to make the sums equal.
```

**Example 3:**
```
Input: num = "?3295???"
Output: false
Explanation: It can be proven that Bob will always win. One possible outcome is:
- Alice replaces the first '?' with '9'. num = "93295???".
- Bob replaces one of the '?' in the right half with '9'. num = "932959??".
- Alice replaces one of the '?' in the right half with '2'. num = "9329592?".
- Bob replaces the last '?' in the right half with '7'. num = "93295927".
Bob wins because 9 + 3 + 2 + 9 = 5 + 9 + 2 + 7.
```

## Approach
Calculate the sum and count of unknowns in each half. The game reduces to checking whether the difference can be compensated by the remaining `'?'` slots using optimal digit choices.

```text
FUNCTION canFirstPlayerWin(num):
    n ← LENGTH(num)
    half ← n / 2
    sumLeft, sumRight ← 0, 0
    unknownLeft, unknownRight ← 0, 0
    FOR i ← 0 TO n-1:
        IF num[i] = '?':
            IF i < half: unknownLeft ← unknownLeft + 1
            ELSE: unknownRight ← unknownRight + 1
        ELSE:
            digit ← INTEGER(num[i])
            IF i < half: sumLeft ← sumLeft + digit
            ELSE: sumRight ← sumRight + digit
    diff ← sumLeft - sumRight
    // Each unknown can contribute at most 9 to the side it belongs to
    maxAdjust ← 9 * (unknownLeft + unknownRight)
    // The game is winnable if the absolute difference can be covered by the side with more unknowns
    RETURN (ABS(diff) <= maxAdjust) AND ((unknownLeft - unknownRight) % 2 = 0)
```

## Walkthrough
Consider `num = "25??"` (n=4):
- Left half `"25"`: sumLeft=7, unknownLeft=0.
- Right half `"??"`: sumRight=0, unknownRight=2.
- diff = 7.
- Max adjustment from two unknowns = 9*2=18, and the parity condition holds, so first player can win.

## Complexity Analysis
Time: `O(n)` – single pass over the string. Space: `O(1)`.

## Follow-Up Questions
1. How would the solution change if players could replace `'?'` with any integer (not limited to 0‑9)?
2. Can you extend the game to strings of odd length?
3. What if the goal is to maximize the difference instead of balancing sums?

## Key Takeaway
The game reduces to a simple arithmetic check on sums and the number of remaining moves.

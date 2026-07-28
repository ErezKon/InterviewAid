# 1927. Sum Game

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-game](https://leetcode.com/problems/sum-game)
**Companies:** De Shaw

---

## Problem Description
You are given a string `num` consisting of digits and `'?'` characters. Two players replace `'?'` with digits (0‑9) alternately, aiming to make the sum of the first half equal to the sum of the second half. Return `true` if the first player can force a win, otherwise `false`.

## Examples
- Input: `num = "5023"` → Output: `true` (already balanced).
- Input: `num = "25??"` → Output: `true` (first player can choose digits to balance sums).
- Input: `num = "??"` → Output: `false` (second player can always counter).

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

# 822. Card Flipping Game

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/card-flipping-game](https://leetcode.com/problems/card-flipping-game)
**Companies:** Google

---

## Problem Description
You are given two **0-indexed** integer arrays `fronts` and `backs` of length `n`, where the `i`-th card has the positive integer `fronts[i]` printed on the front and `backs[i]` printed on the back. Initially, each card is placed on a table such that the front number is facing up and the other is facing down. You may flip over any number of cards (possibly zero).

After flipping the cards, an integer is considered **good** if it is facing down on some card and **not** facing up on any card.

Return *the minimum possible good integer after flipping the cards*. If there are no good integers, return `0`.

**Constraints:**
- `n == fronts.length == backs.length`
- `1 <= n <= 1000`
- `1 <= fronts[i], backs[i] <= 2000`

## Examples
```
Example 1:
  Input: fronts = [1,2,4,4,7], backs = [1,3,4,1,3]
  Output: 2
  Explanation:
  If we flip the second card, the face up numbers are [1,3,4,4,7] and the face down are [1,2,4,1,3].
  2 is the minimum good integer as it appears facing down but not facing up.
  It can be shown that 2 is the minimum possible good integer obtainable after flipping some cards.
```

```
Example 2:
  Input: fronts = [1], backs = [1]
  Output: 0
  Explanation:
  There are no good integers no matter how we flip the cards, so we return 0.
```

## Approach
Identify all bad numbers by scanning each card where `fronts[i] == backs[i]`. Then iterate over all numbers in both arrays and keep the minimum that is not in the bad set.

```text
FUNCTION flipgame(fronts, backs):
    SET bad ← EMPTY SET
    FOR i ← 0 TO LENGTH(fronts)-1:
        IF fronts[i] == backs[i]:
            ADD fronts[i] TO bad
    SET answer ← INFINITY
    FOR value IN fronts + backs:
        IF value NOT IN bad:
            SET answer ← MIN(answer, value)
    IF answer == INFINITY:
        RETURN 0
    RETURN answer
```

## Walkthrough
| Index | fronts[i] | backs[i] | Bad? | Candidates considered |
|-------|-----------|----------|------|-----------------------|
| 0     | 1         | 1        | Yes  | —                     |
| 1     | 2         | 3        | No   | 2,3 (min=2)           |
| 2     | 4         | 4        | Yes  | —                     |
| 3     | 4         | 2        | No   | 2 already considered |
Result = 2.

## Complexity Analysis
- **Time:** O(n) where n is the number of cards.
- **Space:** O(n) in the worst case for the set of bad numbers.

## Follow-Up Questions
1. How would you modify the solution if each card could be flipped any number of times?
2. Can you solve it in O(1) extra space without using a set?
3. How to handle very large integer values efficiently?

## Key Takeaway
The optimal answer is the smallest number that never appears on both sides of the same card, found by excluding the *bad* set.

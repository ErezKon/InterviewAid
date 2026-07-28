# 822. Card Flipping Game

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/card-flipping-game](https://leetcode.com/problems/card-flipping-game)
**Companies:** Google

---

## Problem Description
You are given two integer arrays `fronts` and `backs` of equal length, where the i‑th card has `fronts[i]` on the front side and `backs[i]` on the back side. A number is considered *bad* if it appears on both sides of the same card. Return the smallest number that is not bad; if every number is bad, return 0.

## Examples
**Example 1:**
```
fronts = [1,2,4,4]
backs  = [1,3,4,2]
Output: 2
Explanation: 1 and 4 are bad (appear on both sides of a card). The smallest non‑bad number is 2.
```
**Example 2:**
```
fronts = [1,1]
backs  = [1,1]
Output: 0
Explanation: All numbers are bad.
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

# 2300. Successful Pairs of Spells and Potions

**Difficulty:** 🟡 Medium
**Acceptance:** 45.0%
**LeetCode:** [https://leetcode.com/problems/successful-pairs-of-spells-and-potions](https://leetcode.com/problems/successful-pairs-of-spells-and-potions)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Meta, Microsoft, Paypay

---

## Problem Description
Given two integer arrays `spells` and `potions`, and an integer `success`, a pair `(spell, potion)` is successful if `spell * potion >= success`. Return an array where each element is the number of potions that form a successful pair with the corresponding spell.

## Examples
- Input: `spells = [5,1,3]`, `potions = [1,2,3,4,5]`, `success = 7`\
  Output: `[4,0,3]` – For spell 5, potions ≥ 2 work; for spell 1 none; for spell 3, potions ≥ 3 work.
- Input: `spells = [2,3]`, `potions = [1,2,3]`, `success = 6`\
  Output: `[1,2]`.

## Approach
Sort the potions once. For each spell compute the minimum required potion strength `ceil(success / spell)` and binary‑search the first potion meeting that threshold.

```text
FUNCTION successfulPairs(spells, potions, success):
    SORT potions
    result ← []
    FOR spell IN spells:
        minPotion ← CEIL(success / spell)
        idx ← BINARY_SEARCH_LEFT(potions, minPotion)
        count ← LENGTH(potions) - idx
        APPEND count TO result
    RETURN result
```

## Walkthrough
| spell | minPotion | idx (first ≥) | count |
|------|-----------|---------------|-------|
| 5    | 2         | 1 (potion 2)  | 4     |
| 1    | 7         | 5 (out of range) | 0 |
| 3    | 3         | 2 (potion 3)  | 3 |

## Complexity Analysis
Time: `O((m + n) log n)` – sorting `n` potions and binary searching for each of `m` spells. Space: `O(1)` extra besides output.

## Follow-Up Questions
1. How would you handle updates to the `potions` array dynamically?
2. Can you solve it using a two‑pointer technique after sorting both arrays?
3. What if the success condition uses addition instead of multiplication?

## Key Takeaway
Sorting one list and binary searching for a threshold lets you count qualifying pairs efficiently.

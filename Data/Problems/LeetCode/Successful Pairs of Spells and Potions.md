# 2300. Successful Pairs of Spells and Potions

**Difficulty:** 🟡 Medium
**Acceptance:** 45.0%
**LeetCode:** [https://leetcode.com/problems/successful-pairs-of-spells-and-potions](https://leetcode.com/problems/successful-pairs-of-spells-and-potions)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Meta, Microsoft, Paypay

---

## Problem Description

You are given two positive integer arrays `spells` and `potions`, of length `n` and `m` respectively, where `spells[i]` represents the strength of the `i`th spell and `potions[j]` represents the strength of the `j`th potion.

You are also given an integer `success`. A spell and potion pair is considered **successful** if the **product** of their strengths is **at least** `success`.

Return *an integer array* `pairs` *of length* `n` *where* `pairs[i]` *is the number of potions that will form a successful pair with the* `i`th *spell.*

**Constraints:**
- `n == spells.length`
- `m == potions.length`
- `1 <= n, m <= 10^5`
- `1 <= spells[i], potions[i] <= 10^5`
- `1 <= success <= 10^10`

## Examples

**Example 1:**
```
Input: spells = [5,1,3], potions = [1,2,3,4,5], success = 7
Output: [4,0,3]
Explanation:
- 0th spell: 5 * [1,2,3,4,5] = [5,10,15,20,25]. 4 pairs are successful.
- 1st spell: 1 * [1,2,3,4,5] = [1,2,3,4,5]. 0 pairs are successful.
- 2nd spell: 3 * [1,2,3,4,5] = [3,6,9,12,15]. 3 pairs are successful.
Thus, [4,0,3] is returned.
```

**Example 2:**
```
Input: spells = [3,1,2], potions = [8,5,8], success = 16
Output: [2,0,2]
Explanation:
- 0th spell: 3 * [8,5,8] = [24,15,24]. 2 pairs are successful.
- 1st spell: 1 * [8,5,8] = [8,5,8]. 0 pairs are successful.
- 2nd spell: 2 * [8,5,8] = [16,10,16]. 2 pairs are successful.
Thus, [2,0,2] is returned.
```

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

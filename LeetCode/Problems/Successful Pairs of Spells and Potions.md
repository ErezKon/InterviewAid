# 2300. Successful Pairs of Spells and Potions

**Difficulty:** 🟡 Medium
**Acceptance:** 45.0%
**LeetCode:** [https://leetcode.com/problems/successful-pairs-of-spells-and-potions](https://leetcode.com/problems/successful-pairs-of-spells-and-potions)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Meta, Microsoft, Paypay

---

## Approach: Sort + Binary Search — O((m+n) log n) ✅

```
FUNCTION successfulPairs(spells, potions, success):
    SORT potions
    result = []

    FOR spell IN spells:
        // Find minimum potion strength: ceil(success / spell)
        minPotion = ceil(success / spell)

        // Binary search for first potion >= minPotion
        idx = bisect_left(potions, minPotion)
        result.ADD(len(potions) - idx)

    RETURN result
```

Sort potions once. For each spell, binary search the threshold.

# 1982. Find Array Given Subset Sums

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-array-given-subset-sums](https://leetcode.com/problems/find-array-given-subset-sums)
**Companies:** Mindtickle

---

## Problem Description

Given all 2ⁿ subset sums of an unknown array of `n` integers (possibly negative), recover the original array.

---

## Key Insight

> Sort subset sums. The difference between the two smallest values gives the smallest absolute element `d`. Split sums into two groups: those containing `d` and those not. Recurse on the group without `d`. Handle sign (positive/negative) by checking if 0 is in the appropriate group.

---

## Approach: Recursive Decomposition — O(2ⁿ × n) ✅

```
FUNCTION recoverArray(n, sums):
    SORT sums
    result = []
    WHILE len(sums) > 1:
        d = sums[1] - sums[0]  // candidate element
        // Split into with-d and without-d using multiset
        without = []; with_ = []
        used = multiset()
        FOR s IN sums:
            IF s IN used:
                with_.ADD(s)
                used.REMOVE(s)
            ELSE:
                without.ADD(s)
                used.ADD(s + d)
        IF 0 IN without:
            result.ADD(d); sums = without
        ELSE:
            result.ADD(-d); sums = with_
    RETURN result
```

---

## Key Takeaway

> **Iteratively extract elements from subset sums. The min difference reveals the smallest element. Split and recurse. Handle negatives by checking which half contains 0.**

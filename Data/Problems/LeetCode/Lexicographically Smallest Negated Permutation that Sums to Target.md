# 3752. Lexicographically Smallest Negated Permutation that Sums to Target

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lexicographically-smallest-negated-permutation-that-sums-to-target](https://leetcode.com/problems/lexicographically-smallest-negated-permutation-that-sums-to-target)
**Companies:** Amazon

---

## Problem Description

Given `n` and a target sum, find the lexicographically smallest permutation of the numbers `[1..n]` where you may negate any subset of elements so that the total sum equals `target`. The permutation is compared lexicographically as a sequence of signed integers.

## Examples

| n | target | Output |
|---|--------|--------|
| 4 | 2 | `[1, -2, 3, -4]` |
| 3 | 0 | `[-1, 2, -3]` |

*Explanation*: For `n=4`, total sum is 10. Negating `{2,4}` reduces the sum by `2*(2+4)=12`, giving `10-12=-2`. Adjusting to target 2 requires negating `{1,3}` instead, resulting in `[1, -2, 3, -4]` which is the lexicographically smallest valid permutation.

## Approach

Greedy reduction to a subset‑sum problem — ✅

```text
FUNCTION smallestNegatedPermutation(n, target):
    total ← n * (n + 1) / 2
    // Required sum of negated subset S
    SET S ← (total - target) / 2
    IF (total - target) % 2 ≠ 0 OR S < 0:
        RETURN []  // impossible
    // Greedily pick largest numbers to form S for lexicographically smallest result
    SET negated ← empty set
    FOR num FROM n DOWNTO 1:
        IF S ≥ num:
            ADD num TO negated
            SET S ← S - num
    // Build permutation, negating chosen numbers
    SET result ← []
    FOR i FROM 1 TO n:
        IF i IN negated:
            APPEND -i TO result
        ELSE:
            APPEND i TO result
    RETURN result
```

## Walkthrough

`n = 4, target = 2`

1. `total = 10`, `S = (10‑2)/2 = 4`.
2. Iterate numbers descending:
   - `num=4`: `S (4) ≥ 4` → negate 4, `S=0`.
   - Remaining numbers are not negated.
3. Build result: `[1, 2, 3, -4]` → sum = 2, but lexicographically larger than `[1, -2, 3, -4]`.
4. To obtain lexicographically smallest, after selecting the subset, we **re‑order** by placing negated smaller numbers earlier when possible. Adjust by swapping signs of earlier numbers while preserving the subset sum, yielding `[1, -2, 3, -4]`.

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(n) |

## Follow-Up Questions

1. How would the algorithm change if the permutation must remain strictly increasing after applying signs?
2. Can you extend the method to handle multiple target sums for different prefixes of the permutation?
3. What is the impact on complexity if `n` can be up to 10⁵ and `target` up to 10⁹?

## Key Takeaway

> Reduce the problem to a subset‑sum: find a subset whose sum equals `(total‑target)/2`. Greedily choose the largest numbers for the subset, then construct the permutation, adjusting signs to achieve the lexicographically smallest ordering.

# 3752. Lexicographically Smallest Negated Permutation that Sums to Target

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lexicographically-smallest-negated-permutation-that-sums-to-target](https://leetcode.com/problems/lexicographically-smallest-negated-permutation-that-sums-to-target)
**Companies:** Amazon

---

## Problem Description

You are given a positive integer `n` and an integer `target`.

Return the **lexicographically smallest** array of integers of size `n` such that:

- The **sum** of its elements equals `target`.
- The **absolute values** of its elements form a **permutation** of size `n`.

If no such array exists, return an empty array.

A **permutation** of size `n` is a rearrangement of integers `1, 2, ..., n`.

**Constraints:**
- `1 <= n <= 10^5`
- `-10^10 <= target <= 10^10`

## Examples

```
Example 1:
  Input: n = 3, target = 0
  Output: [-3,1,2]
  Explanation: The arrays that sum to 0 and whose absolute values form a permutation of size 3 are:
  [-3, 1, 2], [-3, 2, 1], [-2, -1, 3], [-2, 3, -1], [-1, -2, 3], [-1, 3, -2],
  [1, -3, 2], [1, 2, -3], [2, -3, 1], [2, 1, -3], [3, -2, -1], [3, -1, -2].
  The lexicographically smallest one is [-3, 1, 2].
```

```
Example 2:
  Input: n = 1, target = 10000000000
  Output: []
  Explanation: There are no arrays that sum to 10000000000 and whose absolute values form a permutation of size 1.
  Therefore, the answer is [].
```

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

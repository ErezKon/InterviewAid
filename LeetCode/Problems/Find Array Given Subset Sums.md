# 1982. Find Array Given Subset Sums

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-array-given-subset-sums](https://leetcode.com/problems/find-array-given-subset-sums)
**Companies:** Mindtickle

---

## Problem Description

Given all 2ⁿ subset sums of an unknown array of `n` integers (which may be negative), reconstruct the original array.

---

## Examples

| n | Subset Sums | Recovered Array |
|---|-------------|-----------------|
| 2 | [0, 1, 2, 3] | [1,2] |
| 3 | [-3,-2,-1,0,1,2,3,4] | [1,2,1] |

*Explanation*: The smallest non‑zero difference between sorted sums reveals the smallest absolute element. Using multiset splitting recovers the array.

---

## Approach: Recursive Decomposition — O(2ⁿ × n) ✅

```text
FUNCTION recoverArray(n, sums):
    SORT sums ASCENDING
    result ← []
    WHILE LENGTH(sums) > 1:
        d ← sums[1] - sums[0]  // candidate element magnitude
        without ← []
        with_ ← []
        used ← multiset()
        FOR s IN sums:
            IF s IN used:
                with_.APPEND(s)
                used.REMOVE(s)
            ELSE:
                without.APPEND(s)
                used.ADD(s + d)
        IF 0 IN without:
            result.APPEND(d)
            sums ← without
        ELSE:
            result.APPEND(-d)
            sums ← with_
    RETURN result
```

The algorithm repeatedly extracts the smallest element by comparing the two smallest subset sums, partitions the sums into those that include the element and those that do not, and recurses on the appropriate half.

---

## Walkthrough

**Example** – `n = 2`, `sums = [0,1,2,3]`
1. Sort sums → `[0,1,2,3]`. `d = 1 - 0 = 1`.
2. Partition:
   - without = `[0,2]` (sums without `d`).
   - with_ = `[1,3]` (sums with `d`).
3. `0` is in `without`, so element `1` belongs to the array. Append `1` to result.
4. Set `sums = without = [0,2]` and repeat.
5. `d = 2 - 0 = 2`. Partition → `without = [0]`, `with_ = [2]`.
6. `0` in `without`, append `2`. Result `[1,2]`.
7. No more sums; return `[1,2]`.

---

## Complexity Analysis

- **Time:** O(2ⁿ × n) — sorting the 2ⁿ sums dominates, plus linear work per iteration.
- **Space:** O(2ⁿ) for storing the sums and auxiliary multisets.

---

## Follow-Up Questions

- How would the solution change if the array is guaranteed to contain only positive numbers?
- Can you recover the array when only a subset of the subset sums is provided?
- Extend the approach to output the array in sorted order.

---

## Key Takeaway

> **Iteratively extract elements from subset sums. The minimal difference reveals the smallest element, and multiset partitioning isolates sums that contain it.**
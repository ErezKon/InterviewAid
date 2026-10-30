# 3193. Count the Number of Inversions

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-inversions](https://leetcode.com/problems/count-the-number-of-inversions)
**Companies:** Amazon, Google, Microsoft, Salesforce

---

## Problem Description

You are given an integer `n` and a 2D array `requirements`, where `requirements[i] = [end_i, cnt_i]` represents the end index and the **inversion** count of each requirement.

A pair of indices `(i, j)` from an integer array `nums` is called an **inversion** if:

- `i < j` and `nums[i] > nums[j]`

Return *the number of permutations* `perm` *of* `[0, 1, 2, ..., n - 1]` *such that for **all*** `requirements[i]`, `perm[0..end_i]` *has exactly* `cnt_i` *inversions*.

Since the answer may be very large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `2 <= n <= 300`
- `1 <= requirements.length <= n`
- `requirements[i] = [end_i, cnt_i]`
- `0 <= end_i <= n - 1`
- `0 <= cnt_i <= 400`
- The input is generated such that there is at least one `i` such that `end_i == n - 1`.
- The input is generated such that all `end_i` are unique.

## Examples

```
Example 1:
  Input: n = 3, requirements = [[2,2],[0,0]]
  Output: 2
  Explanation: The two permutations are:
  - [2, 0, 1]
    Prefix [2, 0, 1] has inversions (0, 1) and (0, 2).
    Prefix [2] has 0 inversions.
  - [1, 2, 0]
    Prefix [1, 2, 0] has inversions (0, 2) and (1, 2).
    Prefix [1] has 0 inversions.
```

```
Example 2:
  Input: n = 3, requirements = [[2,2],[1,1],[0,0]]
  Output: 1
  Explanation: The only satisfying permutation is [2, 0, 1]:
  - Prefix [2, 0, 1] has inversions (0, 1) and (0, 2).
  - Prefix [2, 0] has an inversion (0, 1).
  - Prefix [2] has 0 inversions.
```

```
Example 3:
  Input: n = 2, requirements = [[0,0],[1,0]]
  Output: 1
  Explanation: The only satisfying permutation is [0, 1]:
  - Prefix [0] has 0 inversions.
  - Prefix [0, 1] has 0 inversions.
```

---

## Approach

Use dynamic programming where `dp[i][j]` denotes the number of ways to arrange the first `i` elements (0‑based) with exactly `j` inversions. When adding the `(i+1)`‑th element, it can create `0 … i` new inversions depending on its position. Transition:
```
dp[i][j] = Σ_{k=0}^{min(i, j)} dp[i‑1][j‑k]
```
Prefix‑sum optimization reduces the inner sum to O(1). Apply each requirement as a constraint: if a state `(i, j)` violates `requirements`, skip it. The answer is `dp[n‑1][requiredInv]` where `requiredInv` is the constraint for the full prefix.

---

## Walkthrough

Consider `n = 3, requirements = [[1, 1]]`.
| i (elements placed) | j (inversions) | dp[i][j] |
|---|---|---|
| 0 | 0 | 1 |
| 1 | 0 | 1 (place 0 before 1) |
| 1 | 1 | 1 (place 1 before 0) – satisfies requirement for prefix length 2 |
| 2 | 0 | 0 (invalid because prefix length 2 must have 1 inversion) |
| 2 | 1 | 1 (extend state (1,1) by placing 2 at end) |
| 2 | 2 | 1 (extend state (1,0) by placing 2 at front) |
Only states with `j = 1` at `i = 1` are kept, yielding two final permutations.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × maxInv) using prefix‑sum optimization |
| **Space** | O(n × maxInv) |

---

## Follow-Up Questions

1. How would you modify the solution if the requirements could specify a range of allowed inversions instead of an exact count?
2. Can the problem be solved in O(n) space by reusing previous DP rows?
3. How does the solution change if the permutation must be lexicographically smallest among all valid ones?

---

## Key Takeaway

> **Permutation inversion counting DP: the i‑th element creates 0 to i‑1 new inversions. Use prefix sums for efficient range transitions, and prune states using the requirements constraints.**

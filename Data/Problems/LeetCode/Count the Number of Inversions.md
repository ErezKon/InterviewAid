# 3193. Count the Number of Inversions

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-inversions](https://leetcode.com/problems/count-the-number-of-inversions)
**Companies:** Amazon, Google, Microsoft, Salesforce

---

## Problem Description

Given an integer `n` and an array `requirements` where each element is a pair `[end_i, cnt_i]`, you must construct a permutation of the numbers `0 … n‑1`. For each requirement, the prefix `perm[0..end_i]` must contain exactly `cnt_i` inversions (an inversion is a pair `(i, j)` with `i < j` and `perm[i] > perm[j]`). Return the number of such permutations modulo `10^9 + 7`.

---

## Examples

**Example 1**
```
Input: n = 3, requirements = [[1, 1]]
Output: 2
Explanation:
All permutations of [0,1,2] are:
[0,1,2] – prefix [0,1] has 0 inversions (invalid)
[0,2,1] – prefix [0,2] has 0 inversions (invalid)
[1,0,2] – prefix [1,0] has 1 inversion (valid)
[1,2,0] – prefix [1,2] has 0 inversions (invalid)
[2,0,1] – prefix [2,0] has 1 inversion (valid)
[2,1,0] – prefix [2,1] has 1 inversion (valid but exceeds requirement for end=1)
Only two permutations satisfy the requirement, so the answer is 2.
```

**Example 2**
```
Input: n = 4, requirements = [[2, 2], [3, 4]]
Output: 3
Explanation:
Valid permutations are those whose first three elements contain exactly 2 inversions and the whole array contains 4 inversions.
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
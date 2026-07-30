# 2712. Minimum Cost to Make All Characters Equal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-make-all-characters-equal](https://leetcode.com/problems/minimum-cost-to-make-all-characters-equal)
**Companies:** Nutanix

---

## Problem Description

Given a string `s` consisting of lowercase English letters, you may perform the following operation any number of times: choose an index `i` (1‑based) and flip **all** characters in the prefix `s[0…i‑1]` or the suffix `s[i…n‑1]`. Flipping a character changes it to any other character of your choice. The cost of flipping a prefix of length `i` is `i`, and the cost of flipping a suffix of length `n‑i` is `n‑i`. Return the minimum total cost required to make all characters in `s` equal.

---

## Examples

**Example 1:**
```
Input: s = "aba"
Output: 1
Explanation: Flip the suffix starting at index 2 (cost = 1) to change "ba" → "aa".
```

**Example 2:**
```
Input: s = "abc"
Output: 2
Explanation: Flip the prefix of length 1 (cost = 1) to change "a" → "b", then flip the suffix of length 2 (cost = 2) to change "bc" → "bb". Total cost = 3, but a cheaper way is to flip the suffix of length 2 first (cost = 2) to get "abb", then flip the prefix of length 1 (cost = 1) to get "bbb". Minimum cost = 2.
```

---

## Approach

**Greedy – O(n)**

At each boundary where `s[i] != s[i‑1]`, the characters on the left and right sides must become the same. The cheapest way is to flip the cheaper side of the boundary: either the left prefix (cost `i`) or the right suffix (cost `n‑i`). Summing the minimum cost for every such boundary yields the optimal answer.

```text
FUNCTION minimumCost(s):
    n ← LEN(s)
    cost ← 0
    FOR i ← 1 TO n - 1 DO
        IF s[i] ≠ s[i-1] THEN
            cost ← cost + MIN(i, n - i)
    RETURN cost
```

---

## Walkthrough

| Step | i | s[i‑1] | s[i] | Decision | Accumulated Cost |
|------|---|--------|------|----------|------------------|
| 1    | 1 | a      | b    | MIN(1, 2) = 1 (flip left) | 1 |
| 2    | 2 | b      | a    | MIN(2, 1) = 1 (flip right) | 2 |

The total minimum cost is `2` for the string `"aba"`.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy scan | **O(n)** | **O(1)** |

---

## Follow-Up Questions

1. How would the solution change if flipping a prefix or suffix also reversed the order of characters?
2. Can you extend the algorithm to return the sequence of operations achieving the minimum cost?
3. What if each character has a different individual flip cost?

---

## Key Takeaway

At every character transition, choose the cheaper side (prefix or suffix) to flip. Summing these minimal choices across all transitions yields the optimal total cost.

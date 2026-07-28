# 2028. Find Missing Observations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-missing-observations](https://leetcode.com/problems/find-missing-observations)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
You are given an integer array `rolls` representing the outcomes of some dice rolls, an integer `mean` indicating the desired average value of **all** rolls (including the missing ones), and an integer `n` denoting the number of missing rolls. Return an array of length `n` containing the values of the missing rolls (each between 1 and 6) that achieve the target mean. If it is impossible, return an empty array.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `rolls = [3,2,4,3]`, `mean = 4`, `n = 2` | `[6,6]` | Total required sum = 4 × 6 = 24. Existing sum = 12, remaining = 12 → two rolls of 6. |
| `rolls = [1,5,6]`, `mean = 3`, `n = 4` | `[]` | Required total = 3 × 7 = 21, existing sum = 12, remaining = 9 which cannot be distributed into 4 rolls (min 4, max 24). |
| `rolls = []`, `mean = 5`, `n = 3` | `[5,5,5]` | Simple case where all missing rolls equal the mean.

## Approach
Compute the total sum needed for the final array: `total = mean * (len(rolls) + n)`. Subtract the sum of known rolls to get `remaining`. The missing rolls must each be between 1 and 6, so `n ≤ remaining ≤ 6·n`. If the condition fails, return `[]`. Otherwise distribute `remaining` uniformly: `base, extra = divmod(remaining, n)`. Fill the result with `extra` rolls of `base+1` and the rest with `base`.

## Walkthrough
For `rolls = [3,2,4,3]`, `mean = 4`, `n = 2`:
| Step | Calculation |
|------|-------------|
| total needed | 4 × (4 + 2) = 24 |
| sum of known rolls | 3+2+4+3 = 12 |
| remaining | 24 - 12 = 12 |
| feasibility | 2 ≤ 12 ≤ 12 → OK |
| base, extra | divmod(12, 2) → (6, 0) |
| result | `[6,6]` |

## Complexity Analysis
- **Time:** O(1) – only constant‑time arithmetic.
- **Space:** O(n) for the output array.

## Follow-Up Questions
- How would you handle dice with a different number of faces?
- Can you return the lexicographically smallest valid array?
- What if the mean is given as a fraction instead of an integer?

## Key Takeaway
The problem reduces to a simple arithmetic feasibility check and uniform distribution of the remaining sum across the missing dice rolls.

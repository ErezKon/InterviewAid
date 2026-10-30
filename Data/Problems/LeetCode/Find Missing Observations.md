# 2028. Find Missing Observations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-missing-observations](https://leetcode.com/problems/find-missing-observations)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
You have observations of `n + m` **6-sided** dice rolls with each face numbered from `1` to `6`. `n` of the observations went missing, and you only have the observations of `m` rolls. Fortunately, you have also calculated the **average value** of the `n + m` rolls.

You are given an integer array `rolls` of length `m` where `rolls[i]` is the value of the `i`-th observation. You are also given the two integers `mean` and `n`.

Return *an array of length* `n` *containing the missing observations such that the **average value** of the* `n + m` *rolls is **exactly*** `mean`. If there are multiple valid answers, return *any of them*. If no such array exists, return *an empty array*.

The **average value** of a set of `k` numbers is the sum of the numbers divided by `k`.

Note that `mean` is an integer, so the sum of the `n + m` rolls should be divisible by `n + m`.

**Constraints:**
- `m == rolls.length`
- `1 <= n, m <= 10^5`
- `1 <= rolls[i], mean <= 6`

## Examples
```
Example 1:
  Input: rolls = [3,2,4,3], mean = 4, n = 2
  Output: [6,6]
  Explanation: The mean of all n + m rolls is (3 + 2 + 4 + 3 + 6 + 6) / 6 = 4.
```

```
Example 2:
  Input: rolls = [1,5,6], mean = 3, n = 4
  Output: [2,3,2,2]
  Explanation: The mean of all n + m rolls is (1 + 5 + 6 + 2 + 3 + 2 + 2) / 7 = 3.
```

```
Example 3:
  Input: rolls = [1,2,3,4], mean = 6, n = 4
  Output: []
  Explanation: It is impossible for the mean to be 6 no matter what the 4 missing rolls are.
```

## Approach
Compute the total sum needed for the final array: `total = mean * (len(rolls) + n)`. Subtract the sum of known rolls to get `remaining`. The missing rolls must each be between 1 and 6, so `n ≤ remaining ≤ 6·n`. If the condition fails, return `[]`. Otherwise distribute `remaining` uniformly: `base, extra = divmod(remaining, n)`. Fill the result with `extra` rolls of `base+1` and the rest with `base`.

## Walkthrough
For `rolls = [3,2,4,3]`, `mean = 4`, `n = 2`:
| Step | Calculation |
|------|-------------|
| total needed | 4 × (4 + 2) = 24 |
| sum of known rolls | 3+2+4+3 = 12 |
| remaining | 24 - 12 = 12 |
| feasibility | 2 ≤ 12 ≤ 12 → OK |
| base, extra | divmod(12, 2) → (6, 0) |
| result | `[6,6]` |

## Complexity Analysis
- **Time:** O(m + n) – sum the known rolls and build the output.
- **Space:** O(n) for the output array.

## Follow-Up Questions
- How would you handle dice with a different number of faces?
- Can you return the lexicographically smallest valid array?
- What if the mean is given as a fraction instead of an integer?

## Key Takeaway
The problem reduces to a simple arithmetic feasibility check and uniform distribution of the remaining sum across the missing dice rolls.

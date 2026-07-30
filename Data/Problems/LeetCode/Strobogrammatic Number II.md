# 247. Strobogrammatic Number II

**Difficulty:** 🟡 Medium
**Companies:** Google, Meta

---

## Problem Description
Given an integer `n`, return all strobogrammatic numbers of length `n`. A strobogrammatic number appears the same when rotated 180 degrees (e.g., "69", "88", "818"). Numbers cannot have leading zeros unless the number is exactly "0".

## Examples
- **Input:** `n = 2` **Output:** `["11","69","88","96"]`
- **Input:** `n = 3` **Output:** `["101","609","808","906","111","619","818","916","181","689","888","986"]`
- **Input:** `n = 1` **Output:** `["0","1","8"]`

## Approach
**Algorithm:** Recursive construction (DFS) building numbers from the outside in.
- **Insight:** Strobogrammatic pairs are `(0,0)`, `(1,1)`, `(6,9)`, `(8,8)`, `(9,6)`. For the outermost layer we cannot use `(0,0)` to avoid leading zeros.
- Recursively generate all middle strings of length `n-2` and wrap each with every valid pair.

### Pseudocode
```text
FUNCTION findStrobogrammatic(n):
    RETURN helper(n, true)

FUNCTION helper(k, isOuter):
    IF k = 0: RETURN ['']
    IF k = 1: RETURN ['0','1','8']
    middles ← helper(k-2, false)
    result ← []
    FOR each middle IN middles:
        FOR each (a, b) IN [('0','0'),('1','1'),('6','9'),('8','8'),('9','6')]:
            IF isOuter AND a = '0':
                CONTINUE   // avoid leading zero
            result.ADD(a + middle + b)
    RETURN result
```

## Walkthrough
For `n = 2`:
1. `helper(2, true)` calls `helper(0, false)` → returns `['']`.
2. Wrap `''` with each allowed pair except `(0,0)` → `['11','69','88','96']`.
For `n = 3`:
1. `helper(3, true)` calls `helper(1, false)` → `['0','1','8']`.
2. Wrap each middle with pairs, skipping leading zero pair, producing the 12 results shown.

## Complexity Analysis
- **Time:** O(5^{n/2}) – each level adds up to 5 choices (4 for outermost).
- **Space:** O(5^{n/2}) for storing all generated numbers plus recursion stack O(n).

## Follow‑Up Questions
- How would you modify the algorithm to count the numbers instead of listing them?
- Can you generate the numbers in lexicographic order efficiently?
- What changes are needed if the allowed digit pairs are different (e.g., include "2"↔"5")?

## Key Takeaway
Building strobogrammatic numbers recursively from the outside in, while respecting the leading‑zero rule, yields all valid strings of length `n`.

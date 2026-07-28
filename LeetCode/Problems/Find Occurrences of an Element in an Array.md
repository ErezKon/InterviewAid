# 3159. Find Occurrences of an Element in an Array

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Ibm, Jpmorgan
---

## Problem Description
Given an integer array `nums`, a list of query indices `queries`, and a target value `x`, return for each query the position (1‑based) of the `q`‑th occurrence of `x` in `nums`. If the `q`‑th occurrence does not exist, return `-1` for that query.

## Examples
| nums | queries | x | Output | Explanation |
|------|---------|---|--------|-------------|
| `[5,1,2,1,3,1]` | `[1,2,3,4]` | `1` | `[2,4,6,-1]` | 1st,2nd,3rd occurrences at positions 2,4,6; 4th does not exist. |
| `[7,7,7]` | `[1,3]` | `7` | `[1,3]` | Positions of 1st and 3rd occurrences. |

## Approach
Pre‑process the array to store all indices where `nums[i] == x` in a list `positions`. Then answer each query in O(1) by checking if `q` ≤ length of `positions`.

```text
FUNCTION findOccurrences(nums, queries, x):
    // Build list of 1‑based positions of x
    SET positions ← []
    FOR i ← 0 TO LENGTH(nums) - 1:
        IF nums[i] == x:
            APPEND (i + 1) TO positions
    // Resolve each query
    SET result ← []
    FOR q IN queries:
        IF q ≤ LENGTH(positions):
            APPEND positions[q - 1] TO result
        ELSE:
            APPEND -1 TO result
    RETURN result
```

## Walkthrough
For `nums = [5,1,2,1,3,1]`, `x = 1`:
- Scan builds `positions = [2,4,6]`.
- Query `1` → `positions[0] = 2`.
- Query `2` → `positions[1] = 4`.
- Query `3` → `positions[2] = 6`.
- Query `4` → out of range → `-1`.
Result `[2,4,6,-1]`.

## Complexity Analysis
- **Time:** O(n + q) where `n` is length of `nums` and `q` number of queries.
- **Space:** O(k) for `k` occurrences of `x` (worst‑case O(n)).

## Follow‑Up Questions
1. How would you handle multiple different target values `x` in the same batch of queries?
2. Can you answer online queries where `nums` is updated dynamically?
3. What if queries ask for the value at the `q`‑th occurrence instead of its position?

## Key Takeaway
Pre‑computing the positions of the target value enables constant‑time query answers, turning a potentially O(n·q) problem into linear preprocessing plus O(1) per query.

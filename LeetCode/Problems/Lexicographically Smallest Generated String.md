# 3474. Lexicographically Smallest Generated String

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/lexicographically-smallest-generated-string](https://leetcode.com/problems/lexicographically-smallest-generated-string)
**Companies:** Amazon, Barclays, Google, Microsoft, Tiktok

---

## Problem Description

Generate the lexicographically smallest string that satisfies a given set of generation constraints between characters (e.g., ordering or equality constraints). The constraints define which characters can appear at each position.

## Examples

| Constraints | Output |
|-------------|--------|
| `a < b`, `b < c` | `abc` |
| `a = b`, `b < c` | `aac` |

*Explanation*: In the first example, the smallest ordering that respects the constraints is `abc`. In the second, `a` must equal `b`, so the smallest string is `aac`.

## Approach

Greedy with constraint propagation — ✅

```text
FUNCTION smallestGeneratedString(constraints):
    // Initialize each position with the smallest possible character
    SET result ← array of length n filled with 'a'
    // Propagate constraints forward
    FOR each constraint IN constraints:
        APPLY constraint to result, updating characters as needed
        IF conflict arises:
            BACKTRACK to previous position and try next larger character
    RETURN JOIN(result)
```

## Walkthrough

For constraints `a < b`, `b < c` on a 3‑position string:

1. Start with `aaa`.
2. Apply `a < b`: position 2 must be > position 1 → set to `b` → `aba`.
3. Apply `b < c`: position 3 must be > position 2 → set to `c` → `abc`.
4. No conflicts, return `abc`.

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n · m) where *m* is number of constraints | O(n) |

## Follow-Up Questions

1. How would you modify the algorithm for cyclic constraints?
2. Can the approach be extended to handle weighted constraints minimizing a cost function?
3. What changes are needed if the alphabet size exceeds 26 characters?

## Key Takeaway

> Build the string greedily from left to right, choosing the smallest character that satisfies all current constraints and using backtracking only when a conflict appears.

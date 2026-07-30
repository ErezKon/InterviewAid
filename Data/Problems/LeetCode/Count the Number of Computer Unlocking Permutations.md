# 3577. Count the Number of Computer Unlocking Permutations

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Google, Meta

---

## Problem Description

Given `n` computers with unlock dependencies, count valid permutations to unlock all computers. Computer 0 must be the first to be unlocked. Return the count modulo `10^9 + 7`.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `n = 3`, `complexity = [1,2,3]` | `2` | Computer 0 is first, remaining two computers can be ordered in `2! = 2` ways. |
| `n = 4`, `complexity = [2,1,3,4]` | `0` | Computer 0 does not have the minimum complexity, so no valid permutation exists. |

---

## Approach

```
FUNCTION countPermutations(n, complexity):
    MOD ← 10^9 + 7
    // Verify that computer 0 has the smallest complexity
    IF complexity[0] ≠ MIN(complexity):
        RETURN 0
    result ← 1
    FOR i ← 1 TO n-1 DO
        result ← (result * i) % MOD
    RETURN result
```

---

## Walkthrough

**Example 1:** `n = 3`, `complexity = [1,2,3]`

| Step | Action | Result |
|------|--------|--------|
| 1 | Check minimum complexity | `complexity[0] = 1` is minimum → continue |
| 2 | Compute factorial of `n-1` (2) | `result = 1 * 1 = 1`, then `result = 1 * 2 = 2` |
| 3 | Return `result mod MOD` | `2` |

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(1) |

---

## Follow-Up Questions

1. How would the solution change if multiple computers could be unlocked first?
2. What if each computer has a list of prerequisite computers instead of a single dependency?
3. Can you extend the approach to count permutations modulo a non‑prime number?

---

## Key Takeaway

> **When one element must come first and the rest are unconstrained, the answer is simply `(n‑1)!`. The key is identifying what constraint fixes the first position.**
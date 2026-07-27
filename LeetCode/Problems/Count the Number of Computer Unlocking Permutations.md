# 3577. Count the Number of Computer Unlocking Permutations

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Google, Meta

---

## Problem Description

Given `n` computers with unlock dependencies, count valid permutations to unlock all computers. Computer 0 must be the first to be unlocked. Return the count modulo `10^9 + 7`.

---

## Key Insight

Computer 0 must be first in the permutation. Once computer 0 is placed first, the remaining `n-1` computers can be in any order (assuming they only need computer 0 to be unlocked). The answer is `(n-1)!` if valid, else `0`.

---

## Approach

```
// Computer 0 must be unlocked first (by any computer)
// Count permutations where first element maps to 0
// Answer: (n-1)! if valid, else 0
FUNCTION countPermutations(n, complexity):
    MOD = 10^9 + 7
    // Check if computer 0 has the minimum complexity
    IF complexity[0] is NOT the minimum: RETURN 0
    result = 1
    FOR i ← 1 TO n - 1 DO
        result = result * i % MOD
    RETURN result
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(1) |

---

## Key Takeaway

> **When one element must come first and the rest are unconstrained, the answer is simply `(n-1)!`. The key is identifying what constraint fixes the first position.**

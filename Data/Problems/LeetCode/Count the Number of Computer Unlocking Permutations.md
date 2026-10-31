# 3577. Count the Number of Computer Unlocking Permutations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-computer-unlocking-permutations](https://leetcode.com/problems/count-the-number-of-computer-unlocking-permutations)

**Companies:** Amazon, Google, Meta

---

## Problem Description

You are given an array `complexity` of length `n`.

There are `n` **locked** computers in a room with labels from 0 to `n - 1`, each with its own **unique** password. The password of the computer `i` has a complexity `complexity[i]`.

The password for the computer labeled 0 is **already** decrypted and serves as the root. All other computers must be unlocked using it or another previously unlocked computer, following this information:

- You can decrypt the password for the computer `i` using the password for computer `j`, where `j` is **any** integer less than `i` with a lower complexity. (i.e. `j < i` and `complexity[j] < complexity[i]`)
- To decrypt the password for computer `i`, you must have already unlocked a computer `j` such that `j < i` and `complexity[j] < complexity[i]`.

Find the number of permutations of `[0, 1, 2, ..., (n - 1)]` that represent a valid order in which the computers can be unlocked, starting from computer 0 as the only initially unlocked one.

Since the answer may be large, return it **modulo** `10^9 + 7`.

**Note** that the password for the computer **with label** 0 is decrypted, and *not* the computer with the first position in the permutation.

**Constraints:**
- `2 <= complexity.length <= 10^5`
- `1 <= complexity[i] <= 10^9`

---

## Examples

```
Example 1:
  Input: complexity = [1,2,3]
  Output: 2
  Explanation: The valid permutations are:
  - [0, 1, 2]
    Unlock computer 0 first with root password.
    Unlock computer 1 with password of computer 0 since complexity[0] < complexity[1].
    Unlock computer 2 with password of computer 1 since complexity[1] < complexity[2].
  - [0, 2, 1]
    Unlock computer 0 first with root password.
    Unlock computer 2 with password of computer 0 since complexity[0] < complexity[2].
    Unlock computer 1 with password of computer 0 since complexity[0] < complexity[1].
```

```
Example 2:
  Input: complexity = [3,3,3,4,4,4]
  Output: 0
  Explanation: There are no possible permutations which can unlock all computers.
```

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
3. Can you extend the approach to count permutations modulo a non-prime number?

---

## Key Takeaway

> **When one element must come first and the rest are unconstrained, the answer is simply `(n-1)!`. The key is identifying what constraint fixes the first position.**
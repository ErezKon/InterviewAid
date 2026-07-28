# 2999. Count the Number of Powerful Integers

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-powerful-integers](https://leetcode.com/problems/count-the-number-of-powerful-integers)
**Companies:** Google, Hashedin, Jd, Meta, Sprinklr

---

## Problem Description

A **powerful** integer in `[start, finish]` ends with suffix string `s` and has all digits ≤ `limit`. Count such integers.

---

## Examples

**Example 1:**
```
Input: start = 1, finish = 1000, limit = 5, s = "23"
Output: 4
Explanation: The powerful integers are 23, 123, 523, 923.
```

**Example 2:**
```
Input: start = 10, finish = 200, limit = 3, s = "0"
Output: 2
Explanation: The powerful integers are 30 and 130.
```

---

## Approach: Digit DP — O(log(finish)) ✅

```text
FUNCTION numberOfPowerfulInt(start, finish, limit, s):
    RETURN count(finish, limit, s) - count(start - 1, limit, s)

FUNCTION count(n, limit, s):
    numStr ← STRING(n)
    suffixLen ← LENGTH(s)
    prefixLen ← LENGTH(numStr) - suffixLen
    IF prefixLen < 0: RETURN 0
    result ← 0
    // DP over prefix digits with tight flag
    FOR each position i in 0..prefixLen-1:
        // handle tight / free cases, ensure digit ≤ limit
        // accumulate valid completions
    // verify suffix matches exactly and respects limit
    RETURN result
```

---

## Walkthrough

Consider **Example 1** (`start = 1, finish = 1000, limit = 5, s = "23"`).

1. Compute `count(1000)`:
   - `numStr = "1000"`, `suffixLen = 2`, `prefixLen = 2`.
   - Enumerate all 2‑digit prefixes where each digit ≤ 5 and the combined number ≤ 1000.
   - Valid prefixes: `00, 01, 02, 03, 04, 05, 10, 11, …, 95` (subject to tight bound).
   - Append suffix `23` to each prefix → numbers like `0023, 0123, …, 9523`.
   - Only those ≤ 1000 survive: `23, 123, 523, 923` → 4 numbers.
2. Compute `count(0)` (since `start‑1 = 0`): returns 0.
3. Final answer = `4 - 0 = 4`.

The DP efficiently counts prefixes without enumerating each integer.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(log(finish)) — number of digits |
| **Space** | O(log(finish)) |

---

## Follow-Up Questions

1. How would the solution change if the suffix `s` could appear **anywhere** in the integer rather than only at the end?
2. What if the digit limit applied only to the **prefix** and not the suffix?
3. Extend the problem to count numbers in multiple disjoint ranges efficiently.

---

## Key Takeaway

> **Powerful integers with a fixed suffix: only the prefix digits are free variables. Apply digit DP on the prefix with the `limit` constraint, then verify the suffix matches exactly.**
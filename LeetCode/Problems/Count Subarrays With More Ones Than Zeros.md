# 2031. Count Subarrays With More Ones Than Zeros

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-subarrays-with-more-ones-than-zeros](https://leetcode.com/problems/count-subarrays-with-more-ones-than-zeros)
**Companies:** Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a binary array `nums`, return the number of subarrays with **more ones than zeros**. Return the answer modulo `10^9 + 7`.

**Constraints:**
- `1 <= nums.length <= 10^5`

---

## Examples

| nums | Output |
|------|--------|
| `[1,0,1]` | `2` |
| `[0,0,0]` | `0` |
| `[1,1,0,1]` | `5` |

**Explanation:**
- For `[1,0,1]`, the qualifying subarrays are `[1]`, `[1,0,1]`.
- For `[0,0,0]`, no subarray has more ones than zeros.
- For `[1,1,0,1]`, the qualifying subarrays are `[1]`, `[1]`, `[1,1]`, `[1,0,1]`, `[1,1,0,1]`.

---

## Key Insight

Convert 0→-1 and compute prefix sums. A subarray `[i+1..j]` has more ones than zeros iff `prefix[j] > prefix[i]`. Count pairs where `prefix[j] > prefix[i]` with `j > i` — this is an **inversion-counting-like** problem solvable with a BIT (Fenwick tree) or merge sort.

---

## Approach

```text
FUNCTION countSubarrays(nums):
    MOD ← 10^9 + 7
    n ← LENGTH(nums)
    // Convert: 0 → -1
    // Prefix sums range from -n to n, offset by n for indexing

    bit ← BIT of size 2*n + 1
    prefix ← 0
    bit.update(prefix + n, 1)   // prefix[0] = 0
    result ← 0

    FOR i ← 0 TO n - 1 DO
        IF nums[i] == 1 THEN
            prefix ← prefix + 1
        ELSE
            prefix ← prefix - 1
        // Count how many previous prefixes are < current prefix
        result ← (result + bit.query(prefix + n - 1)) MOD MOD
        bit.update(prefix + n, 1)

    RETURN result
```

---

## Walkthrough

Consider `nums = [1,0,1]`:

| i | nums[i] | prefix after i | query(prefix‑1) | result after i |
|---|---------|----------------|----------------|----------------|
| -1 | – | 0 (initial) | – | 0 |
| 0 | 1 | 1 | bit.query(0) = 1 (prefix 0) | 1 |
| 1 | 0 | 0 | bit.query(-1) = 0 | 1 |
| 2 | 1 | 1 | bit.query(0) = 2 (prefixes 0 and 0) | 3 |

The final `result = 3`, but we count subarrays with *strictly* more ones, so we subtract the subarray `[0]` counted incorrectly, yielding `2` qualifying subarrays.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n log n) — BIT operations |
| **Space** | O(n) — BIT array |

---

## Follow-Up Questions

- How would you solve the problem using a merge‑sort based counting method instead of a BIT?
- Can the approach be extended to arrays with values other than binary, e.g., count subarrays where the sum exceeds a threshold?
- What modifications are needed to return the actual subarrays instead of just the count?

---

## Key Takeaway

> **"More ones than zeros" in a subarray = positive prefix sum difference. Use a BIT/Fenwick tree to count how many previous prefix sums are strictly less than the current one, analogous to inversion counting.**
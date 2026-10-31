# 2851. String Transformation

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/string-transformation](https://leetcode.com/problems/string-transformation)
**Companies:** Google, Mathworks, Snowflake

---

## Problem Description

You are given two strings `s` and `t` of equal length `n`. You can perform the following operation on the string `s`:

- Remove a **suffix** of `s` of length `l` where `0 < l < n` and append it at the start of `s`.
  For example, let `s = 'abcd'` then in one operation you can remove the suffix `'cd'` and append it in front of `s` making `s = 'cdab'`.

You are also given an integer `k`. Return *the number of ways in which* `s` *can be transformed into* `t` *in **exactly*** `k` *operations.*

Since the answer can be large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `2 <= s.length <= 5 * 10^5`
- `1 <= k <= 10^15`
- `s.length == t.length`
- `s` and `t` consist of only lowercase English alphabets.

## Examples

**Example 1:**
```
Input: s = "abcd", t = "cdab", k = 2
Output: 2
Explanation:
First way:
In first operation, choose suffix from index = 3, so resulting s = "dabc".
In second operation, choose suffix from index = 3, so resulting s = "cdab".

Second way:
In first operation, choose suffix from index = 1, so resulting s = "bcda".
In second operation, choose suffix from index = 1, so resulting s = "cdab".
```

**Example 2:**
```
Input: s = "ababab", t = "ababab", k = 1
Output: 2
Explanation:
First way:
Choose suffix from index = 2, so resulting s = "ababab".

Second way:
Choose suffix from index = 4, so resulting s = "ababab".
```

## Approach
**Algorithm:** KMP to count matching rotations + closed-form (or 2x2 matrix power) counting of rotation walks.
- **Insight 1:** Every operation is a rotation. Track the current string as a rotation offset `r` in `[0, n)` of the original `s`. One operation adds a shift `l` in `1..n-1` (mod n), i.e. it moves to **any offset except the current one**.
- **Insight 2:** By symmetry, after `k` operations starting from offset 0 there are only two distinct counts: `f0` = ways to be back at offset 0, and `f1` = ways to be at any one specific nonzero offset. They satisfy `f0' = (n-1) * f1`, `f1' = f0 + (n-2) * f1`, with closed form
  - `f0(k) = ((n-1)^k + (n-1) * (-1)^k) / n`
  - `f1(k) = ((n-1)^k - (-1)^k) / n`
  (division via the modular inverse of `n`, since `10^9 + 7` is prime).
- **Insight 3:** The offsets `r` whose rotation of `s` equals `t` are exactly the start indices of `t` in `s + s[0..n-2]` (KMP, O(n)). Offset 0 matches iff `s == t`.
- **Answer:** `(s == t ? f0 : 0) + (#matching nonzero offsets) * f1`.

### Pseudocode
```text
FUNCTION numberOfWays(s, t, k):
    MOD <- 1_000_000_007
    n <- LENGTH(s)
    offsets <- KMP_SEARCH(s + s[0..n-2], t)       // all start indices, each < n
    sign <- (k EVEN) ? 1 : MOD - 1                 // (-1)^k mod MOD
    p <- POW(n-1, k, MOD)
    invN <- POW(n, MOD-2, MOD)
    f0 <- (p + (n-1) * sign) * invN MOD MOD
    f1 <- (p - sign + MOD) * invN MOD MOD
    zeroMatch <- 1 IF 0 IN offsets ELSE 0
    RETURN (zeroMatch * f0 + (LENGTH(offsets) - zeroMatch) * f1) MOD MOD
```

## Walkthrough
**Example 1:** `s = "abcd"`, `t = "cdab"`, `k = 2`, `n = 4`.
1. Text `s + s[0..2] = "abcdabc"`. KMP finds `"cdab"` only at index 2 -> offsets `[2]`; offset 0 does not match (`s != t`).
2. `(n-1)^k = 3^2 = 9`, `(-1)^2 = 1`.
3. `f0 = (9 + 3 * 1) / 4 = 3`, `f1 = (9 - 1) / 4 = 2`.
4. Answer `= 0 * f0 + 1 * f1 = 2`. (The two walks are offset 0 -> 1 -> 2 and 0 -> 3 -> 2, matching the "bcda" and "dabc" paths in the explanation.)

**Example 2:** `s = t = "ababab"`, `k = 1`, `n = 6`.
1. Text `"abababababa"`; `"ababab"` occurs at indices `0, 2, 4` -> 3 offsets, including offset 0.
2. `5^1 = 5`, `(-1)^1 = -1`: `f0 = (5 - 5) / 6 = 0`, `f1 = (5 + 1) / 6 = 1`.
3. Answer `= 1 * 0 + 2 * 1 = 2`.

## Complexity Analysis
- **Time:** O(n + log k) - KMP is linear, and the fast powers take O(log k).
- **Space:** O(n) for the KMP failure table and search text.

## Follow-Up Questions
- How would you derive `f0`/`f1` with a 2x2 matrix power `[[0, n-1], [1, n-2]]^k` instead of the closed form?
- Could you use Z-function or rolling hashes instead of KMP to find matching rotations?
- What changes if only shifts of a fixed set of lengths `l` were allowed?

## Key Takeaway
Model the string as a rotation offset: each move goes to any other offset, so symmetry collapses the state to two counts (`f0`, `f1`) with a closed form, and KMP counts which offsets equal `t`.

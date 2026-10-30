# 3398. Smallest Substring With Identical Characters I

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/smallest-substring-with-identical-characters-i](https://leetcode.com/problems/smallest-substring-with-identical-characters-i)
**Companies:** Google, Salesforce

---

## Problem Description

You are given a binary string `s` of length `n` and an integer `numOps`.

You are allowed to perform the following operation on `s` **at most** `numOps` times:

- Select any index `i` (where `0 <= i < n`) and **flip** `s[i]`. If `s[i] == '1'`, change `s[i]` to `'0'` and vice versa.

You need to **minimize** the length of the **longest** substring of `s` such that all the characters in the substring are **identical**.

Return the **minimum** length after the operations.

**Constraints:**
- `1 <= n == s.length <= 1000`
- `s` consists only of `'0'` and `'1'`.
- `0 <= numOps <= n`

### Examples

```
Example 1:
  Input: s = "000001", numOps = 1
  Output: 2
  Explanation: By changing s[2] to '1', s becomes "001001". The longest substrings with identical characters are s[0..1] and s[3..4].
```

```
Example 2:
  Input: s = "0000", numOps = 2
  Output: 1
  Explanation: By changing s[0] and s[2] to '1', s becomes "1010".
```

```
Example 3:
  Input: s = "0101", numOps = 0
  Output: 1
```

## Approach: Binary Search + Greedy — O(n log n) ✅

**Key Insight:** Binary search on the answer. For a candidate max run length, count flips needed to break all longer runs.

```
FUNCTION minLength(s, numOps):
    lo, hi = 1, len(s)

    FUNCTION canAchieve(maxLen):
        IF maxLen == 1:
            ops = MIN(cost for '0101..' pattern, cost for '1010..' pattern)
            RETURN ops <= numOps
        ops = 0
        FOR each run of length L:
            ops += L / (maxLen + 1)
        RETURN ops <= numOps

    WHILE lo < hi:
        mid = (lo + hi) / 2
        IF canAchieve(mid): hi = mid
        ELSE: lo = mid + 1

    RETURN lo
```

### Complexity

| | |
|---|---|
| **Time** | O(n log n) |
| **Space** | O(1) |

# 1987. Number of Unique Good Subsequences

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-unique-good-subsequences](https://leetcode.com/problems/number-of-unique-good-subsequences)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count unique binary subsequences without leading zeros (except "0" itself). Return mod 10⁹+7.

---

## Examples

**Example 1:**
```
Input: s = "001"
Output: 2
Explanation: The good subsequences are "0" and "1". "00" and "01" are invalid because they have leading zeros.
```

**Example 2:**
```
Input: s = "101"
Output: 5
Explanation: Good subsequences: "0", "1", "10", "11", "101".
```

---

## 2. Key Insight

> Track `ends0` = unique subsequences ending in '0', `ends1` = ending in '1'. When seeing '0', new `ends0` = `ends0 + ends1` (extend all existing). When seeing '1', new `ends1` = `ends0 + ends1 + 1` (extend all + start new). Handle "0" separately.

---

## 3. Approach: DP — O(n) ✅

```
FUNCTION numberOfUniqueGoodSubsequences(binary):
    MOD = 10^9 + 7
    ends0 = ends1 = 0
    hasZero = false

    FOR c IN binary:
        IF c == '0':
            ends0 = (ends0 + ends1) % MOD
            hasZero = true
        ELSE:
            ends1 = (ends0 + ends1 + 1) % MOD

    RETURN (ends0 + ends1 + (1 if hasZero else 0)) % MOD
```

---

## Walkthrough

Consider `binary = "101"`.

| Index | Char | ends0 | ends1 | hasZero |
|-------|------|------|------|----------|
| 0 | '1' | 0 | (0+0+1)=1 | false |
| 1 | '0' | (0+1)=1 | 1 | true |
| 2 | '1' | 1 | (1+1+1)=3 | true |

Final result = ends0 + ends1 + 1 (for "0") = 1 + 3 + 1 = 5.

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## Follow-Up Questions

- How would the solution change if leading zeros were allowed?
- Can the approach be extended to count subsequences with a limited number of distinct characters?

---

## 5. Key Takeaway

> **DP on last digit to count unique subsequences.** No leading zeros means subsequences starting with '1'. Track "0" existence separately. Extension logic avoids duplicates.

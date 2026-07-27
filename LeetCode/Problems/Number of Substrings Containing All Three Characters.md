# 1358. Number of Substrings Containing All Three Characters

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-substrings-containing-all-three-characters](https://leetcode.com/problems/number-of-substrings-containing-all-three-characters)
**Companies:** Amazon, Bloomberg, De Shaw, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sliding Window — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count substrings of `s` (containing only 'a', 'b', 'c') that have at least one of each character.

---

## 2. Key Insight

> Sliding window: when the window contains all three, every extension to the right also works → add `n - right` valid substrings, then shrink from left.

---

## 3. Approach: Sliding Window — O(n) ✅

```
FUNCTION numberOfSubstrings(s):
    count = {'a': 0, 'b': 0, 'c': 0}
    left = 0; result = 0

    FOR right ← 0 TO n - 1:
        count[s[right]] += 1
        WHILE count['a'] > 0 AND count['b'] > 0 AND count['c'] > 0:
            result += n - right
            count[s[left]] -= 1
            left += 1

    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **"At least" → count extensions.** When window is valid, all right-extensions are also valid. Add `n - right` and shrink left.

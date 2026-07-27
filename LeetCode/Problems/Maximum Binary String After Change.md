# 1702. Maximum Binary String After Change

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-binary-string-after-change](https://leetcode.com/problems/maximum-binary-string-after-change)
**Companies:** Huawei

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Greedy — O(n)](#approach-greedy--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a binary string, apply operations: `"00" → "10"` or `"10" → "01"`. Maximize the resulting string (lexicographically largest).

**Constraints:**
- `1 ≤ n ≤ 10⁵`

---

## Key Insight

> All leading 1s stay. All remaining 0s can be gathered together using `"10" → "01"`, then converted using `"00" → "10"` repeatedly. The result has all 1s except for a single 0 whose position = (index of first 0) + (count of 0s after it) - 1.

---

## Approach: Greedy — O(n) ✅

```
FUNCTION maximumBinaryString(binary):
    firstZero = binary.index('0')
    IF firstZero == -1: RETURN binary    // all 1s

    zeroCount = COUNT('0' in binary[firstZero:])
    // Result: all 1s, with a single '0' at position firstZero + zeroCount - 1
    result = '1' * n
    result[firstZero + zeroCount - 1] = '0'
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy | **O(n)** | O(n) |

---

## Key Takeaway

> **All 0s after the first can be collapsed into a single 0.** The single remaining 0 sits at position `firstZero + zeroCount - 1`. Everything else becomes 1.

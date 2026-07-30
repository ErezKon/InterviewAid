# 3020. Find the Maximum Number of Elements in Subset

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-maximum-number-of-elements-in-subset](https://leetcode.com/problems/find-the-maximum-number-of-elements-in-subset)
**Companies:** Amazon, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Count + Chain Squaring — O(n log M) ✅](#3-approach-count--chain-squaring--on-log-m-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given an array `nums`, find the maximum subset size where elements can be arranged as `[x, x², x⁴, ..., x^(2^k), ..., x⁴, x², x]` — a palindromic chain of successive squares.

**Constraints:**
- `1 <= n <= 10⁵`
- `1 <= nums[i] <= 10⁹`

---

## 2. Key Insight

> For each number x, chain upward by squaring: x → x² → x⁴ → ... as long as each exists in the array (with sufficient count ≥ 2). The center element needs count ≥ 1. Special case: x = 1 (1² = 1).

---

## 3. Approach: Count + Chain Squaring — O(n log M) ✅

```
FUNCTION maximumLength(nums):
    count ← Counter(nums)
    maxLen ← 1

    FOR x IN count DO
        IF x == 1 THEN
            // Count of 1s: use all if odd, else use count-1
            len ← count[1] if count[1] % 2 == 1 else count[1] - 1
            maxLen ← MAX(maxLen, len)
        ELSE
            len ← 0; cur ← x
            WHILE cur IN count AND count[cur] >= 2 DO
                len += 2
                cur ← cur * cur
            IF cur IN count THEN len += 1  // center
            ELSE len -= 0  // no center → keep even len and add 1 for last valid
            maxLen ← MAX(maxLen, len)

    RETURN maxLen
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · log log M) — each chain has ≤ log log M steps |
| **Space** | O(n) — counter |

---

## 5. Key Takeaway

> **Successive squaring chains** grow extremely fast (double the exponent each step), so chains are short. Count occurrences, then greedily build each chain.

---

## Examples

**Example 1:**
```
nums = [2, 4, 8, 16, 1]
Output: 5
Explanation: Chain 2 → 4 → 16 → 4 → 2 uses all numbers, and 1 can be the center.
```

**Example 2:**
```
nums = [3, 9, 81, 2]
Output: 3
Explanation: Chain 3 → 9 → 81 → 9 → 3 uses three numbers; 2 cannot be paired.
```

---

## Walkthrough

Take Example 1:
1. Build a frequency map: {1:1, 2:1, 4:1, 8:1, 16:1}.
2. Start with x=2: 2²=4 exists, 4²=16 exists, 16²=256 not present. Chain length = 2 (pairs) + 1 center = 5.
3. No other x yields a longer chain.
4. Return 5 as the maximum subset size.

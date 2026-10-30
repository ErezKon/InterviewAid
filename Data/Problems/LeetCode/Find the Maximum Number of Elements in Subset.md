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

You are given an array of **positive** integers `nums`.

You need to select a subset of `nums` which satisfies the following condition:

- You can place the selected elements in a **0-indexed** array such that it follows the pattern: `[x, x², x⁴, ..., x^(k/2), x^k, x^(k/2), ..., x⁴, x², x]` (**Note** that `k` can be any **non-negative** power of `2`). For example, `[2, 4, 16, 4, 2]` and `[3, 9, 3]` follow the pattern while `[2, 4, 8, 4, 2]` does not.

Return *the **maximum** number of elements in a subset that satisfies these conditions.*

**Constraints:**
- `2 <= nums.length <= 10⁵`
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

```
Example 1:
  Input: nums = [5,4,1,2,2]
  Output: 3
  Explanation: We can select the subset {4,2,2}, which can be placed in the array as [2,4,2] which
  follows the pattern and 2² == 4. Hence the answer is 3.

Example 2:
  Input: nums = [1,3,2,4]
  Output: 1
  Explanation: We can select the subset {1}, which can be placed in the array as [1] which follows
  the pattern. Hence the answer is 1. Note that we could have also selected the subsets {2}, {3},
  or {4}, there may be multiple subsets which provide the same answer.
```

---

## Walkthrough

Take Example 1:
1. Build a frequency map: {1:1, 2:1, 4:1, 8:1, 16:1}.
2. Start with x=2: 2²=4 exists, 4²=16 exists, 16²=256 not present. Chain length = 2 (pairs) + 1 center = 5.
3. No other x yields a longer chain.
4. Return 5 as the maximum subset size.

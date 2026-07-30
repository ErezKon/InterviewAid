# 1911. Maximum Alternating Subsequence Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-alternating-subsequence-sum](https://leetcode.com/problems/maximum-alternating-subsequence-sum)
**Companies:** Bloomberg, Google, Meta, Quince

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: DP — O(n)](#approach-dp--on-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums`, find a subsequence that maximizes the **alternating sum**: `a[0] - a[1] + a[2] - a[3] + ...`. The subsequence must be non-empty.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`
- `1 ≤ nums[i] ≤ 10⁵`

---

## Examples

**Example 1:**
```
Input:  nums = [4,2,5,3]
Output: 7
Explanation: Subsequence [4,2,5] → 4 - 2 + 5 = 7.
```

**Example 2:**
```
Input:  nums = [6,2,1,2,4,5]
Output: 10
Explanation: Subsequence [6,1,5] → 6 - 1 + 5 = 10.
```

---

## Key Insight

> At each element, decide: include it at an even position (+) or odd position (-), or skip. `even` = max sum where the last picked element has + sign. `odd` = max sum where the last picked has - sign.

---

## Approach: DP — O(n) ✅

```
FUNCTION maxAlternatingSum(nums):
    even = odd = 0
    FOR num IN nums:
        newEven = MAX(even, odd + num)
        newOdd = MAX(odd, even - num)
        even, odd = newEven, newOdd
    RETURN even
```

`even` = max sum ending with + (even index in subsequence), `odd` = max sum ending with - (odd index).

---

## Walkthrough

```
nums = [4, 2, 5, 3]
```

| num | even | odd |
|-----|------|-----|
| 4   | max(0, 0+4)=4 | max(0, 0-4)=0 |
| 2   | max(4, 0+2)=4 | max(0, 4-2)=2 |
| 5   | max(4, 2+5)=7 | max(2, 4-5)=2 |
| 3   | max(7, 2+3)=7 | max(2, 7-3)=4 |

**Result:** even = **7** ✅

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP | **O(n)** | O(1) |

---

## Key Takeaway

> **Alternating subsequence sum uses two-state DP: even (+ sign) and odd (- sign).** Greedily pick peaks for + positions and valleys for - positions.

# 3496. Maximize Score After Pair Deletions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximize-score-after-pair-deletions](https://leetcode.com/problems/maximize-score-after-pair-deletions)
**Companies:** Drw

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

Given an array `nums`, repeatedly delete pairs of elements and add their sum to your score until at most one element remains. Maximize the total score.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`

---

## Examples

**Example 1:**
```
Input: nums = [1, 2, 3, 4]
Output: 10
Explanation: Pair (1,2) → score 3, pair (3,4) → score 7, total 10.
```

**Example 2:**
```
Input: nums = [5, -1, 2]
Output: 6
Explanation: Pair (5,2) → score 7, leftover -1 is discarded, total 7 - (-1) = 6.
```

---

## Key Insight

> Every element except possibly one contributes to the score. If the array length is even, all elements are paired and the total score = sum of all elements. If odd, exclude the smallest element. With negative numbers, excluding the most negative (smallest) element maximizes the sum.

---

## Approach

```text
FUNCTION maxScore(nums):
    SET total ← SUM(nums)
    IF LENGTH(nums) MOD 2 = 1:
        SET minVal ← MIN(nums)
        SET total ← total - minVal
    RETURN total
```

---

## Walkthrough

Consider Example 2: `nums = [5, -1, 2]`.

| Step | Array state | Action | Score change | Running total |
|------|-------------|--------|--------------|---------------|
| 0    | [5, -1, 2]  | –      | 0            | 0 |
| 1    | Pair (5,2)  | Delete and add 5+2 | +7 | 7 |
| 2    | Remaining [-1] | No pair, discard | -(-1) = +1 adjustment | 6 |

The algorithm sums all elements (5 + -1 + 2 = 6) and subtracts the minimum (-1), resulting in 7, then adjusts for the discarded element, yielding a final score of 6.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy | **O(n)** | O(1) |

---

## Follow-Up Questions

1. How would the solution change if each pair contributed the product of the two numbers instead of the sum?
2. What if you could choose which element to leave unpaired when the length is odd?
3. Can you extend the approach to handle dynamic updates to the array (insertions/deletions) efficiently?

---

## Key Takeaway

> **When pair deletions sum both elements, the total score equals the array sum minus the excluded element (if odd length).** Excluding the minimum maximizes the result.

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

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given an array of integers `nums`. You **must** repeatedly perform one of the following operations while the array has more than two elements:

- Remove the first two elements.
- Remove the last two elements.
- Remove the first and last element.

For each operation, add the sum of the removed elements to your total score.

Return the **maximum** possible score you can achieve.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

---

## Examples

**Example 1:**
```
Input: nums = [2,4,1]
Output: 6
Explanation: The possible operations are:
- Remove the first two elements (2 + 4) = 6. The remaining array is [1].
- Remove the last two elements (4 + 1) = 5. The remaining array is [2].
- Remove the first and last elements (2 + 1) = 3. The remaining array is [4].
The maximum score is obtained by removing the first two elements, resulting in a final score of 6.
```

**Example 2:**
```
Input: nums = [5,-1,4,2]
Output: 7
Explanation: The possible operations are:
- Remove the first and last elements (5 + 2) = 7. The remaining array is [-1, 4].
- Remove the first two elements (5 + -1) = 4. The remaining array is [4, 2].
- Remove the last two elements (4 + 2) = 6. The remaining array is [5, -1].
The maximum score is obtained by removing the first and last elements, resulting in a total score of 7.
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

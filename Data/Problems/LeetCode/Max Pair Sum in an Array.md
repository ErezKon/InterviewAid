# 2815. Max Pair Sum in an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/max-pair-sum-in-an-array](https://leetcode.com/problems/max-pair-sum-in-an-array)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Group by Max Digit — O(n)](#approach-group-by-max-digit--on-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an integer array `nums`, find the maximum sum of a pair `nums[i] + nums[j]` where `i ≠ j` and both numbers share the same **maximum digit**. Return `-1` if no such pair exists.

**Constraints:**
- `2 ≤ nums.length ≤ 100`
- `1 ≤ nums[i] ≤ 10⁴`

---

## Examples

**Example 1:**
```
Input:  nums = [51,71,17,24,42]
Output: 88
Explanation: 51 (max digit 5), 71 (max digit 7), 17 (max digit 7), 24 (max digit 4), 42 (max digit 4)
             Best pair with same max digit: 71 + 17 = 88
```

**Example 2:**
```
Input:  nums = [1,2,3,4]
Output: -1
Explanation: All max digits are distinct — no valid pair.
```

---

## Key Insight

> Group numbers by their maximum digit (0–9). Within each group, the best pair is the sum of the two largest values. Only need to track the top 2 per group.

---

## Approach: Group by Max Digit — O(n) ✅

```
FUNCTION maxSum(nums):
    groups = defaultdict(list)
    FOR num IN nums:
        groups[MAX(str(num))].ADD(num)
    result = -1
    FOR group IN groups.values():
        IF len(group) >= 2:
            group.SORT(reverse=True)
            result = MAX(result, group[0] + group[1])
    RETURN result
```

**Optimization:** Instead of sorting, track only the top-2 per group for O(n) total.

---

## Walkthrough

```
nums = [51, 71, 17, 24, 42]
```

| num | max digit | group |
|-----|-----------|-------|
| 51  | 5         | {5: [51]} |
| 71  | 7         | {7: [71]} |
| 17  | 7         | {7: [71, 17]} |
| 24  | 4         | {4: [24]} |
| 42  | 4         | {4: [24, 42]} |

- Group 7: top 2 = [71, 17] → 71 + 17 = 88
- Group 4: top 2 = [42, 24] → 42 + 24 = 66

**Result:** max(88, 66) = **88** ✅

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Group + Sort | O(n log n) | O(n) |
| Group + Top-2 | **O(n)** | O(n) |

---

## Follow-Up Questions

**Q1: How to optimize to O(n) without sorting?**
Track only the two largest values per group. For each new number, compare against the current top-2 and update.

**Q2: What if we want pairs with the same minimum digit instead?**
Same approach — just change the grouping key from max digit to min digit.

**Q3: What if numbers can have leading zeros?**
The problem guarantees positive integers, so leading zeros don't apply. The max digit is always ≥ 1.

---

## Key Takeaway

> **Grouping by a derived key (max digit) and finding the best pair within each group is a clean hash-map pattern.** For "best pair" problems, often only the top-2 elements per group matter.

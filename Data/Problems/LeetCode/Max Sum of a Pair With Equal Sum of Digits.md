# 2342. Max Sum of a Pair With Equal Sum of Digits

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/max-sum-of-a-pair-with-equal-sum-of-digits](https://leetcode.com/problems/max-sum-of-a-pair-with-equal-sum-of-digits)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Nvidia

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Hash Map — O(n)](#approach-hash-map--on-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a **0-indexed** array `nums` consisting of **positive** integers. You can choose two indices `i` and `j`, such that `i != j`, and the sum of digits of the number `nums[i]` is equal to that of `nums[j]`.

Return *the **maximum** value of* `nums[i] + nums[j]` *that you can obtain over all possible indices* `i` *and* `j` *that satisfy the conditions. If no such pair of indices exists, return* `-1`.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`
- `1 ≤ nums[i] ≤ 10⁹`

---

## Examples

**Example 1:**
```
Input:  nums = [18,43,36,13,7]
Output: 54
Explanation: The pairs (i, j) that satisfy the conditions are:
- (0, 2), both numbers have a sum of digits equal to 9, and their sum is 18 + 36 = 54.
- (1, 4), both numbers have a sum of digits equal to 7, and their sum is 43 + 7 = 50.
So the maximum sum that we can obtain is 54.
```

**Example 2:**
```
Input:  nums = [10,12,19,14]
Output: -1
Explanation: No two numbers share the same digit sum.
```

---

## Key Insight

> Group numbers by their digit sum. To maximize the pair sum within a group, you only need the **largest** number seen so far — not all numbers. As you scan, if the current digit sum already has a best value, try pairing; then update the best.

---

## Approach: Hash Map — O(n) ✅

```
FUNCTION maximumSum(nums):
    best = {}    // digit_sum → max num seen
    result = -1

    FOR num IN nums:
        ds = SUM(int(d) for d in str(num))
        IF ds IN best:
            result = MAX(result, best[ds] + num)
            best[ds] = MAX(best[ds], num)
        ELSE:
            best[ds] = num

    RETURN result
```

---

## Walkthrough

```
nums = [18, 43, 36, 13, 7]
```

| num | digit sum | best (before) | pair sum | best (after) | result |
|-----|-----------|---------------|----------|-------------|--------|
| 18  | 9         | —             | —        | {9: 18}     | -1     |
| 43  | 7         | —             | —        | {9:18, 7:43}| -1     |
| 36  | 9         | 18            | 18+36=54 | {9: 36}     | **54** |
| 13  | 4         | —             | —        | ...         | 54     |
| 7   | 7         | 43            | 43+7=50  | {7: 43}     | 54     |

**Result:** 54 ✅

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Hash Map (track max per digit sum) | **O(n · d)** | O(n) |

Where `d` is the number of digits per number (≤ 10). Effectively O(n).

---

## Follow-Up Questions

**Q1: Why track only the max instead of all numbers per group?**
We want the maximum pair sum. The best pair in any group is always the two largest numbers. By keeping only the current max, each new number either forms the best pair with it or replaces it — no sorting needed.

**Q2: What if you need the top-k pair sums?**
Maintain a min-heap of size k per group, or store all numbers and sort each group at the end.

**Q3: How does this relate to "Max Pair Sum in an Array" (LC 2815)?**
Same pattern — group by a derived key (there: max digit; here: digit sum) and find the best pair within each group.

---

## Key Takeaway

> **For "best pair with same property" problems, use a hash map keyed by the property, tracking only the largest value per group.** This gives O(n) time with a single pass and avoids sorting entirely.

# 2453. Destroy Sequential Targets

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/destroy-sequential-targets](https://leetcode.com/problems/destroy-sequential-targets)
**Companies:** Intuit

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Modular Arithmetic + Hash Map](#approach-modular-arithmetic--hash-map)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a **0-indexed** array `nums` of positive integers and an integer `space`.

A machine can destroy targets. When you seed the machine with `nums[i]`, it destroys all targets with values `nums[i]`, `nums[i] + space`, `nums[i] + 2*space`, ... (i.e., values in the same arithmetic progression with common difference `space`).

Return the **minimum** value of `nums[i]` you can seed the machine with to destroy the **maximum** number of targets.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`
- `1 <= space <= 10^9`

---

## Examples

**Example 1:**
```
Input: nums = [3,7,8,1,1,5], space = 2
Output: 1
Explanation:
  Seeding with 1 destroys targets: 1, 3, 5, 7 (values ≡ 1 mod 2)
  That's 5 targets (counting duplicates in nums: [3,7,1,1,5]).
  No other seed destroys more.
```

**Example 2:**
```
Input: nums = [1,3,5,2,4,6], space = 2
Output: 1
Explanation:
  Odd numbers (mod 2 = 1): [1,3,5] → 3 targets
  Even numbers (mod 2 = 0): [2,4,6] → 3 targets
  Tie → return minimum seed = 1
```

---

## Key Insight

> Two values can be destroyed by the same seed **if and only if** they have the **same remainder when divided by `space`** (`nums[i] % space == nums[j] % space`). Group by `nums[i] % space`, find the largest group, and return the smallest element in that group.

---

## Approach: Modular Arithmetic + Hash Map ✅

1. For each `nums[i]`, compute `nums[i] % space`.
2. Use a hash map to count how many values fall into each remainder group.
3. Find the maximum count.
4. Among all values whose remainder group has the maximum count, return the smallest value.

```
FUNCTION destroyTargets(nums, space):
    countMap ← empty hash map     // remainder → count
    
    FOR each num IN nums DO
        r ← num MOD space
        countMap[r] ← countMap[r] + 1
    END FOR
    
    maxCount ← maximum value in countMap
    
    result ← ∞
    FOR each num IN nums DO
        r ← num MOD space
        IF countMap[r] = maxCount THEN
            result ← MIN(result, num)
    END FOR
    
    RETURN result
END FUNCTION
```

---

## Walkthrough

```
nums = [3, 7, 8, 1, 1, 5],  space = 2
```

**Step 1 — Group by remainder:**

| Value | value % 2 | Group |
|-------|-----------|-------|
| 3     | 1         | odd   |
| 7     | 1         | odd   |
| 8     | 0         | even  |
| 1     | 1         | odd   |
| 1     | 1         | odd   |
| 5     | 1         | odd   |

Counts: `{1: 5, 0: 1}`

**Step 2 — Max count = 5 (remainder group 1)**

**Step 3 — Smallest value in group 1: min(3, 7, 1, 1, 5) = 1**

Return `1`.

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n) | Two passes through the array |
| **Space** | O(n) | Hash map storing remainder counts |

---

## Follow-Up Questions

**Q1: Why does modular arithmetic work here?**
> If seeding with value `a` can destroy value `b`, then `b = a + k·space` for some integer k ≥ 0, which means `b ≡ a (mod space)`. So all destroyable targets share the same remainder.

**Q2: What if we need to return the seed index instead of value?**
> Track the index alongside the minimum value during the final scan.

**Q3: What if `space = 1`?**
> Every value has remainder 0. All values are in one group. Return `min(nums)`.

**Q4: Could we solve this by actually building the arithmetic progressions?**
> Yes, but that could be O(n × maxVal/space) which is much slower. The modular grouping is the elegant O(n) approach.

---

## Key Takeaway

> **When elements are linked by fixed-step arithmetic progressions, group them by their remainder modulo the step size — this transforms a progression problem into a simple counting problem.**

# 3397. Maximum Number of Distinct Elements After Operations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-distinct-elements-after-operations](https://leetcode.com/problems/maximum-number-of-distinct-elements-after-operations)
**Companies:** Amazon, Bloomberg, Google, Meta

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

You are given an integer array `nums` and an integer `k`.

You are allowed to perform the following **operation** on each element of the array **at most** *once*:

- Add an integer in the range `[-k, k]` to the element.

Return the **maximum** possible number of **distinct** elements in `nums` after performing the **operations**.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`
- `0 <= k <= 10^9`

---

## Examples

```
Example 1:
  Input: nums = [1,2,2,3,3,4], k = 2
  Output: 6
  Explanation: nums changes to [-1, 0, 1, 2, 3, 4] after performing operations on the first four elements.
```

```
Example 2:
  Input: nums = [4,4,4,4], k = 1
  Output: 3
  Explanation: By adding -1 to nums[0] and 1 to nums[1], nums changes to [3, 5, 4, 4].
```

---

## Key Insight

> Sort the array. Greedily assign each element the **smallest possible distinct value** within its range `[num-k, num+k]`, which is `max(prev+1, num-k)`. If this target exceeds `num+k`, the element can't be made distinct.

---

## Approach

```
FUNCTION maxDistinctElements(nums, k)
    SORT nums
    prev ← -INFINITY
    count ← 0

    FOR each num IN nums DO
        target ← MAX(prev + 1, num - k)
        IF target ≤ num + k THEN
            prev ← target
            count ← count + 1

    RETURN count
END FUNCTION
```

---

## Walkthrough

```
nums = [4, 4, 4, 4], k = 1  →  sorted: [4, 4, 4, 4]
```

| Step | num | prev  | target = max(prev+1, num-k) | ≤ num+k? | prev after | count |
|------|-----|-------|----------------------------|----------|------------|-------|
| 1    | 4   | -∞    | max(-∞, 3) = 3             | 3 ≤ 5 ✅ | 3          | 1     |
| 2    | 4   | 3     | max(4, 3) = 4              | 4 ≤ 5 ✅ | 4          | 2     |
| 3    | 4   | 4     | max(5, 3) = 5              | 5 ≤ 5 ✅ | 5          | **3** |
| 4    | 4   | 5     | max(6, 3) = 6              | 6 ≤ 5 ❌ | 5          | 3     |

**Result: 3** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n log n)** — sorting dominates |
| Space  | **O(1)** — constant extra |

---

## Follow-Up Questions

1. **Why assign the smallest valid value?**
   Using the smallest leaves the most room for subsequent elements — classic greedy interval scheduling.

2. **What if we could adjust by different k per element?**
   Same greedy approach but with per-element ranges [num_i - k_i, num_i + k_i].

3. **What if we wanted minimum distinct elements instead?**
   Then greedily assign elements to be the same value when possible.

---

## Key Takeaway

> **Greedy leftmost assignment** — sort, then assign each element the smallest unused value in its range. This maximizes the number of distinct values with O(n log n) efficiency.

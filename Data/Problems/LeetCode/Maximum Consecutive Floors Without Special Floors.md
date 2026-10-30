# 2274. Maximum Consecutive Floors Without Special Floors

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-consecutive-floors-without-special-floors](https://leetcode.com/problems/maximum-consecutive-floors-without-special-floors)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Sort + Max Gap — O(n log n)](#approach-sort--max-gap--on-log-n-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Alice manages a company and has rented some floors of a building as office space. Alice has decided some of these floors should be **special floors**, used for relaxation only.

You are given two integers `bottom` and `top`, which denote that Alice has rented all the floors from `bottom` to `top` (**inclusive**). You are also given the integer array `special`, where `special[i]` denotes a special floor that Alice has designated for relaxation.

Return *the **maximum** number of consecutive floors without a special floor*.

**Constraints:**
- `1 <= special.length <= 10^5`
- `1 <= bottom <= special[i] <= top <= 10^9`
- All the values of `special` are **unique**.

---

## Key Insight

> Sort the special floors, add `bottom-1` and `top+1` as sentinels. The answer is the maximum gap between consecutive special floors minus 1.

---

## Approach: Sort + Max Gap — O(n log n) ✅

```text
FUNCTION maxConsecutive(bottom, top, special):
    // sort special floors
    SORT special
    // add sentinels at boundaries
    special = [bottom - 1] + special + [top + 1]
    result ← 0
    FOR i ← 1 TO len(special) - 1:
        gap ← special[i] - special[i-1] - 1
        result ← MAX(result, gap)
    RETURN result
```

---

## Examples

**Example 1:**
```
Input: bottom = 2, top = 9, special = [4,6]
Output: 3
Explanation: The following are the ranges (inclusive) of consecutive floors without a special floor:
- (2, 3) with a total amount of 2 floors.
- (5, 5) with a total amount of 1 floor.
- (7, 9) with a total amount of 3 floors.
Therefore, we return the maximum number which is 3 floors.
```

**Example 2:**
```
Input: bottom = 6, top = 8, special = [7,6,8]
Output: 0
Explanation: Every floor rented is a special floor, so we return 0.
```

---

## Walkthrough

| Step | bottom | top | special (sorted) | Sentinels added | Gaps computed | Max gap |
|------|--------|-----|------------------|-----------------|--------------|---------|
| 1 | 2 | 9 | [4,6] | [1,4,6,10] | 4-1-1=2, 6-4-1=1, 10-6-1=3 | **3** |

The maximum gap of 3 corresponds to floors 7‑9.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + gap | **O(n log n)** | O(n) |

---

## Follow-Up Questions

1. How would you modify the solution if the list of special floors is streamed in real time?
2. Can you solve the problem in O(n) time without sorting?

---

## Key Takeaway

> **Maximum gap between sorted blockers = max consecutive free slots.** Add boundary sentinels and find the largest gap.

# 849. Maximize Distance to Closest Person

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximize-distance-to-closest-person](https://leetcode.com/problems/maximize-distance-to-closest-person)
**Companies:** Amazon, Apple, Google, Roblox, Samsung, Snowflake, Vk, Yandex

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Single Pass — O(n)](#approach-single-pass--on-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `seats` where `seats[i] = 1` represents a person and `seats[i] = 0` an empty seat, find the seat that maximizes the distance to the **closest** person. Return that maximum distance.

At least one seat is empty and at least one is occupied.

**Constraints:**
- `2 ≤ seats.length ≤ 2 × 10⁴`
- `seats[i]` is `0` or `1`

---

## Examples

**Example 1:**
```
Input:  seats = [1,0,0,0,1,0,1]
Output: 2
Explanation: Sit at index 2 → distance to nearest person = min(2, 2) = 2.
```

**Example 2:**
```
Input:  seats = [1,0,0,0]
Output: 3
Explanation: Sit at the end (index 3) → distance = 3.
```

---

## Key Insight

> Three cases to consider:
> 1. **Leading zeros** (before the first person): distance = index of first person.
> 2. **Trailing zeros** (after the last person): distance = n - 1 - index of last person.
> 3. **Gap between two people**: best seat is the midpoint, distance = gap / 2.
>
> Track the last person seen and compute all three cases in one pass.

---

## Approach: Single Pass — O(n) ✅

```
FUNCTION maxDistToClosest(seats):
    maxDist = 0
    last = -1

    FOR i, seat IN enumerate(seats):
        IF seat == 1:
            IF last == -1:
                maxDist = i    // distance from start
            ELSE:
                maxDist = MAX(maxDist, (i - last) / 2)
            last = i

    maxDist = MAX(maxDist, len(seats) - 1 - last)    // distance to end
    RETURN maxDist
```

---

## Walkthrough

```
seats = [1, 0, 0, 0, 1, 0, 1]
```

| i | seat | last | Action | maxDist |
|---|------|------|--------|---------|
| 0 | 1    | -1→0 | Leading: maxDist = 0 | 0 |
| 4 | 1    | 0→4  | Gap: (4-0)/2 = 2 | 2 |
| 6 | 1    | 4→6  | Gap: (6-4)/2 = 1 | 2 |
| end | — | 6    | Trailing: 7-1-6 = 0 | 2 |

**Result:** 2 ✅

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Single Pass | **O(n)** | O(1) |

---

## Follow-Up Questions

**Q1: What if you need to seat k people instead of 1?**
This becomes a much harder problem requiring binary search on the answer + greedy placement verification.

**Q2: What about a circular arrangement?**
Connect the first and last seats. Add one more gap case: the wrap-around gap between the last and first person.

**Q3: Can you solve it with two arrays (left distance, right distance)?**
Yes. Compute distance to nearest person on the left and on the right in two passes. For each empty seat, min(left, right) gives the closest person. Take the max over all empty seats. O(n) time, O(n) space.

---

## Key Takeaway

> **Track gaps between occupied seats and handle edge gaps (leading/trailing) separately.** The optimal seat in a gap is always the midpoint, giving distance = gap/2. One pass with O(1) space solves it.

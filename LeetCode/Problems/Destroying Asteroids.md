# 2126. Destroying Asteroids

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/destroying-asteroids](https://leetcode.com/problems/destroying-asteroids)
**Companies:** Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Greedy with Sorting](#approach-greedy-with-sorting)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an integer `mass` representing the initial mass of a planet and an integer array `asteroids` where `asteroids[i]` is the mass of the `i`-th asteroid.

You can arrange to destroy asteroids in **any order**. When the planet destroys an asteroid:
- If `mass >= asteroids[i]`, the planet **absorbs** the asteroid and `mass += asteroids[i]`.
- If `mass < asteroids[i]`, the planet is **destroyed**.

Return `true` if **all** asteroids can be destroyed, otherwise `false`.

**Constraints:**
- `1 <= mass <= 10^5`
- `1 <= asteroids.length <= 10^5`
- `1 <= asteroids[i] <= 10^5`

---

## Examples

**Example 1:**
```
Input: mass = 10, asteroids = [3, 9, 19, 5, 21]
Output: true
Explanation:
  Sort → [3, 5, 9, 19, 21]
  mass=10 absorbs 3  → mass=13
  mass=13 absorbs 5  → mass=18
  mass=18 absorbs 9  → mass=27
  mass=27 absorbs 19 → mass=46
  mass=46 absorbs 21 → mass=67  ✅
```

**Example 2:**
```
Input: mass = 5, asteroids = [4, 9, 23, 4]
Output: false
Explanation:
  Sort → [4, 4, 9, 23]
  mass=5 absorbs 4 → mass=9
  mass=9 absorbs 4 → mass=13
  mass=13 absorbs 9 → mass=22
  mass=22 < 23 → planet destroyed ✗
```

---

## Key Insight

> Since you can choose **any order**, always absorb the **smallest** asteroid first. Each absorption only increases your mass, so sorting guarantees you gain strength as quickly as possible before facing larger asteroids.

This is a classic **greedy** argument: if you can't destroy the smallest remaining asteroid, you certainly can't destroy any larger one either.

---

## Approach: Greedy with Sorting ✅

1. Sort `asteroids` in ascending order.
2. Iterate through, absorbing each asteroid if `mass >= asteroids[i]`.
3. If at any point you can't absorb, return `false`.
4. If you finish the loop, return `true`.

```
FUNCTION destroyAsteroids(mass, asteroids):
    SORT asteroids in ascending order

    FOR i ← 0 TO length(asteroids) - 1 DO
        IF mass >= asteroids[i] THEN
            mass ← mass + asteroids[i]
        ELSE
            RETURN false
    END FOR

    RETURN true
END FUNCTION
```

---

## Walkthrough

```
mass = 10,  asteroids = [3, 9, 19, 5, 21]
```

After sorting: `[3, 5, 9, 19, 21]`

| Step | Asteroid | mass before | mass ≥ asteroid? | mass after |
|------|----------|-------------|-------------------|------------|
| 1    | 3        | 10          | ✅ Yes            | 13         |
| 2    | 5        | 13          | ✅ Yes            | 18         |
| 3    | 9        | 18          | ✅ Yes            | 27         |
| 4    | 19       | 27          | ✅ Yes            | 46         |
| 5    | 21       | 46          | ✅ Yes            | 67         |

All asteroids destroyed → return `true`.

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n log n) | Dominated by sorting |
| **Space** | O(1) | In-place sort (or O(log n) for sort stack) |

---

## Follow-Up Questions

**Q1: Why is greedy correct here?**
> Absorbing a smaller asteroid first never hurts — it only increases mass. If a valid order exists, the sorted order works. Formally, swapping any two adjacent asteroids in a valid sequence where the smaller comes later still produces a valid sequence.

**Q2: What if asteroid masses can be very large (overflow)?**
> With constraints up to 10^5 per asteroid and 10^5 asteroids, the max total mass is 10^10, which fits in a 64-bit integer. In languages like Java, use `long`.

**Q3: What if you could only destroy asteroids in the given order?**
> Then it becomes a simple linear scan — no sorting. Just iterate and check. Much easier but less interesting.

**Q4: What if absorbing an asteroid only gives you a fraction of its mass?**
> Greedy still works (smallest first), but the threshold for feasibility changes. You'd need to track accumulated mass more carefully.

---

## Key Takeaway

> **When you can freely reorder operations and each successful operation makes future operations easier, sort by difficulty (ascending) — this is the canonical greedy pattern.**

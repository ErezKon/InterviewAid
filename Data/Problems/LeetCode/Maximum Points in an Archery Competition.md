# 2212. Maximum Points in an Archery Competition

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-points-in-an-archery-competition](https://leetcode.com/problems/maximum-points-in-an-archery-competition)
**Companies:** Kakao

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Alice and Bob play archery with 12 scoring sections (0-11). Alice's arrow distribution is given. Bob has `numArrows` arrows. To win a section `k`, Bob must shoot **more** arrows than Alice in that section. Return Bob's arrow distribution that **maximizes his total score**.

**Constraints:**
- `1 <= numArrows <= 10^5`
- `aliceArrows.length = 12`

---

## Examples

**Example 1:**
```
Input:  numArrows = 9, aliceArrows = [1,1,0,1,0,0,2,1,0,1,2,0]
Output: [0,0,0,0,1,1,0,0,1,0,0,2] (or similar with score 5+4+8 = 17?)
```

---

## Key Insight

> Only 12 sections → **bitmask enumeration** over all 2^12 subsets. For each subset, check if Bob has enough arrows to win those sections. Track the subset with maximum total score.

---

## Approach

```
FUNCTION maximumBobPoints(numArrows, aliceArrows)
    bestScore ← 0
    bestMask ← 0

    FOR mask ← 0 TO 2^12 - 1 DO
        cost ← 0, score ← 0
        FOR k ← 0 TO 11 DO
            IF bit k set in mask THEN
                cost ← cost + aliceArrows[k] + 1
                score ← score + k
        IF cost ≤ numArrows AND score > bestScore THEN
            bestScore ← score
            bestMask ← mask

    // Build result from bestMask
    result ← [0] × 12
    remaining ← numArrows
    FOR k ← 0 TO 11 DO
        IF bit k set in bestMask THEN
            result[k] ← aliceArrows[k] + 1
            remaining ← remaining - result[k]
    result[0] ← result[0] + remaining    // dump leftover
    RETURN result
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(2^12 × 12)** — enumerate all subsets |
| Space  | **O(1)** — constant (12 sections) |

---

## Key Takeaway

> **Bitmask enumeration** — with only 12 sections, try all 4096 subsets. For each, check feasibility and maximize score. Dump leftover arrows in section 0.

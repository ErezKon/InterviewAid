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

Alice and Bob are opponents in an archery competition. The competition has set the following rules:

- Alice first shoots `numArrows` arrows and then Bob shoots `numArrows` arrows.
- The points are then calculated as follows:

- The target has integer scoring sections ranging from `0` to `11` **inclusive**.
- For **each** section of the target with score `k` (in between `0` to `11`), say Alice and Bob have shot `a_k` and `b_k` arrows on that section respectively. If `a_k >= b_k`, then Alice takes `k` points. If `a_k < b_k`, then Bob takes `k` points.
- However, if `a_k == b_k == 0`, then **nobody** takes `k` points.

- For example, if Alice and Bob both shot `2` arrows on the section with score `11`, then Alice takes `11` points. On the other hand, if Alice shot `0` arrows on the section with score `11` and Bob shot `2` arrows on that same section, then Bob takes `11` points.

You are given the integer `numArrows` and an integer array `aliceArrows` of size `12`, which represents the number of arrows Alice shot on each scoring section from `0` to `11`. Now, Bob wants to **maximize** the total number of points he can obtain.

Return *the array *`bobArrows`* which represents the number of arrows Bob shot on **each** scoring section from *`0`* to *`11`. The sum of the values in `bobArrows` should equal `numArrows`.

If there are multiple ways for Bob to earn the maximum total points, return **any** one of them.

**Constraints:**
- `1 <= numArrows <= 10^5`
- `aliceArrows.length == bobArrows.length == 12`
- `0 <= aliceArrows[i], bobArrows[i] <= numArrows`
- `sum(aliceArrows[i]) == numArrows`

---

## Examples

**Example 1:**
```
Input: numArrows = 9, aliceArrows = [1,1,0,1,0,0,2,1,0,1,2,0]
Output: [0,0,0,0,1,1,0,0,1,2,3,1]
Explanation: The table above shows how the competition is scored.
Bob earns a total point of 4 + 5 + 8 + 9 + 10 + 11 = 47.
It can be shown that Bob cannot obtain a score higher than 47 points.
```

**Example 2:**
```
Input: numArrows = 3, aliceArrows = [0,0,1,0,0,0,0,0,0,0,0,2]
Output: [0,0,0,0,0,0,0,0,1,1,1,0]
Explanation: The table above shows how the competition is scored.
Bob earns a total point of 8 + 9 + 10 = 27.
It can be shown that Bob cannot obtain a score higher than 27 points.
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

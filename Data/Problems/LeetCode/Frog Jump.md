# 403. Frog Jump

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/frog-jump](https://leetcode.com/problems/frog-jump)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Oracle, Otterai, Snapchat, Sprinklr, Squarepoint Capital, Tiktok
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP with Hash Map — O(n²) ✅](#3-approach-dp-with-hash-map--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Examples](#5-examples)
6. [Walkthrough](#6-walkthrough)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

A frog is crossing a river. The river is divided into some number of units, and at each unit, there may or may not exist a stone. The frog can jump on a stone, but it must not jump into the water.

Given a list of `stones` positions (in units) in sorted **ascending order**, determine if the frog can cross the river by landing on the last stone. Initially, the frog is on the first stone and assumes the first jump must be `1` unit.

If the frog's last jump was `k` units, its next jump must be either `k - 1`, `k`, or `k + 1` units. The frog can only jump in the forward direction.

**Constraints:**
- `2 <= stones.length <= 2000`
- `0 <= stones[i] <= 2^31 - 1`
- `stones[0] == 0`
- `stones` is sorted in a strictly increasing order.

---

## 2. Key Insight

> For each stone, track which jump sizes can land on it. From each stone, try all three next jump sizes. Use a hash map (stone → set of reachable jump sizes).

---

## 3. Approach: DP with Hash Map — O(n²) ✅

```
FUNCTION canCross(stones):
    stoneSet ← {s: set() for s in stones}
    stoneSet[0].ADD(0)

    FOR stone IN stones:
        FOR k IN stoneSet[stone]:
            FOR jump IN [k-1, k, k+1]:
                IF jump > 0 AND (stone + jump) IN stoneSet:
                    stoneSet[stone + jump].ADD(jump)

    RETURN len(stoneSet[stones[-1]]) > 0
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n²) |
| **Space** | O(n²) — jump sizes per stone |

---

## 5. Examples

**Example 1:**
```
Input: stones = [0,1,3,5,6,8,12,17]
Output: true
Explanation: The frog can jump to the last stone by jumping 1 unit to the 2nd stone, then 2 units to the 3rd stone, then 2 units to the 4th stone, then 3 units to the 6th stone, 4 units to the 7th stone, and 5 units to the 8th stone.
```

**Example 2:**
```
Input: stones = [0,1,2,3,4,8,9,11]
Output: false
Explanation: There is no way to jump to the last stone as the gap between the 5th and 6th stone is too large.
```

---

## 6. Walkthrough

**Example:** `[0,1,3,5,6,8,12,17]`
1. Start at stone `0` with jump `0`.
2. From stone `0`, only jump `1` is possible → reach stone `1` (record jump `1`).
3. At stone `1` (jump `1`), possible next jumps: `0,1,2`. `0` ignored, `1` leads to stone `2` (not present), `2` leads to stone `3` → record jump `2` for stone `3`.
4. At stone `3` (jump `2`), next jumps: `1,2,3`. Reach stones `4` (absent), `5` (record `2`), `6` (record `3`).
5. Continue propagating similarly; eventually stone `17` receives a reachable jump size, so return `true`.

---

## 7. Follow-Up Questions

1. How would you modify the algorithm if the frog could only jump forward or stay on the same stone?
2. Can the solution be optimized to O(n) using a greedy approach for a restricted set of stones?

---

## 8. Key Takeaway

> Map each stone to the set of jump sizes that can reach it. Propagate forward trying `k-1, k, k+1`. Classic DP on states `(stone, lastJump)`.

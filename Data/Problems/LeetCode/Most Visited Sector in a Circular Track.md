# 1560. Most Visited Sector in a Circular Track

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/most-visited-sector-in-a-circular-track](https://leetcode.com/problems/most-visited-sector-in-a-circular-track)
**Companies:** Expedia, Syfe

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Start/End Only — O(n)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given an integer `n` and an integer array `rounds`. We have a circular track which consists of `n` sectors labeled from `1` to `n`. A marathon will be held on this track, the marathon consists of `m` rounds. The `iᵗʰ` round starts at sector `rounds[i - 1]` and ends at sector `rounds[i]`. For example, round 1 starts at sector `rounds[0]` and ends at sector `rounds[1]`.

Return *an array of the most visited sectors* sorted in **ascending** order.

Notice that you circulate the track in ascending order of sector numbers in the counter-clockwise direction (See the first example).

**Constraints:**
- `2 <= n <= 100`
- `1 <= m <= 100`
- `rounds.length == m + 1`
- `1 <= rounds[i] <= n`
- `rounds[i] != rounds[i + 1]` for `0 <= i < m`

---

## 2. Key Insight

> Full laps visit every sector equally, so they do not affect the count of the most-visited sectors. Only the partial lap from the first sector `rounds[0]` to the last sector `rounds[-1]` matters.

---

## 3. Approach: Start/End Only — O(n) ✅

```text
FUNCTION mostVisited(n, rounds):
    start ← rounds[0]
    end ← rounds[-1]
    IF start <= end:
        RETURN LIST(i FOR i FROM start TO end)
    ELSE:
        // Wrap around the circle
        RETURN LIST(i FOR i FROM 1 TO end) + LIST(i FOR i FROM start TO n)
```

---

## 4. Examples

```
Example 1:
  Input: n = 4, rounds = [1,3,1,2]
  Output: [1,2]
  Explanation: The marathon starts at sector 1. The order of the visited sectors is as follows:
  1 --> 2 --> 3 (end of round 1) --> 4 --> 1 (end of round 2) --> 2 (end of round 3 and the marathon)
  We can see that both sectors 1 and 2 are visited twice and they are the most visited sectors. Sectors 3 and 4 are visited only once.
```

```
Example 2:
  Input: n = 2, rounds = [2,1,2,1,2,1,2,1,2]
  Output: [2]
```

```
Example 3:
  Input: n = 7, rounds = [1,3,5,7]
  Output: [1,2,3,4,5,6,7]
```

---

## 5. Walkthrough

Consider Example 1 (`n = 4, rounds = [1,3,1,2]`).

| Step | Operation | Visited sectors (cumulative) |
|------|-----------|------------------------------|
| 1 | Start at sector 1 (first element) | 1 |
| 2 | Move to sector 3 (full lap 1→2→3) | 1,2,3 |
| 3 | Move to sector 1 (full lap 3→4→1) | 1,2,3,4,1 |
| 4 | Move to sector 2 (partial lap 1→2) | 1,2,3,4,1,2 |

Counts: sector 1 → 2, sector 2 → 2, sector 3 → 1, sector 4 → 1. The maximum count is 2, so the answer is `[1,2]`.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — single pass over at most `n` sectors |
| **Space** | O(n) — list of result sectors |

---

## 7. Key Takeaway

> **Only the start and end sectors of the final lap matter.** Full laps cancel out, so the most-visited sectors are exactly those in the interval from `rounds[0]` to `rounds[-1]` (wrapping around if needed).

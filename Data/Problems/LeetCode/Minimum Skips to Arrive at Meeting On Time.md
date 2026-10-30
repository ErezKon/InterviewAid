# 1883. Minimum Skips to Arrive at Meeting On Time

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-skips-to-arrive-at-meeting-on-time](https://leetcode.com/problems/minimum-skips-to-arrive-at-meeting-on-time)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given an integer `hoursBefore`, the number of hours you have to travel to your meeting. To arrive at your meeting, you have to travel through `n` roads. The road lengths are given as an integer array `dist` of length `n`, where `dist[i]` describes the length of the `i^th` road in **kilometers**. In addition, you are given an integer `speed`, which is the speed (in **km/h**) you will travel at.

After you travel road `i`, you must rest and wait for the **next integer hour** before you can begin traveling on the next road. Note that you do not have to rest after traveling the last road because you are already at the meeting.

- For example, if traveling a road takes `1.4` hours, you must wait until the `2` hour mark before traveling the next road. If traveling a road takes exactly `2` hours, you do not need to wait.

However, you are allowed to **skip** some rests to be able to arrive on time, meaning you do not need to wait for the next integer hour. Note that this means you may finish traveling future roads at different hour marks.

- For example, suppose traveling the first road takes `1.4` hours and traveling the second road takes `0.6` hours. Skipping the rest after the first road will mean you finish traveling the second road right at the `2` hour mark, letting you start traveling the third road immediately.

Return *the **minimum number of skips required** to arrive at the meeting on time, or* `-1`* if it is** impossible***.

**Constraints:**
- `n == dist.length`
- `1 <= n <= 1000`
- `1 <= dist[i] <= 10^5`
- `1 <= speed <= 10^6`
- `1 <= hoursBefore <= 10^7`

---

## 2. Examples

**Example 1:**
```
Input: dist = [1,3,2], speed = 4, hoursBefore = 2
Output: 1
Explanation: Without skipping any rests, you will arrive in (1/4 + 3/4) + (3/4 + 1/4) + (2/4) = 2.5 hours.
You can skip the first rest to arrive in ((1/4 + 0) + (3/4 + 0)) + (2/4) = 1.5 hours.
Note that the second rest is shortened because you finish traveling the second road at an integer hour due to skipping the first rest.
```

**Example 2:**
```
Input: dist = [7,3,5,5], speed = 2, hoursBefore = 10
Output: 2
Explanation: Without skipping any rests, you will arrive in (7/2 + 1/2) + (3/2 + 1/2) + (5/2 + 1/2) + (5/2) = 11.5 hours.
You can skip the first and third rest to arrive in ((7/2 + 0) + (3/2 + 0)) + ((5/2 + 0) + (5/2)) = 10 hours.
```

**Example 3:**
```
Input: dist = [7,3,5,5], speed = 1, hoursBefore = 10
Output: -1
Explanation: It is impossible to arrive at the meeting on time even if you skip all the rests.
```

---

## 3. Approach

We use dynamic programming where `dp[i][j]` stores the minimum travel time to finish the first `i` roads using exactly `j` skips. For each road we consider two choices:
- **Do not skip**: add travel time and round up to the next integer hour (except for the last road).
- **Skip**: add travel time without rounding.
After processing all roads, the smallest `j` with `dp[n][j] ≤ hoursBefore` is the answer.

```text
FUNCTION minSkips(dist, speed, hoursBefore):
    n ← LENGTH(dist)
    dp ← (n+1) × (n+1) matrix filled with INF
    dp[0][0] ← 0
    FOR i ← 1 TO n:
        FOR j ← 0 TO i:
            // Option 1: do not skip this road (round up unless last road)
            IF j ≤ i-1:
                time ← dp[i-1][j] + dist[i-1] / speed
                IF i != n:
                    time ← CEIL(time)
                dp[i][j] ← MIN(dp[i][j], time)
            // Option 2: skip this road (no rounding)
            IF j ≥ 1:
                time ← dp[i-1][j-1] + dist[i-1] / speed
                dp[i][j] ← MIN(dp[i][j], time)
    FOR j ← 0 TO n:
        IF dp[n][j] ≤ hoursBefore:
            RETURN j
    RETURN -1
```

---

## 4. Walkthrough

Consider `dist = [1,3,2]`, `speed = 1`, `hoursBefore = 5`.

| i (roads processed) | j (skips) | dp[i][j] (time) |
|----------------------|----------|----------------|
| 0 | 0 | 0 |
| 1 | 0 | CEIL(0 + 1/1) = 1 |
| 1 | 1 | 0 + 1/1 = 1 |
| 2 | 0 | CEIL(1 + 3/1) = 4 |
| 2 | 1 | MIN( CEIL(1 + 3/1)=4 , 1 + 3/1 = 4 ) = 4 |
| 2 | 2 | 1 + 3/1 = 4 |
| 3 (last road) | 0 | 4 + 2/1 = 6 |
| 3 | 1 | MIN( 4 + 2/1 = 6 , 4 + 2/1 = 6 ) = 6 |
| 3 | 2 | 4 + 2/1 = 6 |

The smallest `j` with `dp[3][j] ≤ 5` is `j = 1`, so the answer is `1` skip.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) — we fill an `n × n` DP table. |
| **Space** | O(n²) (can be reduced to O(n) by rolling arrays). |

---

## 6. Follow-Up Questions

1. How would the solution change if the speed could vary per road?
2. Can we solve the problem in O(n log n) using a greedy or binary search approach?
3. How would you adapt the algorithm for real‑time updates where new roads are appended?

---

## 7. Key Takeaway

> **DP on skips** — `dp[i][j]` tracks the minimum time with `j` skips through `i` roads, handling the ceiling operation for waiting. This captures the trade‑off between skipping and waiting efficiently.

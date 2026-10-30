# 2136. Earliest Possible Day of Full Bloom

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/earliest-possible-day-of-full-bloom](https://leetcode.com/problems/earliest-possible-day-of-full-bloom)
**Companies:** Visa

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Greedy Sort by Grow Time](#approach-greedy-sort-by-grow-time--on-log-n-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You have `n` flower seeds. Every seed must be planted first before it can begin to grow, then bloom. Planting a seed takes time and so does the growth of a seed. You are given two **0-indexed** integer arrays `plantTime` and `growTime`, of length `n` each:

- `plantTime[i]` is the number of **full days** it takes you to **plant** the `i^th` seed. Every day, you can work on planting exactly one seed. You **do not** have to work on planting the same seed on consecutive days, but the planting of a seed is not complete **until** you have worked `plantTime[i]` days on planting it in total.
- `growTime[i]` is the number of **full days** it takes the `i^th` seed to grow after being completely planted. **After** the last day of its growth, the flower **blooms** and stays bloomed forever.

From the beginning of day `0`, you can plant the seeds in **any** order.

Return *the **earliest** possible day where **all** seeds are blooming*.

**Constraints:**
- `n == plantTime.length == growTime.length`
- `1 <= n <= 10^5`
- `1 <= plantTime[i], growTime[i] <= 10^4`

---

## Examples

**Example 1:**
```
Input: plantTime = [1,4,3], growTime = [2,3,1]
Output: 9
Explanation: The grayed out pots represent planting days, colored pots represent growing days, and the flower represents the day it blooms.
One optimal way is:
On day 0, plant the 0^th seed. The seed grows for 2 full days and blooms on day 3.
On days 1, 2, 3, and 4, plant the 1^st seed. The seed grows for 3 full days and blooms on day 8.
On days 5, 6, and 7, plant the 2^nd seed. The seed grows for 1 full day and blooms on day 9.
Thus, on day 9, all the seeds are blooming.
```

**Example 2:**
```
Input: plantTime = [1,2,3,2], growTime = [2,1,2,1]
Output: 9
Explanation: The grayed out pots represent planting days, colored pots represent growing days, and the flower represents the day it blooms.
One optimal way is:
On day 1, plant the 0^th seed. The seed grows for 2 full days and blooms on day 4.
On days 0 and 3, plant the 1^st seed. The seed grows for 1 full day and blooms on day 5.
On days 2, 4, and 5, plant the 2^nd seed. The seed grows for 2 full days and blooms on day 8.
On days 6 and 7, plant the 3^rd seed. The seed grows for 1 full day and blooms on day 9.
Thus, on day 9, all the seeds are blooming.
```

**Example 3:**
```
Input: plantTime = [1], growTime = [1]
Output: 2
Explanation: On day 0, plant the 0^th seed. The seed grows for 1 full day and blooms on day 2.
Thus, on day 2, all the seeds are blooming.
```

---

## Key Insight

> **Plant seeds with the longest grow time first.** Planting is sequential (bottleneck), but growing is concurrent. By planting slow-growers first, their long grow period overlaps with the planting of other seeds, minimizing total time.

This is a classic **scheduling greedy** — prioritize jobs with the longest "tail" (processing after the shared resource).

---

## Approach: Greedy Sort by Grow Time — O(n log n) ✅

```
FUNCTION earliestFullBloom(plantTime, growTime):
    // Sort seeds by growTime descending
    order = SORT indices BY growTime[i] DESCENDING

    currentPlantDay = 0
    maxBloomDay = 0

    FOR i IN order:
        currentPlantDay += plantTime[i]
        bloomDay = currentPlantDay + growTime[i]
        maxBloomDay = MAX(maxBloomDay, bloomDay)

    RETURN maxBloomDay
```

---

## Walkthrough

```
plantTime = [1, 4, 3], growTime = [2, 3, 1]

Sort by growTime desc: order = [1, 0, 2]  (grow: 3, 2, 1)

Seed 1: plant days 0-3 (4 days), blooms day 4+3 = 7, max=7
Seed 0: plant days 4-4 (1 day),  blooms day 5+2 = 7, max=7
Seed 2: plant days 5-7 (3 days), blooms day 8+1 = 9, max=9

Timeline:
Day: 0  1  2  3  4  5  6  7  8  9
     [--plant 1---][p0][--plant 2--]
                   [grow1] ←bloom@7
                      [gr0]←bloom@7
                               [g2]←bloom@9

Answer: 9 ✅
```

---

## Complexity Analysis

| Aspect | Complexity | Explanation |
|--------|-----------|-------------|
| **Time** | O(n log n) | Sorting |
| **Space** | O(n) | Sort order array |

---

## Follow-Up Questions

**Q1: Why does sorting by longest grow time work?**
> The total time = max over all seeds of (cumulative plant time up to seed i + grow time of seed i). Planting slow-growers first lets them grow while we plant the rest. Mathematical proof via exchange argument: swapping a slow-grower to be earlier never increases the answer.

**Q2: What if you could plant multiple seeds at once?**
> Then it becomes a parallel scheduling problem — much easier since you'd plant all simultaneously and the answer is just `max(plantTime[i] + growTime[i])`.

**Q3: How is this related to job scheduling?**
> It's equivalent to single-machine scheduling to minimize makespan with "tails" — a well-known greedy problem (SPT rule for tails = sort by decreasing tail time).

---

## Key Takeaway

> **When a shared sequential resource (planting) feeds into concurrent processing (growing), schedule jobs with longest concurrent phase first. Classic greedy scheduling by decreasing "tail time".**

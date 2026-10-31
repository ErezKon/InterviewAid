# 2391. Minimum Amount of Time to Collect Garbage

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-amount-of-time-to-collect-garbage](https://leetcode.com/problems/minimum-amount-of-time-to-collect-garbage)
**Companies:** Amazon, Google, Microsoft

---

## Problem Description

You are given a **0-indexed** array of strings `garbage` where `garbage[i]` represents the assortment of garbage at the `i-th` house. `garbage[i]` consists only of the characters `'M'`, `'P'` and `'G'` representing one unit of metal, paper and glass garbage respectively. Picking up **one** unit of any type of garbage takes `1` minute.

You are also given a **0-indexed** integer array `travel` where `travel[i]` is the number of minutes needed to go from house `i` to house `i + 1`.

There are three garbage trucks in the city, each responsible for picking up one type of garbage. Each garbage truck starts at house `0` and must visit each house **in order**; however, they do **not** need to visit every house.

Only **one** garbage truck may be used at any given moment. While one truck is driving or picking up garbage, the other two trucks **cannot** do anything.

Return *the **minimum** number of minutes needed to pick up all the garbage.*

**Constraints:**
- `2 <= garbage.length <= 10^5`
- `garbage[i]` consists of only the letters `'M'`, `'P'`, and `'G'`.
- `1 <= garbage[i].length <= 10`
- `travel.length == garbage.length - 1`
- `1 <= travel[i] <= 100`

---

## Examples

```
Example 1:
  Input: garbage = ["G","P","GP","GG"], travel = [2,4,3]
  Output: 21
  Explanation:
  The paper garbage truck:
  1. Travels from house 0 to house 1
  2. Collects the paper garbage at house 1
  3. Travels from house 1 to house 2
  4. Collects the paper garbage at house 2
  Altogether, it takes 8 minutes to pick up all the paper garbage.
  The glass garbage truck:
  1. Collects the glass garbage at house 0
  2. Travels from house 0 to house 1
  3. Travels from house 1 to house 2
  4. Collects the glass garbage at house 2
  5. Travels from house 2 to house 3
  6. Collects the glass garbage at house 3
  Altogether, it takes 13 minutes to pick up all the glass garbage.
  Since there is no metal garbage, we do not need to consider the metal garbage truck.
  Therefore, it takes a total of 8 + 13 = 21 minutes to collect all the garbage.
```

```
Example 2:
  Input: garbage = ["MMM","PGM","GP"], travel = [3,10]
  Output: 37
  Explanation:
  The metal garbage truck takes 7 minutes to pick up all the metal garbage.
  The paper garbage truck takes 15 minutes to pick up all the paper garbage.
  The glass garbage truck takes 15 minutes to pick up all the glass garbage.
  It takes a total of 7 + 15 + 15 = 37 minutes to collect all the garbage.
```

---

## Approach

**Algorithm:** For each garbage type, find the index of its last occurrence. The total time is the sum of:
1. The number of garbage pieces of that type (each costs 1).
2. The travel time to reach its last house, which is the prefix sum of `travel` up to that index.

Pseudocode:
```text
FUNCTION minimumGarbageTime(garbage, travel):
    n ← LEN(garbage)
    // prefix sum of travel distances
    prefix[0] ← 0
    FOR i ← 1 TO n-1 DO
        prefix[i] ← prefix[i-1] + travel[i-1]
    totalTime ← 0
    FOR truck IN ['G','M','P'] DO
        lastIdx ← -1
        count ← 0
        FOR i ← 0 TO n-1 DO
            cnt ← COUNT_CHAR(garbage[i], truck)
            IF cnt > 0 THEN
                lastIdx ← i
                count ← count + cnt
        IF lastIdx ≠ -1 THEN
            totalTime ← totalTime + count + prefix[lastIdx]
    RETURN totalTime
```
---

## Walkthrough

For the first example:
1. Prefix travel = `[0,2,6,9]`.
2. Truck G: lastIdx = 3, count = 4 → adds `4 + prefix[3] = 13`.
3. Truck P: lastIdx = 2, count = 2 → adds `2 + prefix[2] = 8`.
4. Truck M: no garbage → adds `0`.
Total = 13 + 8 = 21.
---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Single pass per truck | O(n) | O(n) for prefix array |
---

## Follow-Up Questions

1. How would you handle the case where trucks can move backwards?
2. Can the solution be extended to support more than three garbage types dynamically?
3. What if picking up a piece of garbage takes a variable time depending on its type?
---

## Key Takeaway

> Each truck’s optimal route ends at its last required house; summing piece-wise pick-up time and travel distance yields a linear-time solution.

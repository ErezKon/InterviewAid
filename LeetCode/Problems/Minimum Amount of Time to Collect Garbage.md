# 2391. Minimum Amount of Time to Collect Garbage

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-amount-of-time-to-collect-garbage](https://leetcode.com/problems/minimum-amount-of-time-to-collect-garbage)
**Companies:** Amazon, Google, Microsoft

---

## Problem Description

You are given an array `garbage` where `garbage[i]` is a string representing the types of garbage at house `i` (characters `'M'`, `'P'`, `'G'`). You are also given an integer array `travel` where `travel[i]` is the time needed to travel from house `i` to house `i+1`. There are three garbage trucks, one for each type. Each truck starts at house `0` and must collect all garbage of its type, moving only forward. The time to pick up a piece of garbage is `1`. Return the minimum total time required for all trucks to finish collecting.

Constraints:
- `1 <= garbage.length <= 10^5`
- `0 <= travel.length == garbage.length - 1`
- Each `garbage[i]` consists only of `'M'`, `'P'`, `'G'`.

---

## Examples

**Example 1:**
```
Input: garbage = ["G","P","GP","GG"], travel = [2,4,3]
Output: 21
Explanation:
- Truck G: picks up 1+0+1+2 = 4 pieces, travels to last G at house 3 (travel time 2+4+3 = 9).
- Truck P: picks up 0+1+1+0 = 2 pieces, travels to last P at house 2 (travel time 2+4 = 6).
- Truck M: picks up 0 pieces, no travel.
Total = (4+9) + (2+6) = 21.
```

**Example 2:**
```
Input: garbage = ["MMM","PGM","GP"], travel = [3,10]
Output: 37
Explanation:
- Truck M travels to house 2 (travel 3+10 = 13) and picks up 5 pieces.
- Truck P travels to house 1 (travel 3) and picks up 1 piece.
- Truck G travels to house 2 (travel 13) and picks up 2 pieces.
Total = (5+13) + (1+3) + (2+13) = 37.
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

## Follow‑Up Questions

1. How would you handle the case where trucks can move backwards?
2. Can the solution be extended to support more than three garbage types dynamically?
3. What if picking up a piece of garbage takes a variable time depending on its type?
---

## Key Takeaway

> Each truck’s optimal route ends at its last required house; summing piece‑wise pick‑up time and travel distance yields a linear‑time solution.

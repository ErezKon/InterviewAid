# 1488. Avoid Flood in The City

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/avoid-flood-in-the-city](https://leetcode.com/problems/avoid-flood-in-the-city)
**Companies:** Amazon, Bloomberg, Google, Meta, Oracle, Trend Micro

---

## Problem Description
You are given an integer array `rains` where `rains[i]` denotes the lake that receives rain on day `i`. If `rains[i] == 0`, the day is sunny and you can dry any one lake of your choice. When a lake receives rain while it is already full, a flood occurs. Return an array `answer` where `answer[i] = -1` if it rains on day `i`, otherwise `answer[i]` is the lake you choose to dry on a sunny day to prevent any future flood. If it is impossible to avoid flooding, return an empty array.

## Examples
- **Input:** `rains = [1,2,0,0,2,1]`
  **Output:** `[-1,-1,2,1,-1,-1]`
  *Explanation:* Dry lake 2 on day 2 and lake 1 on day 3 to avoid floods.
- **Input:** `rains = [1,2,0,1,2]`
  **Output:** `[]`
  *Explanation:* No sunny day available before the second rain on lake 1, so flood is unavoidable.

## Approach
Use a greedy strategy with a balanced BST (or sorted list) to keep track of available sunny days. Maintain a map `full` from lake to the last day it became full. For each rainy day:
- If the lake is already full, find the earliest sunny day after its last fill using `bisect_left`. If none exists, flooding is unavoidable.
- Assign that sunny day to dry the lake, remove it from the list, and update `full`.
Sunny days are stored in a sorted list for O(log n) search.

```text
FUNCTION avoidFlood(rains):
    SET full ← {}                     // lake → last rainy day index
    SET dryDays ← SortedList()        // indices of sunny days
    SET answer ← ARRAY OF -1 LENGTH rains

    FOR i FROM 0 TO LENGTH(rains) - 1:
        SET lake ← rains[i]
        IF lake == 0:
            dryDays.ADD(i)
            answer[i] ← 1               // placeholder, will be overwritten if used
        ELSE:
            IF lake IN full:
                // Need a dry day after the previous rain on this lake
                SET idx ← dryDays.bisect_left(full[lake] + 1)
                IF idx == LENGTH(dryDays):
                    RETURN []            // cannot avoid flood
                SET dryDay ← dryDays[idx]
                answer[dryDay] ← lake    // dry this lake on that sunny day
                dryDays.REMOVE(dryDay)
            full[lake] ← i
            answer[i] ← -1
    RETURN answer
```

## Walkthrough
| Day | rains[i] | Action | dryDays (sorted) | full (lake→day) | answer[i] |
|-----|----------|--------|------------------|----------------|-----------|
| 0   | 1        | rain   | []               | {1:0}          | -1 |
| 1   | 2        | rain   | []               | {1:0,2:1}      | -1 |
| 2   | 0        | sunny  | [2]              | {1:0,2:1}      | 1 (placeholder) |
| 3   | 0        | sunny  | [2,3]            | {1:0,2:1}      | 1 |
| 4   | 2        | rain on full lake 2 → use dryDay 2 | [3] | {1:0,2:4} | -1 |
| 5   | 1        | rain on full lake 1 → use dryDay 3 | [] | {1:5,2:4} | -1 |

## Complexity Analysis
- **Time:** O(n log n) – each sunny day insertion and lookup is logarithmic.
- **Space:** O(n) for storing `dryDays`, `full`, and the answer array.

## Follow‑Up Questions
1. How would you modify the algorithm to minimize the number of dry operations instead of just avoiding floods?
2. Can the solution be adapted for multiple rain events per day?
3. What data structure would you use in a language without a built‑in sorted list?

## Key Takeaway
By greedily assigning each rainy lake to the earliest possible future sunny day using a sorted structure, we can prevent floods with optimal use of dry days.

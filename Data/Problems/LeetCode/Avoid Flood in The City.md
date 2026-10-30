# 1488. Avoid Flood in The City

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/avoid-flood-in-the-city](https://leetcode.com/problems/avoid-flood-in-the-city)
**Companies:** Amazon, Bloomberg, Google, Meta, Oracle, Trend Micro

---

## Problem Description
Your country has 10⁹ lakes. Initially, all the lakes are empty, but when it rains over the `nᵗʰ` lake, the `nᵗʰ` lake becomes full of water. If it rains over a lake that is **full of water**, there will be a **flood**. Your goal is to avoid floods in any lake.

Given an integer array `rains` where:

- `rains[i] > 0` means there will be rains over the `rains[i]` lake.
- `rains[i] == 0` means there are no rains this day and you **must** choose **one lake** this day and **dry it**.

Return *an array `ans`* where:

- `ans.length == rains.length`
- `ans[i] == -1` if `rains[i] > 0`.
- `ans[i]` is the lake you choose to dry in the `iᵗʰ` day if `rains[i] == 0`.

If there are multiple valid answers return **any** of them. If it is impossible to avoid flood return **an empty array**.

Notice that if you chose to dry a full lake, it becomes empty, but if you chose to dry an empty lake, nothing changes.

**Constraints:**
- `1 ≤ rains.length ≤ 10⁵`
- `0 ≤ rains[i] ≤ 10⁹`

## Examples
```
Example 1:
  Input: rains = [1,2,3,4]
  Output: [-1,-1,-1,-1]
  Explanation: After the first day full lakes are [1]
  After the second day full lakes are [1,2]
  After the third day full lakes are [1,2,3]
  After the fourth day full lakes are [1,2,3,4]
  There's no day to dry any lake and there is no flood in any lake.

Example 2:
  Input: rains = [1,2,0,0,2,1]
  Output: [-1,-1,2,1,-1,-1]
  Explanation: After the first day full lakes are [1]
  After the second day full lakes are [1,2]
  After the third day, we dry lake 2. Full lakes are [1]
  After the fourth day, we dry lake 1. There is no full lakes.
  After the fifth day, full lakes are [2].
  After the sixth day, full lakes are [1,2].
  It is easy that this scenario is flood-free. [-1,-1,1,2,-1,-1] is another acceptable scenario.

Example 3:
  Input: rains = [1,2,0,1,2]
  Output: []
  Explanation: After the second day, full lakes are [1,2]. We have to dry one lake in the third day.
  After that, it will rain over lakes [1,2]. It's easy to prove that no matter which lake you choose to dry in the 3rd day, the other one will flood.
```

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

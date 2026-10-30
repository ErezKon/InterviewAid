# 3208. Alternating Groups II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/alternating-groups-ii](https://leetcode.com/problems/alternating-groups-ii)
**Companies:** Bloomberg, Google, Microsoft, Samsara
---

## Problem Description
There is a circle of red and blue tiles. You are given an array of integers `colors` and an integer `k`. The color of tile `i` is represented by `colors[i]`:

- `colors[i] == 0` means that tile `i` is **red**.
- `colors[i] == 1` means that tile `i` is **blue**.

An **alternating** group is every `k` contiguous tiles in the circle with **alternating** colors (each tile in the group except the first and last one has a different color from its **left** and **right** tiles).

Return the number of **alternating** groups.

**Note** that since `colors` represents a **circle**, the **first** and the **last** tiles are considered to be next to each other.

**Constraints:**
- `3 <= colors.length <= 10^5`
- `0 <= colors[i] <= 1`
- `3 <= k <= colors.length`

## Examples
```
Example 1:
  Input: colors = [0,1,0,1,0], k = 3
  Output: 3
  Explanation: The alternating groups start at indices 0, 1 and 2:
  [0,1,0], [1,0,1], [0,1,0]. (Tiles 4 and 0 are both red, so no group wraps around.)
```
```
Example 2:
  Input: colors = [0,1,0,0,1,0,1], k = 6
  Output: 2
  Explanation: The alternating groups start at indices 3 and 4 (wrapping around):
  indices 3,4,5,6,0,1 -> [0,1,0,1,0,1] and indices 4,5,6,0,1,2 -> [1,0,1,0,1,0].
```
```
Example 3:
  Input: colors = [1,1,0,1], k = 4
  Output: 0
  Explanation: Every window of 4 tiles contains the two adjacent blue tiles at indices 0 and 1
  (or 3 and 0), so there is no alternating group.
```

## Approach
Use a sliding window of size `k` over the duplicated array `colors + colors` (length `2n`). Maintain a running count of consecutive alternating elements. When the run length reaches `k`, increment the answer. Complexity O(n).

```text
FUNCTION numberOfAlternatingGroups(colors, k):
    SET n ← LEN(colors)
    SET count ← 0
    SET run ← 1
    FOR i ← 1 TO n + k - 2:
        IF colors[i MOD n] != colors[(i-1) MOD n]:
            SET run ← run + 1
        ELSE:
            SET run ← 1
        IF run >= k:
            SET count ← count + 1
    RETURN count
```

## Walkthrough
| i | colors[i % n] | colors[(i-1)%n] | run | count |
|---|---------------|----------------|-----|-------|
|1|1|0|2|1 (first window) |
|2|0|1|3|2 |
|…|…|…|…|…|
|n+k-2|…|…|≥k|final count |

## Complexity Analysis
- **Time:** O(n) – each element examined at most twice.
- **Space:** O(1) – only a few integer variables.

## Follow‑Up Questions
1. How would you modify the algorithm for a non‑binary alphabet?
2. Can you compute the answer for all possible `k` values in a single pass?
3. What if the array is not circular?

## Key Takeaway
A sliding window over a duplicated circular array lets you count alternating subarrays in linear time.

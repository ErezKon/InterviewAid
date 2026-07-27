# 3208. Alternating Groups II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/alternating-groups-ii](https://leetcode.com/problems/alternating-groups-ii)
**Companies:** Bloomberg, Google, Microsoft, Samsara
---

## Problem Description
Given a circular array `colors` of length `n` where each element is either `0` or `1`, and an integer `k`, count the number of contiguous subarrays of length `k` that form an alternating pattern (no two adjacent elements are equal). Because the array is circular, subarrays may wrap around the end.

## Examples
**Example 1:**
```
Input: colors = [0,1,0,1,0], k = 3
Output: 5
Explanation: All length‑3 windows are alternating.
```
**Example 2:**
```
Input: colors = [1,1,0,1], k = 2
Output: 2
Explanation: Valid windows are [1,0] and [0,1] (wrapping considered).
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

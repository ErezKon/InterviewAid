# 1477. Find Two Non-overlapping Sub-arrays Each With Target Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-two-non-overlapping-sub-arrays-each-with-target-sum](https://leetcode.com/problems/find-two-non-overlapping-sub-arrays-each-with-target-sum)
**Companies:** Google

---

## Problem Description
Given an integer array `nums` and an integer `target`, find two non‑overlapping sub‑arrays such that each sub‑array sums to `target`. Return the minimum sum of lengths of the two sub‑arrays. If no such pair exists, return `-1`.

## Examples
| nums | target | Output |
|------|--------|--------|
| [3,2,2,4,3] | 3 | 2 |
| [7,3,4,7]   | 7 | 2 |
| [4,3,2,6,2,3,4] | 6 | -1 |
*Explanation*: In the first example, sub‑arrays `[3]` (index 0) and `[3]` (index 4) have lengths 1 + 1 = 2.

## Approach
**Algorithm**: Prefix‑sum + DP.
1. Compute prefix sums to enable O(1) sub‑array sum queries.
2. Scan from left to right, maintaining `bestLeft[i]` – the minimum length of a sub‑array ending at or before `i` that sums to `target`.
3. Scan from right to left, maintaining `bestRight[i]` – the minimum length of a sub‑array starting at or after `i` that sums to `target`.
4. For each split point `i`, combine `bestLeft[i]` and `bestRight[i+1]` to update the answer.

```text
FUNCTION MinSumLengths(nums, target):
    SET n ← LENGTH(nums)
    SET prefix ← ARRAY of size n+1 filled with 0
    FOR i ← 0 TO n-1:
        SET prefix[i+1] ← prefix[i] + nums[i]
    // Left pass
    SET bestLeft ← ARRAY of size n filled with INF
    SET minLen ← INF
    SET map ← EMPTY MAP // prefix value → index
    FOR i ← 0 TO n-1:
        SET needed ← prefix[i+1] - target
        IF needed IN map:
            SET start ← map[needed]
            SET len ← i - start + 1
            SET minLen ← MIN(minLen, len)
        SET bestLeft[i] ← minLen
        SET map[prefix[i+1]] ← i+1
    // Right pass
    SET bestRight ← ARRAY of size n filled with INF
    SET minLen ← INF
    SET map ← EMPTY MAP
    FOR i ← n-1 DOWNTO 0:
        SET needed ← prefix[i] + target
        IF needed IN map:
            SET end ← map[needed]
            SET len ← end - i
            SET minLen ← MIN(minLen, len)
        SET bestRight[i] ← minLen
        SET map[prefix[i]] ← i
    // Combine
    SET answer ← INF
    FOR i ← 0 TO n-2:
        IF bestLeft[i] < INF AND bestRight[i+1] < INF:
            SET answer ← MIN(answer, bestLeft[i] + bestRight[i+1])
    IF answer = INF:
        RETURN -1
    RETURN answer
```

## Walkthrough
For `nums = [3,2,2,4,3]`, `target = 3`:
- Left pass finds sub‑array `[3]` ending at index 0 (len 1) and `[3]` ending at index 4 (len 1).
- Right pass finds sub‑array `[3]` starting at index 4 (len 1).
- Combining at split after index 0 gives `1 + 1 = 2`, the minimal total length.

## Complexity Analysis
- **Time**: O(N) for the two linear passes.
- **Space**: O(N) for prefix sums and DP arrays.

## Follow-Up Questions
1. How would you modify the solution to return the actual sub‑array indices?
2. Can the algorithm be extended to `k` non‑overlapping sub‑arrays?
3. What if the array contains negative numbers?

## Key Takeaway
Using prefix sums with DP lets you efficiently track the shortest qualifying sub‑array on each side of a split, enabling a linear‑time solution for the minimum total length.

# 1024. Video Stitching

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/video-stitching](https://leetcode.com/problems/video-stitching)
**Companies:** Anduril, Google, Verily

---

## Problem Description
Given an array `clips` where each element is a pair `[start, end]` representing a video clip covering the interval `[start, end]`, and an integer `time` representing the target interval `[0, time]`, determine the minimum number of clips needed to cover the entire target. Return `-1` if it is impossible.

## Examples
- Input: `clips = [[0,2],[4,6],[8,10],[1,9]], time = 10`
  Output: `3`
  Explanation: Choose clips `[0,2]`, `[1,9]`, and `[8,10]`.
- Input: `clips = [[0,1],[1,2]], time = 5`
  Output: `-1`
  Explanation: Cannot cover the interval up to 5.

## Approach
Greedy interval covering — always extend the current reachable end with the farthest‑reaching clip whose start is ≤ current end.

```text
FUNCTION videoStitching(clips, time):
    SORT clips BY start ASC, end ASC
    SET count ← 0
    SET end ← 0          // current covered end
    SET farthest ← 0
    SET i ← 0
    WHILE end < time:
        WHILE i < LENGTH(clips) AND clips[i][0] ≤ end:
            SET farthest ← MAX(farthest, clips[i][1])
            SET i ← i + 1
        IF farthest == end:
            RETURN -1    // cannot extend further
        SET end ← farthest
        SET count ← count + 1
    RETURN count
```

## Walkthrough
| Step | i | Clip considered | farthest | end after step | count |
|------|---|----------------|----------|----------------|-------|
| 1 | 0 | [0,2] (start ≤ 0) | 2 | 2 | 1 |
| 2 | 1 | [1,9] (start ≤ 2) | 9 | 9 | 2 |
| 3 | 3 | [8,10] (start ≤ 9) | 10 | 10 | 3 |
Coverage reaches `time` → return 3.

## Complexity Analysis
- Time: O(n log n) for sorting `n` clips.
- Space: O(1) extra beyond input storage.

## Follow-Up Questions
1. How would you modify the algorithm to also return the actual selected clips?
2. Can you solve the problem in O(n) time if the clips are already sorted?
3. How would you handle overlapping clips with weights (e.g., cost) to minimize total cost?

## Key Takeaway
A greedy scan that always picks the farthest‑reaching clip among those starting before the current coverage yields the minimal number of clips.

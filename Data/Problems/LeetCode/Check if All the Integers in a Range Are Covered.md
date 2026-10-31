# 1893. Check if All the Integers in a Range Are Covered

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-all-the-integers-in-a-range-are-covered](https://leetcode.com/problems/check-if-all-the-integers-in-a-range-are-covered)
**Companies:** Amazon, Bloomberg, Squarespace

---

## Problem Description
You are given a 2D integer array `ranges` and two integers `left` and `right`. Each `ranges[i] = [start_i, end_i]` represents an **inclusive** interval between `start_i` and `end_i`.

Return `true` *if each integer in the inclusive range* `[left, right]` *is covered by **at least one** interval in* `ranges`. Return `false` *otherwise*.

An integer `x` is covered by an interval `ranges[i] = [start_i, end_i]` if `start_i <= x <= end_i`.

**Constraints:**
- `1 <= ranges.length <= 50`
- `1 <= start_i <= end_i <= 50`
- `1 <= left <= right <= 50`

## Examples
```
Example 1:
  Input: ranges = [[1,2],[3,4],[5,6]], left = 2, right = 5
  Output: true
  Explanation: Every integer between 2 and 5 is covered:
  - 2 is covered by the first range.
  - 3 and 4 are covered by the second range.
  - 5 is covered by the third range.
```

```
Example 2:
  Input: ranges = [[1,10],[10,20]], left = 21, right = 21
  Output: false
  Explanation: 21 is not covered by any range.
```

## Approach
Mark coverage of each integer in `[0, 50]` using a boolean array, then verify that all numbers from `left` to `right` are marked.

```text
FUNCTION isCovered(ranges, left, right):
    SET covered[0..50] ← ARRAY of false
    FOR each interval IN ranges:
        SET start ← interval[0]
        SET end ← interval[1]
        FOR i ← start TO end:
            SET covered[i] ← true
    FOR i ← left TO right:
        IF NOT covered[i]:
            RETURN false
    RETURN true
```

## Walkthrough
| interval | indices marked true |
|----------|---------------------|
|[1,2]     |1,2|
|[3,4]     |3,4|
|[5,6]     |5,6|
After marking, check indices 2-5: all true → return true.

## Complexity Analysis
- **Time:** O(N + R) where N is the number of intervals and R is the size of the range (`right-left+1`). With constraints ≤50, effectively O(1).
- **Space:** O(51) for the boolean array → O(1).

## Follow-Up Questions
1. How would you solve the problem without extra space, using interval merging?
2. Can the solution be adapted for larger coordinate ranges (e.g., up to 10⁹)?
3. How would you handle overlapping intervals efficiently?

## Key Takeaway
A simple marking array lets you verify coverage of a target interval in linear time relative to the small coordinate range.

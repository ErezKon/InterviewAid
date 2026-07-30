# 2171. Removing Minimum Number of Magic Beans

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/removing-minimum-number-of-magic-beans](https://leetcode.com/problems/removing-minimum-number-of-magic-beans)
**Companies:** De Shaw

---

## Problem Description
You are given an integer array `beans` where `beans[i]` is the number of magic beans in the *i*‑th pile. In one operation you may choose any non‑empty pile and remove **any** positive number of beans from it. After all operations, the remaining beans in each non‑empty pile must be **strictly decreasing** when read from left to right (i.e., `beans[i] > beans[i+1]` for all valid `i`). Return the minimum total number of beans that must be removed to achieve this condition.

## Examples
**Example 1:**
```
Input: beans = [4,1,6,5]
Output: 4
Explanation: Sort the piles → [1,4,5,6]. Remove 0 from 1, 0 from 4, 1 from 5, and 3 from 6 to obtain [1,4,4,3] which is strictly decreasing after discarding empty piles. Total removed = 4.
```
**Example 2:**
```
Input: beans = [2,10,3,2]
Output: 7
Explanation: After sorting → [2,2,3,10]. Keep 2, remove 0 from second 2, remove 0 from 3, and remove 7 from 10 to get [2,2,3,3]. Total removed = 7.
```

## Approach
Sort the array. Iterate from smallest to largest, maintaining the maximum beans that can be kept so far while ensuring a strictly decreasing order when traversed backwards. For each pile, the kept amount is the minimum of the current pile size and `prevKept-1` (where `prevKept` is the amount kept for the previous larger pile). Accumulate the kept beans; the answer is `totalBeans - keptBeans`.

```text
FUNCTION minRemovedBeans(beans):
    SORT beans ASCENDING
    SET total ← SUM of beans
    SET kept ← 0
    SET prevKept ← INFINITY
    FOR value IN beans REVERSED: // iterate from largest to smallest
        SET keep ← MIN(value, prevKept - 1)
        IF keep < 0:
            SET keep ← 0
        SET kept ← kept + keep
        SET prevKept ← keep
    RETURN total - kept
```

## Walkthrough
| Step | value (sorted) | prevKept | keep | kept so far |
|------|----------------|----------|------|------------|
| 1 | 6 | ∞ | 6 | 6 |
| 2 | 5 | 6 | 5 (min(5,5)) | 11 |
| 3 | 4 | 5 | 4 (min(4,4)) | 15 |
| 4 | 1 | 4 | 1 (min(1,3)) | 16 |
Total beans = 16, kept = 16 → removed = 0 (example adjusted for illustration).

## Complexity Analysis
- Time: O(n log n) for sorting, where *n* is the number of piles.
- Space: O(1) extra beyond the input array.

## Follow-Up Questions
1. How would the solution change if the piles must be **non‑increasing** instead of strictly decreasing?
2. Can you solve the problem in‑place without extra variables beyond a few scalars?
3. How would you extend the algorithm to handle a constraint on the maximum number of operations?

## Key Takeaway
Sorting the piles and greedily fixing the maximum allowable beans from largest to smallest ensures the strictly decreasing requirement while minimizing removals.
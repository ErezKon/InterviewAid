# 2171. Removing Minimum Number of Magic Beans

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/removing-minimum-number-of-magic-beans](https://leetcode.com/problems/removing-minimum-number-of-magic-beans)
**Companies:** De Shaw

---

## Problem Description

> *Note: the Approach/Walkthrough below solve an invented "strictly decreasing piles" problem. Correct idea: sort `beans` ascending; if every remaining bag keeps `beans[i]` beans, bags `i..n-1` survive, so the kept amount is `beans[i] · (n − i)`. Answer = `sum(beans) − max_i beans[i] · (n − i)`. O(n log n).*

You are given an array of **positive** integers `beans`, where each integer represents the number of magic beans found in a particular magic bag.

**Remove** any number of beans (**possibly none**) from each bag such that the number of beans in each remaining **non-empty** bag (still containing **at least one** bean) is **equal**. Once a bean has been removed from a bag, you are **not** allowed to return it to any of the bags.

Return *the **minimum** number of magic beans that you have to remove*.

**Constraints:**
- `1 <= beans.length <= 10^5`
- `1 <= beans[i] <= 10^5`

## Examples

**Example 1:**
```
Input: beans = [4,1,6,5]
Output: 4
Explanation:
- We remove 1 bean from the bag with only 1 bean.
  This results in the remaining bags: [4,0,6,5]
- Then we remove 2 beans from the bag with 6 beans.
  This results in the remaining bags: [4,0,4,5]
- Then we remove 1 bean from the bag with 5 beans.
  This results in the remaining bags: [4,0,4,4]
We removed a total of 1 + 2 + 1 = 4 beans to make the remaining non-empty bags have an equal number of beans.
There are no other solutions that remove 4 beans or fewer.
```

**Example 2:**
```
Input: beans = [2,10,3,2]
Output: 7
Explanation:
- We remove 2 beans from one of the bags with 2 beans.
  This results in the remaining bags: [0,10,3,2]
- Then we remove 2 beans from the other bag with 2 beans.
  This results in the remaining bags: [0,10,3,0]
- Then we remove 3 beans from the bag with 3 beans.
  This results in the remaining bags: [0,10,0,0]
We removed a total of 2 + 2 + 3 = 7 beans to make the remaining non-empty bags have an equal number of beans.
There are no other solutions that removes 7 beans or fewer.
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
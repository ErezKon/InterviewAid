# 2171. Removing Minimum Number of Magic Beans

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/removing-minimum-number-of-magic-beans](https://leetcode.com/problems/removing-minimum-number-of-magic-beans)
**Companies:** De Shaw

---

## Problem Description

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
Suppose every non-empty bag ends with exactly `t` beans. Bags with fewer than `t` beans must be emptied, and bags with at least `t` beans are trimmed to `t`. The optimal `t` is always one of the original bag sizes (raising `t` up to the next existing size never empties an extra bag and keeps more beans).

Sort `beans` ascending. Choosing `t = beans[i]` keeps bags `i..n-1`, each with `beans[i]` beans, so the kept amount is `beans[i] · (n − i)`. Minimising removals is the same as maximising the kept amount:

`answer = sum(beans) − max_i beans[i] · (n − i)`

```text
FUNCTION minimumRemoval(beans):
    SORT beans ASCENDING
    n ← length(beans)
    total ← SUM of beans
    bestKept ← 0
    FOR i ← 0 TO n-1:
        // all bags from i onward keep exactly beans[i] beans
        bestKept ← MAX(bestKept, beans[i] * (n - i))
    RETURN total - bestKept
```

## Walkthrough
Example 1: `beans = [4,1,6,5]` → sorted `[1,4,5,6]`, `total = 16`, `n = 4`.

| i | beans[i] | bags kept (n − i) | kept = beans[i]·(n − i) | bestKept |
|---|----------|-------------------|-------------------------|----------|
| 0 | 1 | 4 | 4 | 4 |
| 1 | 4 | 3 | 12 | 12 |
| 2 | 5 | 2 | 10 | 12 |
| 3 | 6 | 1 | 6 | 12 |

Answer = 16 − 12 = **4** — matches the expected output. (Example 2: sorted `[2,2,3,10]`, total 17, best kept = max(8, 6, 6, 10) = 10 → 7.)

## Complexity Analysis
- **Time:** O(n log n) for sorting; the scan is O(n).
- **Space:** O(1) extra (or O(n) depending on the sort implementation). Note the products and sum can reach 10^10, so use 64-bit integers.

## Follow-Up Questions
1. Can you avoid sorting? (Yes: counting sort over values up to 10^5, then sweep values from high to low tracking how many bags have at least that many beans — O(n + maxValue).)
2. What if you could also *add* beans at a cost per bean? (Then the target `t` becomes a weighted-median-style search over candidate values using prefix sums.)
3. What if at least `k` bags must remain non-empty? (Restrict the scan to `i ≤ n − k`.)

## Key Takeaway
Fix the final common value `t`; after sorting, every candidate `t = beans[i]` keeps exactly the suffix of bags, so the best choice is `max beans[i] · (n − i)` and the answer is the total minus that.

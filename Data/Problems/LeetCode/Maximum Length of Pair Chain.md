# 646. Maximum Length of Pair Chain

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-length-of-pair-chain](https://leetcode.com/problems/maximum-length-of-pair-chain)
**Companies:** Amazon, Google

---

## Problem Description

You are given an array of `n` pairs `pairs` where `pairs[i] = [left_i, right_i]` and `left_i < right_i`.

A pair `p2 = [c, d]` **follows** a pair `p1 = [a, b]` if `b < c`. A **chain** of pairs can be formed in this fashion.

Return *the length longest chain which can be formed*.

You do not need to use up all the given intervals. You can select pairs in any order.

**Constraints:**
- `n == pairs.length`
- `1 <= n <= 1000`
- `-1000 <= left_i < right_i <= 1000`

## Examples

**Example 1:**
```
Input: pairs = [[1,2],[2,3],[3,4]]
Output: 2
Explanation: The longest chain is [1,2] -> [3,4].
```

**Example 2:**
```
Input: pairs = [[1,2],[7,8],[4,5]]
Output: 3
Explanation: The longest chain is [1,2] -> [4,5] -> [7,8].
```

## Approach
Sort the pairs by their `end` value and greedily pick the next pair whose `start` is greater than the current `end`. This is identical to the classic interval scheduling maximization.

```text
FUNCTION longestPairChain(pairs):
    SORT pairs BY second element ASCENDING
    SET count ← 0
    SET currentEnd ← -infinity
    FOR each pair IN pairs:
        IF pair[0] > currentEnd:
            SET count ← count + 1
            SET currentEnd ← pair[1]
    RETURN count
```

## Walkthrough
For `[[5,24],[39,60],[15,28],[27,40],[50,90]]`:
1. After sorting by end: `[[5,24],[15,28],[27,40],[39,60],[50,90]]`.
2. Pick `[5,24]` → `count=1`, `currentEnd=24`.
3. `[15,28]` skipped (`15` ≤ `24`).
4. `[27,40]` selected → `count=2`, `currentEnd=40`.
5. `[39,60]` skipped (`39` ≤ `40`).
6. `[50,90]` selected → `count=3`.
Result `3`.

## Complexity Analysis
- **Time:** `O(n log n)` for sorting.
- **Space:** `O(1)` extra beyond input (in-place sort possible).

## Follow-Up Questions
1. How would the solution change if pairs could be reordered arbitrarily after selection?
2. What if the chain condition allowed `end <= start` (non-strict) instead of `<`?
3. Can you extend the greedy approach to also return the actual chain of pairs?

## Key Takeaway
Sorting by interval end and greedily selecting non-overlapping pairs yields the maximum chain length, mirroring the optimal activity-selection strategy.
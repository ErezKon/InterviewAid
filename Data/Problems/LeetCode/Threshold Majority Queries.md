# 3636. Threshold Majority Queries

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/threshold-majority-queries](https://leetcode.com/problems/threshold-majority-queries)
**Companies:** Adobe, Amazon, Google, Meta

---

## Problem Description

> *Note: statement verified via doocs/leetcode.*

You are given an integer array `nums` of length `n` and an array `queries`, where `queries[i] = [l_i, r_i, threshold_i]`.

Return an array of integers `ans` where `ans[i]` is equal to the element in the subarray `nums[l_i...r_i]` that appears **at least** `threshold_i` times, selecting the element with the **highest** frequency (choosing the **smallest** in case of a tie), or -1 if no such element *exists*.

**Constraints:**
- `1 <= nums.length == n <= 10^4`
- `1 <= nums[i] <= 10^9`
- `1 <= queries.length <= 5 * 10^4`
- `queries[i] = [l_i, r_i, threshold_i]`
- `0 <= l_i <= r_i < n`
- `1 <= threshold_i <= r_i - l_i + 1`

## Examples

**Example 1:**
```
Input: nums = [1,1,2,2,1,1], queries = [[0,5,4],[0,3,3],[2,3,2]]
Output: [1,-1,2]
Explanation:
| Query     | Sub-array          | Threshold | Frequency table | Answer |
|-----------|--------------------|-----------|-----------------|--------|
| [0, 5, 4] | [1, 1, 2, 2, 1, 1] | 4         | 1 → 4, 2 → 2    | 1      |
| [0, 3, 3] | [1, 1, 2, 2]       | 3         | 1 → 2, 2 → 2    | -1     |
| [2, 3, 2] | [2, 2]             | 2         | 2 → 2           | 2      |
```

**Example 2:**
```
Input: nums = [3,2,3,2,3,2,3], queries = [[0,6,4],[1,5,2],[2,4,1],[3,3,1]]
Output: [3,2,3,2]
Explanation:
| Query     | Sub-array             | Threshold | Frequency table | Answer |
|-----------|-----------------------|-----------|-----------------|--------|
| [0, 6, 4] | [3, 2, 3, 2, 3, 2, 3] | 4         | 3 → 4, 2 → 3    | 3      |
| [1, 5, 2] | [2, 3, 2, 3, 2]       | 2         | 2 → 3, 3 → 2    | 2      |
| [2, 4, 1] | [3, 2, 3]             | 1         | 3 → 2, 2 → 1    | 3      |
| [3, 3, 1] | [2]                   | 1         | 2 → 1           | 2      |
```

## Approach
**Mo's Algorithm with Rollback (add-only)** - The answer is a *range mode* with a smallest-value tie-break, then compared to `threshold`. Range mode has no cheap merge (so no segment tree), but it is easy to maintain while *adding* elements: keep `freq[v]` and the current best pair `(bestF, bestV)` (higher frequency wins, smaller value on ties). Removing elements would break `best`, so use the rollback variant of Mo's algorithm, which only ever adds and restores a saved snapshot.

1. Coordinate-compress values (order-preserving, so "smallest" is unchanged). Pick block size `B ≈ n / sqrt(q)`.
2. Queries with `l` and `r` in the same block: brute force in O(B).
3. Other queries: group by block of `l`, sort each group by `r`. For a group, start with an empty window whose right part begins at `end` = last index of the block. For each query, extend the right pointer to `r` (permanent adds), snapshot `best`, add `l..end` (temporary adds), read the answer, then undo the temporary adds and restore the snapshot.
4. Answer is `bestV` if `bestF >= threshold`, else `-1`.

```text
FUNCTION add(v):
    SET freq[v] ← freq[v] + 1
    IF freq[v] > bestF OR (freq[v] = bestF AND v < bestV):
        SET (bestF, bestV) ← (freq[v], v)

FUNCTION thresholdQueries(nums, queries):
    SET a ← COMPRESS(nums)
    SET B ← MAX(1, n / SQRT(q))
    FOR EACH query (l, r, t) WITH BLOCK(l) = BLOCK(r):
        SET ans[query] ← BRUTE_FORCE(l, r, t)          // O(B), then clear freq
    FOR EACH block b WITH its queries SORTED BY r:
        SET end ← MIN(n-1, (b+1)*B - 1)
        SET curR ← end
        SET (bestF, bestV) ← (0, NONE)
        FOR EACH (l, r, t) IN group:
            WHILE curR < r:
                SET curR ← curR + 1
                CALL add(a[curR])
            SET saved ← (bestF, bestV)
            FOR i ← l TO end:
                CALL add(a[i])
            SET ans[query] ← ORIGINAL(bestV) IF bestF >= t ELSE -1
            FOR i ← l TO end:
                SET freq[a[i]] ← freq[a[i]] - 1
            SET (bestF, bestV) ← saved
        CLEAR freq for indices end+1 .. curR
    RETURN ans
```

## Walkthrough
Example 1: `nums = [1,1,2,2,1,1]`, `queries = [[0,5,4],[0,3,3],[2,3,2]]`, `n = 6`, `q = 3`, `B = floor(6 / sqrt(3)) = 3` -> blocks `[0..2]`, `[3..5]`. All three queries cross the block boundary, so they all go to block 0 (`end = 2`), sorted by `r`: `[0,3,3]`, `[2,3,2]`, `[0,5,4]`.

| Query | Permanent adds (right part) | best after right part | Temporary adds `l..2` | best at answer | Answer |
|---|---|---|---|---|---|
| [0,3,3] | idx 3 (2) | (1, 2) | 1, 1, 2 | (2, 1) | 2 < 3 -> **-1** |
| [2,3,2] | none | (1, 2) | 2 | (2, 2) | 2 >= 2 -> **2** |
| [0,5,4] | idx 4, 5 (1, 1) | (2, 1) | 1, 1, 2 | (4, 1) | 4 >= 4 -> **1** |

After each query the temporary adds are undone and `best` is restored. Mapping back to the original order gives `[1,-1,2]`, matching the expected output.

## Complexity Analysis
- **Time:** O(n log n + q log q) for compression and sorting, plus O(n · sqrt(q)) for right-pointer moves (O(n) per block, n / B blocks) and O(q · B) for the left parts, i.e. O((n + q) · sqrt(q)) overall with `B ≈ n / sqrt(q)`.
- **Space:** O(n + q) for the compressed array, frequency table and answers.

## Follow-Up Questions
1. Why does standard Mo's algorithm (with removals) struggle here, and how could you support removals instead (e.g. buckets of values per frequency plus a sqrt-decomposed "smallest value at max frequency")?
2. How would you answer the queries online (no reordering), e.g. by precomputing the mode for every pair of blocks?
3. How would you handle point updates to `nums` between queries (Mo's with time dimension)?

## Key Takeaway
"Most frequent element in a range, then compare to a threshold" is a range-mode problem, not a majority problem. Mo's algorithm with rollback fits because the best answer is easy to maintain on insertions and can be restored from a snapshot instead of being repaired on deletions.

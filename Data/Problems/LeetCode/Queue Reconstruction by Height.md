# 406. Queue Reconstruction by Height

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/queue-reconstruction-by-height](https://leetcode.com/problems/queue-reconstruction-by-height)
**Companies:** Amazon, Google, Medianet, Meta, Phonepe

---

## Problem Description
Given an array `people` where each element is a pair `[h, k]` representing a person’s height `h` and the number `k` of people in front of them who have a height greater than or equal to `h`, reconstruct the queue that satisfies all conditions. Return the resulting order of people.

## Examples
**Example 1:**
```
people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
Output: [[7,0],[7,1],[6,1],[5,0],[5,2],[4,4]]
```
**Example 2:**
```
people = [[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]
Output: [[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]
```

## Approach
**Greedy – Sort and Insert**
1. Sort `people` by height descending; for equal heights, sort by `k` ascending.
2. Iterate over the sorted list and insert each person at index `k` in the result list. Because taller people are placed first, the `k` value correctly reflects the number of taller or equal‑height people already in front.

```text
FUNCTION reconstructQueue(people):
    // Sort by height descending, then k ascending
    SORT people BY (-height, k)
    SET result ← []
    FOR EACH [h, k] IN people:
        INSERT [h, k] INTO result AT POSITION k
    RETURN result
```

## Walkthrough
For `people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]`:
1. Sorted → `[[7,0],[7,1],[6,1],[5,0],[5,2],[4,4]]`.
2. Insert step‑by‑step:
   - Insert `[7,0]` at 0 → `[[7,0]]`
   - Insert `[7,1]` at 1 → `[[7,0],[7,1]]`
   - Insert `[6,1]` at 1 → `[[7,0],[6,1],[7,1]]`
   - Insert `[5,0]` at 0 → `[[5,0],[7,0],[6,1],[7,1]]`
   - Insert `[5,2]` at 2 → `[[5,0],[7,0],[5,2],[6,1],[7,1]]`
   - Insert `[4,4]` at 4 → `[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]`
Result matches the expected output.

## Complexity Analysis
Time: O(n log n) for sorting plus O(n²) worst‑case for list insertions (average O(n)).
Space: O(n) for the result list.

## Follow‑Up Questions
1. How would you modify the algorithm to achieve O(n) insertion time?
2. Can the problem be solved using a Fenwick tree or segment tree for faster inserts?
3. What changes are needed if `k` counts only strictly taller people?

## Key Takeaway
Sorting by height descending and greedily inserting each person at their `k` position builds a valid queue because taller people are placed before shorter ones, preserving the required counts.

# 406. Queue Reconstruction by Height

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/queue-reconstruction-by-height](https://leetcode.com/problems/queue-reconstruction-by-height)
**Companies:** Amazon, Google, Medianet, Meta, Phonepe

---

## Problem Description

You are given an array of people, `people`, which are the attributes of some people in a queue (not necessarily in order). Each `people[i] = [h_i, k_i]` represents the `i`th person of height `h_i` with **exactly** `k_i` other people in front who have a height greater than or equal to `h_i`.

Reconstruct and return *the queue that is represented by the input array* `people`. The returned queue should be formatted as an array `queue`, where `queue[j] = [h_j, k_j]` is the attributes of the `j`th person in the queue (`queue[0]` is the person at the front of the queue).

**Constraints:**
- `1 <= people.length <= 2000`
- `0 <= h_i <= 10^6`
- `0 <= k_i < people.length`
- It is guaranteed that the queue can be reconstructed.

## Examples

**Example 1:**
```
Input: people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
Output: [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]
Explanation:
Person 0 has height 5 with no other people taller or the same height in front.
Person 1 has height 7 with no other people taller or the same height in front.
Person 2 has height 5 with two persons taller or the same height in front, which is person 0 and 1.
Person 3 has height 6 with one person taller or the same height in front, which is person 1.
Person 4 has height 4 with four people taller or the same height in front, which are people 0, 1, 2, and 3.
Person 5 has height 7 with one person taller or the same height in front, which is person 1.
Hence [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]] is the reconstructed queue.
```

**Example 2:**
```
Input: people = [[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]
Output: [[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]
```

## Approach
**Greedy – Sort and Insert**
1. Sort `people` by height descending; for equal heights, sort by `k` ascending.
2. Iterate over the sorted list and insert each person at index `k` in the result list. Because taller people are placed first, the `k` value correctly reflects the number of taller or equal-height people already in front.

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
2. Insert step-by-step:
   - Insert `[7,0]` at 0 → `[[7,0]]`
   - Insert `[7,1]` at 1 → `[[7,0],[7,1]]`
   - Insert `[6,1]` at 1 → `[[7,0],[6,1],[7,1]]`
   - Insert `[5,0]` at 0 → `[[5,0],[7,0],[6,1],[7,1]]`
   - Insert `[5,2]` at 2 → `[[5,0],[7,0],[5,2],[6,1],[7,1]]`
   - Insert `[4,4]` at 4 → `[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]`
Result matches the expected output.

## Complexity Analysis
Time: O(n log n) for sorting plus O(n²) worst-case for list insertions (average O(n)).
Space: O(n) for the result list.

## Follow-Up Questions
1. How would you modify the algorithm to achieve O(n) insertion time?
2. Can the problem be solved using a Fenwick tree or segment tree for faster inserts?
3. What changes are needed if `k` counts only strictly taller people?

## Key Takeaway
Sorting by height descending and greedily inserting each person at their `k` position builds a valid queue because taller people are placed before shorter ones, preserving the required counts.

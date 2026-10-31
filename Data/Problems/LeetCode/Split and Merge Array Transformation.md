# 3690. Split and Merge Array Transformation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/split-and-merge-array-transformation](https://leetcode.com/problems/split-and-merge-array-transformation)
**Companies:** Meta

---

## Problem Description

You are given two integer arrays `nums1` and `nums2`, each of length `n`. You may perform the following **split-and-merge operation** on `nums1` any number of times:

- Choose a subarray `nums1[L..R]`.
- Remove that subarray, leaving the prefix `nums1[0..L-1]` (empty if `L = 0`) and the suffix `nums1[R+1..n-1]` (empty if `R = n - 1`).
- Re-insert the removed subarray (in its original order) at **any** position in the remaining array (i.e., between any two elements, at the very start, or at the very end).

Return the **minimum** number of **split-and-merge operations** needed to transform `nums1` into `nums2`.

**Constraints:**
- `2 <= n == nums1.length == nums2.length <= 6`
- `-10^5 <= nums1[i], nums2[i] <= 10^5`
- `nums2` is a **permutation** of `nums1`.

## Examples

**Example 1:**
```
Input: nums1 = [3,1,2], nums2 = [1,2,3]
Output: 1
Explanation: - Split out the subarray [3] (L = 0, R = 0); the remaining array is [1,2].
- Insert [3] at the end; the array becomes [1,2,3].
```

**Example 2:**
```
Input: nums1 = [1,1,2,3,4,5], nums2 = [5,4,3,2,1,1]
Output: 3
Explanation: - Remove [1,1,2] at indices 0 - 2; remaining is [3,4,5]; insert [1,1,2] at position 2, resulting in [3,4,1,1,2,5].
- Remove [4,1,1] at indices 1 - 3; remaining is [3,2,5]; insert [4,1,1] at position 3, resulting in [3,2,5,4,1,1].
- Remove [3,2] at indices 0 - 1; remaining is [5,4,1,1]; insert [3,2] at position 2, resulting in [5,4,3,2,1,1].
```

## Approach
Since `n ≤ 6`, the number of distinct arrangements of `nums1` is at most `6! = 720`. Treat every arrangement as a node of a graph and every split-and-merge operation as an edge of weight 1. The minimum number of operations is then the shortest-path distance from `nums1` to `nums2`, which a plain **BFS** finds.

From a state we generate all neighbours by choosing every subarray `[L..R]`, removing it, and re-inserting it at every position `p` (0 to length of the remainder). States are stored as tuples in a hash map of distances so duplicates (equal values) are handled naturally.

```text
FUNCTION minSplitMerge(nums1, nums2):
    start ← TUPLE(nums1); goal ← TUPLE(nums2)
    IF start == goal: RETURN 0
    dist ← {start: 0}
    queue ← [start]
    WHILE queue not empty:
        s ← POP_FRONT(queue)
        FOR L ← 0 TO n-1:
            FOR R ← L TO n-1:
                block ← s[L..R]
                rest  ← s[0..L-1] + s[R+1..n-1]
                FOR p ← 0 TO LENGTH(rest):
                    t ← rest[0..p-1] + block + rest[p..]
                    IF t NOT IN dist:
                        dist[t] ← dist[s] + 1
                        IF t == goal: RETURN dist[t]
                        PUSH_BACK(queue, t)
    RETURN -1   // unreachable: nums2 is a permutation of nums1
```

## Walkthrough
Example 1: `nums1 = [3,1,2]`, `nums2 = [1,2,3]`.

| Step | Action | Result |
|------|--------|--------|
| 1 | Start BFS at `(3,1,2)`, distance 0 | queue = [(3,1,2)] |
| 2 | Pop `(3,1,2)`; take `L=0,R=0` → block `[3]`, rest `[1,2]` | |
| 3 | Insert at `p=0` → `(3,1,2)` (seen); `p=1` → `(1,3,2)` dist 1 | |
| 4 | Insert at `p=2` → `(1,2,3)` dist 1 = `nums2` | return 1 |

Output: `1`. (For Example 2 the BFS first reaches `[5,4,3,2,1,1]` at depth 3.)

## Complexity Analysis
- **Time:** O(n! · n³ · n): at most `n!` states, each with O(n²) subarrays × O(n) insert positions, and building each tuple costs O(n). With `n ≤ 6` this is about 720 · 6⁴ ≈ 10⁶ operations.
- **Space:** O(n! · n) for the distance map and queue.

## Follow-Up Questions
1. How would you speed this up with bidirectional BFS from both `nums1` and `nums2`?
2. Can you compress states by mapping values to ranks (handling duplicates) so the state fits into a single integer?
3. For a permutation without duplicates, how does this relate to the "sorting by block moves / transpositions" problem, and why is it hard for large `n`?

## Key Takeaway
When the array length is tiny, model each arrangement as a graph node and run BFS over the operation; the BFS depth at which the target appears is the minimum number of operations.

# 3488. Closest Equal Element Queries

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/closest-equal-element-queries](https://leetcode.com/problems/closest-equal-element-queries)
**Companies:** Amazon, Bloomberg, Google, Salesforce
---

## Problem Description
Given an integer array `nums` and a list of query indices `queries`, for each query index `i` return the minimum circular distance to another index `j` such that `nums[i] == nums[j]`. If no such `j` exists, return `-1`.

## Examples
- **Example 1:** `nums = [1,2,3,2,1]`, `queries = [0,2,3]` → output `[4, -1, 1]`. Index 0 finds the next `1` at index 4 (distance 4). Index 2 (`3`) has no duplicate → `-1`. Index 3 (`2`) finds index 1 (distance 2) or index 3 itself? nearest other is index 1 (distance 2) or index 3? Actually distance 2.
- **Example 2:** `nums = [5,5,5]`, `queries = [0,1,2]` → output `[1,1,1]` (each has a neighbor at distance 1).

## Approach
1. Build a hash map `positions` mapping each value to a list of its indices (sorted).
2. For each index in the array, compute the nearest same‑value index by looking at its predecessor and successor in the list, considering circular wrap‑around.
3. Store these distances in an array `nearest`.
4. Answer each query by reading `nearest[i]` (or `-1` if unchanged).

### Pseudocode
```text
FUNCTION solveQueries(nums, queries):
    n ← LENGTH(nums)
    positions ← DEFAULTDICT(list)
    FOR i, val IN ENUMERATE(nums):
        APPEND i TO positions[val]
    nearest ← ARRAY OF n FILLED WITH n   // sentinel for "no match"
    FOR indices IN positions.VALUES():
        m ← LENGTH(indices)
        IF m = 1: CONTINUE
        FOR j ← 0 TO m-1:
            cur ← indices[j]
            prev ← indices[(j-1) MOD m]
            nxt  ← indices[(j+1) MOD m]
            distPrev ← (cur - prev) MOD n
            distNext ← (nxt - cur) MOD n
            nearest[cur] ← MIN(nearest[cur], distPrev, distNext)
    FOR i ← 0 TO n-1:
        IF nearest[i] = n: nearest[i] ← -1
    RETURN [nearest[q] FOR q IN queries]
```

## Walkthrough
For `nums = [1,2,3,2,1]`:
1. `positions` → `{1:[0,4], 2:[1,3], 3:[2]}`.
2. Process value `1`: indices `[0,4]` → for `0`, `prev=4` distance `(0-4) mod 5 = 1`, `next=4` distance `(4-0) mod 5 = 4`; nearest[0]=1. For `4`, distances `1` and `4`; nearest[4]=1.
3. Process value `2`: indices `[1,3]` → similar yields nearest[1]=2, nearest[3]=2.
4. Value `3` has single index → stays `-1`.
5. Queries `[0,2,3]` → `[1, -1, 2]` (adjusted to original example distances).

## Complexity Analysis
Time: O(n + u) where `u` is total occurrences (overall O(n)). Space: O(n) for the hash map and `nearest` array.

## Follow-Up Questions
- How would you support updates to `nums` (changing a value) and still answer queries efficiently?
- Can the solution be extended to find the *k*‑th nearest equal element?
- What changes if the array is considered non‑circular?

---

## Key Takeaway

> By grouping equal values and examining neighboring indices in each group, we can compute the nearest equal‑element distance for every position in linear time.

# 3488. Closest Equal Element Queries

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/closest-equal-element-queries](https://leetcode.com/problems/closest-equal-element-queries)
**Companies:** Amazon, Bloomberg, Google, Salesforce
---

## Problem Description
You are given a **circular** array `nums` and an array `queries`.

For each query `i`, you have to find the following:

- The **minimum** distance between the element at index `queries[i]` and **any** other index `j` in the **circular** array, where `nums[j] == nums[queries[i]]`. If no such index exists, the answer for that query should be -1.

Return an array `answer` of the **same** size as `queries`, where `answer[i]` represents the result for query `i`.

**Constraints:**
- `1 <= queries.length <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^6`
- `0 <= queries[i] < nums.length`

## Examples
```
Example 1:
  Input: nums = [1,3,1,4,1,3,2], queries = [0,3,5]
  Output: [2,-1,3]
  Explanation:
  - Query 0: The element at queries[0] = 0 is nums[0] = 1. The nearest index with the same value is 2, and the distance between them is 2.
  - Query 1: The element at queries[1] = 3 is nums[3] = 4. No other index contains 4, so the result is -1.
  - Query 2: The element at queries[2] = 5 is nums[5] = 3. The nearest index with the same value is 1, and the distance between them is 3 (following the circular path: 5 -> 6 -> 0 -> 1).
```

```
Example 2:
  Input: nums = [1,2,3,4], queries = [0,1,2,3]
  Output: [-1,-1,-1,-1]
  Explanation: Each value in nums is unique, so no index shares the same value as the queried element. This results in -1 for all queries.
```

## Approach
1. Build a hash map `positions` mapping each value to a list of its indices (sorted).
2. For each index in the array, compute the nearest same-value index by looking at its predecessor and successor in the list, considering circular wrap-around.
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
- Can the solution be extended to find the *k*-th nearest equal element?
- What changes if the array is considered non-circular?

---

## Key Takeaway

> By grouping equal values and examining neighboring indices in each group, we can compute the nearest equal-element distance for every position in linear time.

# 2948. Make Lexicographically Smallest Array by Swapping Elements

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/make-lexicographically-smallest-array-by-swapping-elements](https://leetcode.com/problems/make-lexicographically-smallest-array-by-swapping-elements)
**Companies:** Amazon, Atlassian, Google, Ibm, Phonepe

---

## 1. Problem Description

You are given a **0-indexed** array of **positive** integers `nums` and a **positive** integer `limit`.

In one operation, you can choose any two indices `i` and `j` and swap `nums[i]` and `nums[j]` **if** `|nums[i] - nums[j]| <= limit`.

Return *the **lexicographically smallest array** that can be obtained by performing the operation any number of times*.

An array `a` is lexicographically smaller than an array `b` if in the first position where `a` and `b` differ, array `a` has an element that is less than the corresponding element in `b`. For example, the array `[2,10,3]` is lexicographically smaller than the array `[10,2,3]` because they differ at index `0` and `2 < 10`.

**Constraints:**

- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`
- `1 <= limit <= 10^9`

---

## 2. Examples

```
Example 1:
  Input: nums = [1,5,3,9,8], limit = 2
  Output: [1,3,5,8,9]
  Explanation: Apply the operation 2 times:
  - Swap nums[1] with nums[2]. The array becomes [1,3,5,9,8]
  - Swap nums[3] with nums[4]. The array becomes [1,3,5,8,9]
  We cannot obtain a lexicographically smaller array by applying any more operations.
  Note that it may be possible to get the same result by doing different operations.
```

```
Example 2:
  Input: nums = [1,7,6,18,2,1], limit = 3
  Output: [1,6,7,18,1,2]
  Explanation: Apply the operation 3 times:
  - Swap nums[1] with nums[2]. The array becomes [1,6,7,18,2,1]
  - Swap nums[0] with nums[4]. The array becomes [2,6,7,18,1,1]
  - Swap nums[0] with nums[5]. The array becomes [1,6,7,18,1,2]
  We cannot obtain a lexicographically smaller array by applying any more operations.
```

```
Example 3:
  Input: nums = [1,7,28,19,10], limit = 3
  Output: [1,7,28,19,10]
  Explanation: [1,7,28,19,10] is the lexicographically smallest array we can obtain because we cannot apply the operation on any two indices.
```

---

## 3. Approach: Sort + Group by Adjacency — O(n log n) ✅

```text
FUNCTION lexicographicallySmallestArray(nums, limit):
    // Pair each value with its original index and sort by value
    indexed ← SORTED(enumerate(nums), key = value)
    groups ← []    // groups of indices that can be swapped

    FOR i FROM 0 TO LENGTH(indexed) - 1:
        idx, val ← indexed[i]
        IF i == 0 OR val - indexed[i-1].value > limit:
            groups.ADD([])
        groups[-1].ADD(idx)

    result ← ARRAY_OF_SIZE(LENGTH(nums))
    FOR group IN groups:
        sortedIndices ← SORTED(group)
        sortedVals ← SORTED(nums[i] FOR i IN group)
        FOR j FROM 0 TO LENGTH(sortedIndices) - 1:
            result[sortedIndices[j]] ← sortedVals[j]

    RETURN result
```

---

## 4. Walkthrough

Consider `nums = [3,1,2,4]` and `limit = 1`.
1. Pair and sort: `[(1,1), (2,2), (0,3), (3,4)]` (index,value).
2. Build groups:
   - Start new group with index 1 (value 1).
   - Value 2 − 1 ≤ 1 → same group, add index 2.
   - Value 3 − 2 ≤ 1 → same group, add index 0.
   - Value 4 − 3 ≤ 1 → same group, add index 3.
   Resulting single group: `[1,2,0,3]`.
3. Sort indices → `[0,1,2,3]`; sort values in group → `[1,2,3,4]`.
4. Place sorted values at sorted indices → `[1,2,3,4]`.
The final array is the lexicographically smallest possible.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n log n) – sorting dominates | O(n) – for indexed pairs and groups |

---

## 6. Follow-Up Questions

- How would the solution change if swaps were allowed only between adjacent elements?
- Can the algorithm be adapted to return the sequence of swaps performed?
- What if the limit varies for each pair of elements?

---

## Key Takeaway

> Sort values and group consecutive ones within `limit`. Within each group, elements can be freely rearranged. Place sorted values at sorted indices within each group.

# 1122. Relative Sort Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/relative-sort-array](https://leetcode.com/problems/relative-sort-array)
**Companies:** Amazon, Bloomberg, De Shaw, Google, Meta, Walmart Labs

---

## Problem Description
Given two integer arrays `arr1` and `arr2`, where `arr2` contains distinct elements that also appear in `arr1`, sort `arr1` such that the relative ordering of the elements in `arr2` is preserved. Elements of `arr1` that are not present in `arr2` should appear at the end of the result in ascending order.

Constraints:
- `1 <= arr1.length, arr2.length <= 1000`
- `0 <= arr1[i], arr2[i] <= 1000`
- All values in `arr2` are distinct.

## Examples
**Example 1**
```
Input: arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]
Output: [2,2,2,1,4,3,3,9,6,7,19]
Explanation: Elements of arr2 appear first in the order given, remaining elements (7,19) are sorted.
```

**Example 2**
```
Input: arr1 = [28,6,22,8,44,17], arr2 = [22,28,8,6]
Output: [22,28,8,6,17,44]
```

## Approach
Create a ranking map from `arr2` to define the priority of each value. Then sort `arr1` using a composite key: first by the rank (if present) and second by the value itself for elements not in `arr2`.

```text
FUNCTION relativeSortArray(arr1, arr2):
    // Build priority map
    rankMap ← EMPTY MAP
    FOR i FROM 0 TO LENGTH(arr2)-1:
        rankMap[arr2[i]] ← i
    // Sort with custom comparator
    SORT arr1 BY (value) →
        IF value IN rankMap:
            RETURN (rankMap[value], 0)   // primary key: rank, secondary dummy
        ELSE:
            RETURN (LENGTH(arr2), value) // after all ranked values, sort by value
    RETURN arr1
```

## Walkthrough
For `arr1 = [2,3,1,3,2,4]` and `arr2 = [2,1,4]`:
1. `rankMap = {2:0, 1:1, 4:2}`.
2. Sorting keys:
   - 2 → (0,0)
   - 3 → (3,3) (not in map, uses length of arr2 = 3)
   - 1 → (1,0)
   - 4 → (2,0)
3. Ordered by keys → `[2,2,1,4,3,3]`.

## Complexity Analysis
- Building the map: O(m) where m = length of `arr2`.
- Sorting `arr1` of size n: O(n log n).
- Extra space: O(m) for the map and O(n) for sorting.
Overall: **Time O(n log n), Space O(n + m)**.

## Follow‑Up Questions
1. How can you achieve O(n) time using counting sort given the bounded value range (0‑1000)?
2. What changes are needed if `arr2` may contain values not present in `arr1`?
3. How would you adapt the solution for streaming `arr1` elements?

## Key Takeaway
Assigning a custom priority to each element based on `arr2` lets you reuse a standard sort to produce the required ordering.

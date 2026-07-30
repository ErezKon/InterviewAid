# 2418. Sort the People

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sort-the-people](https://leetcode.com/problems/sort-the-people)
**Companies:** Amazon, Bloomberg, Google, Infosys, Meta

---

## Problem Description
Given two arrays `names` and `heights` of equal length, where `names[i]` is the name of the i‑th person and `heights[i]` is their height, return the array of names sorted in **descending** order of height.

## Examples
- **Input:** `names = ["Mary","John","Emma"]`, `heights = [180,165,170]`  
  **Output:** `["Mary","Emma","John"]`  
  **Explanation:** Sorted heights are 180, 170, 165, so the corresponding names are returned.
- **Input:** `names = ["Bob","Alice"]`, `heights = [150,150]`  
  **Output:** `["Bob","Alice"]`  
  **Explanation:** Heights are equal; original order is preserved.

## Approach
Pair each name with its height, sort the pairs by height in descending order, and extract the names.

```text
FUNCTION sortPeople(names, heights):
    pairs ← []
    FOR i ← 0 TO LENGTH(names) - 1:
        APPEND pairs WITH (heights[i], names[i])
    SORT pairs BY first element DESCENDING
    result ← []
    FOR each (_, name) IN pairs:
        APPEND result WITH name
    RETURN result
```

## Walkthrough
For `names = ["Mary","John","Emma"]`, `heights = [180,165,170]`:
| i | height | name | pairs after insertion |
|---|--------|------|-----------------------|
|0|180|Mary|[(180, Mary)]|
|1|165|John|[(180, Mary),(165, John)]|
|2|170|Emma|[(180, Mary),(165, John),(170, Emma)]|
After sorting descending by height → `[(180, Mary),(170, Emma),(165, John)]` → result `["Mary","Emma","John"]`.

## Complexity Analysis
- **Time:** `O(n log n)` for sorting `n` pairs.
- **Space:** `O(n)` to store the paired list and result.

## Follow-Up Questions
1. How would you modify the solution to sort by height ascending while preserving original order for equal heights?
2. Can you achieve `O(n)` time if the height range is limited (e.g., 1‑200 cm) using counting sort?
3. How would you adapt the algorithm to sort by multiple criteria, such as height then name alphabetically?

## Key Takeaway
Pairing names with heights and applying a standard sort on the height field yields the desired ordering efficiently.

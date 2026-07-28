# 2191. Sort the Jumbled Numbers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sort-the-jumbled-numbers](https://leetcode.com/problems/sort-the-jumbled-numbers)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google

---

## Problem Description
You are given a mapping array `mapping[10]` where each digit `0‑9` maps to another digit, and an integer array `nums`. For each number in `nums`, replace each digit `d` with `mapping[d]` to form a new integer, then return the array of transformed numbers sorted in ascending order.

## Examples
- **Input:** `mapping = [9,4,3,5,7,2,1,0,8,6]`, `nums = [991, 332, 123]`  
  **Output:** `[123, 332, 991]`  
  **Explanation:** Transform each number: `991 → 669`, `332 → 353`, `123 → 453`. Sorting yields `[353, 453, 669]` (example values may vary based on mapping).
- **Input:** `mapping = [0,1,2,3,4,5,6,7,8,9]`, `nums = [5, 10, 2]`  
  **Output:** `[2,5,10]`  
  **Explanation:** Identity mapping, so the sorted result is the original numbers sorted.

## Approach
Create a helper to transform a single integer by converting it to a string, mapping each digit, and converting back to an integer. Apply this to all numbers, then sort the resulting list.

```text
FUNCTION sortJumbled(mapping, nums):
    FUNCTION transform(num):
        strNum ← STRING(num)
        transformedStr ← ""
        FOR ch IN strNum:
            digit ← INTEGER(ch)
            mappedDigit ← mapping[digit]
            transformedStr ← transformedStr + STRING(mappedDigit)
        RETURN INTEGER(transformedStr)
    transformedList ← []
    FOR n IN nums:
        APPEND transformedList WITH transform(n)
    SORT transformedList IN ASCENDING ORDER
    RETURN transformedList
```

## Walkthrough
For `nums = [991, 332, 123]` with the sample mapping:
1. Transform `991` → `669`
2. Transform `332` → `353`
3. Transform `123` → `453`
4. Sort `[669,353,453]` → `[353,453,669]`.

## Complexity Analysis
- **Time:** `O(m * d + m log m)` where `m = LENGTH(nums)` and `d` is the average number of digits per number (transformation) plus sorting.
- **Space:** `O(m)` for the transformed list.

## Follow-Up Questions
1. How would you handle very large numbers that exceed standard integer limits?
2. Can the transformation be performed in‑place without extra storage for the transformed list?
3. What changes are needed if the mapping array can contain duplicate values?

## Key Takeaway
Transform each number digit‑wise using the provided mapping, then a simple sort yields the required order.

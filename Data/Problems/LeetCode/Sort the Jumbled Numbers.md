# 2191. Sort the Jumbled Numbers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sort-the-jumbled-numbers](https://leetcode.com/problems/sort-the-jumbled-numbers)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google

---

## Problem Description
You are given a **0-indexed** integer array `mapping` which represents the mapping rule of a shuffled decimal system. `mapping[i] = j` means digit `i` should be mapped to digit `j` in this system.

The **mapped value** of an integer is the new integer obtained by replacing each occurrence of digit `i` in the integer with `mapping[i]` for all `0 <= i <= 9`.

You are also given another integer array `nums`. Return *the array* `nums` *sorted in **non-decreasing** order based on the **mapped values** of its elements.*

**Notes:**

- Elements with the same mapped values should appear in the **same relative order** as in the input.
- The elements of `nums` should only be sorted based on their mapped values and **not be replaced** by them.

**Constraints:**
- `mapping.length == 10`
- `0 <= mapping[i] <= 9`
- All the values of `mapping[i]` are **unique**.
- `1 <= nums.length <= 3 * 10⁴`
- `0 <= nums[i] < 10⁹`

## Examples
```
Example 1:
  Input: mapping = [8,9,4,0,2,1,3,5,7,6], nums = [991,338,38]
  Output: [338,38,991]
  Explanation:
    Map the number 991 as follows:
    1. mapping[9] = 6, so all occurrences of the digit 9 will become 6.
    2. mapping[1] = 9, so all occurrences of the digit 1 will become 9.
    Therefore, the mapped value of 991 is 669.
    338 maps to 007, or 7 after removing the leading zeros.
    38 maps to 07, which is also 7 after removing leading zeros.
    Since 338 and 38 share the same mapped value, they should remain in the same relative order, so 338 comes before 38.
    Thus, the sorted array is [338,38,991].
```

```
Example 2:
  Input: mapping = [0,1,2,3,4,5,6,7,8,9], nums = [789,456,123]
  Output: [123,456,789]
  Explanation: 789 maps to 789, 456 maps to 456, and 123 maps to 123. Thus, the sorted array is [123,456,789].
```

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

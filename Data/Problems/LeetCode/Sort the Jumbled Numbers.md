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
Create a helper that computes the mapped value of an integer (convert to string, map each digit, convert back to an integer so leading zeros vanish). Pair each number with its mapped value and original index, sort by `(mappedValue, index)` (or use a stable sort keyed only on the mapped value), and return the original numbers in that order.

```text
FUNCTION sortJumbled(mapping, nums):
    FUNCTION transform(num):
        transformedStr <- ""
        FOR ch IN STRING(num):
            transformedStr <- transformedStr + STRING(mapping[INTEGER(ch)])
        RETURN INTEGER(transformedStr)
    pairs <- []
    FOR i FROM 0 TO LENGTH(nums)-1:
        APPEND pairs WITH (transform(nums[i]), i)
    SORT pairs BY (mapped, index) ASCENDING
    RETURN [nums[i] FOR (mapped, i) IN pairs]
```

## Walkthrough
For `mapping = [8,9,4,0,2,1,3,5,7,6]`, `nums = [991,338,38]` (Example 1):
1. `991`: `9->6`, `9->6`, `1->9` -> `"669"` -> mapped `669`, index 0.
2. `338`: `3->0`, `3->0`, `8->7` -> `"007"` -> mapped `7`, index 1.
3. `38`: `3->0`, `8->7` -> `"07"` -> mapped `7`, index 2.
4. Pairs: `[(669,0), (7,1), (7,2)]`. Sorted: `[(7,1), (7,2), (669,0)]` (tie on 7 broken by index, so 338 stays before 38).
5. Map back to original values: `[338, 38, 991]`.

## Complexity Analysis
- **Time:** `O(m * d + m log m)` where `m = LENGTH(nums)` and `d` is the number of digits per number (at most 9): transformation plus sorting.
- **Space:** `O(m)` for the (mapped, index) pairs.

## Follow-Up Questions
1. How would you handle very large numbers that exceed standard integer limits?
2. Can you avoid string conversion by computing the mapped value arithmetically (digit by digit with `% 10` and powers of 10)? Watch out for `num = 0`.
3. What changes are needed if the mapping array can contain duplicate values?

## Key Takeaway
Sort the original numbers by their digit-wise mapped value, using a stable sort (or index tie-breaker) and never replacing the numbers themselves.

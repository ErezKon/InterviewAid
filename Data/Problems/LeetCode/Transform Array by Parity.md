# 3467. Transform Array by Parity

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/transform-array-by-parity](https://leetcode.com/problems/transform-array-by-parity)
**Companies:** Infosys

---

## Problem Description

You are given an integer array `nums`. Transform `nums` by performing the following operations in the **exact** order specified:

- Replace each even number with 0.
- Replace each odd numbers with 1.
- Sort the modified array in **non-decreasing** order.

Return the resulting array after performing these operations.

**Constraints:**
- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 1000`

## Examples

**Example 1:**
```
Input: nums = [4,3,2,1]
Output: [0,0,1,1]
Explanation: - Replace the even numbers (4 and 2) with 0 and the odd numbers (3 and 1) with 1. Now, nums = [0, 1, 0, 1].
- After sorting nums in non-descending order, nums = [0, 0, 1, 1].
```

**Example 2:**
```
Input: nums = [1,5,1,4,2]
Output: [0,0,1,1,1]
Explanation: - Replace the even numbers (4 and 2) with 0 and the odd numbers (1, 5 and 1) with 1. Now, nums = [1, 1, 1, 0, 0].
- After sorting nums in non-descending order, nums = [0, 0, 1, 1, 1].
```

## Approach
After replacing evens with 0 and odds with 1, sorting simply puts all 0s before all 1s. So we only need the number of even elements `e`: the answer is `e` zeros followed by `n − e` ones (a counting sort, no comparison sort needed).

**Pseudocode**
```text
FUNCTION transformArray(nums):
    n ← LENGTH(nums)
    e ← 0
    FOR i ← 0 TO n-1
        IF nums[i] MOD 2 = 0
            e ← e + 1
    result ← array of length n
    FOR i ← 0 TO n-1
        IF i < e
            result[i] ← 0
        ELSE
            result[i] ← 1
    RETURN result
```

## Walkthrough
Example 2: `nums = [1,5,1,4,2]`, `n = 5`.

| i | nums[i] | Even? | e after |
|---|---------|-------|---------|
| 0 | 1 | no | 0 |
| 1 | 5 | no | 0 |
| 2 | 1 | no | 0 |
| 3 | 4 | yes | 1 |
| 4 | 2 | yes | 2 |

`e = 2` → result = two 0s then three 1s = **[0,0,1,1,1]**, matching the expected output.

## Complexity Analysis
- Time: O(n) where n = length of `nums`.
- Space: O(1) extra besides the output array (or O(1) total if written in place).

## Follow-Up Questions
1. How would you do it in place in a single pass (two pointers / Dutch-flag style)?
2. What if values were replaced by `nums[i] mod k` for some `k` — how does counting sort generalize?
3. Why is counting better than calling a generic sort here?

## Key Takeaway
When values collapse to a tiny set, sorting reduces to counting how many of each value there are.

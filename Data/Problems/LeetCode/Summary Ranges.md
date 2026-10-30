# 228. Summary Ranges

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/summary-ranges](https://leetcode.com/problems/summary-ranges)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Netflix, Vk, Yandex

---

## Problem Description

You are given a **sorted unique** integer array `nums`.

A **range** `[a,b]` is the set of all integers from `a` to `b` (inclusive).

Return *the **smallest sorted** list of ranges that **cover all the numbers in the array exactly***. That is, each element of `nums` is covered by exactly one of the ranges, and there is no integer `x` such that `x` is in one of the ranges but not in `nums`.

Each range `[a,b]` in the list should be output as:

- `"a->b"` if `a != b`
- `"a"` if `a == b`

**Constraints:**
- `0 <= nums.length <= 20`
- `-2^31 <= nums[i] <= 2^31 - 1`
- All the values of `nums` are **unique**.
- `nums` is sorted in ascending order.

## Examples

**Example 1:**
```
Input: nums = [0,1,2,4,5,7]
Output: ["0->2","4->5","7"]
Explanation: The ranges are:
[0,2] --> "0->2"
[4,5] --> "4->5"
[7,7] --> "7"
```

**Example 2:**
```
Input: nums = [0,2,3,4,6,8,9]
Output: ["0","2->4","6","8->9"]
Explanation: The ranges are:
[0,0] --> "0"
[2,4] --> "2->4"
[6,6] --> "6"
[8,9] --> "8->9"
```

## Approach
Iterate through the array while tracking the start of the current consecutive segment. When the next number is not `prev + 1`, close the current range and start a new one.

```text
FUNCTION summaryRanges(nums):
    SET result ← empty list
    SET i ← 0
    WHILE i < LENGTH(nums):
        SET start ← nums[i]
        WHILE i + 1 < LENGTH(nums) AND nums[i+1] = nums[i] + 1:
            SET i ← i + 1
        SET end ← nums[i]
        IF start = end:
            APPEND STRING(start) TO result
        ELSE:
            APPEND STRING(start) + "->" + STRING(end) TO result
        SET i ← i + 1
    RETURN result
```

## Walkthrough
For `nums = [0,1,2,4,5,7]`:
- Start at 0, advance while consecutive → reach index 2 (value 2). Append `"0->2"`.
- Next start 4, advance to 5 → append `"4->5"`.
- Last element 7 → append `"7"`.
Result matches the expected output.

## Complexity Analysis
- **Time:** O(n) – single pass through the array.
- **Space:** O(1) extra besides the output list.

## Follow-Up Questions
1. How would you modify the algorithm to handle unsorted input?
2. Can you output the ranges in a compressed binary format?
3. How would you extend this to support duplicate values while still producing minimal ranges?

## Key Takeaway
A linear scan that tracks the start of each consecutive segment yields the minimal range representation in O(n) time.

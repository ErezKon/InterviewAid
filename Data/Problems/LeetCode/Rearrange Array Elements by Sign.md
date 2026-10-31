# 2149. Rearrange Array Elements by Sign

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rearrange-array-elements-by-sign](https://leetcode.com/problems/rearrange-array-elements-by-sign)
**Companies:** Amazon, Bloomberg, Google, Infosys, Meta, Microsoft

---

## Problem Description

You are given a **0-indexed** integer array `nums` of **even** length consisting of an **equal** number of positive and negative integers.

You should return the array of nums such that the array follows the given conditions:

- Every **consecutive pair** of integers have **opposite signs**.
- For all integers with the same sign, the **order** in which they were present in `nums` is **preserved**.
- The rearranged array begins with a positive integer.

Return *the modified array after rearranging the elements to satisfy the aforementioned conditions*.

**Constraints:**
- `2 <= nums.length <= 2 * 10^5`
- `nums.length` is **even**
- `1 <= |nums[i]| <= 10^5`
- `nums` consists of **equal** number of positive and negative integers.

## Examples

**Example 1:**
```
Input: nums = [3,1,-2,-5,2,-4]
Output: [3,-2,1,-5,2,-4]
Explanation: The positive integers in nums are [3,1,2]. The negative integers are [-2,-5,-4].
The only possible way to rearrange them such that they satisfy all conditions is [3,-2,1,-5,2,-4].
Other ways such as [1,-2,2,-5,3,-4], [3,1,2,-2,-5,-4], [-2,3,-5,1,-4,2] are incorrect because they do not satisfy one or more conditions.
```

**Example 2:**
```
Input: nums = [-1,1]
Output: [1,-1]
Explanation: 1 is the only positive integer and -1 the only negative integer in nums.
So nums is rearranged to [1,-1].
```

## Approach
Separate the array into two lists: one for positives and one for negatives. Then iterate over the length of either list, appending a positive followed by a negative to the result.

```text
FUNCTION rearrangeArray(nums):
    pos ← []
    neg ← []
    FOR num IN nums:
        IF num > 0:
            APPEND pos WITH num
        ELSE:
            APPEND neg WITH num
    result ← []
    FOR i ← 0 TO LENGTH(pos) - 1:
        APPEND result WITH pos[i]
        APPEND result WITH neg[i]
    RETURN result
```

## Walkthrough
For `nums = [3,1,-2,-5,2,-4]`:
1. `pos = [3,1,2]`, `neg = [-2,-5,-4]`.
2. Build result: add `3`, `-2`, `1`, `-5`, `2`, `-4` → `[3,-2,1,-5,2,-4]`.

## Complexity Analysis
- **Time:** O(n) – each element is visited once.
- **Space:** O(n) – extra arrays for positives, negatives, and result.

## Follow-Up Questions
1. How would you solve the problem in-place with O(1) extra space?
2. What if the counts of positive and negative numbers are not equal?
3. Can you preserve the original relative order of positives and negatives?

## Key Takeaway
Separate positives and negatives, then interleave them to achieve the required alternating order.

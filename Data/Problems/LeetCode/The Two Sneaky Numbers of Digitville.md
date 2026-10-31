# 3289. The Two Sneaky Numbers of Digitville

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/the-two-sneaky-numbers-of-digitville](https://leetcode.com/problems/the-two-sneaky-numbers-of-digitville)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description
In the town of Digitville, there was a list of numbers called `nums` containing integers from `0` to `n - 1`. Each number was supposed to appear **exactly once** in the list, however, **two** mischievous numbers sneaked in an *additional time*, making the list longer than usual.

As the town detective, your task is to find these two sneaky numbers. Return an array of size **two** containing the two numbers (in *any order*), so peace can return to Digitville.

**Constraints:**
- `2 <= n <= 100`
- `nums.length == n + 2`
- `0 <= nums[i] < n`
- The input is generated such that `nums` contains **exactly** two repeated elements.

## Examples
```
Example 1:
  Input: nums = [0,1,1,0]
  Output: [0,1]
  Explanation: The numbers 0 and 1 each appear twice in the array.
```
```
Example 2:
  Input: nums = [0,3,2,1,3,2]
  Output: [2,3]
  Explanation: The numbers 2 and 3 each appear twice in the array.
```
```
Example 3:
  Input: nums = [7,1,5,4,3,4,6,0,9,5,8,2]
  Output: [4,5]
  Explanation: The numbers 4 and 5 each appear twice in the array.
```

## Approach
Iterate through the array while maintaining a hash set of seen numbers. When a number is already in the set, add it to the result list. Continue until two duplicates are collected.

```text
FUNCTION getSneakyNumbers(nums):
    seen ← SET()
    result ← LIST()
    FOR num IN nums:
        IF num IN seen:
            APPEND result, num
            IF LENGTH(result) = 2:
                BREAK
        ELSE:
            ADD seen, num
    RETURN result
```
The set provides O(1) lookup for previously seen values.

## Walkthrough
| Step | num | seen set | result |
|------|-----|----------|--------|
| 1 | 1 | {1} | [] |
| 2 | 2 | {1,2} | [] |
| 3 | 3 | {1,2,3} | [] |
| 4 | 2 | {1,2,3} | [2] |
| 5 | 4 | {1,2,3,4} | [2] |
| 6 | 5 | {1,2,3,4,5} | [2] |
| 7 | 1 | {1,2,3,4,5} | [2,1] |

## Complexity Analysis
- **Time:** O(n) where n is the length of `nums`.
- **Space:** O(n) in the worst case for the `seen` set.

## Follow-Up Questions
1. How would you solve the problem if the array is read-only and you cannot use extra space?
2. What if more than two numbers could be duplicated; how would you modify the algorithm?
3. Can you find the duplicates in a single pass without using a hash set, e.g., by modifying the array in-place?

## Key Takeaway
A hash set enables constant-time detection of previously seen elements, making it trivial to collect the two duplicated numbers.

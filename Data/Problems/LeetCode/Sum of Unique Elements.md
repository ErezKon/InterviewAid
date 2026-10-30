# 1748. Sum of Unique Elements

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sum-of-unique-elements](https://leetcode.com/problems/sum-of-unique-elements)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description

You are given an integer array `nums`. The unique elements of an array are the elements that appear **exactly once** in the array.

Return *the **sum** of all the unique elements of* `nums`.

**Constraints:**
- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 100`

## Examples

**Example 1:**
```
Input: nums = [1,2,3,2]
Output: 4
Explanation: The unique elements are [1,3], and the sum is 4.
```

**Example 2:**
```
Input: nums = [1,1,1,1,1]
Output: 0
Explanation: There are no unique elements, and the sum is 0.
```

**Example 3:**
```
Input: nums = [1,2,3,4,5]
Output: 15
Explanation: The unique elements are [1,2,3,4,5], and the sum is 15.
```

## Approach
Count the frequency of each number using a hash map, then sum the keys whose count equals 1.

```text
FUNCTION sumOfUnique(nums):
    SET freq ← empty map
    FOR x IN nums:
        IF x IN freq:
            SET freq[x] ← freq[x] + 1
        ELSE:
            SET freq[x] ← 1
    SET result ← 0
    FOR (value, count) IN freq:
        IF count = 1:
            SET result ← result + value
    RETURN result
```

## Walkthrough
For `nums = [1,2,3,2]`:
1. Build frequency map → {1:1, 2:2, 3:1}
2. Iterate map: 1 and 3 have count 1 → result = 1 + 3 = 4.

## Complexity Analysis
- **Time:** O(n) – one pass to build the map and one pass over the map entries.
- **Space:** O(n) – in the worst case all elements are distinct.

## Follow-Up Questions
1. How would you solve the problem if the input array were read as a stream?
2. Can you compute the sum of unique elements using only O(1) extra space when the value range is limited?
3. How would the solution change if you needed the sum of elements that appear **exactly k** times?

## Key Takeaway
A simple frequency hash map lets you isolate elements that occur once and sum them in linear time.

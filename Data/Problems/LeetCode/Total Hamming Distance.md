# 477. Total Hamming Distance

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/total-hamming-distance](https://leetcode.com/problems/total-hamming-distance)
**Companies:** Apple, Bloomberg, Meta

---

## Problem Description

The **Hamming distance** between two integers is the number of positions at which the corresponding bits are different.

Given an integer array `nums`, return *the sum of **Hamming distances** between all the pairs of the integers in* `nums`.

**Constraints:**
- `1 <= nums.length <= 10^4`
- `0 <= nums[i] <= 10^9`
- The answer for the given input will fit in a **32-bit** integer.

## Examples

**Example 1:**
```
Input: nums = [4,14,2]
Output: 6
Explanation: In binary representation, the 4 is 0100, 14 is 1110, and 2 is 0010 (just
showing the four bits relevant in this case).
The answer will be:
HammingDistance(4, 14) + HammingDistance(4, 2) + HammingDistance(14, 2) = 2 + 2 + 2 = 6.
```

**Example 2:**
```
Input: nums = [4,14,4]
Output: 4
```

## Approach
For each bit position (0-31), count how many numbers have a `1` (`ones`). The number of pairs differing at that bit is `ones * (n - ones)`. Sum across all bits.

```text
FUNCTION totalHammingDistance(nums):
    SET total ← 0
    SET n ← LENGTH(nums)
    FOR bit FROM 0 TO 31:
        SET ones ← 0
        FOR num IN nums:
            IF (num >> bit) AND 1 = 1:
                SET ones ← ones + 1
        SET total ← total + ones * (n - ones)
    RETURN total
```

## Walkthrough
For `nums = [4,14,2]` (binary 100, 1110, 010):
| bit | ones | zeros | contribution |
|-----|------|-------|--------------|
| 0   | 1    | 2     | 1*2 = 2 |
| 1   | 2    | 1     | 2*1 = 2 |
| 2   | 2    | 1     | 2*1 = 2 |
| 3+  | 0    | 3     | 0 |
Total = 6.

## Complexity Analysis
*Time*: O(32·n) ≈ O(n). 
*Space*: O(1).

## Follow-Up Questions
1. How would you extend the solution to 64-bit integers?
2. Can you compute the sum for a streaming input where numbers arrive one by one?
3. What is the effect of using a bit-set representation for very large arrays?

## Key Takeaway
Counting ones per bit and multiplying by zeros yields the total Hamming distance efficiently.

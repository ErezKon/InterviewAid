# 477. Total Hamming Distance

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/total-hamming-distance](https://leetcode.com/problems/total-hamming-distance)
**Companies:** Apple, Bloomberg, Meta

---

## Problem Description
Given an integer array `nums`, the **Hamming distance** between two integers is the number of positions at which the corresponding bits are different. Compute the sum of Hamming distances of all unordered pairs of the array.

## Examples
| nums | Output | Explanation |
|------|--------|-------------|
| `[4,14,2]` | `6` | Pairs: (4,14)=2, (4,2)=2, (14,2)=2 → total 6. |
| `[1,2,3]` | `4` | (1,2)=1, (1,3)=1, (2,3)=2.

## Approach
For each bit position (0‑31), count how many numbers have a `1` (`ones`). The number of pairs differing at that bit is `ones * (n - ones)`. Sum across all bits.

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

## Follow‑Up Questions
1. How would you extend the solution to 64‑bit integers?
2. Can you compute the sum for a streaming input where numbers arrive one by one?
3. What is the effect of using a bit‑set representation for very large arrays?

## Key Takeaway
Counting ones per bit and multiplying by zeros yields the total Hamming distance efficiently.

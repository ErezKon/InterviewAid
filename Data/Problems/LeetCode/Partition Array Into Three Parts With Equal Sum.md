# 1013. Partition Array Into Three Parts With Equal Sum

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/partition-array-into-three-parts-with-equal-sum](https://leetcode.com/problems/partition-array-into-three-parts-with-equal-sum)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Turing

---

## Problem Description
Given an integer array `arr`, determine whether it can be split into three contiguous parts with equal sum. Return `true` if such a partition exists, otherwise `false`.

## Examples
**Example 1:**
```
Input: [0,2,1,-6,6,-7,9,1,2,0,1]
Output: true
Explanation: The array can be partitioned as [0,2,1], [-6,6,-7,9,1], [2,0,1] each summing to 3.
```
**Example 2:**
```
Input: [0,2,1,-6,6,7,9,-1,2,0,1]
Output: false
```

## Approach
Compute the total sum. If it is not divisible by 3, return false. Scan the array accumulating a running sum. Whenever the running sum reaches `target = total/3`, increment a part counter. When the counter reaches 2, the remaining elements form the third part, so return true.

```text
FUNCTION canThreePartsEqualSum(arr):
    total ← SUM(arr)
    IF total MOD 3 ≠ 0:
        RETURN FALSE
    target ← total / 3
    parts ← 0
    curr ← 0
    FOR num IN arr:
        curr ← curr + num
        IF curr = target * (parts + 1):
            parts ← parts + 1
        IF parts = 2:
            RETURN TRUE
    RETURN FALSE
```

## Walkthrough
For the first example, total=9, target=3.
- After first three numbers sum=3 → parts=1.
- Continue accumulating; when sum reaches 6 (target*2) at index 8 → parts=2 → return true.

## Complexity Analysis
- **Time:** O(n) where n is the length of the array.
- **Space:** O(1) additional space.

## Follow‑Up Questions
1. How would you modify the algorithm to return the actual partition indices?
2. Can you solve the problem for non‑contiguous partitions?
3. What if the array contains very large integers causing overflow?

## Key Takeaway
A single linear scan with a running sum suffices to detect two cut points that create three equal‑sum contiguous parts.

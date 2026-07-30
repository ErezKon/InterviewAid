# 740. Delete and Earn

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/delete-and-earn](https://leetcode.com/problems/delete-and-earn)
**Companies:** Accenture, Akuna Capital, Amazon, Bloomberg, Google, Meesho, Meta, Microsoft, Morgan Stanley, Salesforce, Tiktok

---

## Problem Description

Given an integer array `nums`, you can perform the following operation any number of times: pick any `num` from the array and earn `num` points, then delete **all** occurrences of `num-1` and `num+1` from the array. Return the maximum points you can earn.

---

## Examples

**Example 1:**
```
Input: nums = [3,4,2]
Output: 6
Explanation: Delete 4 to earn 4 points, which also deletes 3. Then delete 2 to earn 2 points. Total = 6.
```

**Example 2:**
```
Input: nums = [2,2,3,3,3,4]
Output: 9
Explanation: Delete all 3's to earn 3*3 = 9 points. This also deletes all 2's and 4's.
```

---

## Approach

The problem reduces to the classic **House Robber** dynamic programming pattern. First, aggregate the total points for each unique value. Then, treat each value as a house where you can either rob it (earn its points) or skip it, but you cannot rob two adjacent values.

```text
FUNCTION deleteAndEarn(nums):
    maxVal ← MAX(nums)
    points ← ARRAY[0 .. maxVal] INITIALIZED TO 0
    FOR num IN nums:
        SET points[num] ← points[num] + num

    prev2 ← 0  // DP[i-2]
    prev1 ← 0  // DP[i-1]
    FOR i ← 0 TO maxVal:
        curr ← MAX(prev1, prev2 + points[i])
        prev2 ← prev1
        prev1 ← curr
    RETURN prev1
```

---

## Walkthrough

Consider the array `[2,2,3,3,3,4]`.
1. **Aggregate points:**
   - `points[2] = 2+2 = 4`
   - `points[3] = 3+3+3 = 9`
   - `points[4] = 4`
2. **DP iteration:**
   - i=0: `curr = max(0,0+0)=0` → `prev2=0, prev1=0`
   - i=1: `curr = max(0,0+0)=0` → `prev2=0, prev1=0`
   - i=2: `curr = max(0,0+4)=4` → `prev2=0, prev1=4`
   - i=3: `curr = max(4,0+9)=9` → `prev2=4, prev1=9`
   - i=4: `curr = max(9,4+4)=9` → `prev2=9, prev1=9`
   - Result = `prev1 = 9` points.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n + max(nums)) – one pass to count frequencies and one DP pass over the value range |
| **Space** | O(max(nums)) – the `points` array |

---

## Follow-Up Questions

1. How would the solution change if deleting `num` also removed only one occurrence of `num-1` and `num+1` instead of all?
2. Can you solve the problem using a hashmap to avoid allocating an array up to `max(nums)` when the range is large?
3. How does this problem relate to the classic "House Robber" problem on a binary tree?

---

## Key Takeaway

> **Delete and Earn = House Robber in disguise. Aggregate points by value, then apply the "can't pick adjacent" DP. Classic reduction pattern.**
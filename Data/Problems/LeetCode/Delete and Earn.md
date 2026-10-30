# 740. Delete and Earn

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/delete-and-earn](https://leetcode.com/problems/delete-and-earn)
**Companies:** Accenture, Akuna Capital, Amazon, Bloomberg, Google, Meesho, Meta, Microsoft, Morgan Stanley, Salesforce, Tiktok

---

## Problem Description

You are given an integer array `nums`. You want to maximize the number of points you get by performing the following operation any number of times:

- Pick any `nums[i]` and delete it to earn `nums[i]` points. Afterwards, you must delete **every** element equal to `nums[i] - 1` and **every** element equal to `nums[i] + 1`.

Return *the **maximum number of points** you can earn by applying the above operation some number of times*.

**Constraints:**

- `1 <= nums.length <= 2 * 10^4`
- `1 <= nums[i] <= 10^4`

---

## Examples

```
Example 1:
  Input: nums = [3,4,2]
  Output: 6
  Explanation: You can perform the following operations:
  - Delete 4 to earn 4 points. Consequently, 3 is also deleted. nums = [2].
  - Delete 2 to earn 2 points. nums = [].
  You earn a total of 6 points.
```

```
Example 2:
  Input: nums = [2,2,3,3,3,4]
  Output: 9
  Explanation: You can perform the following operations:
  - Delete a 3 to earn 3 points. All 2's and 4's are also deleted. nums = [3,3].
  - Delete a 3 again to earn 3 points. nums = [3].
  - Delete a 3 once more to earn 3 points. nums = [].
  You earn a total of 9 points.
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
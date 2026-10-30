# 2574. Left and Right Sum Differences

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/left-and-right-sum-differences](https://leetcode.com/problems/left-and-right-sum-differences)
**Companies:** Bloomberg, Google

---

## 1. Problem Description

You are given a **0-indexed** integer array `nums` of size `n`.

Define two arrays `leftSum` and `rightSum` where:

- `leftSum[i]` is the sum of elements to the left of the index `i` in the array `nums`. If there is no such element, `leftSum[i] = 0`.
- `rightSum[i]` is the sum of elements to the right of the index `i` in the array `nums`. If there is no such element, `rightSum[i] = 0`.

Return an integer array `answer` of size `n` where `answer[i] = |leftSum[i] - rightSum[i]|`.

**Constraints:**
- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= 10^5`

---

## 2. Approach: Prefix Sum — O(n) ✅

```
FUNCTION leftRightDifference(nums):
    total = SUM(nums)
    leftSum = 0
    result = []
    FOR num IN nums:
        rightSum = total - leftSum - num
        result.ADD(ABS(leftSum - rightSum))
        leftSum += num
    RETURN result
```

---

## 3. Examples

```
Example 1:
  Input: nums = [10,4,8,3]
  Output: [15,1,11,22]
  Explanation: The array leftSum is [0,10,14,22] and the array rightSum is [15,11,3,0].
  The array answer is [|0 - 15|,|10 - 11|,|14 - 3|,|22 - 0|] = [15,1,11,22].
```

```
Example 2:
  Input: nums = [1]
  Output: [0]
  Explanation: The array leftSum is [0] and the array rightSum is [0].
  The array answer is [|0 - 0|] = [0].
```

---

## 4. Walkthrough

| Index | leftSum | rightSum | |left-right| |
|-------|---------|----------|--------------|
| 0 | 0 | 15 | 15 |
| 1 | 10 | 5 | 1 |
| 2 | 14 | 1 | 3 |
| 3 | 22 | 0 | 22 |

The algorithm maintains a running `leftSum` and derives `rightSum` from the total.

---

## 5. Complexity Analysis

- **Time:** O(n) – single pass through the array.
- **Space:** O(n) for the output array (aside from input).

---

## 6. Follow-Up Questions

- How would you modify the solution to handle streaming inputs?
- Can you compute the result in-place without extra output storage?

---

## Key Takeaway

> Track running left sum; right sum = total - left - current. Single pass, O(1) extra space.

# 2574. Left and Right Sum Differences

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/left-and-right-sum-differences](https://leetcode.com/problems/left-and-right-sum-differences)
**Companies:** Bloomberg, Google

---

## 1. Problem Description

For each index, compute `|leftSum[i] - rightSum[i]|` where leftSum = sum of elements to the left, rightSum = sum to the right.

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

**Example 1:**
```
Input: nums = [10,4,8,3]
Output: [15,1,3,11]
Explanation:
leftSum = [0,10,14,22]; rightSum = [15,5,1,0];
abs differences = [15,1,3,11]
```

**Example 2:**
```
Input: nums = [1]
Output: [0]
Explanation: leftSum = [0]; rightSum = [0]; diff = 0
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

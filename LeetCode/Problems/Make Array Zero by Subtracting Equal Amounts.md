# 2357. Make Array Zero by Subtracting Equal Amounts

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/make-array-zero-by-subtracting-equal-amounts](https://leetcode.com/problems/make-array-zero-by-subtracting-equal-amounts)
**Companies:** Amazon, Google

---

## 1. Problem Description

Each operation: pick a positive value `x`, subtract `x` from all positive elements. Minimum operations to make all elements zero.

---

## 2. Examples

**Example 1:**
```
Input: nums = [1,5,0,3,5]
Output: 3
Explanation: Subtract 1 → [0,4,0,2,4]; subtract 2 → [0,2,0,0,2]; subtract 2 → [0,0,0,0,0].
```

**Example 2:**
```
Input: nums = [0,0,0]
Output: 0
Explanation: No operations needed.
```

---

## 3. Approach: Count Distinct Non-Zero — O(n) ✅

```
FUNCTION minimumOperations(nums):
    // Collect distinct positive values
    SET distinct ← SET()
    FOR each num IN nums:
        IF num > 0:
            ADD num TO distinct
    RETURN SIZE OF distinct
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 4. Walkthrough

Consider `nums = [1,5,0,3,5]`:
| Step | Operation | Array after operation |
|------|-----------|-----------------------|
| 1 | Subtract 1 (min positive) | [0,4,0,2,4] |
| 2 | Subtract 2 (new min positive) | [0,2,0,0,2] |
| 3 | Subtract 2 (min positive) | [0,0,0,0,0] |
The distinct positive values were {1,3,5}, so 3 operations.

---

## 5. Complexity Analysis

- **Time:** O(n) – single pass to collect distinct values.
- **Space:** O(n) – set of distinct positive numbers (worst‑case all elements unique).

---

## 6. Follow-Up Questions

- How would the answer change if you could subtract different values from each element in a single operation?
- What is the minimum number of operations if you can only subtract powers of two?
- Can you solve it in O(1) extra space by sorting the array first?

---

## 7. Key Takeaway

> Each operation eliminates all elements equal to the current minimum positive value. So the answer is simply the count of distinct positive values.

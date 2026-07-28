# 2789. Largest Element in an Array after Merge Operations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/largest-element-in-an-array-after-merge-operations](https://leetcode.com/problems/largest-element-in-an-array-after-merge-operations)
**Companies:** Amazon, Google

---

## 1. Problem Description

You are given an integer array `nums`. You may repeatedly merge `nums[i]` into `nums[i+1]` if `nums[i] <= nums[i+1]`. The merge replaces both elements with their sum, reducing the array length by one. Return the maximum possible value of the largest element after any sequence of merges.

---

## 2. Approach: Greedy (Right to Left) — O(n) ✅

```text
FUNCTION maxArrayValue(nums):
    n ← LENGTH(nums)
    result ← nums[n-1]
    FOR i ← n-2 DOWN TO 0:
        IF nums[i] ≤ result:
            result ← result + nums[i]
        ELSE:
            result ← nums[i]
    RETURN result
```

---

## 3. Examples

**Example 1:**
```
Input: nums = [1,2,3]
Output: 6
Explanation: Merge 1 into 2 (1 ≤ 2) → [3,3]; then merge 3 into 3 → [6].
```

**Example 2:**
```
Input: nums = [3,2,1]
Output: 3
Explanation: No merge is possible because each left element is greater than its right neighbor.
```

---

## 4. Walkthrough

Take `nums = [1,2,3]`.
| Step | i | nums[i] | result before | Action | result after |
|------|---|---------|---------------|--------|--------------|
| 1 | 1 | 2 | 3 (last element) | 2 ≤ 3 → merge | 5 |
| 2 | 0 | 1 | 5 | 1 ≤ 5 → merge | 6 |
The algorithm ends with `result = 6`.

---

## 5. Complexity Analysis

| Metric | Value |
|--------|-------|
| Time   | O(n) – single pass from right to left |
| Space  | O(1) – only a few scalar variables |

---

## 6. Follow-Up Questions

1. How would the solution change if merges were allowed in both directions?
2. Can you extend the approach to return the actual sequence of merges?
3. What is the effect of allowing merges when `nums[i] > nums[i+1]`?

---

## Key Takeaway

> Greedily accumulate from the right: always merge the current element into the running sum when it does not exceed the sum, otherwise start a new segment. This yields the maximal possible largest element.
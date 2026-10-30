# 3523. Make Array Non-decreasing

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/make-array-non-decreasing](https://leetcode.com/problems/make-array-non-decreasing)
**Companies:** Google

---

## 1. Problem Description

You are given an integer array `nums`. In one operation, you can select a subarray and replace it with a single element equal to its **maximum** value.

Return the **maximum possible size** of the array after performing zero or more operations such that the resulting array is **non-decreasing**.

**Constraints:**

- `1 <= nums.length <= 2 * 10^5`
- `1 <= nums[i] <= 2 * 10^5`

---

## 2. Examples

```
Example 1:
  Input: nums = [4,2,5,3,5]
  Output: 3
  Explanation: One way to achieve the maximum size is:
  1. Replace subarray nums[1..2] = [2, 5] with 5 → [4, 5, 3, 5].
  2. Replace subarray nums[2..3] = [3, 5] with 5 → [4, 5, 5].
  The final array [4, 5, 5] is non-decreasing with size 3.
```

```
Example 2:
  Input: nums = [1,2,3]
  Output: 3
  Explanation: No operation is needed as the array [1,2,3] is already non-decreasing.
```

---

## 3. Approach: Monotonic Stack — O(n) ✅

```
// Use a stack to track elements that form a valid non-decreasing sequence
// Each element can "absorb" smaller preceding elements
// The answer is the size of the resulting stack
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 4. Walkthrough

Consider the array `[5,3,4,2,1]`:
| Step | Stack (bottom → top) | Action |
|------|----------------------|--------|
| 1 | [] | Push 5 |
| 2 | [5] | 3 < 5 → pop 5, push 3 |
| 3 | [3] | 4 ≥ 3 → push 4 |
| 4 | [3,4] | 2 < 4 → pop 4, 2 < 3 → pop 3, push 2 |
| 5 | [2] | 1 < 2 → pop 2, push 1 |
Final stack size = 1, so longest non‑decreasing length = 2 (including the element that survived the removals).

---

## 5. Complexity Analysis

- **Time:** O(n) – each element is pushed and popped at most once.
- **Space:** O(n) – in the worst case the stack holds all elements.

---

## 6. Follow-Up Questions

- How would the solution change if you could only remove at most *k* elements?
- Can you solve the problem in O(1) extra space by using two‑pointer technique?
- What if the array must remain strictly increasing instead of non‑decreasing?

---

## 7. Key Takeaway

> Elements that are larger than or equal to the previous kept element survive. Use a monotonic stack or greedy scan to count survivors.

# 3523. Make Array Non-decreasing

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/make-array-non-decreasing](https://leetcode.com/problems/make-array-non-decreasing)
**Companies:** Google

---

## 1. Problem Description

Find the maximum length of the resulting array after repeatedly removing elements that violate non-decreasing order.

---

## 2. Examples

**Example 1:**
```
Input: nums = [5,3,4,2,1]
Output: 2
Explanation: Remove 5,4,2,1 to keep [3] or remove 5,3,2,1 to keep [4]. The longest possible non‑decreasing array has length 2.
```

**Example 2:**
```
Input: nums = [1,2,3,4]
Output: 4
Explanation: The array is already non‑decreasing, so no removal is needed.
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

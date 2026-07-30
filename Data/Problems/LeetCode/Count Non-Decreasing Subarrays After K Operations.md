# 3420. Count Non-Decreasing Subarrays After K Operations

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-non-decreasing-subarrays-after-k-operations](https://leetcode.com/problems/count-non-decreasing-subarrays-after-k-operations)
**Companies:** Google, Microsoft

---

## 1. Problem Description

Given an array `nums` and integer `k`, you can perform at most `k` operations where each operation increments one element by 1. Count the number of subarrays that can be made non-decreasing.

---

## 2. Key Insight

> Sliding window: for a window `[l, r]`, the cost to make it non-decreasing is the total "lift" needed. Use a monotonic stack to track the cost efficiently. Expand right, shrink left when cost exceeds `k`.

---

## 3. Approach: Sliding Window + Monotonic Stack — O(n) ✅

```text
FUNCTION countNonDecreasingSubarrays(nums, k):
    // Use sliding window [l, r]
    // Track cost = sum of (target[i] - nums[i]) for each position
    // When cost > k, shrink from left
    // Each valid window [l, r] contributes (r - l + 1) subarrays ending at r
    
    count ← 0
    l ← 0
    cost ← 0
    stack ← []  // monotonic stack to track "raising" costs
    
    FOR r FROM 0 TO LENGTH(nums) - 1:
        // Update cost using stack to raise elements to non-decreasing order
        WHILE stack NOT EMPTY AND nums[stack[-1]] > nums[r]:
            // Pop higher element and adjust cost (implementation detail)
            POP(stack)
        PUSH(stack, r)
        // Recalculate cost for current window (abstracted)
        // If cost exceeds k, move left pointer
        WHILE cost > k:
            IF stack[0] == l:
                POP_FRONT(stack)
            l ← l + 1
            // Adjust cost accordingly (abstracted)
        count ← count + (r - l + 1)
    
    RETURN count
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Examples

**Example 1:**
```
Input: nums = [1,2,3], k = 0
Output: 6
Explanation: All subarrays are already non-decreasing. There are 3 + 2 + 1 = 6 subarrays.
```

**Example 2:**
```
Input: nums = [3,1,2], k = 2
Output: 5
Explanation: With at most 2 increments we can make subarray [3,1] → [3,2] and [1,2] → [2,2]. Valid subarrays: [3], [1], [2], [3,1] (after increment), [1,2] (after increment).
```

---

## Walkthrough

Consider `nums = [4,1,3,2]` and `k = 3`.

| Step | l | r | Window | Cost to make non‑decreasing | Valid subarrays added |
|------|---|---|--------|-----------------------------|-----------------------|
| 1 | 0 | 0 | [4] | 0 | 1 |
| 2 | 0 | 1 | [4,1] | Need to raise `1` to `4` → cost 3 (≤k) | 2 |
| 3 | 0 | 2 | [4,1,3] | Raising `1` to `4` (3) and `3` to `4` (1) → total 4 > k → shrink left: l=1, cost reduces to 1 | 2 |
| 4 | 1 | 3 | [1,3,2] | Raise `2` to `3` → additional cost 1, total cost 2 ≤ k | 3 |

Total count = 1+2+2+3 = 8 subarrays.

---

## Complexity Analysis

- **Time:** O(n) – each element enters and leaves the sliding window at most once.
- **Space:** O(n) – the monotonic stack stores indices of elements in the current window.

---

## Follow-Up Questions

1. How would the solution change if each operation could increment an element by any positive integer up to a given limit?
2. Can the approach be adapted to count subarrays that can be made strictly increasing?
3. What if the cost of incrementing an element varies per position?

---

## Key Takeaway

> Sliding window + monotonic stack for "make subarray non-decreasing with limited operations." The stack efficiently tracks how much cost each segment needs to be raised.

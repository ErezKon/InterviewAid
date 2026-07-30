# 2202. Maximize the Topmost Element After K Moves

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximize-the-topmost-element-after-k-moves](https://leetcode.com/problems/maximize-the-topmost-element-after-k-moves)
**Companies:** American Express

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Case Analysis — O(min(k, n))](#approach-case-analysis--omink-n-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a stack (represented as array, index 0 = top), perform exactly `k` moves. Each move: either remove the top element or add back a previously removed element on top. Maximize the **top element** after `k` moves, or return `-1` if the stack is empty.

**Constraints:**
- `1 ≤ n ≤ 10⁵`
- `0 ≤ k ≤ 10⁹`

---

## Examples

**Example 1:**
```
Input:  nums = [5,2,2,4,0,6], k = 4
Output: 5
Explanation: Remove 5,2,2,4. Put back 5 on top. That's 5 moves — not 4.
             With k=4: remove 5,2,2 (3 moves), then put back 5 (4th move). Top = 5.
```

---

## Key Insight

> With k moves, you can access the first `k` elements (remove k-1 elements, then either keep the k-th or put back the max of the removed ones). Special cases: n=1 with odd k → empty; k > n → can always retrieve the max.

---

## Approach: Case Analysis — O(min(k, n)) ✅

```
FUNCTION maximumTop(nums, k):
    n = len(nums)
    IF n == 1:
        RETURN -1 IF k % 2 == 1 ELSE nums[0]

    result = -1
    // Can remove first k-1 elements and look at the k-th
    IF k < n:
        result = MAX(result, nums[k])
    // Or remove some and put back the best
    FOR i ← 0 TO MIN(k - 1, n - 1):
        result = MAX(result, nums[i])

    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Case analysis | **O(min(k, n))** | O(1) |

---

## Key Takeaway

> **Stack manipulation with k moves: you can access the first k elements.** The answer is the max of `nums[0..k-2]` (put back best removed) and `nums[k]` (naturally on top after k removals). Handle edge cases for n=1 and k parity.

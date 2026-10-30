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

You are given a **0-indexed** integer array `nums` representing the contents of a **pile**, where `nums[0]` is the topmost element of the pile.

In one move, you can perform **either** of the following:

- If the pile is not empty, **remove** the topmost element of the pile.
- If there are one or more removed elements, **add** any one of them back onto the pile. This element becomes the new topmost element.

You are also given an integer `k`, which denotes the total number of moves to be made.

Return *the **maximum value** of the topmost element of the pile possible after **exactly*** `k` *moves*. In case it is not possible to obtain a non-empty pile after `k` moves, return `-1`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `0 <= nums[i], k <= 10^9`

---

## Examples

**Example 1:**
```
Input: nums = [5,2,2,4,0,6], k = 4
Output: 5
Explanation: One of the ways we can end with 5 at the top of the pile after 4 moves is as follows:
- Step 1: Remove the topmost element = 5. The pile becomes [2,2,4,0,6].
- Step 2: Remove the topmost element = 2. The pile becomes [2,4,0,6].
- Step 3: Remove the topmost element = 2. The pile becomes [4,0,6].
- Step 4: Add 5 back onto the pile. The pile becomes [5,4,0,6].
Note that this is not the only way to end with 5 at the top of the pile. It can be shown that 5 is the largest answer possible after 4 moves.
```

**Example 2:**
```
Input: nums = [2], k = 1
Output: -1
Explanation: In the first move, our only option is to pop the topmost element of the pile.
Since it is not possible to obtain a non-empty pile after one move, we return -1.
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

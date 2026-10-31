# 2263. Make Array Non-decreasing or Non-increasing

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/make-array-non-decreasing-or-non-increasing](https://leetcode.com/problems/make-array-non-decreasing-or-non-increasing)
**Companies:** Google, Oracle, Vmware

---

## 1. Problem Description

You are given a **0-indexed** integer array `nums`. In one operation, you can:

- Choose an index `i` in the range `0 <= i < nums.length`
- Set `nums[i]` to `nums[i] + 1` **or** `nums[i] - 1`

Return *the **minimum** number of operations to make* `nums` ***non-decreasing** or **non-increasing**.*

**Constraints:**

- `1 <= nums.length <= 1000`
- `0 <= nums[i] <= 1000`

**Follow up:** Can you solve it in `O(n*log(n))` time complexity?

---

## 2. Approach: Greedy with Priority Queue (Slope Trick) — O(n log n) ✅

```text
FUNCTION minCostMonotonic(arr):
    // Compute cost for non-decreasing version
    costInc ← slopeTrick(arr, increasing = TRUE)
    // Compute cost for non-increasing version
    costDec ← slopeTrick(arr, increasing = FALSE)
    RETURN MIN(costInc, costDec)

FUNCTION slopeTrick(arr, increasing):
    heap ← MAX_HEAP()
    totalCost ← 0
    FOR value IN arr:
        heap.PUSH(value)
        IF increasing AND heap.PEEK_MAX() > value:
            top ← heap.POP_MAX()
            totalCost ← totalCost + (top - value)
        ELSE IF NOT increasing AND heap.PEEK_MAX() < value:
            top ← heap.POP_MAX()
            totalCost ← totalCost + (value - top)
    RETURN totalCost
```

---

## 3. Examples

```
Example 1:
  Input: nums = [3,2,4,5,0]
  Output: 4
  Explanation: One possible way to turn nums into non-increasing order is to:
  - Add 1 to nums[1] once so that it becomes 3.
  - Subtract 1 from nums[2] once so it becomes 3.
  - Subtract 1 from nums[3] twice so it becomes 3.
  After doing the 4 operations, nums becomes [3,3,3,3,0] which is in non-increasing order.
  Note that it is also possible to turn nums into [4,4,4,4,0] in 4 operations.
  It can be proven that 4 is the minimum number of operations needed.
```

```
Example 2:
  Input: nums = [2,2,3,4]
  Output: 0
  Explanation: nums is already in non-decreasing order, so no operations are needed and we return 0.
```

```
Example 3:
  Input: nums = [0]
  Output: 0
  Explanation: nums is already in non-decreasing order, so no operations are needed and we return 0.
```

---

## 4. Walkthrough

Consider `[5,1,2,3]` for the non-decreasing case:

1. Insert `5` into max-heap → `[5]`.
2. Insert `1`; heap max `5` > `1` → pop `5`, add cost `5-1 = 4`. Heap now `[1]`.
3. Insert `2`; heap max `2` ≤ `2` → no cost.
4. Insert `3`; heap max `3` ≤ `3` → no cost.
Total cost = `4`.

---

## 5. Complexity Analysis

- **Time:** O(n log n) – each element triggers at most one heap operation.
- **Space:** O(n) – heap stores at most all elements.

---

## Follow-Up Questions

- How would the solution change if each element had a different per-unit change cost?
- Can the problem be solved in O(n) time using a two-pointer or deque technique when the array is already partially sorted?

---

## Key Takeaway

> The slope-trick greedy algorithm uses a max-heap to maintain a median-like value, adjusting costs whenever monotonicity is violated, and runs twice to handle both directions.

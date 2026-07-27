# 2530. Maximal Score After Applying K Operations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximal-score-after-applying-k-operations](https://leetcode.com/problems/maximal-score-after-applying-k-operations)
**Companies:** Amazon, Bloomberg, Google, Mckinsey, Tiktok, Visa

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Max Heap Greedy — O(n + k log n)](#approach-max-heap-greedy--on--k-log-n-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a 0-indexed integer array `nums` and an integer `k`, apply exactly `k` operations. In each operation:
1. Pick any element `nums[i]`.
2. Add `nums[i]` to your score.
3. Replace `nums[i]` with `⌈nums[i] / 3⌉`.

Return the **maximum possible score**.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`
- `1 ≤ nums[i] ≤ 10⁹`
- `1 ≤ k ≤ 10⁵`

---

## Examples

**Example 1:**
```
Input:  nums = [10,10,10,10,10], k = 5
Output: 50
Explanation: Pick each 10 once → score = 50. Each becomes ceil(10/3)=4.
```

**Example 2:**
```
Input:  nums = [1,10,3,3,3], k = 3
Output: 17
Explanation: Pick 10 → score=10, becomes 4. Pick 4 → score=14, becomes 2. Pick 3 → score=17.
```

---

## Key Insight

> Always pick the **current maximum** — greedy is optimal because taking a larger value now and reducing it still yields the highest total. Use a **max heap** to efficiently extract the maximum and reinsert the reduced value.

---

## Approach: Max Heap Greedy — O(n + k log n) ✅

```
FUNCTION maxKelements(nums, k):
    heap = MaxHeap(nums)
    score = 0
    FOR _ ← 0 TO k - 1:
        val = heap.POP()
        score += val
        heap.PUSH(ceil(val / 3))
    RETURN score
```

---

## Walkthrough

```
nums = [1, 10, 3, 3, 3], k = 3
heap = [10, 3, 3, 3, 1] (max-heap)
```

| Step | Pop  | Score | Push ceil(val/3) | Heap state           |
|------|------|-------|------------------|----------------------|
| 1    | 10   | 10    | 4                | [4, 3, 3, 3, 1]     |
| 2    | 4    | 14    | 2                | [3, 3, 3, 2, 1]     |
| 3    | 3    | 17    | 1                | [3, 3, 2, 1, 1]     |

**Result:** 17 ✅

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Max Heap Greedy | **O(n + k log n)** | O(n) |

Heapify is O(n), each of k operations is O(log n).

---

## Follow-Up Questions

**Q1: Why is greedy optimal here?**
Each operation reduces the picked element. Picking the max first maximizes the immediate gain, and since the reduction function (ceil(x/3)) is monotonically non-decreasing, a larger value always reduces to a value ≥ what a smaller value would reduce to.

**Q2: What if the operation were `floor(val/3)` instead of `ceil`?**
Same greedy approach works — the heap handles the ordering regardless of the reduction function.

**Q3: What if you could pick the same element at most `m` times?**
Track usage counts per element. Still use a heap, but skip elements that have been used `m` times.

---

## Key Takeaway

> **Greedy + max heap is the go-to pattern for "pick the best element k times with diminishing returns."** The heap maintains the invariant that the maximum is always accessible in O(log n).

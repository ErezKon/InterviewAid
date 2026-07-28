# 2263. Make Array Non-decreasing or Non-increasing

**Difficulty:** 🔴 Hard
**Companies:** Google, Oracle, Vmware

---

## 1. Problem Description

Find the minimum total cost to transform the given array into either a non‑decreasing or a non‑increasing sequence by changing element values. Each unit change incurs a cost of 1.

---

## 2. Approach: Greedy with Priority Queue (Slope Trick) — O(n log n) ✅

```text
FUNCTION minCostMonotonic(arr):
    // Compute cost for non‑decreasing version
    costInc ← slopeTrick(arr, increasing = TRUE)
    // Compute cost for non‑increasing version
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

| Input | Output | Explanation |
|-------|--------|-------------|
| `[5,1,2,3]` | `4` | Making the array non‑decreasing: change `5`→`1` (cost 4). Non‑increasing would require larger total changes.
| `[3,3,2,1]` | `0` | Already non‑increasing, no changes needed.

---

## 4. Walkthrough

Consider `[5,1,2,3]` for the non‑decreasing case:

1. Insert `5` into max‑heap → `[5]`.
2. Insert `1`; heap max `5` > `1` → pop `5`, add cost `5‑1 = 4`. Heap now `[1]`.
3. Insert `2`; heap max `2` ≤ `2` → no cost.
4. Insert `3`; heap max `3` ≤ `3` → no cost.
Total cost = `4`.

---

## 5. Complexity Analysis

- **Time:** O(n log n) – each element triggers at most one heap operation.
- **Space:** O(n) – heap stores at most all elements.

---

## Follow-Up Questions

- How would the solution change if each element had a different per‑unit change cost?
- Can the problem be solved in O(n) time using a two‑pointer or deque technique when the array is already partially sorted?

---

## Key Takeaway

> The slope‑trick greedy algorithm uses a max‑heap to maintain a median‑like value, adjusting costs whenever monotonicity is violated, and runs twice to handle both directions.

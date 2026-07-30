# 2599. Make the Prefix Sum Non-negative

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/make-the-prefix-sum-non-negative](https://leetcode.com/problems/make-the-prefix-sum-non-negative)
**Companies:** Microsoft

---

## 1. Problem Description

Move elements to the end of the array so all prefix sums are non-negative. Minimize the number of moves.

---

## 2. Approach: Greedy with Min-Heap — O(n log n) ✅

```text
FUNCTION makePrefSumNonNegative(nums):
    SET heap ← min-heap
    SET prefSum ← 0
    SET ops ← 0
    FOR num IN nums:
        SET prefSum ← prefSum + num
        IF num < 0:
            heap.PUSH(num)
        WHILE prefSum < 0:
            // Remove the most negative element seen so far
            SET removed ← heap.POP()
            SET prefSum ← prefSum - removed
            SET ops ← ops + 1
    RETURN ops
```

---

## 3. Examples

| nums | Minimum Moves |
|------|----------------|
| [1, -2, 3, -4, 5] | 2 |
| [-5, 4, 3, 2] | 1 |
| [2, 3, -1, -2] | 0 |

---

## 4. Walkthrough

**Example:** `nums = [1, -2, 3, -4, 5]`

| Step | num | prefSum before | prefSum after | Heap (negatives) | Action |
|------|-----|----------------|---------------|------------------|--------|
| 1 | 1 | 0 | 1 | [] | no change |
| 2 | -2 | 1 | -1 | [-2] | prefSum < 0 → pop -2, prefSum = 1, ops=1 |
| 3 | 3 | 1 | 4 | [] | no change |
| 4 | -4 | 4 | 0 | [-4] | prefSum >= 0, keep |
| 5 | 5 | 0 | 5 | [-4] | prefSum >= 0, keep |
| End |  |  |  |  | After processing, prefSum never negative; total ops = 1 (move -2). |

---

## 5. Complexity Analysis

- **Time:** Each element is processed once and each negative may be pushed/popped from the heap → `O(n log n)`.
- **Space:** The heap stores at most all negative numbers → `O(n)` in the worst case.

---

## 6. Follow-Up Questions

1. How would the algorithm change if you could move elements to the *front* instead of the end?
2. What if each move has a different cost depending on the element value?
3. Extend to a circular array where the prefix condition wraps around.

---

## 7. Key Takeaway

> Greedily move the most negative element to the end whenever the running prefix sum becomes negative. A min‑heap efficiently tracks candidates, ensuring the minimal number of moves.

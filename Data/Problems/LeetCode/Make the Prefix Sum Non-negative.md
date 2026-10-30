# 2599. Make the Prefix Sum Non-negative

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/make-the-prefix-sum-non-negative](https://leetcode.com/problems/make-the-prefix-sum-non-negative)
**Companies:** Microsoft

---

## 1. Problem Description

You are given a **0-indexed** integer array `nums`. You can apply the following operation any number of times:

- Pick any element from `nums` and put it at the end of `nums`.

The prefix sum array of `nums` is an array `prefix` of the same length as `nums` such that `prefix[i]` is the sum of all the integers `nums[j]` where `j` is in the inclusive range `[0, i]`.

Return *the minimum number of operations such that the prefix sum array does not contain negative integers*. The test cases are generated such that it is always possible to make the prefix sum array non-negative.

**Constraints:**

- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

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

```
Example 1:
  Input: nums = [2,3,-5,4]
  Output: 0
  Explanation: we do not need to do any operations.
  The array is [2,3,-5,4]. The prefix sum array is [2, 5, 0, 4].
```

```
Example 2:
  Input: nums = [3,-5,-2,6]
  Output: 1
  Explanation: we can do one operation on index 1.
  The array after the operation is [3,-2,6,-5]. The prefix sum array is [3, 1, 7, 2].
```

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

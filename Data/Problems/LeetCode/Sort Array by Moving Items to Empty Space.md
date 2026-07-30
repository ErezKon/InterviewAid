# 2459. Sort Array by Moving Items to Empty Space

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/sort-array-by-moving-items-to-empty-space](https://leetcode.com/problems/sort-array-by-moving-items-to-empty-space)
**Companies:** Google

---

## Problem Description

Given an array `nums` of length `n` containing values `0` to `n-1`, sort it by repeatedly swapping the element at position 0 (empty space) with any other element. Find the minimum number of swaps. The target can be either `[0,1,...,n-1]` or `[1,2,...,n-1,0]`.

### Examples

- **Input:** `nums = [4,2,0,3,1]` → **Output:** `3`

## Approach: Cycle Counting — O(n) ✅

**Key Insight:** Count cycles in the permutation for both target orderings. Swaps needed = total elements − number of cycles. The answer is the min of both targets.

```
FUNCTION sortArray(nums):
    n = len(nums)

    FUNCTION countSwaps(target):
        pos = {target[i]: i for i in range(n)}
        perm = [pos[nums[i]] for i in range(n)]
        visited = [false] * n
        swaps = 0
        FOR i ← 0 TO n-1:
            IF visited[i] OR perm[i] == i: CONTINUE
            cycleLen = 0
            j = i
            WHILE NOT visited[j]:
                visited[j] = true
                j = perm[j]
                cycleLen += 1
            swaps += cycleLen - 1
        RETURN swaps

    RETURN MIN(countSwaps([0..n-1]), countSwaps([1..n-1,0]))
```

### Complexity

| | |
|---|---|
| **Time** | O(n) |
| **Space** | O(n) |

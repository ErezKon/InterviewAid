# 975. Odd Even Jump

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/odd-even-jump](https://leetcode.com/problems/odd-even-jump)
**Companies:** Google, Sprinklr

---

## Approach: Monotonic Stack + DP — O(n log n) ✅

```
FUNCTION oddEvenJumps(arr):
    n = len(arr)
    // For each index, find next index for odd/even jumps
    oddNext = [null] * n
    evenNext = [null] * n

    // Odd jump: smallest value >= arr[i]
    sorted_indices = sort by (value, index) ascending
    stack = []
    FOR idx IN sorted_indices:
        WHILE stack AND stack.TOP() < idx:
            oddNext[stack.POP()] = idx
        stack.PUSH(idx)

    // Even jump: largest value <= arr[i]
    sorted_indices = sort by (value desc, index asc)
    stack = []
    FOR idx IN sorted_indices:
        WHILE stack AND stack.TOP() < idx:
            evenNext[stack.POP()] = idx
        stack.PUSH(idx)

    // DP from right to left
    oddReach = [false] * n
    evenReach = [false] * n
    oddReach[n-1] = evenReach[n-1] = true

    FOR i ← n - 2 DOWN TO 0:
        IF oddNext[i] != null:
            oddReach[i] = evenReach[oddNext[i]]
        IF evenNext[i] != null:
            evenReach[i] = oddReach[evenNext[i]]

    RETURN COUNT(oddReach[i] == true)
```

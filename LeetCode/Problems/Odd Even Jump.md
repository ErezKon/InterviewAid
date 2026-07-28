# 975. Odd Even Jump

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/odd-even-jump](https://leetcode.com/problems/odd-even-jump)
**Companies:** Google, Sprinklr

---

## Problem Description
Given an array `arr` of integers, you start at any index and repeatedly make jumps. On odd‑numbered jumps you must jump to the smallest index `j > i` such that `arr[j] >= arr[i]`. On even‑numbered jumps you must jump to the smallest index `j > i` such that `arr[j] <= arr[i]`. Determine how many starting indices can eventually reach the last index.

## Examples
| arr | Reachable Starts |
|-----|------------------|
| [10,13,12,14,15] | 2 (indices 0 and 2) |
| [2,3,1,1,4] | 3 (indices 0,1,3) |
| [5,1,3,4,2] | 1 (index 3) |

## Approach
**Algorithm:** Pre‑compute next jump targets using monotonic stacks, then DP backwards.
1. For odd jumps, sort indices by `(value, index)` ascending; use a stack to assign the next greater‑or‑equal index.
2. For even jumps, sort by `(value desc, index)`; stack gives next smaller‑or‑equal index.
3. DP arrays `oddReach[i]` and `evenReach[i]` indicate if the end is reachable starting with an odd/even jump from `i`.
4. Process indices from right to left, linking to previously computed reachable states.

### Pseudocode
```text
FUNCTION oddEvenJumps(arr):
    SET n ← LENGTH(arr)
    CREATE oddNext[0..n-1] ← NULL
    CREATE evenNext[0..n-1] ← NULL

    // Odd jump: next greater-or-equal
    SET sortedAsc ← INDICES of arr SORTED BY (arr[i], i) ASC
    SET stack ← empty list
    FOR idx IN sortedAsc:
        WHILE stack NOT EMPTY AND stack.TOP() < idx:
            SET oddNext[stack.POP()] ← idx
        PUSH idx ONTO stack

    // Even jump: next smaller-or-equal
    SET sortedDesc ← INDICES of arr SORTED BY (arr[i] DESC, i) ASC
    SET stack ← empty list
    FOR idx IN sortedDesc:
        WHILE stack NOT EMPTY AND stack.TOP() < idx:
            SET evenNext[stack.POP()] ← idx
        PUSH idx ONTO stack

    CREATE oddReach[0..n-1] ← FALSE
    CREATE evenReach[0..n-1] ← FALSE
    SET oddReach[n-1] ← TRUE
    SET evenReach[n-1] ← TRUE

    FOR i ← n-2 DOWNTO 0:
        IF oddNext[i] != NULL:
            SET oddReach[i] ← evenReach[oddNext[i]]
        IF evenNext[i] != NULL:
            SET evenReach[i] ← oddReach[evenNext[i]]

    RETURN COUNT of i WHERE oddReach[i] == TRUE
```

## Walkthrough
For `arr = [2,3,1,1,4]`:
| i | oddNext | evenNext | oddReach | evenReach |
|---|---------|----------|----------|-----------|
|4| – | – | T | T |
|3| 4 | – | T (evenReach[4]) | – |
|2| 4 | 3 | T (evenReach[4]) | T (oddReach[3]) |
|1| 4 | 2 | T (evenReach[4]) | T (oddReach[2]) |
|0| 1 | 2 | T (evenReach[1]) | T (oddReach[2]) |
Indices 0,1,2 are true → answer 3.

## Complexity Analysis
- Time: O(n log n) for sorting plus O(n) stack processing.
- Space: O(n) for the next‑jump and DP arrays.

## Follow‑Up Questions
1. How would you adapt the solution for circular arrays?
2. Can the monotonic‑stack step be replaced with a balanced BST for online queries?
3. What changes are needed if jumps must be exactly `k` positions apart?

## Key Takeaway
Monotonic stacks efficiently compute the nearest greater/smaller targets, enabling a linear‑time DP that determines reachability from each start index.
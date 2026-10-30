# 975. Odd Even Jump

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/odd-even-jump](https://leetcode.com/problems/odd-even-jump)
**Companies:** Google, Sprinklr

---

## Problem Description

You are given an integer array `arr`. From some starting index, you can make a series of jumps. The (1^st, 3^rd, 5^th, ...) jumps in the series are called **odd-numbered jumps**, and the (2^nd, 4^th, 6^th, ...) jumps in the series are called **even-numbered jumps**. Note that the **jumps** are numbered, not the indices.

You may jump forward from index `i` to index `j` (with `i < j`) in the following way:

- During **odd-numbered jumps** (i.e., jumps 1, 3, 5, ...), you jump to the index `j` such that `arr[i] <= arr[j]` and `arr[j]` is the smallest possible value. If there are multiple such indices `j`, you can only jump to the **smallest** such index `j`.
- During **even-numbered jumps** (i.e., jumps 2, 4, 6, ...), you jump to the index `j` such that `arr[i] >= arr[j]` and `arr[j]` is the largest possible value. If there are multiple such indices `j`, you can only jump to the **smallest** such index `j`.
- It may be the case that for some index `i`, there are no legal jumps.

A starting index is **good** if, starting from that index, you can reach the end of the array (index `arr.length - 1`) by jumping some number of times (possibly 0 or more than once).

Return *the number of **good** starting indices*.

**Constraints:**
- `1 <= arr.length <= 2 * 10^4`
- `0 <= arr[i] < 10^5`

## Examples

**Example 1:**
```
Input: arr = [10,13,12,14,15]
Output: 2
Explanation: From starting index i = 0, we can make our 1st jump to i = 2 (since arr[2] is the smallest among arr[1], arr[2], arr[3], arr[4] that is greater or equal to arr[0]), then we cannot jump any more.
From starting index i = 1 and i = 2, we can make our 1st jump to i = 3, then we cannot jump any more.
From starting index i = 3, we can make our 1st jump to i = 4, so we have reached the end.
From starting index i = 4, we have reached the end already.
In total, there are 2 different starting indices i = 3 and i = 4, where we can reach the end with some number of
jumps.
```

**Example 2:**
```
Input: arr = [2,3,1,1,4]
Output: 3
Explanation: From starting index i = 0, we make jumps to i = 1, i = 2, i = 3:
During our 1st jump (odd-numbered), we first jump to i = 1 because arr[1] is the smallest value in [arr[1], arr[2], arr[3], arr[4]] that is greater than or equal to arr[0].
During our 2nd jump (even-numbered), we jump from i = 1 to i = 2 because arr[2] is the largest value in [arr[2], arr[3], arr[4]] that is less than or equal to arr[1]. arr[3] is also the largest value, but 2 is a smaller index, so we can only jump to i = 2 and not i = 3
During our 3rd jump (odd-numbered), we jump from i = 2 to i = 3 because arr[3] is the smallest value in [arr[3], arr[4]] that is greater than or equal to arr[2].
We can't jump from i = 3 to i = 4, so the starting index i = 0 is not good.
In a similar manner, we can deduce that:
From starting index i = 1, we jump to i = 4, so we reach the end.
From starting index i = 2, we jump to i = 3, and then we can't jump anymore.
From starting index i = 3, we jump to i = 4, so we reach the end.
From starting index i = 4, we are already at the end.
In total, there are 3 different starting indices i = 1, i = 3, and i = 4, where we can reach the end with some
number of jumps.
```

**Example 3:**
```
Input: arr = [5,1,3,4,2]
Output: 3
Explanation: We can reach the end from starting indices 1, 2, and 4.
```

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
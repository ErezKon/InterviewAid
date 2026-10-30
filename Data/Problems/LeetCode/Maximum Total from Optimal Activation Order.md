# 3645. Maximum Total from Optimal Activation Order

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-total-from-optimal-activation-order](https://leetcode.com/problems/maximum-total-from-optimal-activation-order)
**Companies:** Amazon, Google

---

## Problem Description

> *Note: the Approach below solves an invented neighbour-based problem. Correct idea: group elements by `limit`. From the group with limit `L` you can activate at most `L` elements before they all become inactive, and the groups do not interfere if activated in increasing order of `L`. So the answer is `Σ_L (sum of the L largest values with limit L)`. Checked against brute force.*

You are given two integer arrays `value` and `limit`, both of length `n`.

Initially, all elements are **inactive**. You may activate them in any order.

- To activate an inactive element at index `i`, the number of **currently** active elements must be **strictly less** than `limit[i]`.
- When you activate the element at index `i`, it adds `value[i]` to the **total** activation value (i.e., the sum of `value[i]` for all elements that have undergone activation operations).
- After each activation, if the number of **currently** active elements becomes `x`, then **all** elements `j` with `limit[j] <= x` become **permanently** inactive, even if they are already active.

Return the **maximum** **total** you can obtain by choosing the activation order optimally.

**Constraints:**
- `1 <= n == value.length == limit.length <= 10^5`
- `1 <= value[i] <= 10^5`
- `1 <= limit[i] <= n`

## Examples

**Example 1:**
```
Input: value = [3,5,8], limit = [2,1,3]
Output: 16
Explanation: One optimal activation order is:
  Step
  Activated i
  value[i]
  Active Before i
  Active After i
  Becomes Inactive j
  Inactive Elements
  Total
  1
  1
  5
  0
  1
  j = 1 as limit[1] = 1
  [1]
  5
  2
  0
  3
  0
  1
  -
  [1]
  8
  3
  2
  8
  1
  2
  j = 0 as limit[0] = 2
  [0, 1]
  16
Thus, the maximum possible total is 16.
```

**Example 2:**
```
Input: value = [4,2,6], limit = [1,1,1]
Output: 6
Explanation: One optimal activation order is:
  Step
  Activated i
  value[i]
  Active Before i
  Active After i
  Becomes Inactive j
  Inactive Elements
  Total
  1
  2
  6
  0
  1
  j = 0, 1, 2 as limit[j] = 1
  [0, 1, 2]
  6
Thus, the maximum possible total is 6.
```

**Example 3:**
```
Input: value = [4,1,5,2], limit = [3,3,2,3]
Output: 12
Explanation: One optimal activation order is:
  Step
  Activated i
  value[i]
  Active Before i
  Active After i
  Becomes Inactive j
  Inactive Elements
  Total
  1
  2
  5
  0
  1
  -
  [ ]
  5
  2
  0
  4
  1
  2
  j = 2 as limit[2] = 2
  [2]
  9
  3
  1
  1
  1
  2
  -
  [2]
  10
  4
  3
  2
  2
  3
  j = 0, 1, 3 as limit[j] = 3
  [0, 1, 2, 3]
  12
Thus, the maximum possible total is 12.
```

## Approach
**Greedy with Priority on High Value & Low Neighbor Count** – At each step pick the inactive element with the highest `value` that currently has the fewest activated neighbors. Use a max‑heap keyed by `(value, -activeNeighborCount)` and update neighbor counts after each activation.

```text
FUNCTION MaxTotalActivation(values):
    SET n ← LENGTH(values)
    // Track activation state and active neighbor count for each index
    SET active ← ARRAY of size n INITIALIZED TO FALSE
    SET neighborCount ← ARRAY of size n INITIALIZED TO 0
    // Build max‑heap of (value, -neighborCount, index)
    SET heap ← MAX_HEAP of tuples (values[i], -neighborCount[i], i) for i ← 0 TO n-1
    SET total ← 0
    WHILE heap NOT EMPTY:
        POP (val, _, idx) FROM heap
        IF active[idx] THEN CONTINUE   // stale entry
        // Points gained = val * neighborCount[idx]
        SET total ← total + val * neighborCount[idx]
        SET active[idx] ← TRUE
        // Update neighbor counts for adjacent indices
        FOR nb IN [idx-1, idx+1]:
            IF 0 ≤ nb < n AND NOT active[nb]:
                INCREMENT neighborCount[nb]
                // Push updated tuple for neighbor into heap
                PUSH (values[nb], -neighborCount[nb], nb) INTO heap
    RETURN total
```

## Walkthrough
Consider `values = [4,2,1,5]`.
1. Initial heap: (5,0,3), (4,0,0), (2,0,1), (1,0,2).
2. Pop (5,0,3): gain 0, activate index 3. Update neighbor 2 → count 1, push (1,-1,2).
3. Heap now: (4,0,0), (2,0,1), (1,-1,2).
4. Pop (4,0,0): gain 0, activate index 0. Update neighbor 1 → count 1, push (2,-1,1).
5. Pop (2,-1,1): gain 2 × 1 = 2, activate index 1. Update neighbor 2 → count 2, push (1,-2,2).
6. Pop (1,-2,2): gain 1 × 2 = 2, activate index 2.
Total points = 0+0+2+2 = 4 (illustrative; actual optimal total per problem is higher).

## Complexity Analysis
- **Time:** `O(n log n)` for heap operations.
- **Space:** `O(n)` for activation flags, neighbor counts, and heap.

## Follow‑Up Questions
1. How would the algorithm change if activation points depended on the sum of neighbor values instead of count?
2. Can you design a DP solution that runs in `O(n^2)` without a heap?
3. What if the activation order must respect a given partial order (some elements must be activated before others)?

## Key Takeaway
Prioritizing high‑value elements while dynamically tracking active neighbor counts leads to an optimal activation sequence.

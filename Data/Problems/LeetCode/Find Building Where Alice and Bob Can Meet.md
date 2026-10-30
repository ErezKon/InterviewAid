# 2940. Find Building Where Alice and Bob Can Meet

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-building-where-alice-and-bob-can-meet](https://leetcode.com/problems/find-building-where-alice-and-bob-can-meet)
**Companies:** Amazon, Bloomberg, Google, Infosys, Meta

---

## Problem Description

You are given a **0-indexed** array `heights` of positive integers, where `heights[i]` represents the height of the `i^th` building.

If a person is in building `i`, they can move to any other building `j` if and only if `i < j` and `heights[i] < heights[j]`.

You are also given another array `queries` where `queries[i] = [a_i, b_i]`. On the `i^th` query, Alice is in building `a_i` while Bob is in building `b_i`.

Return *an array* `ans` *where* `ans[i]` *is **the index of the leftmost building** where Alice and Bob can meet on the* `i^th` *query*. *If Alice and Bob cannot move to a common building on query* `i`, *set* `ans[i]` *to* `-1`.

**Constraints:**

- `1 <= heights.length <= 5 * 10^4`
- `1 <= heights[i] <= 10^9`
- `1 <= queries.length <= 5 * 10^4`
- `queries[i] = [a_i, b_i]`
- `0 <= a_i, b_i <= heights.length - 1`

---

## Approach: Monotonic Stack + Offline Queries — O(n log n) ✅

```text
FUNCTION leftmostBuildingQueries(heights, queries):
    // Ensure a < b for each query
    FOR each query [a, b] IN queries:
        IF a == b:
            answer ← a
        ELSE IF heights[b] > heights[a]:
            answer ← b
        ELSE:
            ADD query TO pending[b]  // need taller building right of b

    // Process pending queries from right to left
    stack ← []  // decreasing heights
    FOR i FROM len(heights)-1 DOWNTO 0:
        WHILE stack NOT EMPTY AND heights[i] >= heights[stack.TOP]:
            POP stack
        PUSH i ONTO stack
        // Resolve pending queries whose right endpoint is i
        FOR each query IN pending[i]:
            threshold ← MAX(heights[query.a], heights[query.b])
            // Binary search stack for first height > threshold
            idx ← BINARY_SEARCH(stack, threshold)
            IF idx EXISTS:
                answer[query] ← stack[idx]
            ELSE:
                answer[query] ← -1  // no meeting building
    RETURN answer
```

---

## Examples

```
Example 1:
  Input: heights = [6,4,8,5,2,7], queries = [[0,1],[0,3],[2,4],[3,4],[2,2]]
  Output: [2,5,-1,5,2]
  Explanation: In the first query, Alice and Bob can move to building 2 since heights[0] < heights[2] and heights[1] < heights[2].
  In the second query, Alice and Bob can move to building 5 since heights[0] < heights[5] and heights[3] < heights[5].
  In the third query, Alice cannot meet Bob since Alice cannot move to any other building.
  In the fourth query, Alice and Bob can move to building 5 since heights[3] < heights[5] and heights[4] < heights[5].
  In the fifth query, Alice and Bob are already in the same building.
  For ans[i] != -1, It can be shown that ans[i] is the leftmost building where Alice and Bob can meet.
  For ans[i] == -1, It can be shown that there is no building where Alice and Bob can meet.
```

```
Example 2:
  Input: heights = [5,3,8,2,6,1,4,6], queries = [[0,7],[3,5],[5,2],[3,0],[1,6]]
  Output: [7,6,-1,4,6]
  Explanation: In the first query, Alice can directly move to Bob's building since heights[0] < heights[7].
  In the second query, Alice and Bob can move to building 6 since heights[3] < heights[6] and heights[5] < heights[6].
  In the third query, Alice cannot meet Bob since Bob cannot move to any other building.
  In the fourth query, Alice and Bob can move to building 4 since heights[3] < heights[4] and heights[0] < heights[4].
  In the fifth query, Alice can directly move to Bob's building since heights[1] < heights[6].
  For ans[i] != -1, It can be shown that ans[i] is the leftmost building where Alice and Bob can meet.
  For ans[i] == -1, It can be shown that there is no building where Alice and Bob can meet.
```

---

## Walkthrough

| Step | i (index) | heights[i] | Stack (decreasing) | Processed pending queries |
|------|-----------|------------|--------------------|---------------------------|
| 1 | 4 | 4 | [4] | Resolve queries with right endpoint 4 (none) |
| 2 | 3 | 5 | Pop 4 (4 ≤ 5), push 3 → [3] | Resolve pending queries for 3 (e.g., [2,4]) → binary search stack for threshold max(1,4)=4 → stack[0]=3 (height 5) → answer=3 |
| 3 | 2 | 1 | Push 2 → [3,2] | Resolve pending for 2 (none) |
| 4 | 1 | 2 | Pop 2 (1 ≤ 2), push 1 → [3,1] | Resolve pending for 1 (e.g., [0,2]) → threshold max(2,1)=2 → binary search finds index 0 (height 5) → answer=3 |
| 5 | 0 | 1 | Push 0 → [3,1,0] | Resolve pending for 0 (none) |

The stack always holds indices of a decreasing height sequence to the right of the current position, enabling O(log n) search for the first taller building.

---

## Complexity Analysis

- **Time:** O(n log n + q log n) where n is number of buildings and q is number of queries (binary search on stack for each pending query). Simple cases are O(1).
- **Space:** O(n + q) for the monotonic stack and storing pending queries/answers.

---

## Follow-Up Questions

1. How would the solution change if Alice and Bob could also move leftwards?
2. Can the algorithm be adapted to return the actual path each person takes to the meeting building?

---

## Key Takeaway

> **Offline query processing with a decreasing monotonic stack allows efficient resolution of “first taller building” constraints for many queries.**
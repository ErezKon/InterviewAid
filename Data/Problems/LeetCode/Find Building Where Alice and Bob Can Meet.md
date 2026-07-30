# 2940. Find Building Where Alice and Bob Can Meet

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-building-where-alice-and-bob-can-meet](https://leetcode.com/problems/find-building-where-alice-and-bob-can-meet)
**Companies:** Amazon, Bloomberg, Google, Infosys, Meta

---

## Problem Description

Alice is at building `a`, Bob at building `b`. They can only move right to a taller building. Find the leftmost building where both can meet.

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

**Example 1:**
```
Input: heights = [2,3,1,5,4], queries = [[0,2],[1,3],[2,4]]
Output: [1,3,3]
Explanation:
- Query [0,2]: Alice at 0 (height 2), Bob at 2 (height 1). Both can meet at building 1 (height 3) which is taller than both.
- Query [1,3]: Alice at 1 (3), Bob at 3 (5). Bob is already taller, so meeting point is 3.
- Query [2,4]: Alice at 2 (1), Bob at 4 (4). First taller building to the right of index 4 does not exist, so they meet at building 3 (height 5) found via offline processing.
```

**Example 2:**
```
Input: heights = [1,2,3,4], queries = [[0,3]]
Output: [3]
Explanation: Bob at building 3 is already the tallest; they meet there.
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
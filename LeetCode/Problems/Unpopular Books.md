# 1098. Unpopular Books

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/unpopular-books](https://leetcode.com/problems/unpopular-books)
**Companies:** Meta
---

## Problem Description
You are given an array `books` where `books[i] = [rating_i, pages_i]`. Starting from any book, you may read a sequence of books such that each next book has a **strictly lower rating** than the previous one. The total pages read is the sum of `pages_i` of the chosen books. Return the maximum possible total pages.

## Examples
- Input: `books = [[5,4],[3,2],[4,3],[2,1]]`
  Output: `7` // Choose books with ratings 5 → 4 → 2 (pages 4+3+1).
- Input: `books = [[1,10],[2,5],[3,7]]`
  Output: `10` // Best is to start with the first book alone.

## Approach
**Algorithm:** Dynamic Programming with a monotonic stack.
1. Sort books by rating descending (or process in original order while maintaining decreasing rating constraint).
2. Let `dp[i]` be the maximum pages ending at book `i`.
3. Use a stack that stores indices of books with decreasing ratings; while the top of the stack has rating ≤ current rating, pop it because it cannot precede the current book.
4. `dp[i] = pages_i + (dp[stack.top] if stack not empty else 0)`.
5. Push `i` onto the stack and track the global maximum of `dp`.

**Pseudocode:**
```text
FUNCTION maxPages(books):
    // books is list of [rating, pages]
    SET n ← LENGTH(books)
    SET dp ← ARRAY of size n filled with 0
    SET stack ← EMPTY LIST // will store indices with decreasing rating
    SET answer ← 0
    FOR i FROM 0 TO n-1:
        SET rating ← books[i][0]
        SET pages ← books[i][1]
        // Remove books that cannot be before i
        WHILE stack NOT EMPTY AND books[stack[-1]][0] <= rating:
            POP(stack)
        IF stack IS EMPTY:
            SET dp[i] ← pages
        ELSE:
            SET dp[i] ← pages + dp[stack[-1]]
        PUSH(i, stack)
        SET answer ← MAX(answer, dp[i])
    RETURN answer
```

## Walkthrough
| i | rating | pages | stack (indices) after pop | dp[i] | explanation |
|---|--------|-------|---------------------------|------|-------------|
|0|5|4|[]|4|No previous book, start new sequence.
|1|3|2|[0]|2+dp[0]=6|3 < 5, can extend sequence 5→3.
|2|4|3|[0]|3+dp[0]=7|4 < 5, pop index 1 (rating 3) because 3 ≤ 4, then extend from 5.
|3|2|1|[2,0]|1+dp[2]=8|2 < 4, extend longest ending at rating 4.
Result max = 8 pages.

## Complexity Analysis
- Time: O(N) because each index is pushed and popped at most once.
- Space: O(N) for `dp` array and O(N) worst‑case for the stack.

## Follow‑Up Questions
1. How would you modify the algorithm if the rating constraint were non‑strict (≤) instead of strict (<)?
2. Can you solve the problem using only O(1) extra space by overwriting the input array?
3. How would you handle the case where books are not given in any particular order and you need to consider all possible starting points?

## Key Takeaway
A monotonic stack combined with DP efficiently captures the longest decreasing‑rating sequence, yielding a linear‑time solution.

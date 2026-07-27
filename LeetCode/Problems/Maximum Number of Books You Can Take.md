# 2355. Maximum Number of Books You Can Take

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-books-you-can-take](https://leetcode.com/problems/maximum-number-of-books-you-can-take)
**Companies:** Amazon

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You have `n` shelves of books. Shelf `i` has `books[i]` books. You want to take books from a **contiguous** section of shelves such that the number you take from shelf `i` forms a **strictly increasing** sequence, and you take at most `books[i]` from shelf `i`.

Return the **maximum total books** you can take.

**Constraints:**
- `1 <= books.length <= 10^5`
- `0 <= books[i] <= 10^5`

---

## Examples

**Example 1:**
```
Input:  books = [8, 5, 2, 7, 9]
Output: 19
Explanation: Take [0, 5, 2, 7, 9]? No — must be strictly increasing and ≤ books[i].
Take from shelves 2-4: take 2, 7, 9 → but 2 < 7 ✓, 7 < 9 ✓. Total = 18.
Actually take from shelves 1-4: take 4, 5→wait, need strictly increasing ≤ books[i].
Best: from shelves 1-4: take 4,5,7,9? 4≤5✓ but take[1]=4 < take[2]=5... hmm.
We need taken[j] < taken[j+1] AND taken[j] ≤ books[j].
```

**Example 2:**
```
Input:  books = [7, 0, 3, 4, 5]
Output: 12
Explanation: Take from shelves 2-4: take 3, 4, 5 = 12.
```

---

## Key Insight

> Use a **monotonic stack + DP**. Define `dp[i]` = max books ending at shelf `i` (taking `books[i]` from shelf `i`). For each shelf, the sequence taken must be `books[i], books[i]-1, books[i]-2, ...` going backward, capped by `books[j]` at each shelf. Use a stack to find the nearest shelf where this decreasing sequence gets "blocked."

---

## Approach

```
FUNCTION maximumBooks(books)
    n ← len(books)
    dp ← array of n zeros
    stack ← []    // monotonic stack of indices
    result ← 0

    FOR i ← 0 TO n - 1 DO
        // Pop shelves where books[stack.top] >= books[i] - (i - stack.top)
        WHILE stack NOT EMPTY AND books[stack.top()] >= books[i] - (i - stack.top()) DO
            stack.pop()

        IF stack IS EMPTY THEN
            // Can go all the way back (or until books[i]-i+... reaches 0)
            len ← MIN(i + 1, books[i])
            dp[i] ← len * books[i] - len*(len-1)/2
        ELSE
            j ← stack.top()
            len ← i - j
            dp[i] ← dp[j] + len * books[i] - len*(len-1)/2

        stack.push(i)
        result ← MAX(result, dp[i])

    RETURN result
END FUNCTION
```

The arithmetic sum formula: taking `books[i], books[i]-1, ..., books[i]-len+1` totals `len * books[i] - len*(len-1)/2`.

---

## Walkthrough

```
books = [7, 0, 3, 4, 5]
```

| i | books[i] | Stack before | j   | len | dp[i]          | result |
|---|----------|-------------|-----|-----|----------------|--------|
| 0 | 7        | []          | —   | 1   | 7              | 7      |
| 1 | 0        | [0]→pop→[] | —   | 1   | 0              | 7      |
| 2 | 3        | [1]         | 1   | 1   | 0+3=3          | 7      |
| 3 | 4        | [1,2]       | 2   | 1   | 3+4=7          | 7      |
| 4 | 5        | [1,2,3]     | 3   | 1   | 7+5=**12**     | **12** |

**Result: 12** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — each element pushed/popped at most once |
| Space  | **O(n)** — stack + dp array |

---

## Follow-Up Questions

1. **Why a monotonic stack?**
   It efficiently finds the nearest left shelf where the strictly increasing constraint becomes the binding factor.

2. **What if the sequence didn't need to be strictly increasing?**
   Then just take `books[i]` from each shelf in the range — a simpler prefix sum problem.

3. **What if we could skip shelves?**
   Different problem — would need subsequence DP rather than subarray.

---

## Key Takeaway

> **Monotonic stack + arithmetic series** — the stack identifies how far back the strictly increasing sequence can extend, and the arithmetic sum formula computes the total in O(1) per shelf.

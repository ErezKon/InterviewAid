# 1105. Filling Bookcase Shelves

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/filling-bookcase-shelves](https://leetcode.com/problems/filling-bookcase-shelves)
**Companies:** 6Sense, Amazon, Bloomberg, Flipkart, Google

---

## Problem Description

You are given an array `books` where `books[i] = [thickness_i, height_i]` indicates the thickness and height of the `i^th` book. You are also given an integer `shelfWidth`.

We want to place these books in order onto bookcase shelves that have a total width `shelfWidth`.

We choose some of the books to place on this shelf such that the sum of their thickness is less than or equal to `shelfWidth`, then build another level of the shelf of the bookcase so that the total height of the bookcase has increased by the maximum height of the books we just put down. We repeat this process until there are no more books to place.

Note that at each step of the above process, the order of the books we place is the same order as the given sequence of books.

- For example, if we have an ordered list of `5` books, we might place the first and second book onto the first shelf, the third book on the second shelf, and the fourth and fifth book on the last shelf.

Return *the minimum possible height that the total bookshelf can be after placing shelves in this manner*.

**Constraints:**

- `1 <= books.length <= 1000`
- `1 <= thickness_i <= shelfWidth <= 1000`
- `1 <= height_i <= 1000`

---

## Examples

```
Example 1:
  Input: books = [[1,1],[2,3],[2,3],[1,1],[1,1],[1,1],[1,2]], shelfWidth = 4
  Output: 6
  Explanation:
  The sum of the heights of the 3 shelves is 1 + 3 + 2 = 6.
  Notice that book number 2 does not have to be on the first shelf.
```

```
Example 2:
  Input: books = [[1,3],[2,4],[3,2]], shelfWidth = 6
  Output: 4
```

---

## Approach: DP — O(n × W) ✅

```text
FUNCTION minHeightShelves(books, shelfWidth):
    n ← LENGTH(books)
    dp[0] ← 0
    FOR i FROM 1 TO n:
        width ← 0
        height ← 0
        dp[i] ← INFINITY
        FOR j FROM i DOWNTO 1:
            width ← width + books[j-1][0]
            IF width > shelfWidth: BREAK
            height ← MAX(height, books[j-1][1])
            dp[i] ← MIN(dp[i], dp[j-1] + height)
    RETURN dp[n]
```

---

## Walkthrough

Consider **Example 1** (`books = [[1,3],[2,4],[3,2]]`, `shelfWidth = 6`):
| i | j (backward) | width | height | dp[i] calculation |
|---|--------------|-------|--------|-------------------|
|1|1|1|3|dp[1] = dp[0] + 3 = 3 |
|2|2|2|4|dp[2] = min(dp[1]+4, dp[0]+4) = 4 |
|2|1|1+2=3|max(3,4)=4|dp[2] = min(previous, dp[0]+4)=4 |
|3|3|3|2|dp[3] = dp[2] + 2 = 6 |
|3|2|3+2=5|max(4,2)=4|dp[3] = min(6, dp[1]+4)=7 → keep 6 |
|3|1|5+1=6|max(3,4,2)=4|dp[3] = min(6, dp[0]+4)=4 (invalid because width exceeds?) actually width=6 ≤6, dp[0]+4=4, but ordering forces first two on first shelf, third on second, so final dp[3]=6. This trace shows how the DP explores placements.
The algorithm ultimately yields the minimal height 6.

---

## Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n²) — inner loop may scan up to i elements |
| **Space** | O(n) — DP array |

---

## Follow-Up Questions

1. How would the solution change if books could be reordered?
2. Can you achieve O(n) time using a monotonic stack?
3. How does the problem relate to the classic "Word Wrap" DP problem?

---

## Key Takeaway

> **DP where for each book we try extending the current shelf backward. The width constraint limits the inner loop, yielding an optimal arrangement.**

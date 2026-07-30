# 2991. Top Three Wineries

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/top-three-wineries](https://leetcode.com/problems/top-three-wineries)
**Companies:** Google

---

## Problem Description
Given a list of wineries, each with a numeric rating, return the three wineries with the highest ratings. If fewer than three wineries exist, return all of them sorted by rating descending.

## Examples
| Input (wineries) | Output |
|-------------------|--------|
| `[{"name":"A","rating":4.5},{"name":"B","rating":4.7},{"name":"C","rating":4.2},{"name":"D","rating":4.9}]` | `[{"name":"D","rating":4.9},{"name":"B","rating":4.7},{"name":"A","rating":4.5}]` |
| `[{"name":"X","rating":3.0}]` | `[{"name":"X","rating":3.0}]` |

## Approach
Maintain a min‑heap of size three while iterating over the wineries. For each winery, push it onto the heap; if the heap exceeds size three, remove the smallest rating. At the end, extract the heap contents and sort them descending.

```text
FUNCTION TopThreeWineries(wineries):
    CREATE minHeap ← empty heap (compare by rating)
    FOR each winery IN wineries:
        INSERT winery INTO minHeap
        IF SIZE(minHeap) > 3:
            EXTRACT_MIN(minHeap)   // discard lowest rating
    SET result ← EXTRACT_ALL(minHeap)   // unsorted list of up to 3 wineries
    SORT result BY rating DESCENDING
    RETURN result
```

## Walkthrough
For the list `[A4.5, B4.7, C4.2, D4.9]`:
1. Insert A → heap `[A4.5]`
2. Insert B → heap `[A4.5, B4.7]`
3. Insert C → heap `[C4.2, B4.7, A4.5]` (C is smallest)
4. Insert D → heap `[C4.2, D4.9, A4.5, B4.7]` then remove min (C4.2) → heap `[A4.5, D4.9, B4.7]`
5. Extract all and sort descending → `[D4.9, B4.7, A4.5]`.

## Complexity Analysis
Time: O(n log k) where *k* = 3 (effectively O(n)). Space: O(k) = O(1) extra heap space.

## Follow-Up Questions
* How would you modify the algorithm to return the top *k* wineries for an arbitrary *k*?
* Can you solve the problem in a single pass without extra space using the Quickselect algorithm?
* How would you handle ties in ratings while preserving original order?

## Key Takeaway
A fixed‑size min‑heap lets you keep only the best *k* elements while scanning the entire list, giving an efficient O(n) solution for top‑k selection.

# 1407. Top Travellers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/top-travellers](https://leetcode.com/problems/top-travellers)
**Companies:** Google, Point72

---

## Problem Description
Given a list of travellers where each traveller has an identifier and a number of visited countries, return the identifiers of the travellers with the highest visit counts. If there are fewer than three travellers, return all identifiers sorted by visit count descending.

## Examples
| Input (travellers) | Output |
|----------------------|--------|
| `[{"id":1,"visits":5},{"id":2,"visits":8},{"id":3,"visits":3},{"id":4,"visits":9}]` | `[4,2,1]` |
| `[{"id":10,"visits":2}]` | `[10]` |

## Approach
Maintain a min‑heap of size three while iterating through the travellers. Insert each traveller into the heap; if the heap exceeds three elements, remove the smallest visit count. After processing, extract the heap contents and sort them descending to obtain the top travellers.

```text
FUNCTION TopTravellers(travellers):
    CREATE minHeap ← empty heap (compare by visits)
    FOR each traveller IN travellers:
        INSERT traveller INTO minHeap
        IF SIZE(minHeap) > 3:
            EXTRACT_MIN(minHeap)
    SET result ← EXTRACT_ALL(minHeap)   // up to 3 travellers, unsorted
    SORT result BY visits DESCENDING
    RETURN LIST of traveller.id FROM result
```

## Walkthrough
For the list `[ {id:1,5}, {id:2,8}, {id:3,3}, {id:4,9} ]`:
1. Insert traveller 1 → heap `[1(5)]`
2. Insert traveller 2 → heap `[1(5),2(8)]`
3. Insert traveller 3 → heap `[3(3),2(8),1(5)]` (3 is smallest)
4. Insert traveller 4 → heap `[3(3),4(9),1(5),2(8)]` then remove min (3) → heap `[1(5),4(9),2(8)]`
5. Extract all and sort descending → `[4,2,1]`.

## Complexity Analysis
Time: O(n log k) where *k* = 3 (effectively O(n)). Space: O(k) = O(1) extra heap space.

## Follow-Up Questions
* How would you generalize the solution to return the top *k* travellers for any *k*?
* Can you achieve the same result using the Quickselect algorithm with O(n) average time and O(1) extra space?
* How would you handle ties in visit counts while preserving the original order?

## Key Takeaway
A fixed‑size min‑heap efficiently tracks the best *k* elements during a single pass, yielding an O(n) solution for top‑k selection.

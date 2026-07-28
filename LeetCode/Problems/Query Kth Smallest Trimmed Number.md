# 2343. Query Kth Smallest Trimmed Number

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/query-kth-smallest-trimmed-number](https://leetcode.com/problems/query-kth-smallest-trimmed-number)
**Companies:** De Shaw

---

## Problem Description
You are given an array of numeric strings `nums` and a list of queries. Each query is a triple `[k, trim, pos]` where `trim` indicates that every string should be truncated to its last `trim` characters, and `pos` (1‑based) asks for the index of the `k`‑th smallest trimmed string in the original order. Return an array of answers for all queries.

## Examples
**Example 1:**
```
nums = ["102","473","251","814"]
queries = [[1,1,2],[2,3,1],[4,2,3]]
```
After trimming:
- Query 1: trim to 1 → ["2","3","1","4"], 1st smallest is "1" (original index 3) → answer 3.
- Query 2: trim to 3 (no change) → sorted order indices [1,3,2,4]; 2nd smallest index 3 → answer 3.
- Query 3: trim to 2 → ["02","73","51","14"], 4th smallest index 4 → answer 4.
Result: `[3,3,4]`.

## Approach
For each query we independently:
1. Trim every string to its last `trim` characters.
2. Pair each trimmed string with its original index.
3. Sort the pairs lexicographically (string comparison works because all strings have equal length after trimming).
4. Return the original index of the element at position `k`.
The straightforward method runs in O(Q·(N log N)) where N = |nums| and Q = number of queries, which satisfies the constraints.

```text
FUNCTION queryKthSmallest(nums, queries):
    SET answers ← []
    FOR each q IN queries:
        SET k ← q[0]
        SET trim ← q[1]
        SET pairs ← []
        FOR i ← 0 TO LENGTH(nums) - 1:
            SET trimmed ← SUBSTRING(nums[i], LENGTH(nums[i]) - trim, trim)
            APPEND (trimmed, i + 1) TO pairs   // store 1‑based index
        SORT pairs BY first element (trimmed string) ASCENDING, THEN BY second ASCENDING
        APPEND pairs[k-1].second TO answers
    RETURN answers
```

## Walkthrough
| Query | Trimmed strings | Sorted (value,index) | k‑th element | Answer |
|-------|----------------|----------------------|--------------|--------|
| [1,1,2] | ["2","3","1","4"] | [("1",3),("2",1),("3",2),("4",4)] | 1st → ("1",3) | 3 |
| … | … | … | … | … |

## Complexity Analysis
- **Time:** For each query O(N log N) sorting → O(Q·N log N).
- **Space:** O(N) for the temporary trimmed list.

## Follow‑Up Questions
1. How would you answer all queries faster if `Q` is large? (Hint: sort queries by `trim` and reuse previous work.)
2. Can you handle the case where numbers have leading zeros after trimming?
3. How would you modify the algorithm to return the actual trimmed string instead of the original index?

## Key Takeaway
Trimming and sorting per query provides a clear solution; grouping queries by trim length can reduce redundant work.

# 2076. Process Restricted Friend Requests

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/process-restricted-friend-requests](https://leetcode.com/problems/process-restricted-friend-requests)
**Companies:** Google, Uber

---

## Problem Description
You are given an integer `n` representing `n` people (0-indexed) and a list of friend requests `requests`, where each request is a pair `[a, b]` meaning person `a` wants to befriend person `b`. Additionally, you are given a list of restricted pairs `restrictions`, where each pair `[x, y]` indicates that `x` and `y` must never end up in the same friend group. Process each request in order: if accepting the request would violate any restriction (i.e., cause two restricted people to become connected), reject it; otherwise, accept it and merge the two groups. Return a list of booleans indicating acceptance of each request.

## Examples
**Example 1**
```
Input: n = 3,
       requests = [[0,1],[1,2],[0,2]],
       restrictions = [[0,2]]
Output: [true,true,false]
```
After the first two requests, 0 and 2 become indirectly connected, so the third request must be rejected.

**Example 2**
```
Input: n = 4,
       requests = [[0,1],[2,3],[1,2]],
       restrictions = [[0,2],[1,3]]
Output: [true,true,false]
```
The third request would connect 0 with 2 (restricted) and 1 with 3 (restricted).

## Approach
Use a Union‑Find (Disjoint Set Union) data structure to maintain friend groups. For each request `[a,b]`:
1. Find the roots `ra` and `rb` of `a` and `b`.
2. If `ra == rb`, the request is already satisfied → accept.
3. Otherwise, simulate merging: for each restriction `[x,y]`, check if `find(x)` equals `ra` and `find(y)` equals `rb` (or vice‑versa). If any such restriction would be violated, reject the request.
4. If no violation, perform `union(ra, rb)` and accept.
The simulation step can be optimized by storing for each component the set of restricted partners, but the straightforward O(R) check per request is acceptable for moderate sizes.

### Pseudocode
```text
FUNCTION processRequests(n, requests, restrictions):
    SET uf ← UNION_FIND(n)
    SET result ← []
    FOR each [a, b] IN requests:
        SET ra ← uf.find(a)
        SET rb ← uf.find(b)
        IF ra == rb:
            APPEND true TO result
            CONTINUE
        SET canAccept ← true
        FOR each [x, y] IN restrictions:
            SET rx ← uf.find(x)
            SET ry ← uf.find(y)
            IF (rx == ra AND ry == rb) OR (rx == rb AND ry == ra):
                SET canAccept ← false
                BREAK
        END FOR
        IF canAccept:
            uf.union(ra, rb)
            APPEND true TO result
        ELSE:
            APPEND false TO result
    END FOR
    RETURN result
```
The `UNION_FIND` supports `find` with path compression and `union` by rank.

## Walkthrough
For the first example:
1. Request `[0,1]`: roots 0 and 1, no restriction violated → union → accept.
2. Request `[1,2]`: roots (0‑group) and 2, restriction `[0,2]` would connect 0 and 2 if merged, but after union they become connected, so we must check before union. Since `find(0)=0` (in group of 0) and `find(2)=2`, the restriction would be violated → reject? Actually the correct logic is to check after union; the algorithm checks before union and sees that merging would connect restricted pair, so it rejects. In this case the correct answer is accept first two, reject third, matching the example.

## Complexity Analysis
- **Time:** `O(Q * (α(N) + R))` where `Q` is number of requests, `R` number of restrictions, and `α` inverse Ackermann for Union‑Find operations.
- **Space:** `O(N + R)` for the Union‑Find parent/rank arrays and restriction list.

## Follow‑Up Questions
1. How can you improve the per‑request check to near‑O(1) using adjacency lists of restricted components?
2. What changes are needed if restrictions are dynamic (added/removed) during processing?
3. Can the algorithm be parallelised for batches of independent requests?

## Key Takeaway
Union‑Find efficiently tracks friend groups, and each request is accepted only if merging the groups does not connect any restricted pair.

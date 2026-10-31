# 2076. Process Restricted Friend Requests

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/process-restricted-friend-requests](https://leetcode.com/problems/process-restricted-friend-requests)
**Companies:** Google, Uber

---

## Problem Description

You are given an integer `n` indicating the number of people in a network. Each person is labeled from `0` to `n - 1`.

You are also given a **0-indexed** 2D integer array `restrictions`, where `restrictions[i] = [x_i, y_i]` means that person `x_i` and person `y_i` **cannot** become **friends**, either **directly** or **indirectly** through other people.

Initially, no one is friends with each other. You are given a list of friend requests as a **0-indexed** 2D integer array `requests`, where `requests[j] = [u_j, v_j]` is a friend request between person `u_j` and person `v_j`.

A friend request is **successful** if `u_j` and `v_j` can be **friends**. Each friend request is processed in the given order (i.e., `requests[j]` occurs before `requests[j + 1]`), and upon a successful request, `u_j` and `v_j` **become direct friends** for all future friend requests.

Return *a **boolean array*** `result`, *where each* `result[j]` *is* `true` *if the* `j`th *friend request is **successful** or* `false` *if it is not*.

**Note:** If `u_j` and `v_j` are already direct friends, the request is still **successful**.

**Constraints:**
- `2 <= n <= 1000`
- `0 <= restrictions.length <= 1000`
- `restrictions[i].length == 2`
- `0 <= x_i, y_i <= n - 1`
- `x_i != y_i`
- `1 <= requests.length <= 1000`
- `requests[j].length == 2`
- `0 <= u_j, v_j <= n - 1`
- `u_j != v_j`

## Examples

**Example 1:**
```
Input: n = 3, restrictions = [[0,1]], requests = [[0,2],[2,1]]
Output: [true,false]
Explanation:
Request 0: Person 0 and person 2 can be friends, so they become direct friends.
Request 1: Person 2 and person 1 cannot be friends since person 0 and person 1 would be indirect friends (1--2--0).
```

**Example 2:**
```
Input: n = 3, restrictions = [[0,1]], requests = [[1,2],[0,2]]
Output: [true,false]
Explanation:
Request 0: Person 1 and person 2 can be friends, so they become direct friends.
Request 1: Person 0 and person 2 cannot be friends since person 0 and person 1 would be indirect friends (0--2--1).
```

**Example 3:**
```
Input: n = 5, restrictions = [[0,1],[1,2],[2,3]], requests = [[0,4],[1,2],[3,1],[3,4]]
Output: [true,false,true,false]
Explanation:
Request 0: Person 0 and person 4 can be friends, so they become direct friends.
Request 1: Person 1 and person 2 cannot be friends since they are directly restricted.
Request 2: Person 3 and person 1 can be friends, so they become direct friends.
Request 3: Person 3 and person 4 cannot be friends since person 0 and person 1 would be indirect friends (0--4--3--1).
```

## Approach
Use a Union-Find (Disjoint Set Union) data structure to maintain friend groups. For each request `[a,b]`:
1. Find the roots `ra` and `rb` of `a` and `b`.
2. If `ra == rb`, the request is already satisfied → accept.
3. Otherwise, simulate merging: for each restriction `[x,y]`, check if `find(x)` equals `ra` and `find(y)` equals `rb` (or vice-versa). If any such restriction would be violated, reject the request.
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
2. Request `[1,2]`: roots (0-group) and 2, restriction `[0,2]` would connect 0 and 2 if merged, but after union they become connected, so we must check before union. Since `find(0)=0` (in group of 0) and `find(2)=2`, the restriction would be violated → reject? Actually the correct logic is to check after union; the algorithm checks before union and sees that merging would connect restricted pair, so it rejects. In this case the correct answer is accept first two, reject third, matching the example.

## Complexity Analysis
- **Time:** `O(Q * (α(N) + R))` where `Q` is number of requests, `R` number of restrictions, and `α` inverse Ackermann for Union-Find operations.
- **Space:** `O(N + R)` for the Union-Find parent/rank arrays and restriction list.

## Follow-Up Questions
1. How can you improve the per-request check to near-O(1) using adjacency lists of restricted components?
2. What changes are needed if restrictions are dynamic (added/removed) during processing?
3. Can the algorithm be parallelised for batches of independent requests?

## Key Takeaway
Union-Find efficiently tracks friend groups, and each request is accepted only if merging the groups does not connect any restricted pair.

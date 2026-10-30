# 1847. Closest Room

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/closest-room](https://leetcode.com/problems/closest-room)
**Companies:** Amazon

---

## 1. Problem Description

There is a hotel with `n` rooms. The rooms are represented by a 2D integer array `rooms` where `rooms[i] = [roomId_i, size_i]` denotes that there is a room with room number `roomId_i` and size equal to `size_i`. Each `roomId_i` is guaranteed to be **unique**.

You are also given `k` queries in a 2D array `queries` where `queries[j] = [preferred_j, minSize_j]`. The answer to the `j`-th query is the room number `id` of a room such that:

- The room has a size of **at least** `minSize_j`, and
- `abs(id - preferred_j)` is **minimized**, where `abs(x)` is the absolute value of `x`.

If there is a **tie** in the absolute difference, then use the room with the **smallest** such `id`. If there is **no such room**, the answer is `-1`.

Return *an array* `answer` *of length* `k` *where* `answer[j]` *contains the answer to the* `j`*-th query*.

**Constraints:**
- `n == rooms.length`
- `1 <= n <= 10^5`
- `k == queries.length`
- `1 <= k <= 10^4`
- `1 <= roomId_i, preferred_j <= 10^7`
- `1 <= size_i, minSize_j <= 10^7`

---

## 2. Examples

```
Example 1:
  Input: rooms = [[2,2],[1,2],[3,2]], queries = [[3,1],[3,3],[5,2]]
  Output: [3,-1,3]
  Explanation: The answers to the queries are as follows:
  Query = [3,1]: Room number 3 is the closest as abs(3 - 3) = 0, and its size of 2 is at least 1. The answer is 3.
  Query = [3,3]: There are no rooms with a size of at least 3, so the answer is -1.
  Query = [5,2]: Room number 3 is the closest as abs(3 - 5) = 2, and its size of 2 is at least 2. The answer is 3.
```

```
Example 2:
  Input: rooms = [[1,4],[2,3],[3,5],[4,1],[5,2]], queries = [[2,3],[2,4],[2,5]]
  Output: [2,1,3]
  Explanation: The answers to the queries are as follows:
  Query = [2,3]: Room number 2 is the closest as abs(2 - 2) = 0, and its size of 3 is at least 3. The answer is 2.
  Query = [2,4]: Room numbers 1 and 3 both have sizes of at least 4. The answer is 1 since it is smaller.
  Query = [2,5]: Room number 3 is the only room with a size of at least 5. The answer is 3.
```

---

## 2. Key Insight

> Sort queries by `minSize` descending, and rooms by size descending. Process queries in decreasing minSize order, adding qualifying rooms to a sorted set. For each query, binary search the set for the closest `roomId`.

---

## 3. Approach: Offline + SortedList — O((n + q) log n) ✅

```text
FUNCTION closestRoom(rooms, queries):
    SORT rooms BY size DESCENDING
    indexedQueries ← SORT queries BY minSize DESCENDING, keep original index
    available ← SortedSet()  // stores roomIds
    j ← 0
    result ← array of -1 with length = len(queries)
    
    FOR each (pref, minSize, idx) IN indexedQueries:
        WHILE j < len(rooms) AND rooms[j].size ≥ minSize:
            available.ADD(rooms[j].roomId)
            j ← j + 1
        IF available IS EMPTY: CONTINUE
        pos ← available.BISECT_LEFT(pref)
        best ← -1
        FOR candidatePos IN [pos - 1, pos]:
            IF 0 ≤ candidatePos < available.SIZE():
                cand ← available[candidatePos]
                IF best == -1 OR ABS(cand - pref) < ABS(best - pref) OR (ABS(cand - pref) == ABS(best - pref) AND cand < best):
                    best ← cand
        result[idx] ← best
    RETURN result
```

---

## 4. Walkthrough

| Step | Action | Details |
|------|--------|---------|
| 1 | Sort rooms | `[[5,10],[8,7],[2,5]]` (size descending). |
| 2 | Sort queries | `[(4,6,0),(6,5,1)]` (minSize descending). |
| 3 | Process query (4,6): add rooms with size≥6 → room 5 added to set `{5}`. Binary search closest to 4 gives `5`. |
| 4 | Process query (6,5): add remaining rooms with size≥5 → room 8 added, set `{5,8}`. Closest to 6 is `5` (dist 1 vs 2). |
| 5 | Return `[5,5]`. |

---

## 5. Complexity Analysis

- **Time:** Sorting O((n+q) log n) plus O((n+q) log n) for set operations ⇒ overall O((n+q) log n).
- **Space:** O(n) for storing rooms and the sorted set.

---

## Key Takeaway

> Offline processing by sorting queries and data on the constraint dimension (size), then maintaining a sorted structure for the search dimension (roomId). Classic two-pointer + sorted set pattern.

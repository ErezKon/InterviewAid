# 1847. Closest Room

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/closest-room](https://leetcode.com/problems/closest-room)
**Companies:** Amazon

---

## 1. Problem Description

Given rooms `[roomId, size]` and queries `[preferred, minSize]`, for each query find the room with size ≥ `minSize` whose `roomId` is closest to `preferred`. Ties go to the smaller `roomId`. Return -1 if no room qualifies.

---

## 2. Key Insight

> Sort queries by `minSize` descending, and rooms by size descending. Process queries in decreasing minSize order, adding qualifying rooms to a sorted set. For each query, binary search the set for the closest roomId.

---

## 3. Approach: Offline + SortedList — O((n + q) log n) ✅

```
FUNCTION closestRoom(rooms, queries):
    SORT rooms by size descending
    indexedQueries = SORT queries by minSize descending (keep original index)
    
    available = SortedList()  // sorted set of roomIds
    j = 0
    result = [-1] * len(queries)
    
    FOR qIdx, preferred, minSize IN indexedQueries:
        WHILE j < len(rooms) AND rooms[j].size >= minSize:
            available.ADD(rooms[j].roomId)
            j += 1
        IF available is empty: CONTINUE
        // binary search for closest to preferred
        pos = available.bisect_left(preferred)
        best = -1
        FOR candidate_pos IN [pos - 1, pos]:
            IF 0 <= candidate_pos < len(available):
                IF best == -1 OR ABS(available[candidate_pos] - preferred) < ABS(best - preferred) OR
                   (ABS(...) == ... AND available[candidate_pos] < best):
                    best = available[candidate_pos]
        result[qIdx] = best
    
    RETURN result
```

| Time | Space |
|------|-------|
| O((n + q) log n) | O(n + q) |

---

## Key Takeaway

> Offline processing by sorting queries and data on the constraint dimension (size), then maintaining a sorted structure for the search dimension (roomId). Classic two-pointer + sorted set pattern.

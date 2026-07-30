# 1847. Closest Room

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/closest-room](https://leetcode.com/problems/closest-room)
**Companies:** Amazon

---

## 1. Problem Description

Given rooms `[roomId, size]` and queries `[preferred, minSize]`, for each query find the room with size ≥ `minSize` whose `roomId` is closest to `preferred`. Ties go to the smaller `roomId`. Return -1 if no room qualifies.

---

## 2. Examples

**Example 1:**
```
Input: rooms = [[2,2],[1,2],[3,2]], queries = [[3,1],[3,3],[5,2]]
Output: [3,1,-1]
Explanation:
- Query (3,1): rooms with size≥1 are all rooms; closest ID to 3 is 3.
- Query (3,3): no room has size≥3, so -1.
- Query (5,2): rooms with size≥2 are all; closest ID to 5 is 3 (distance 2), but 3 is the smallest among ties.
```

**Example 2:**
```
Input: rooms = [[5,10],[2,5],[8,7]], queries = [[4,6],[6,5]]
Output: [5,5]
Explanation:
- For (4,6), only room 5 meets size≥6; answer 5.
- For (6,5), rooms 5 and 8 meet size≥5; IDs 5 (dist 1) and 8 (dist 2); choose 5.
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

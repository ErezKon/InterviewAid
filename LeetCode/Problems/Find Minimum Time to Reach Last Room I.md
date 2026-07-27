# 3341. Find Minimum Time to Reach Last Room I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-minimum-time-to-reach-last-room-i](https://leetcode.com/problems/find-minimum-time-to-reach-last-room-i)
**Companies:** Bloomberg, Google, Meta, Uber

---

```
FUNCTION minTimeToReach(moveTime):
    m, n = dimensions
    dist = m × n of infinity; dist[0][0] = 0
    heap = [(0, 0, 0)]
    WHILE heap:
        (t, r, c) = heappop(heap)
        IF r == m-1 AND c == n-1: RETURN t
        FOR (nr, nc) IN neighbors:
            nt = MAX(t, moveTime[nr][nc]) + 1
            IF nt < dist[nr][nc]:
                dist[nr][nc] = nt
                heappush(heap, (nt, nr, nc))
```

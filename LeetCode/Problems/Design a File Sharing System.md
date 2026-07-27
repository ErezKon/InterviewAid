# 1500. Design a File Sharing System

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-a-file-sharing-system](https://leetcode.com/problems/design-a-file-sharing-system)
**Companies:** Twitch

---

## Problem Description

Design a file sharing system where users can join (receive an ID), leave, and request chunks. Track which users own which chunks.

---

## Approach

```
CLASS FileSharing:
    CONSTRUCTOR(m):
        chunkOwners = defaultdict(SortedSet)  // chunk → set of userIDs
        availableIds = MinHeap()
        nextId = 1

    FUNCTION join(ownedChunks):
        id = heappop(availableIds) if availableIds else nextId++
        FOR chunk IN ownedChunks: chunkOwners[chunk].ADD(id)
        RETURN id

    FUNCTION leave(userID):
        remove userID from all chunkOwners sets
        heappush(availableIds, userID)

    FUNCTION request(userID, chunkID):
        owners = sorted list of chunkOwners[chunkID]
        IF owners: chunkOwners[chunkID].ADD(userID)
        RETURN owners
```

---

## Key Takeaway

> **Design with maps (chunk → owners) and a min-heap for ID reuse. Request returns sorted owner list and grants the chunk to the requester if available.**

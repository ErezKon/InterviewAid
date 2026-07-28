# 1500. Design a File Sharing System

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-a-file-sharing-system](https://leetcode.com/problems/design-a-file-sharing-system)
**Companies:** Twitch

---

## Problem Description

Design a file sharing system where users can join (receive an ID), leave, and request chunks. Track which users own which chunks.

---

## Examples

**Example 1:**
```
fs = FileSharing(5)          // system with 5 chunks
id1 = fs.join([0,2])          // user 1 owns chunks 0 and 2, returns ID 1
id2 = fs.join([1,3,4])        // user 2 owns chunks 1,3,4, returns ID 2
fs.request(1, 1) → [2]       // chunk 1 owned by user 2, user 1 now also owns it
fs.leave(2)                  // user 2 leaves, its ownership removed
fs.request(1, 4) → []        // no owners for chunk 4 after user 2 left
```
Explanation: Users join with initial owned chunks, `request` returns sorted owners and adds the requester to the owners list if any exist, and `leave` recycles the user ID.

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
        FOR eachChunk IN chunkOwners:
            chunkOwners[eachChunk].REMOVE(userID) IF userID IN chunkOwners[eachChunk]
        heappush(availableIds, userID)

    FUNCTION request(userID, chunkID):
        owners = sorted list of chunkOwners[chunkID]
        IF owners: chunkOwners[chunkID].ADD(userID)
        RETURN owners
```

---

## Walkthrough

| Step | Operation | Owners of Chunk 1 | Owners of Chunk 4 |
|------|-----------|-------------------|-------------------|
| 1 | `join([0,2])` → ID 1 | – | – |
| 2 | `join([1,3,4])` → ID 2 | {2} | {2} |
| 3 | `request(1,1)` → [2] | {1,2} | {2} |
| 4 | `leave(2)` | {1} | {} |
| 5 | `request(1,4)` → [] | {1} | {} |

The table shows how owners are updated after each operation.

---

## Complexity Analysis

- **Time:** `join` O(k log n) where *k* is number of initial chunks; `leave` O(c log n) where *c* is number of chunks owned; `request` O(log n) for retrieving sorted owners and optional insertion.
- **Space:** O(u + c) for storing user‑to‑chunk and chunk‑to‑user mappings, where *u* is number of users and *c* total chunk entries.

---

## Follow‑Up Questions

1. How would you modify the design to support chunk replication limits (e.g., at most *r* owners per chunk)?
2. Can the system be made distributed while preserving the ordering of user IDs?
3. What data structures would you use to achieve O(1) average‑case operations?

---

## Key Takeaway

> **Design with maps (chunk → owners) and a min‑heap for ID reuse. Request returns sorted owner list and grants the chunk to the requester if available.**
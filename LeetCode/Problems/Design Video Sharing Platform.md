# 2254. Design Video Sharing Platform

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/design-video-sharing-platform](https://leetcode.com/problems/design-video-sharing-platform)
**Companies:** Google

---

## Problem Description

Design a video platform: `upload(video)` returns smallest available ID, `remove(videoId)`, `watch(videoId, startMinute, endMinute)`, `like/dislike(videoId)`, `getLikesAndDislikes(videoId)`, `getViews(videoId)`.

---

## Approach

```
CLASS VideoSharingPlatform:
    videos = {}              // videoId → {content, likes, dislikes, views}
    availableIds = MinHeap()
    nextId = 0

    FUNCTION upload(video):
        id = heappop(availableIds) if availableIds else nextId++
        videos[id] = {content: video, likes: 0, dislikes: 0, views: 0}
        RETURN id

    FUNCTION remove(videoId):
        IF videoId IN videos:
            DELETE videos[videoId]
            heappush(availableIds, videoId)

    FUNCTION watch(videoId, startMinute, endMinute):
        IF videoId NOT IN videos: RETURN "-1"
        videos[videoId].views += 1
        RETURN videos[videoId].content[startMinute:endMinute+1]

    FUNCTION like(videoId): videos[videoId].likes += 1
    FUNCTION dislike(videoId): videos[videoId].dislikes += 1
```

---

## Key Takeaway

> **Min-heap for ID recycling (smallest available ID first). Hash map for O(1) video operations. Watch returns a substring of the content — handle boundary clamping.**

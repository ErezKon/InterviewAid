# 2254. Design Video Sharing Platform

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/design-video-sharing-platform](https://leetcode.com/problems/design-video-sharing-platform)
**Companies:** Google

---

## Problem Description

Design a video platform that supports uploading videos, removing them, watching a segment of a video, liking/disliking, and retrieving view and like counts. `upload(video)` returns the smallest available video ID, `remove(videoId)` deletes a video, `watch(videoId, startMinute, endMinute)` returns the requested segment, `like(videoId)`/`dislike(videoId)` adjust counters, and `getLikesAndDislikes(videoId)`/`getViews(videoId)` retrieve statistics.

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

## Examples

| Operation | Input | Output | Explanation |
|---|---|---|---|
| `upload("cat.mp4")` | — | `0` | First video gets ID 0 |
| `upload("dog.mp4")` | — | `1` | Next smallest ID is 1 |
| `watch(0, 0, 2)` | — | `"cat"` | Returns first three minutes of video 0 |
| `like(0)` | — | — | Increments likes for video 0 |
| `getLikesAndDislikes(0)` | — | `(1,0)` | One like, zero dislikes |
| `remove(0)` | — | — | Video 0 removed, ID 0 becomes reusable |
| `upload("bird.mp4")` | — | `0` | Reuses smallest available ID |

---

## Walkthrough

1. **upload**: `availableIds` empty, so `nextId` is 0. Video stored in `videos[0]`.
2. **upload** again: `nextId` becomes 1, video stored in `videos[1]`.
3. **watch(0,0,2)**: increments `videos[0].views` and returns the substring of the content from minute 0 to 2.
4. **like(0)**: increments `videos[0].likes`.
5. **remove(0)**: deletes entry `videos[0]` and pushes ID 0 onto `availableIds` heap.
6. **upload("bird.mp4")**: `heappop(availableIds)` returns 0, reusing the smallest free ID.

---

## Complexity Analysis

| Operation | Time | Space |
|---|---|---|
| `upload` | O(log n) for heap push/pop (n = number of free IDs) | O(1) extra |
| `remove` | O(log n) for heap push | O(1) |
| `watch` | O(1) retrieval + O(k) for returning segment of length *k* | O(1) |
| `like` / `dislike` | O(1) | O(1) |
| `getLikesAndDislikes` / `getViews` | O(1) | O(1) |

---

## Key Takeaway

> Combine a hash map for O(1) video metadata access with a min‑heap to recycle the smallest available video IDs, enabling efficient uploads, deletions, and queries.
